
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
   mydata=mydata_de;

   if (content == "German"){
    mydata=mydata_de;
    document.getElementById("btn_en").className = "btn btn-light";
    document.getElementById("btn_de").className = "btn btn-light active";


} 

if (content == "English"){
    mydata=mydata_en;
    document.getElementById("btn_de").className = "btn btn-light";
    document.getElementById("btn_en").className = "btn btn-light active";

}


var title_div = document.getElementById("title_div");
var card_div = document.getElementsByClassName("card");

length = card_div.length;

for (var i = 0; i < length; i++){
    num = card_div.length -1;
    container.removeChild(card_div[num]);    
}

container.removeChild(title_div);

init ();

}

function createTabTitle (content){
    var div_title = document.createElement("title");
    div_title.textContent = content;
    document.body.appendChild(div_title);
}

function init () {

    createLayout();

    const queryString = window.location.search;
    var str = queryString;
    var lan = str.split("=");



    if (lan[1] == "en") {
        createTabTitle ("Sudoku Collection - Privacy Policy");
    }
   else if (lan[1] == "de") {
        createTabTitle ("Sudoku Collection - Datenschutzerklärung");
    } else{
        lan[1] = "de";
        createTabTitle ("Sudoku Collection - Datenschutzerklärung");
    }


    fetch("content_" + lan[1] + ".json")
    .then(response => {
        return response.json();
    })
    .then(mydata => {
        var arr = mydata.chapter;
        createTitle(mydata.titel, mydata.paragraph, "Version: " + mydata.version);
    
        for (var i = 0; i < arr.length; i++){
            var obj = arr[i];
            var rising_column = i +1;
            createOneCard(rising_column + ". " + obj.titel, obj.paragraph, rising_column, mydata);
    
        }
    }

    );

    

}

function createLayout (){

  

    
    var div_con = document.createElement("div");
    div_con.id = "layout_container";
    div_con.className = "container";
    div_con.setAttribute("style", "width:100%; height:auto;")

    document.body.appendChild(div_con);

}

function createTitle(title, subtitle, sub_par_text){

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

    var sub_par= document.createElement("p");
    sub_par.innerHTML = sub_par_text;
    div_title.appendChild(sub_par);

    container.appendChild(div_title);

    

}


function displayGerman() {



}

function createOneCard(titel, content, id, fullJson) {
    var card_div = document.createElement("div");
    card_div.className = "card";

    var card_header = document.createElement("div");
    card_header.className = "card-header";
    card_div.appendChild(card_header);

    var button_heading = document.createElement("button");
    button_heading.className = "btn btn-link btn-block text-left";
    button_heading.setAttribute("style", "font-size:large");

    button_heading.innerHTML = titel;
    button_heading.setAttribute("id" , id)
    button_heading.addEventListener("click", hide);
    card_header.appendChild(button_heading);

    var div_body = document.createElement("div");
    div_body.id = id+ "_collapse";
    div_body.className= "collapse show";

    var card_body = document.createElement("div");
    card_body.className = "card-body";

    var replaced = content.replaceAll("\n"," <br> ");

    var regexp = /\$\(LINK_\d+\)/g;

    if(replaced.match(regexp)){

        var matches_array = replaced.match(regexp)

        var regexnumber = /\d+/g

        for (let index = 0; index < matches_array.length; index++) {
            const element = matches_array[index];

            var match_number = element.match(regexnumber);

            var completelink = buildHyperLink(match_number, fullJson);

            replaced = replaced.replaceAll("$(LINK_" + match_number+ ")", completelink);
            
        }

    }

    card_body.innerHTML = replaced;
    div_body.appendChild(card_body);

    card_div.appendChild(div_body);

    container = document.getElementById("layout_container");

    container.appendChild(card_div);


}


function buildHyperLink(num, fulljson){

   
        var arr = fulljson.links;

        var complete_link = "<a href=" + arr[num].href + " target=&quot;" + arr[num].target + " &quot;>" + arr[num].titel + "</a>";

        
        return complete_link;

  


}

