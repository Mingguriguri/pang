RADIUS_L1 = 200;
RADIUS_L2 = 150;
  
// handle click on center element
$("#main").click(function() {
  // collapse all elements attached to a level 1 element
  for (var i = 0; i < $(".level1").length; i++) {
    // only if a child is visible, do a toggle = only collapse
    if (!$("#elem" + i + "child0").hasClass("hiddenLevel2"))
      toggle("elem" + i);
  }
  // collapse or expand all elements attached to the main element
  toggle("#main");
});
initialize();

function initialize() {
  // resize the container to fit the main elements width
  $(".container").css("width", $("#main").outerWidth() + "px");
  $(".container").css("height", $("#main").outerHeight() + "px");
  
  // loop through all level 1 elements  
  for (var i = 0; i < $(".level1").length; i++)
  {
    // add click-event to each element
    $("#elem" + i).click(function(e) {
      // check if the element has children
      if ( hasLevel2Children($(this).attr('id').match(/\d+/)[0]) === true ) {
        // if it does: first collapse all other elements
        for (var i = 0; i < $(".level1").length; i++) {
          // if a child is visible, then toggle -> collapse
          if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
            // do nothing for this current element
            console.log("elem" + i, $(this).attr('id'))
            if ("elem" + i !== $(this).attr('id')) 
              toggle("elem" + i);
          }
        }
        // then toggle this element
        toggle($(this).attr('id'));
      } else {
        // if it does not have children
        alert($(this).html());
      }
    });


    // put level 1 elements into a circular position relative to the main element
    centerx = $("#main").outerWidth() / 2;
    centery = $("#main").outerHeight() / 2;
    $("#elem" + i).css("left", centerx - RADIUS_L1 * Math.cos((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerWidth() / 2 + "px");
    $("#elem" + i).css("top", centery - RADIUS_L1 * Math.sin((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerHeight() / 2 + "px");
    
    angle = createLineFromTo("#main", "#elem" + i, "#line" + i);
    if ( hasLevel2Children(i)) 
    {
      // prepare level 2 items, position them as if they were expanded
      // so that the lines can be drawn, right after this, they will get collapsed
      redrawLevel2(i, angle, true);
      // level 2 items are initially not hidden, so toggle will collapse those elements
      toggle("elem" + i);
    }
    for (var j = 0; j < $(".elem" + i + "child").length; j++){
      // loop through all level 1 elements 
      $("#elem" + i + "child" + j).click(function(e) {
        i_3 = $(this).attr('id').match(/\d+/)[0];
        j_3 = $(this).attr('id').match(/\d+$/)[0];
        console.log(i_3, j_3, hasLevel3Children(i_3, j_3))
        // check if the element has children
        if ( hasLevel3Children(i_3, j_3) === true) {
          for (var j = 0; j < $(".elem" + i_3 + "child").length; j++){
            if (!$("#elem" + i_3 + "child" + j + "subchild").hasClass("hiddenLevel3")) { 
              // do nothing for this current element
              console.log("elem" + i_3 + "child" + j, $(this).attr('id'))
              if ("elem" + i_3 + "child" + j == $(this).attr('id'))  
                toggle("elem" + i_3 + "child" + j);
            }
          }
          toggle($(this).attr('id'));
        } else {
          // if it does not have children
          alert($(this).html());
        }
      });
      console.log("Out of for loop: ", i, j)
      // put level 1 elements into a circular position relative to the main element
      centerx = $("#main").outerWidth() / 2;
      centery = $("#main").outerHeight() / 2;
      $("#elem" + i + "child" + j).css(
        "left", centerx - RADIUS_L1 * Math.cos((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i + "child" + j).outerWidth() / 2 + "px"
      );
      $("#elem" + i + "child" + j).css(
        "top", centery - RADIUS_L1 * Math.sin((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i + "child" + j).outerHeight() / 2 + "px"
      );
      
      angle = createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
      console.log(i, j, hasLevel3Children(i, j))
      if ( hasLevel3Children(i, j)) 
      {
        // prepare level 2 items, position them as if they were expanded
        // so that the lines can be drawn, right after this, they will get collapsed
        redrawLevel3(i, j, angle, true);
        // level 2 items are initially not hidden, so toggle will collapse those elements
        toggle("elem" + i + "child" + j);
      }
    }
  }
} 

function hasLevel3Children(elemId, childId) {
  if ($(".level3").length === 0) return false;
  for (var i = 0; i < $(".level3").length; i++) {
    if ($(".level3").eq(i).hasClass("elem" + elemId + "child" + childId + "subchild"))
      return true;
  }
  return false;
}


function createLineFromTo(fromElem, toElem, lineId) {
    console.log("fromElem: ", fromElem, "toElem: ", toElem, "lineId: ", lineId)
  fromTop = $(fromElem).offset().top + $(fromElem).outerHeight() / 2;
  fromLeft = $(fromElem).offset().left + $(fromElem).outerWidth() / 2;
  toTop = $(toElem).offset().top + $(toElem).outerHeight() / 2;
  console.log("toTop", toTop)
  toLeft = $(toElem).offset().left + $(toElem).outerWidth() / 2;
  theta = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
  //alert(theta / Math.PI * 180);
  
  if (!$(lineId).length) {
    $(fromElem).after("<div class='line lineFrom_" + $(fromElem).attr('id') + "' id='" + lineId.substring(1) + "'></div>");
  }
  $(lineId).css("width", Math.sqrt(Math.pow((fromTop - toTop), 2) + Math.pow((fromLeft - toLeft), 2)) + "px");
    
  $(lineId).css("left", (fromLeft - $("#main").offset().left) + "px");
  $(lineId).css("top", (fromTop - $("#main").offset().top) + "px");
  $(lineId).css("transform", "rotate(" + theta + "rad)");
  
  
  return theta;
}
  
function toggle(to) {
  var regex = /^elem\d+$/;
  if (to === "#main") {
    // toggle first level
    console.log("level1: ", $("#main").hasClass("hiddenLevel1"))
    if ($("#main").hasClass("hiddenLevel1")){
      $(".level1").removeClass("hiddenLevel1");
    }
    else{
      $(".level1").toggleClass("hiddenLevel1");
    }
    //$(".level2").toggleClass("hiddenLevel2");
    //$(".level3").toggleClass("hiddenLevel3");
    $(".lineFrom_main").toggleClass("hiddenLine");
  }
  else if (regex.test(to)) {
    // toggle second level
    //$(".lineFrom_main").toggleClass("hiddenLine");
    //$(".level2").toggleClass("hiddenLevel2");
    $(".lineFrom_" + to).toggleClass("hiddenLine");

    console.log("First else if", to)
    var i = $("#" + to).attr('id').match(/\d+/)[0];

    console.log("Toggle else if: ", $(".elem" + i + "child").hasClass("hiddenLevel2"))
    if ($(".elem" + i + "child").hasClass("hiddenLevel2")) {
      // now expand layer 1 element
      
      $(".elem" + i + "child").removeClass("hiddenLevel2");
      //$(".elem" + i + "child" + ).removeClass("hiddenLevel3");
      fromTop = $("#main").offset().top + $("#main").outerHeight() / 2;
      fromLeft = $("#main").offset().left + $("#main").outerWidth() / 2;
      toTop = $("#elem" + i).offset().top + $("#elem" + i).outerHeight() / 2;
      toLeft = $("#elem" + i).offset().left + $("#elem" + i).outerWidth() / 2;
      angle = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
      redrawLevel2(i, angle, false);
      
      
    } else {
      // now collapse layer 1 element
      for (var j = 0; j < $(".elem" + i + "child").length; j++) {
        xPos = parseFloat($("#elem" + i).css("left").slice(0, -2)) + $("#elem" + i).outerWidth() / 2; 
        yPos = parseFloat($("#elem" + i).css("top").slice(0, -2)) + $("#elem" + i).outerHeight() / 2;
        //set the right position
        xPos -= $("#elem" + i + "child" + j).outerWidth() / 2;
        yPos -= $("#elem" + i + "child" + j).outerHeight() / 2;
      
        $(".elem" + i + "child").css("left", xPos + "px");
        $(".elem" + i + "child").css("top", yPos + "px");

      }
      $(".elem" + i + "child").addClass("hiddenLevel2");
      
    }
  }
  else {
    console.log("Last else", to)
    // toggle second level
    $(".lineFrom_" + to).toggleClass("hiddenLine");
    var i = $("#" + to).attr('id').match(/\d+/)[0];
    var j = $("#" + to).attr('id').match(/\d+$/)[0];
    //console.log("Toggle else: ", $(".elem" + i + "child" + j + "subchild").hasClass("hiddenLevel3"))
    console.log("Toggle else: ", $(".elem" + i + "child" + j + "subchild").length > 0)
    if ($(".elem" + i + "child" + j + "subchild").hasClass("hiddenLevel3")) {
    //if ($(".elem" + i + "child" + j + "subchild").length > 0) {
      // now expand layer 1 element
      $(".elem" + i + "child" + j + "subchild").removeClass("hiddenLevel3");
      fromTop = $("#elem" + i).offset().top + $("#elem" + i).outerHeight() / 2;
      fromLeft = $("#elem" + i).offset().left + $("#elem" + i).outerWidth() / 2;
      toTop = $("#elem" + i + "child" + j).offset().top + $("#elem" + i + "child" + j).outerHeight() / 2;
      toLeft = $("#elem" + i + "child" + j).offset().left + $("#elem" + i + "child" + j).outerWidth() / 2;
      angle = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
      redrawLevel3(i, j, angle, false);
      
      
    } else {
      $(".elem" + i + "child" + j + "subchild").addClass("hiddenLevel3");

    }
  }
}
  
function hasLevel2Children(elemId) {
  if ($(".level2").length === 0) return false;
  for (var i = 0; i < $(".level2").length; i++) {
    if ($(".level2").eq(i).hasClass("elem" + elemId + "child"))
      return true;
  }
  return false;
}
function redrawLevel2(i, angle, preparation) {
  var j = 0;
  angle = deg(angle);
  do {
    //put sub entry on same position as its parent
    xPos = parseFloat($("#elem" + i).css("left").slice(0, -2)) + $("#elem" + i).outerWidth() / 2; 
    yPos = parseFloat($("#elem" + i).css("top").slice(0, -2)) + $("#elem" + i).outerHeight() / 2;
    amount = $(".elem" + i + "child").length;
    distance = 46 - amount * 3;
    xPos += Math.cos(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L2;
    yPos += Math.sin(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L2;
    
    //set the right position
    xPos -= $("#elem" + i + "child" + j).outerWidth() / 2;
    yPos -= $("#elem" + i + "child" + j).outerHeight() / 2;
    $("#elem" + i + "child" + j).css("left", xPos + "px");
    $("#elem" + i + "child" + j).css("top", yPos + "px");
    
    if (preparation) {
      $("#elem" + i + "child" + j).click(function() {
        // no click for hidden elements!
        console.log("what is", $(this))
        if ($(this).hasClass("hiddenLevel3")){
          alert($(this).html());
        }
        else{
          toggle($(this).attr('id'));
        }
        
      });
      createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
    }
    
  j++;
  } while ($("#elem" + i + "child" + j).length !== 0); 
}


function redrawLevel3(i, j, angle, preparation) {
  var k = 0;
  angle = deg(angle);
  do {
    //put sub entry on same position as its parent
    xPos = parseFloat($("#elem" + i + "child" + j).css("left").slice(0, -2)) + $("#elem" + i + "child" + j).outerWidth() / 2; 
    yPos = parseFloat($("#elem" + i + "child" + j).css("top").slice(0, -2)) + $("#elem" + i + "child" + j).outerHeight() / 2;
    amount = $(".elem" + i + "child" + j + "subchild").length;
    distance = 46 - amount * 3;
    xPos += Math.cos(rad(angle) + rad((amount - 1) * -distance / 2 + k * distance)) * RADIUS_L2;
    yPos += Math.sin(rad(angle) + rad((amount - 1) * -distance / 2 + k * distance)) * RADIUS_L2;
    
    //set the right position
    xPos -= $("#elem" + i + "child" + j + "subchild" + k).outerWidth() / 2;
    yPos -= $("#elem" + i + "child" + j + "subchild" + k).outerHeight() / 2;
    $("#elem" + i + "child" + j + "subchild" + k).css("left", xPos + "px");
    $("#elem" + i + "child" + j + "subchild" + k).css("top", yPos + "px");
    
    if (preparation) {
      $("#elem" + i + "child" + j + "subchild" + k).click(function() {
        // no click for hidden elements!
        //if ($(this).hasClass("hiddenLevel3"))
        toggle($(this).attr('id'));
        //alert($(this).html());

      });
      createLineFromTo("#elem" + i + "child" + j, "#elem" + i + "child" + j + "subchild" + k, "#line" + i + "child" + j + "subchild" + k);
    }

    
  k++;
  } while ($("#elem" + i + "child" + j + "subchild" + k).length !== 0); 
}


function rad(degrees) {
  return degrees * Math.PI / 180;
};
function deg(radians) {
  return radians * 180 / Math.PI;
};



var scale = 1, panning = false, pointX = 0, pointY = 0, start = { x: 0, y: 0 }, zoom = document.getElementById("zoom");
var state = "0";
var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var centerX = screenWidth / 2;
var centerY = screenHeight / 2;
function setTransform() {
  zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  for (var i = 0; i < $(".level1").length; i++){
    var elem = document.querySelector("#elem" + i);
    var elem_dollar = $("#elem" + i);
    var elemWidth = elem_dollar.outerWidth();
    var elemHeight = elem_dollar.outerHeight();
    var elemX = elem_dollar.offset().left + elemWidth / 2;
    var elemY = elem_dollar.offset().top + elemHeight / 2;
    
    var distanceX = Math.abs(centerX - elemX);
    var distanceY = Math.abs(centerY - elemY);
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    let wi = elem.getBoundingClientRect().height;
    if (wi > 70 && distance < 200){
      //state = 1;
      //toggle("elem" + 2);
      if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
        // do nothing for this current element
        if ("elem" + i !== $(this).attr('id'))  
          toggle("elem" + i);
      }
      toggle("elem" + i);
    }
    else if (wi < 70){
      //state = 0;
      //toggle("elem" + 2);
      if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
        toggle("elem" + i);
      }
    }
    else if (distance > 200){
      if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
        toggle("elem" + i);
      }
    }

    for (var j = 0; j < $(".level2").length; j++) {
        var elem = document.querySelector("#elem" + i + "child" + j);
        var elem_dollar = $("#elem" + i) + "child" + j ;
        var elemWidth = elem_dollar.outerWidth();
        var elemHeight = elem_dollar.outerHeight();
        var elemX = elem_dollar.offset().left + elemWidth / 2;
        var elemY = elem_dollar.offset().top + elemHeight / 2;
        
        var distanceX = Math.abs(centerX - elemX);
        var distanceY = Math.abs(centerY - elemY);
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        let wi = elem.getBoundingClientRect().height;
        if (wi > 70 && distance < 200){
        //state = 1;
        //toggle("elem" + 2);
        if (!$("#elem" + i + "child" + j + "subchild0").hasClass("hiddenLevel3")) { 
            // do nothing for this current element
            if ("elem" + i + "child" + j !== $(this).attr('id'))  
            toggle("elem" + i + "child" + j );
        }
        toggle("elem" + i + "child" + j );
        }
        else if (wi < 70){
        //state = 0;
        //toggle("elem" + 2);
        if (!$("#elem" + i + "child" + j + "subchild0").hasClass("hiddenLevel3")) { 
            toggle("elem" + i + "child" + j );
        }
        }
        else if (distance > 200){
        if (!$("#elem" + i + "child" + j +"subchid0").hasClass("hiddenLevel3")) { 
            toggle("elem" + i + "child" + j );
        }
        }
    }
  }
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
}

zoom.onmouseup = function (e) {
  panning = false;
}

zoom.onmousemove = function (e) {
  e.preventDefault();
  if (!panning) {
    return;
  }
  pointX = (e.clientX - start.x);
  pointY = (e.clientY - start.y);
  setTransform();
}

zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
  (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;

  setTransform();
}