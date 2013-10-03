function onReady() {

    console.log("Dropbox Drop-ins Ready!");

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
        $( "#div-db-saver a" ).attr( "href", e.files[0].link );
        saverOptions["files"][0]["url"] = e.files[0].link;

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
            $( "#div-db-saver a" ).attr( "href", files[0]["link"] );
            saverOptions["files"][0]["url"] = files[0]["link"];
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