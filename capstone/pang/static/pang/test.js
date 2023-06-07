$(document).ready(function() {
  RADIUS_L1 = 150;
  RADIUS_L2 = 130;
  RADIUS_L3 = 100;

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
    for (var i = 0; i < $(".level1").length; i++) {
 
        // add click-event to each element
        $("#elem" + i).click(function (e) {
            // check if the element has children
            if (hasLevel2Children($(this).attr('id').match(/\d+/)[0]) === true) {
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
            } 
            else {
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
        console.log("Level1 : " +"#main", "#elem" + i, "#line" + i )
        if (hasLevel2Children(i)) {
            // prepare level 2 items, position them as if they were expanded so that the
            // lines can be drawn, right after this, they will get collapsed
            redrawLevel2(i, angle, true);
            // level 2 items are initially not hidden, so toggle will collapse those
            // elements
            toggle("elem" + i);

            // check if level 2 items have level 3 children and redraw level 3 if needed
            
        }
    }

    // loop through all level 2 elements
    for (var i = 0; i < $(".level1").length; i++) {
      for (var j = 0; j < $(".level2").length; j++ ){
        
        $("#elem" + i + "child" + j).click(function (e){
          var elemId = $(this).attr('id');
          var i = elemId.match(/\d+/)[0];
          var j = elemId.match(/\d+/)[1];
  
          if (hasLevel3Children(i, j) === true) {
              
            for (var j = 0 ; j < $(".level2").length ; j++) {
              if (!$("#elem" + i + "child" + j + "subchild0").hasClass("hiddenLevel3")){
                if (("elem" + i + "child" + j) !== $(this).attr('id'))
                    // toggle(elemId); // toggle("#elem" + i + "child" + j);
                    toggle("#elem" + i + "child" + j);
              }
            }
            toggle(elemId);
          }
          else{
            alert($(this).html());
          }
        });
  
        level1_x = $("#elem" + i).outerWidth() / 2;
        level1_y = $("#elem" + i).outerHeight() / 2;
        $("#elem" + i + "child" + j).css("left", centerx - RADIUS_L1 * Math.cos((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerWidth() / 2 + "px");
        $("#elem" + i + "child" + j).css("top", centery - RADIUS_L1 * Math.sin((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerHeight() / 2 + "px");
  
        angle2 = createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
        console.log("Level2 : " + "#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j)
        
        if (hasLevel3Children(i, j)) {
            // prepare level 2 items, position them as if they were expanded so that the
            // lines can be drawn, right after this, they will get collapsed
            redrawLevel3(i, j, angle2, true);
            // level 2 items are initially not hidden, so toggle will collapse those
            // elements
            toggle("elem" + i + "child" + j);
  
        }
    }
    
  }
}

// function initialize() {
//   // resize the container to fit the main elements width
//   $(".container").css("width", $("#main").outerWidth() + "px");
//   $(".container").css("height", $("#main").outerHeight() + "px");
  
//   // loop through all level 1 elements  
//   for (var i = 0; i < $(".level1").length; i++)
//   {
//     // add click-event to each element
//     $("#elem" + i).click(function(e) {
//       // check if the element has children
//       if ( hasLevel2Children($(this).attr('id').match(/\d+/)[0]) === true ) {
//         // if it does: first collapse all other elements
//         for (var i = 0; i < $(".level1").length; i++) {
//           // if a child is visible, then toggle -> collapse
//           if (!$("#elem" + i + "child0").hasClass("hiddenLevel2")) { 
//             // do nothing for this current element
//             console.log("elem" + i, $(this).attr('id'))
//             if ("elem" + i !== $(this).attr('id')) 
//               toggle("elem" + i);
//           }
//         }
//         // then toggle this element
//         toggle($(this).attr('id'));
//       } else {
//         // if it does not have children
//         alert($(this).html());
//       }
//     });


//     // put level 1 elements into a circular position relative to the main element
//     centerx = $("#main").outerWidth() / 2;
//     centery = $("#main").outerHeight() / 2;
//     $("#elem" + i).css("left", centerx - RADIUS_L1 * Math.cos((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerWidth() / 2 + "px");
//     $("#elem" + i).css("top", centery - RADIUS_L1 * Math.sin((i / $(".level1").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i).outerHeight() / 2 + "px");
    
//     angle = createLineFromTo("#main", "#elem" + i, "#line" + i);
//     if ( hasLevel2Children(i)) 
//     {
//       // prepare level 2 items, position them as if they were expanded
//       // so that the lines can be drawn, right after this, they will get collapsed
//       redrawLevel2(i, angle, true);
//       // level 2 items are initially not hidden, so toggle will collapse those elements
//       toggle("elem" + i);
//     }
//     for (var j = 0; j < $(".elem" + i + "child").length; j++){
//       // loop through all level 1 elements 
//       $("#elem" + i + "child" + j).click(function(e) {
//         i_3 = $(this).attr('id').match(/\d+/)[0];
//         j_3 = $(this).attr('id').match(/\d+$/)[0];
//         console.log(i_3, j_3, hasLevel3Children(i_3, j_3))
//         // check if the element has children
//         if ( hasLevel3Children(i_3, j_3) === true) {
//           for (var j = 0; j < $(".elem" + i_3 + "child").length; j++){
//             if (!$("#elem" + i_3 + "child" + j + "subchild").hasClass("hiddenLevel3")) { 
//               // do nothing for this current element
//               console.log("elem" + i_3 + "child" + j, $(this).attr('id'))
//               if ("elem" + i_3 + "child" + j == $(this).attr('id'))  
//                 toggle("elem" + i_3 + "child" + j);
//             }
//           }
//           toggle($(this).attr('id'));
//         } else {
//           // if it does not have children
//           alert($(this).html());
//         }
//       });
//       console.log("Out of for loop: ", i, j)
//       // put level 1 elements into a circular position relative to the main element
//       centerx = $("#main").outerWidth() / 2;
//       centery = $("#main").outerHeight() / 2;
//       $("#elem" + i + "child" + j).css(
//         "left", centerx - RADIUS_L1 * Math.cos((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i + "child" + j).outerWidth() / 2 + "px"
//       );
//       $("#elem" + i + "child" + j).css(
//         "top", centery - RADIUS_L1 * Math.sin((i / $(".level2").length) * 2 * Math.PI + Math.PI / 2) - $("#elem" + i + "child" + j).outerHeight() / 2 + "px"
//       );
      
//       angle = createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
//       console.log(i, j, hasLevel3Children(i, j))
//       if ( hasLevel3Children(i, j)) 
//       {
//         // prepare level 2 items, position them as if they were expanded
//         // so that the lines can be drawn, right after this, they will get collapsed
//         redrawLevel3(i, j, angle, true);
//         // level 2 items are initially not hidden, so toggle will collapse those elements
//         toggle("elem" + i + "child" + j);
//       }
//     }
//   } 
// }
    // createLineFromTo("#main", "#elem" + i, "#line" + i);
    function createLineFromTo(fromElem, toElem, lineId) {
      console.log("create: " + fromElem, toElem, lineId)
      fromTop = $(fromElem).offset().top + $(fromElem).outerHeight() / 2;
      fromLeft = $(fromElem).offset().left + $(fromElem).outerWidth() / 2;
      toTop = $(toElem).offset().top + $(toElem).outerHeight() / 2;
      toLeft = $(toElem).offset().left + $(toElem).outerWidth() / 2;
      theta = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
      //alert(theta / Math.PI * 180);
      
      if (!$(lineId).length) {
        $(fromElem).after("<div class='line lineFrom_" + $(fromElem).attr('id') + "' id='" + lineId.substring(1) + "'></div>");
      }
      $(lineId).css("width", Math.sqrt(Math.pow((fromTop - toTop), 2) + Math.pow((fromLeft - toLeft), 2)) + "px");
      $(lineId).css("left", (fromLeft - $(fromElem).offset().left) + "px");
      $(lineId).css("top", (fromTop - $(fromElem).offset().top) + "px");
      $(lineId).css("transform", "rotate(" + theta + "rad)");
      
      return theta;
    }
   

    function toggle(to) {
      if (to === "#main") {
          // toggle first level
          $(".level1").toggleClass("hiddenLevel1");
          $(".lineFrom_main").toggleClass("hiddenLine");
  
      } else if (to.startsWith("#elem") && !to.includes("child")) { // check if to starts with #elem and doesn't contain "child"
        
          // toggle second level
          $(".lineFrom_" + to).toggleClass("hiddenLine");
  
          var i = $("#" + to).attr('id').match(/\d+/)[0];
  
          if ($(".elem" + i + "child").hasClass("hiddenLevel2")) {
              // now expand layer 1 element
              $(".elem" + i + "child").removeClass("hiddenLevel2");
  
              var fromTop = $("#main").offset().top + $("#main").outerHeight() / 2;
              var fromLeft = $("#main").offset().left + $("#main").outerWidth() / 2;
              var toTop = $("#elem" + i).offset().top + $("#elem" + i).outerHeight() / 2;
              var toLeft = $("#elem" + i).offset().left + $("#elem" + i).outerWidth() / 2;
              var angle = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
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
          // elem{{ index }}child{{ s_index }} toggle thired level
  
          var i = $("#" + to).attr('id').match(/\d/)[0];
          var j = $("#" + to).attr('id').match(/\d/)[1];
          $(".lineFrom_" + to).toggleClass("hiddenLine");
  
          
  
          if ($(".elem" + i + "child" + j).hasClass("hiddenLevel3")) {
              $(".elem" + i + "child" + j).removeClass("hiddenLevel3");
  
              var fromTop = $("#elem" + i).offset().top + $("#elem" + i).outerHeight() / 2;
              var fromLeft = $("#elem" + i).offset().left + $("#elem" + i).outerWidth() / 2;
              var toTop = $("#elem" + i + "child" + j).offset().top + $("#elem" + i + "child" + j).outerHeight() / 2;
              var toLeft = $("#elem" + i + "child" + j).offset().left + $("#elem" + i + "child" + j).outerWidth() / 2;
              var angle = Math.PI - Math.atan2(toTop - fromTop, fromLeft - toLeft);
              
              redrawLevel3(i, j, angle, false);
  
          } else {
              for (var k = 0; k < $(".elem" + i + "child" + j + "subchild").length; k++) {
                  var xPos = parseFloat($("#elem" + i + "child" + j).css("left").slice(0, -2)) + $("#elem" + i + "child" + j).outerWidth() / 2;
                  var yPos = parseFloat($("#elem" + i + "child" + j).css("top").slice(0, -2)) + $("#elem" + i + "child" + j).outerHeight() / 2;
                  // set the right position
                  xPos -= $("#elem" + i + "child" + j + "subchild" + k).outerWidth() / 2;
                  yPos -= $("#elem" + i + "child" + j + "subchild" + k).outerHeight() / 2;
  
                  $(".elem" + i + "child" + j + "subchild").css("left", xPos + "px");
                  $(".elem" + i + "child" + j + "subchild").css("top", yPos + "px");
              }
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
                if (!$(this).hasClass("hiddenLevel2"))
                  alert($(this).html());
              });
              createLineFromTo("#elem" + i, "#elem" + i + "child" + j, "#line" + i + "child" + j);
            }
            
          j++;
          } while ($("#elem" + i + "child" + j).length !== 0); 
    }

  function hasLevel3Children(elemId, subId) {
      if ($(".level3").length === 0) 
          return false;

      for (var i = 0; i < $(".level3").length; i++) {
          if ($(".level3").eq(i).hasClass("elem" + elemId + "child" + subId)) 
              return true;
          }
      return false;
  }

  function redrawLevel3(i, s, angle, preparation) {
    var j = 0;
    angle = deg(angle);
    var parentElem = $("#elem" + i + "child" + s);
    // var subchildElements = $("#elem" + i + "child" + s + "subchild" + j);
    var subchildElements = parentElem.find(".elem" + i + "child" + s + "subchild");

    do {
        // put sub entry on the same position as its parent
        var subchildElem = subchildElements.eq(j);
        var xPos = parseFloat(parentElem).css("left").slice(0, -2) + parentElem.outerWidth() / 2;
        var yPos = parseFloat(parentElem.css("top").slice(0, -2)) + parentElem.outerHeight() / 2;
        var amount = $("#elem" + i + "child" ).length;
        var distance = 120 - amount * 3;
        xPos += Math.cos(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L3;
        yPos += Math.sin(rad(angle) + rad((amount - 1) * -distance / 2 + j * distance)) * RADIUS_L3;

        // set the right position
        xPos -= subchildElem.outerWidth() / 2;
        yPos -= subchildElem.outerHeight() / 2;
        subchildElem.css("left", xPos + "px");
        subchildElem.css("top", yPos + "px");

        if (preparation && !subchildElem.hasClass("hiddenLevel3")) {
          subchildElem.click(function () {
                // no click for hidden elements!
                    alert($(this).html());
                }
            );
            // createLineFromTo(
            //     "#elem" + i + "child" + s,
            //     "#elem" + i + "child" + s + "subchild" + j,
            //     "#line" + i + "child" + s + "subchild" + j
            // );
            createLineFromTo(parentElem, subchildElements, "#line" + i + "child" + s + "subchild" + j);
        }
        j++;
      }while (subchildElements.length > j);
    // } while (subchildElements.length !== 0);
  }

  function rad(degrees) {
    return degrees * Math.PI / 180;
  };
  function deg(radians) {
    return radians * 180 / Math.PI;
  };


});
