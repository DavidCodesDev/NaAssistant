(function(){
let dropDown = document.getElementById('getData');
var chosenChar;
var allCharsInArray;
var loadedFirstTime = false;
var helperCounter = 0;

chrome.storage.local.get("loadedFirstTime", function(e){
  if(e.loadedFirstTime == true){
    chrome.storage.local.set({"loadedFirstTime": true});

  chrome.storage.local.get("characterArray", PopulateBox)
  }
})

$(document).ready(function(){
  $("#getData").select2();
})

window.onload = function(){
  chrome.storage.local.get("characterArray", PopulateBox)

  chrome.storage.local.get("refreshButtonState", function(e){
  if(e.refreshButtonState == true){
    console.log('enable button');

    $("#refresh").prop('disabled',false);
  }
  if (e.refreshButtonState == false)
  {
    console.log('disable button');
    $("#refresh").prop('disabled',true);
  }
  })
  
  $(document).ready(function(){
    $('body').on('click', 'a', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });
 });

chrome.storage.local.get("chosenChar", function(e){
  if(e != undefined){
  GetSavedChar(e);
  }
});
}

chrome.storage.local.get("missionProgress", function(e){
  if(e != undefined){
    PopulateMissions(e);
  }
});
function ShowIcon() {
  var gif = $('.loading');
  $(gif).each(function(){
    $(this).css("display","block");
  })
} 

function HideIcon() {
  var gif = $('.loading');
  $(gif).each(function(){
    $(this).css("display","none");
  })
}
function PopulateBox(result){
HideIcon();
  loadedFirstTime = true;
  allCharsInArray = result.characterArray;
  $("#getData").empty();
  for (let index = 0; index < allCharsInArray.length; index++) {
    var option = allCharsInArray[index].name.replace(/-/g, ' ');
    var element = document.createElement("option");
    element.textContent = option;
    element.value = option;
    dropDown.appendChild(element); 
  }
}
function PopulateMissions(result){
  HideIcon();
  allMissionsInArray = result.missionProgress;
  $(".missionInfo").empty();
  for (let index = 0; index < allMissionsInArray.length; index++) {
    $(".missionInfo").append(
      "<br><a href="+allMissionsInArray[index].link+">"+allMissionsInArray[index].name+"</a><br><progress max= 100 value="+(allMissionsInArray[index].progress.toString())+">"
    )    
  }
}

$("#getData").on('select2:select', (e) =>{
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
  //$(this).prop('disabled',true);
  console.log("has to refresh characters now");
  ShowIcon();
  chrome.runtime.sendMessage({msg: "refreshFunc"});
  //chrome.storage.local.set({"refreshButtonState": false});
})

function TurnBackOnButton(){
  $("#refresh").prop('disabled',false);
}
function TurnBackOnButtonMission(){
  $(".getMissions").prop('disabled',false);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "enableButton") TurnBackOnButton();
  }
);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "enableButtonMission") TurnBackOnButtonMission();
  }
);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "youCanPopulateNow") chrome.storage.local.get("characterArray", PopulateBox);
      
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "youCanPopulateMissionsNow") chrome.storage.local.get("missionProgress", PopulateMissions);
      
  }
);
$(".tabClass").click(function(){
  var buttonText = $(this).text();
  $(".tabcontent").each(function(index){
    $(this).hide();
  })
  $("#"+buttonText).show();
})


$(".getMissions").click(function(){
  //chrome.storage.local.set({"missionButtonState": false});
  //$(".getMissions").prop('disabled',true);
  ShowIcon();
  console.log("has to refresh mission now");
  chrome.runtime.sendMessage({msg: "refreshMission"});

})

})();