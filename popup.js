let dropDown = document.getElementById('getData');

var chosenChar;
var allCharsInArray;

var loadedFirstTime = false;

chrome.storage.local.get("loadedFirstTime", function(e){
  if(e.loadedFirstTime == true){
  chrome.storage.local.get("characterArray", PopulateBox)
  }
})


window.onload = function(){

  chrome.storage.local.set({"loadedFirstTime": true});

  chrome.storage.local.get("refreshButtonState", function(e){
  if(e.refreshButtonState == true){
    $("#refresh").prop('disabled',false);
  }
  if (e.refreshButtonState == false)
  
  {
    $("#refresh").prop('disabled',true);

  }
  })


chrome.storage.local.get("chosenChar", function(e){
  if(e != undefined){
  GetSavedChar(e);
  }
});
}

function PopulateBox(result){
  loadedFirstTime = true;
  allCharsInArray = result.characterArray;
  
  for (let index = 0; index < allCharsInArray.length; index++) {
    var option = allCharsInArray[index].name;
    var element = document.createElement("option");
    element.textContent = option;
    element.value = option;
    dropDown.appendChild(element);
    
  }

}

dropDown.addEventListener('change', (e) =>{
  $.ajax({
              
    url: 'https://naruto-arena.net/char/'+e.target.value,
    type: "GET",
    dataType: "html",
    success: function(data){
      chosenChar = e.target.value;

      chrome.storage.local.set({"chosenChar": chosenChar});

      var characterData = $(data).find(".description").parent();
      $(".characterDescription").empty();

      $(".characterDescription").append(characterData);
      
  }
  })

})

function GetSavedChar(e){
  $.ajax({
              
    url: 'https://naruto-arena.net/char/'+e.chosenChar,
    type: "GET",
    dataType: "html",
    success: function(data){
      chosenChar = e;

      var characterData = $(data).find(".description").parent();
      $(".characterDescription").empty();
      $(".characterDescription").append(characterData);

  }
  })
}

$("#refresh").click(function(){
  $(this).prop('disabled',true);
  chrome.runtime.sendMessage({msg: "refreshFunc"});
  chrome.storage.local.set({"refreshButtonState": false});
})

function TurnBackOnButton(){
  $("#refresh").prop('disabled',false);

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "enableButton") TurnBackOnButton();
  }
);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "youCanPopulateNow") chrome.storage.local.get("characterArray", PopulateBox);
      
  }
);

