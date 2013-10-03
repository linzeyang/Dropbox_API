function onReady() {

    console.log( "Dropbox Datastore ready !" );

    var $btnAuth = $( "#btnAuth" );
    var $btnSignout = $( "#btnSignout" );
    var $btnCheckAuth = $( "#btnCheckAuth" );

    var APP_KEY = "w7hk75aqd7njj4j";

    var client = new Dropbox.Client( { key: APP_KEY } );

    client.authenticate( { interactive: false }, function( error ) {
        if( error )
        {
            console.log( 'Authentication Error: ' + error );
            alert( 'Authentication Error: ' + error );
            window.location.replace("/dropbox-datastore");
        }
    } );

    $btnCheckAuth.click( function(e) {
        console.log( "Authenticated: " + client.isAuthenticated() );
    } )

    if( !client.isAuthenticated() )
    {
        $btnAuth.click( function(e) {
            client.authenticate();
        } );

        $btnSignout.prop( "disabled", true );
        $btnSignout.find( "span" ).text( "Not Authenticated Yet" );
    }
    else
    {
        $btnSignout.click( function(e) {
            client.signOut( function( error ) {
                if( error )
                {
                    console.log( 'Signout Error: ' + error );
                    alert( 'Signout Error: ' + error );
                }
                window.location.replace("/dropbox-datastore");
            } );
        } );

        $btnAuth.prop( "disabled", true );
        $btnAuth.find( "span" ).text( "Already Authenticated" );

        client.getAccountInfo( function(error, info, obj) {
            var list = [ obj.display_name, obj.email, obj.country ];
            console.log( list.join(";") );
            console.log( obj );
        } );
    }
}