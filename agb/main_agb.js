
function hide() {
    var status = document.getElementById(this.id + "_collapse").className;

    if (status == "collapse show") {
        document.getElementById(this.id + "_collapse").setAttribute("class", "collapse hide");

    }

    if (status != "collapse show") {
        document.getElementById(this.id + "_collapse").setAttribute("class", "collapse show");

    }
}


function change_lan(clicked_id) {

    container = document.getElementById("layout_container");


    var content = document.getElementById(clicked_id).innerHTML;
    mydata = myagb_de;

    if (content == "German") {
        mydata = myagb_de;
        document.getElementById("btn_en").className = "btn btn-light";
        document.getElementById("btn_de").className = "btn btn-light active";


    }

    if (content == "English") {
        mydata = myagb_en;
        document.getElementById("btn_de").className = "btn btn-light";
        document.getElementById("btn_en").className = "btn btn-light active";

    }


    var title_div = document.getElementById("title_div");
    var card_div = document.getElementsByClassName("card");

    length = card_div.length;

    for (var i = 0; i < length; i++) {
        num = card_div.length - 1;
        container.removeChild(card_div[num]);
    }

    container.removeChild(title_div);

    init();

}

function init() {

    createLayout();

    const queryString = window.location.search;
    var str = queryString;
    var lan = str.split("=");

    if (lan[1] == "en") {
        mydata = myagb_en;



    }

    if (lan[1] == "de") {
        mydata = myagb_de;



    }

    /*     var active_lan = document.getElementsByClassName("btn btn-light active");
    
    
        if (active_lan[0].innerHTML == "German") {
            mydata = myagb_de;
    
        }
    
        if (active_lan[0].innerHTML == "English") {
            mydata = myagb_en;
        }
     */

    var arr = mydata.chapter;


    createTitle(mydata.titel, mydata.subtitle, mydata.description);

    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var rising_column = i + 1;
        var length_par = obj.paragraph.length;
        createOneCard(rising_column + ". " + obj.titel, obj.paragraph, rising_column, length_par, rising_column);

    }

}



function createLayout() {




    var div_con = document.createElement("div");
    div_con.id = "layout_container";
    div_con.className = "container";
    div_con.setAttribute("style", "width:100%; height:auto;")

    document.body.appendChild(div_con);

}

function createTitle(title, subtitle, sub_par_text) {

    container = document.getElementById("layout_container");

    var div_title = document.createElement("div");
    div_title.id = "title_div";
    div_title.className = "jumbotron text-left";

    var title_name = document.createElement("h1");
    title_name.innerHTML = title;
    div_title.appendChild(title_name);

    var subtitle_name = document.createElement("p");
    subtitle_name.innerHTML = subtitle;
    div_title.appendChild(subtitle_name);

    var sub_par = document.createElement("p");
    sub_par.innerHTML = sub_par_text;
    div_title.appendChild(sub_par);

    container.appendChild(div_title);



}


function displayGerman() {



}

function createOneCard(titel, content, id, length_par, chapter_num) {
    var card_div = document.createElement("div");
    card_div.className = "card";

    var card_header = document.createElement("div");
    card_header.className = "card-header";
    card_div.appendChild(card_header);

    var button_heading = document.createElement("button");
    button_heading.className = "btn btn-link btn-block text-left";
    button_heading.setAttribute("style", "font-size:large");

    button_heading.innerHTML = titel;
    button_heading.setAttribute("id", id)
    button_heading.addEventListener("click", hide);
    card_header.appendChild(button_heading);

    var div_body = document.createElement("div");
    div_body.id = id + "_collapse";
    div_body.className = "collapse show";




    for (var i = 0; i < length_par; i++) {
        var obj = content[i];
        var rising_column = i + 1;
        var card_body = document.createElement("div");
        card_body.className = "card-body";
        card_body.innerHTML = chapter_num + "." + rising_column + ". " + obj.text;
        div_body.appendChild(card_body);

    }



    card_div.appendChild(div_body);

    container = document.getElementById("layout_container");

    container.appendChild(card_div);


}

