document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    if(localStorage.getItem("LocalData") == null)
    {
        var data = [];
        data = JSON.stringify(data);
        localStorage.setItem("LocalData", data);
    }

    //-------------------------
    $("#btn1").on("click",function(){
        //Appel à la fonction qui traite le scan
        scan();
    });

    //--------------------------
    $(document).on("pagebeforeshow", "#display", function() {
        $("table#allTable tbody").empty();

        var data = localStorage.getItem("LocalData");
        console.log(data);
        data = JSON.parse(data);

        var html = "";

        for(var count = 0; count < data.length; count++)
        {
            //html = html + "<tr><td>" + data[count][0] + "</td><td><a href='javascript:openURL(\"" + data[count][1] + "\")'>" + data[count][1] + "</a></td></tr>";
            html = html + "<tr><td>" + data[count][0] + "</td><td>" + data[count][1] + "</a></td></tr>";

        }

        $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");

    });

    function openURL(url)
    {
        alert("ouverture");
        window.open(url, '_blank', 'location=yes');
    }
    //-------------------------------------------

};
//-------------Fin OnDeviceReady----------//

//-------------Fonction Scan---------------//
function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                    navigator.notification.prompt("Please enter name of data",  function(input){
                        var name = input.input1;
                        var value = result.text;

                        var data = localStorage.getItem("LocalData");
                        console.log(data);
                        data = JSON.parse(data);
                        data[data.length] = [name, value];

                        localStorage.setItem("LocalData", JSON.stringify(data));

                        alert("Element ajouté avec succès");
                    });
                }else{
                    navigator.notification.alert('Code Scan Attendu: QR_CODE \n  Type de Code Scanné: '+result.format+'\nResultat reçu: '+result.text,null,'Erreur de format','Ok');
                }
            }
            else
            {
                 alert("Vous avez annulé le scan");
            }
        },
        function (error) {
            alert("Erreur de scan: " + error);
        }
   );
}
//----------Fin de la fonction de scan de l'application ------//