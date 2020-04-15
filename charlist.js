var characterCard = document.getElementsByClassName("description");
$(".description").wrapAll(`<ul id="myUl" style="list-style: none;"></ul>`);
$(".description").each(function(){
    $(this).wrap("<li></li>");
})

var allCharsInArray;
var showableChars = [];

$(document).ready(function(){
    chrome.storage.local.get("characterArray", callback);

function callback(result){
    allCharsInArray = result.characterArray;
}
})

$("#myUl").parent().prepend(`<input type="checkbox" id="random"><img src="https://naruto-arena.net/images/energy/energy_4.gif"><br>`);
$("#myUl").parent().prepend(`<input type="checkbox" id="white"><img src="https://naruto-arena.net/images/energy/energy_3.gif"><br>`);
$("#myUl").parent().prepend(`<input type="checkbox" id="blue"><img src="https://naruto-arena.net/images/energy/energy_2.gif"><br>`);
$("#myUl").parent().prepend(`<input type="checkbox" id="red"><img src="https://naruto-arena.net/images/energy/energy_1.gif"><br>`);
$("#myUl").parent().prepend(`<input type="checkbox" id="green"><img src="https://naruto-arena.net/images/energy/energy_0.gif"><br>`);

$("#myUl").parent().prepend(`<input type="text" id="searchInput" placeholder="Search for names.."><br>`);

document.getElementById("searchInput").addEventListener('keyup', myFunction);

var greenVal = '0';
var redVal = '0';
var blueVal = '0';
var whiteVal = '0';
var randomVal = '0';
var totalVal = '';
$(document).ready(function(){

    ul = document.getElementById("myUl");
    li = ul.getElementsByTagName('li');

    $(":checkbox").change(function(){
showableChars = [];
        switch (this.id) {
            case "green":
                if(this.checked){
                    document.getElementById("random").checked = false;
                    randomVal = '0';
                    greenVal = '1';
                }
                else{
                    greenVal = '0';
                }
            break;
            case "red":
                if(this.checked){
                    document.getElementById("random").checked = false;
                    randomVal = '0';
                    redVal = '1';
                }
                else{
                    redVal = '0';
                }
            break;
            case "blue":
                if(this.checked){
                    document.getElementById("random").checked = false;
                    randomVal = '0';
                    blueVal = '1';
                }
                else{
                    blueVal = '0';
                }
            break;
            case "white":
                if(this.checked){
                    document.getElementById("random").checked = false;
                    randomVal = '0';
                    whiteVal = '1';
                }
                else{
                    whiteVal = '0';
                }
            break;
            case "random":
                if(this.checked){
                    randomVal = '1';
                    greenVal = '0';
                    redVal = '0';
                    blueVal = '0';
                    whiteVal = '0';
                    document.getElementById("green").checked = false;
                    document.getElementById("red").checked = false;
                    document.getElementById("blue").checked = false;
                    document.getElementById("white").checked = false;
                }
                else{
                    randomVal = '0';
                    greenVal = '';
                    redVal = '';
                    blueVal = '';
                    whiteVal = '';
                    
                }
            break;
            default:
                break;
        }
        totalVal = greenVal+redVal+blueVal+whiteVal;
        if(totalVal == '' || (totalVal == "0000" && randomVal == '0')){//laat iedereen zien
            for (let x = 0; x < li.length; x++) {
                li[x].style.display = "";
            }
            greenVal = '0';
            redVal = '0';
            blueVal = '0';
            whiteVal = '0';
            return;
        }

       //aan het eind van de checkbox klik zoeken we naar kandidaten
      for (let index = 0; index < allCharsInArray.length; index++) {
          if(allCharsInArray[index].energy == totalVal){
              showableChars.push(allCharsInArray[index].name.replace(/-/g, ' '));
          }   
      }
      for (let i = 0; i < li.length; i++) {
         if(showableChars.includes(li[i].getElementsByTagName("h2")[0].textContent)){
           li[i].style.display = "";
        
         }
         else{
           li[i].style.display = "none";
         }        
     }
    });   
});


function myFunction() {
    
    var input, inputValue, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    inputValue = input.value.toUpperCase();
    ul = document.getElementById("myUl");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h2")[0];
      txtValue = a.textContent;
      if (txtValue.toUpperCase().indexOf(inputValue) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

