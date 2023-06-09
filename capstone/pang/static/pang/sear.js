var writeButton = document.getElementById('write');
var searchbox = document.getElementById('test');

writeButton.addEventListener('click',function(){
    if (searchbox.style.visibility == "hidden"){
        searchbox.style.visibility = "visible";
    }
    else{
        searchbox.style.visibility = "hidden";
    }
});

document.addEventListener("touchstart", function(){}, true);