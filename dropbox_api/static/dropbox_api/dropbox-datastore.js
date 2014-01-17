function onReady() {

    var $buttonAuth = $( "#button_auth" );
    var $buttonSignOut = $( "#button_sign_out" );
    var $buttonCheckAuth = $( "#button_check_auth" );

    var $authInfo = $( "#auth_info" );
    var $dsInfo = $( "#ds_info" );
    var $tableTasks = $( "#table_tasks" );
    
    var APP_KEY = "w7hk75aqd7njj4j";

    var client = new Dropbox.Client( { key: APP_KEY } );

    client.authenticate( { interactive: false }, function( error ) {
        if( error )
        {
            $authInfo.html( 'Authentication Error: ' + error );
            window.location.replace("/dropbox-datastore");
        }
    } );

    $buttonCheckAuth.click( function(e) {
        $authInfo.html( "Authenticated: " + client.isAuthenticated() );
    } )

    if( !client.isAuthenticated() )
    {
        $buttonAuth.click( function(e) {
            client.authenticate();
        } );

        $buttonSignOut.prop( "disabled", true );
        $buttonSignOut.text( "Not Authenticated Yet" );
    }
    else
    {
        $buttonSignOut.click( function(e) {
            client.signOut( function( error ) {
                if( error )
                {
                    $authInfo.html( 'Signout Error: ' + error );
                }
                window.location.replace("/dropbox-datastore");
            } );
        } );

        $buttonAuth.prop( "disabled", true );
        $buttonAuth.text( "Already Authenticated" );

        client.getAccountInfo( function(error, info, obj) {
            var list = [ obj.display_name, obj.email, obj.country ];
            $authInfo.html( list.join(";") );
        } );

        var datastoreManager = client.getDatastoreManager();
        datastoreManager.openDefaultDatastore(function (error, datastore) {
            if (error) {
                $dsInfo.text('Error opening default datastore: ' + error);
            }
            else
            {
                $dsInfo.text('Default datastore opened successfully !');
            }

            // Now you have a datastore. The next few examples can be included here.
            var taskTable = datastore.getTable('tasks');

            var taskList = taskTable.query();
            taskList.forEach( function( elem ) {
                var taskLine = "<tr><td>" + elem.getId() + "</td><td>" + elem.get('taskname') + "</td><td>" + elem.get('completed') + "</td><td>" + elem.get('created') + "</td></tr>";
                $tableTasks.append(taskLine);
            });

            $buttonAddTask = $( "#button_add_task" );
            $buttonAddTask.click(function(event) {
                var name = $( "#input_task_name" ).val();
                var status = ( $( "#select_complete" ).val() === 'true' );
                var date = new Date();

                taskTable.insert(
                    {
                        taskname: name,
                        completed: status,
                        created: date
                    }
                );

                $( "#input_task_name" ).val("");
            });

            datastore.recordsChanged.addListener(function (event) {
                $dsInfo.text('records changed:' + event.affectedRecordsForTable('tasks'));
            });
        });
    }
}