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

    //*********** Dropbox's own chooser button ***************

    var buttonDbChooser = document.getElementById( "db_chooser" );
    
    $( "#select_db_chooser" ).change( function(e) {
        $( buttonDbChooser ).attr( "data-multiselect", $( "#select_db_chooser" ).val() );
    } );

    var $tableDbChooser = $( "#table_db_chooser" );

    buttonDbChooser.addEventListener( "DbxChooserSuccess", function(e) {
        $tableDbChooser.find( ".fileline" ).remove();

        e.files.forEach( function( elem ) {
            var name = elem["name"];
            var link = "<a target=\"_blank\" href=\"" + elem["link"] + "\">Click</a>";
            var bytes = elem["bytes"];
            var icon = "<img src=\"" + elem["icon"] + "\" alt=\"" + name + "\" />";
            var thumbnail = "N/A";

            if( elem["thumbnails"]["64x64"] != undefined )
            {
                thumbnail = "<img alt=\"thumbnail\" src=\"" + elem["thumbnails"]["64x64"] + "\" />";
            }

            $tableDbChooser.append( 
                "<tr class=\"fileline\"><td>" + name + "</td>" + 
                "<td>" + link + "</td>" + 
                "<td>" + bytes + "</td>" + 
                "<td>" + icon + "</td>" + 
                "<td>" + thumbnail + "</td></tr>" 
            );
        });
    }, false);

    buttonDbChooser.addEventListener( "DbxChooserCancel", function(e) {
        console.log( "Canceled !" );
    }, false);

    //********************************************************

    //*********** HTML standard button ***********************

    var $buttonChooser = $( "#db_chooser_button" );
    
    var $tableStdChooser = $( "#table_std_chooser" );

    var chooserOptions = {
        linkType: "preview",
        multiselect: true,
        success: function( files ) {
            $tableStdChooser.find( ".fileline" ).remove();

            files.forEach( function( elem ) {
                var name = elem["name"];
                var link = "<a target=\"_blank\" href=\"" + elem["link"] + "\">Click</a>";
                var bytes = elem["bytes"];
            
                $tableStdChooser.append( 
                    "<tr class=\"fileline\"><td>" + name + "</td>" + 
                    "<td>" + link + "</td>" + 
                    "<td>" + bytes + "</td></tr>" 
                );
            } );
        },
        cancel: function() {
            console.log( "Canceled !" );
        }
    };

    $( "#div_std_chooser input[type='radio']" ).change( function(e) {
        chooserOptions["linkType"] = $( "#div_std_chooser input[type='radio']:checked" ).val();
    });

    $buttonChooser.click( function( event ) {
        Dropbox.choose( chooserOptions );
    });
    //********************************************************
}