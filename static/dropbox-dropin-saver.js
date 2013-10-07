function onReady() {

    console.log("Dropbox Drop-ins Saver Ready!");

    if( Dropbox.isBrowserSupported() )
    {
        console.log( "Dropbox chooser is supported by your browser !" );
    }
    else
    {
        console.log( "Your browser does not support Dropbox chooser !" );
    }

    //*********** Dropbox's own saver button ***************
    var saverOptions = {
        files: [ { "url" : "" } ],
        success: function() { console.log( "The file(s) are added to your Dropbox !" ); },
        progress: function(progress) { console.log( "Current progress: " + progress * 100 + "%" ); },
        cancel: function() { console.log( "Canceled !" ); },
        error: function(err) { console.log( err ); }
    };

    var buttonDbSaver = Dropbox.createSaveButton(saverOptions);
    $( "#programmatic" ).append( $( buttonDbSaver ) );

    //********************************************************

    //*********** HTML standard button ***************
    var $buttonSaver1 = $( "#db-saver-button-1" );
    
    $buttonSaver1.click( function(e) {
        Dropbox.save( $( ".filepath" ).eq(2).val() );
    } );

    var $buttonSaver2 = $( "#db-saver-button-2" );
    
    $buttonSaver2.click( function(e) {
        Dropbox.save( saverOptions );
    } );

    //********************************************************
}