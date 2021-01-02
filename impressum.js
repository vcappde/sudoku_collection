

function init() {


    const queryString = window.location.search;
    var str = queryString;
    var lan = str.split("=");

    if (lan[1] == "en") {
        createTabTitle("Sudoku Collection - Legal Notice");
    } else if (lan[1] == "de") {
        createTabTitle("Sudoku Collection - Impressum");
    } else {
        lan[1] = "de"
    }


    fetch("impressum_" + lan[1] + ".json")
        .then(response => {
            return response.json();
        })
        .then(datade => {
            createLayout(datade)
        }

        );





}

function createTabTitle(content) {
    var div_title = document.createElement("title");
    div_title.textContent = content;
    document.body.appendChild(div_title);
}


function createLayout(content) {

    var div = document.createElement("div");
    div.id = "div_id";
    document.body.appendChild(div);


    var title = document.createElement("h1");
    title.textContent = content.titel;
    div.appendChild(title);

    var subtitle = document.createElement("h2");
    subtitle.textContent = content.subtitle;
    div.appendChild(subtitle);





    var arr = content.chapter;


    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var rising_column = i;
        createOneItem(obj, rising_column, div);
        var br = document.createElement("br");

        div.appendChild(br);


    }




}

function createOneItem(obj, rising_column, div) {

    var adress = document.createElement("adress");
    var adress_id = "adress_" + rising_column;
    adress.id = adress_id;
    var strong = document.createElement("strong");
    strong.textContent = obj.titel;

    var arr = obj.paragraph;
    adress.appendChild(strong);


    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        createOnePar(obj.text, adress);

    }

    div.appendChild(adress);

}

function createOnePar(line, object) {
    var lineel = document.createElement("p");
    lineel.innerHTML = line;
    object.appendChild(lineel);
}

