"use strict";
window.addEventListener("load", function () {
    DisplayCollection();
})

function DisplayCollection() {
    var div = document.getElementById("display");

    //ajax request to fill out display div
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            console.log(response);
            var responseArray = response.split("|");//splites response 
            for (var i = 0; i < responseArray.length - 3; i = i + 3) {//foreach 3 strings in string array
                (function () {
                    if (responseArray[i] != undefined) {
                        var tableid = responseArray[i];//first string in group of 3
                        var cardName = responseArray[i + 1];//second string in group of 3
                        var cardImage = responseArray[i + 2] + "&type=card";//third string in group of 3

                        console.log(responseArray[i]);
                        console.log(responseArray[i + 1]);
                        console.log(responseArray[i + 2]);

                        var cardGrid = document.createElement("div");//create div to contain image
                        cardGrid.setAttribute("class", "col-md-2");//bootstrap class for formatting
                        cardGrid.id = tableid;

                        var img = document.createElement("img");//image of card
                        img.alt = cardName;
                        img.src = cardImage;
                        img.width = "200";//standardize image widths

                        div.appendChild(cardGrid);//add bootstrap div to display
                        cardGrid.appendChild(img);//add image to bootstrap div
                        var lineBreak = document.createElement("br");
                        div.appendChild(lineBreak);
                        //When image is clicked coresponding card is removed from db
                        img.addEventListener("click", function () {
                            removeFromCollection(tableid);
                            console.log(tableid);
                        });
                    }
                }());
            }
        }
    };
    xmlhttp.open("GET", "getCollection.php", true);//searching collection not currently implemented
    xmlhttp.send();
}

function removeFromCollection(tableid) {//remove card from collection with tableid
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    var queryString = "tableid=" + tableid;
    xmlhttp.open("GET", "delete.php?" + queryString, true);
    xmlhttp.send();
    console.log(tableid);
    document.getElementById(tableid).remove();

}