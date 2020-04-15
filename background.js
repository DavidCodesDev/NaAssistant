chrome.runtime.onInstalled.addListener(function(){
 
var characterArray;
var characterName;
var characterId;

var energyArray;
var greenEnergy = 'https://naruto-arena.net/images/energy/energy_0.gif';
var redEnergy = 'https://naruto-arena.net/images/energy/energy_1.gif';
var blueEnergy = 'https://naruto-arena.net/images/energy/energy_2.gif';
var whiteEnergy = 'https://naruto-arena.net/images/energy/energy_3.gif';
var randomEnergy = 'https://naruto-arena.net/images/energy/energy_4.gif';
var energyText = '';

var classesText;

var arrayOfCharacterObjects = [];

var helperCounter = 0;

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'naruto-arena.net'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      
        RetrieveAllCharacters();

})
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "refreshFunc") RetrieveAllCharacters();
  }
);


      function RetrieveAllCharacters(){ //hier halen we alle chars op
        //dit wordt gecalled door de knop in de ui
        chrome.storage.local.set({"refreshButtonState": false});

        arrayOfCharacterObjects = [];

      return $.ajax({
        url: 'https://naruto-arena.net/characters-and-skills',
        type: "GET",
        dataType: "html",
        success: function(data){
          characterArray = $(data).find(".description");
          characterArray.each(function(){
            helperCounter++;
            
            let characterName = $(this).find("h2").text().replace(/\s+/g, '-');
           

            $.ajax({
              
              url: 'https://naruto-arena.net/char/'+characterName,
              type: "GET",
              dataType: "html",
              success: function(data){
                helperCounter--;
                let characterObject = {};
                characterObject.name = characterName;
                
                energyArray = $(data).find(".fright").find("img");
                let energyText = '';

                let greenText = '0';
                let redText = '0';
                let blueText = '0';
                let whiteText = '0';

                energyArray.each(function(){ //dit is het binary gedeelte
                  switch ($(this).attr('src')) {
                    case greenEnergy:
                      greenText = '1';                    
                      break;
                    case redEnergy:
                      redText = '1'; 
                      break;
                    case blueEnergy:
                      blueText = '1'; 
                      break;
                    case whiteEnergy:
                      whiteText = '1'; 
                      break;
                    case randomEnergy:
                      break;
                    default:
                      break;
                  }
                energyText = greenText+redText+blueText+whiteText;
                characterObject.energy = energyText;
                })
                classesText = $(data).find(".info").text();
                characterObject.class = classesText;
                arrayOfCharacterObjects.push(characterObject);
                if(helperCounter === 0){
          
                  chrome.storage.local.set({"characterArray": arrayOfCharacterObjects});
console.log('test');
chrome.storage.local.set({"refreshButtonState": true});

chrome.runtime.sendMessage({msg: "youCanPopulateNow"});
chrome.runtime.sendMessage({msg: "enableButton"});


                }
            }
            })

      
        })
      }


      });
      }

})