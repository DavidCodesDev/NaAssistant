
var urlPrefix = 'https://naruto-arena.net/ninja-missions/';

//maak alle missie plaatje klikbaar
$(".padding").each(function(index){
    $(this).children('img').wrap($("<a>").attr("href", urlPrefix+$('h5').eq(index).html().replace(/\s+/g, '-')));
})


//maak alle texts klikbaar
$(".error").each(function(){
    var currentErrorClass = $(this);
    var reqArray = $(this).html().split(',');
    $.each(reqArray, function (index,value){
        
        $("<a href="+urlPrefix+value.replace(/\s+/g, '-')+` class="error">`+value+"</a><br>").insertBefore(currentErrorClass.parent().children('.nothing'));
    })
    $(this).remove();

})
