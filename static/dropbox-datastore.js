function onReady() {

    var $buttonAuth = $( "#button-auth" );
    var $buttonSignOut = $( "#button-sign-out" );
    var $buttonCheckAuth = $( "#button-check-auth" );

    var $authInfo = $( "#auth-info" );
    var $dsInfo = $( "#ds-info" );
    
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
    }

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
    });
}