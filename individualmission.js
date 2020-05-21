$(document).ready(function(){
var missions;
    $.getJSON(chrome.extension.getURL('missionpaths.json'), function(data){
        missions = data;


        x = missions.filter(x=> x.missionName == $('h2').html().replace(/\s+/g, '-'));

    console.log(x);

    $('.pt10:eq(1)').append("<br>")
    $('.pt10:eq(1)').append("<p>Recommended teams:</p>")


    for (let i = 0; i < x[0].team.length; i++) {
        $('.pt10:eq(1)').append("<br>")

        for (let j = 0; j < x[0].team[i].length; j++) {
            var img = $('<img style="width:20%; margin:4px; border:2px solid #000;">'); //Equivalent: $(document.createElement('img'))
img.attr('src', "https://naruto-arena.net/uploads/characters/"+x[0].team[i][j]+"/large.jpg");
img.appendTo('.pt10:eq(1)');
    
            
        }
    }
        
    })
})
