function onReady() {

    console.log("Dropbox Drop-ins Chooser Ready!");

    if( Dropbox.isBrowserSupported() )
    {
        console.log( "Dropbox chooser is supported by your browser !" );
    }
    else
    {
        console.log( "Your browser does not support Dropbox chooser !" );
    }

    //*********** Dropbox's own chooser button ***************
    var buttonDbChooser = document.getElementById( "db-chooser" );
    
    $( "#slt1" ).change( function(e) {
        $( buttonDbChooser ).attr( "data-multiselect", $( "#slt1" ).val() );
    } );

    var $table1 = $( "#tbl1" );

    buttonDbChooser.addEventListener( "DbxChooserSuccess", function(e) {
        $table1.find( ".fileline" ).remove();

        e.files.forEach( function( elem ) {
            var name = elem["name"];
            var link = "<a target=\"_blank\" href=\"" + elem["link"] + "\">Click</a>";
            var bytes = elem["bytes"];
            var icon = "<img src=\"" + elem["icon"] + "\" />";
            var thumbnail = "N/A";

            if( elem["thumbnails"]["64x64"] != undefined )
            {
                thumbnail = "<img alt=\"thumbnail\" src=\"" + elem["thumbnails"]["64x64"] + "\" />";
            }

            $table1.append( 
                "<tr class=\"fileline\"><td>" + name + "</td>" + 
                "<td>" + link + "</td>" + 
                "<td>" + bytes + "</td>" + 
                "<td>" + icon + "</td>" + 
                "<td>" + thumbnail + "</td></tr>" 
            );
        });

        $( ".filepath" ).val( e.files[0].link );

    }, false);

    buttonDbChooser.addEventListener( "DbxChooserCancel", function(e) {
        console.log( "Canceled" );
    }, false);
    //********************************************************

    //*********** HTML standard button ***********************
    var $buttonChooser = $( "#db-chooser-button" );
    
    var $table2 = $( "#tbl2" );

    var chooserOptions = {
        linkType: "preview",
        multiselect: true,
        success: function( files ) {
            $table2.find( ".fileline" ).remove();

            files.forEach( function( elem ) {
                var name = elem["name"];
                var link = "<a target=\"_blank\" href=\"" + elem["link"] + "\">Click</a>";
                var bytes = elem["bytes"];
            
                $table2.append( 
                    "<tr class=\"fileline\"><td>" + name + "</td>" + 
                    "<td>" + link + "</td>" + 
                    "<td>" + bytes + "</td></tr>" 
                );
            } );

            $( ".filepath" ).val( files[0]["link"] );
        },
        cancel: function() {
            console.log( "Canceled" );
        }
    };

    $( "input[type='radio']" ).change( function(e) {
        chooserOptions["linkType"] = $( "input[type='radio']:checked" ).val();
    });

    $buttonChooser.click( function( event ) {
        Dropbox.choose( chooserOptions );
    });
    //********************************************************
}