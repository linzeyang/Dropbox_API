function onReady() {

    if( Dropbox.isBrowserSupported() )
    {
        console.log( "Dropbox chooser is supported by your browser !" );
    }
    else
    {
        console.log( "Your browser does not support Dropbox chooser !" );
        alert( "Your browser does not support Dropbox chooser !" );
    }

    //*********** Dropbox's own saver button ***************
    var saverOptions = {
        files: [
            { 
                "url" : "https://www.google.ie/images/srpr/logo4w.png" 
            }, 
            {
                "url" : "http://www.bing.com/az/hprichbg/rb/Bioluminescence_ROW11273288857_1366x768.jpg" 
            }
        ],
        success: function() { console.log( "The file(s) are added to your Dropbox !" ); },
        progress: function(progress) { console.log( "Current progress: " + progress * 100 + "%" ); },
        cancel: function() { console.log( "Canceled !" ); },
        error: function(err) { console.log( err ); }
    };

    var buttonDbSaver = Dropbox.createSaveButton(saverOptions);
    $( "#programmatic" ).append( $( buttonDbSaver ) );

    //********************************************************

    //*********** HTML standard button ***************
    var $buttonSaver1 = $( "#db_saver_button-1" );
    
    $buttonSaver1.click( function(e) {
        Dropbox.save( $( "#div_std_saver .filepath" ).eq(0).val() );
    } );

    var $buttonSaver2 = $( "#db_saver_button_2" );
    
    $buttonSaver2.click( function(e) {
        Dropbox.save( saverOptions );
    } );

    //********************************************************
}