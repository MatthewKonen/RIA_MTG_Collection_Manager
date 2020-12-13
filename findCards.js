"use strict";

window.addEventListener("load", function () {
    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function () {
        SearchForm();
    });
});

function SearchForm() {//get search parameters
    var name = document.getElementById("nameField").value;
    var cost = document.getElementById("costField").value;
    var colors = "";
    var divider;

    //switch bewteen AND and OR operators for dividor of colors
    if (document.getElementById("andRad").checked) {
        divider = ","
    }
    else {
        divider = "|"
    }
    if (document.getElementById("wBox").checked) {
        colors += "White";
        colors += divider;
    }
    if (document.getElementById("uBox").checked) {
        colors += "Blue";
        colors += divider;
    }
    if (document.getElementById("bBox").checked) {
        colors += "Black";
        colors += divider;
    }
    if (document.getElementById("rBox").checked) {
        colors += "Red";
        colors += divider;
    }
    if (document.getElementById("gBox").checked) {
        colors += "Green";
        colors += divider;
    }
    colors = colors.slice(0, -1);//remove unneeded divider
    var type = document.getElementById("typeField").value;
    var subtype = document.getElementById("subtypeField").value;
    var abilities = document.getElementById("abilitiesField").value;

    var pow = document.getElementById("powField").value;
    var tou = document.getElementById("touField").value;



    var div = document.getElementById("display");
    div.innerHTML = '';//clear div

    var url = "https://api.magicthegathering.io/v1/cards?name=" + name + "&colors=" + colors + "&type=" + type + "&subtype=" + subtype + "&text=" + abilities + "&cmc=" + cost + "&power=" + pow + "&toughness=" + tou;

    console.log(url);
    var jsonObj = JSON.parse(Get(url));//get json from api call
    console.log(jsonObj.cards.length + " Results");
    for (var i = 0; i < jsonObj.cards.length; i++) {
        (function () {
            //if card lacks image url or multiverse id, skip it
            if (jsonObj.cards[i].hasOwnProperty("imageUrl") && jsonObj.cards[i].hasOwnProperty("multiverseid")) {
                var cardImage = jsonObj.cards[i].imageUrl;
                var cardName = jsonObj.cards[i].name;
                var cardId = jsonObj.cards[i].multiverseid;

                var cardGrid = document.createElement("div");
                cardGrid.setAttribute("class", "col-md-2");

                var img = document.createElement("img");
                img.alt = cardName;
                img.src = cardImage;
                img.width = "200";

                div.appendChild(cardGrid);
                cardGrid.appendChild(img);
                var lineBreak = document.createElement("br");
                div.appendChild(lineBreak);

                img.addEventListener("click", function () {
                    //add card to database on click
                    addToCollection(cardId, cardImage, cardName);

                    console.log(cardId);
                    console.log(cardName);
                });
            }
            else {
                console.log("Card lacks image or multiverse ID");
            }
        }());
    }

}

function Get(url) {//call api url, return json
    var xmlhttp = new XMLHttpRequest(); //request
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function addToCollection(cardId, cardImage, cardName) {//add card to collection
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    var queryString = "cardid=" + cardId + "&cardImage=" + cardImage + "&cardName=" + cardName;
    xmlhttp.open("GET", "insert.php?" + queryString, true);
    xmlhttp.send();

}