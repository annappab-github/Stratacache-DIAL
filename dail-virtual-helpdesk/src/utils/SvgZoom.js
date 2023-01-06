export function zoomPan(eventid, action) {
    const svgContainer = document.getElementById(eventid);
    var viewBox = {
        x: 0,
        y: 0,
        w: 1027,
        h: 394
    };
    const svgSize = {
        w: viewBox.w,
        h: viewBox.h
    };
    var scale = 1;

    svgContainer.onmousewheel = function(e) {
      e.preventDefault();
      var w = viewBox.w;
      var h = viewBox.h;
      var mx = e.offsetX; //mouse x  
      var my = e.offsetY;
      var dw = w * Math.sign(e.deltaY) * 0.05;
      var dh = h * Math.sign(e.deltaY) * 0.05;
      var dx = dw * mx / svgSize.w;
      var dy = dh * my / svgSize.h;
      let viewBox_w = viewBox.w - dw

      scale = svgSize.w / viewBox_w;
      let scaleRound = `${Math.round(scale*100)/100}`;
      if(scaleRound > 0.9 && scaleRound < 2) {
        viewBox = {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w - dw,
          h: viewBox.h - dh
        };
        svgContainer.style.transform = `scale(${scaleRound})`
      }
    }

    var myPointers = [];
    var lastDif = -1;

    function myPointerDown(evt) {
        myPointers.push(evt);
        this.setPointerCapture(evt.pointerId);
    }

    //check for a pinch using only the first two touchpoints
    function myPointerMove(evt) {
        evt.preventDefault();
        // Update pointer position.
        for (var i = 0; i < myPointers.length; i++) {
            if (evt.pointerId == myPointers[i].pointerId) {
                myPointers[i] = evt;
                break;
            }
        }
        if (myPointers.length == 2) {
            // Detect pinch gesture.
            var w = viewBox.w;
            var h = viewBox.h;
            var mx = myPointers[0].clientX; //mouse x  
            var my = myPointers[0].clientY;
            var curDif = Math.abs(myPointers[0].clientX - myPointers[1].clientX);
            if (lastDif > 0) {
                if (curDif > lastDif) {
                    var dw = w * Math.sign(100) * 0.02;
                    var dh = h * Math.sign(100) * 0.02;
                    var dx = dw * mx / svgSize.w;
                    var dy = dh * my / svgSize.h;
                    let viewBox_w = viewBox.w - dw

                    scale = svgSize.w / viewBox_w;
                    let scaleRound = `${Math.round(scale*100)/100}`;
                    if (scaleRound > 0.2 && scaleRound < 2) {
                        viewBox = {
                            x: viewBox.x + dx,
                            y: viewBox.y + dy,
                            w: viewBox.w - dw,
                            h: viewBox.h - dh
                        };
                        svgContainer.style.transform = `scale(${scaleRound})`
                    }
                }
                if (curDif < lastDif) {
                    var dw = w * Math.sign(-100) * 0.02;
                    var dh = h * Math.sign(-100) * 0.02;
                    var dx = dw * mx / svgSize.w;
                    var dy = dh * my / svgSize.h;
                    let viewBox_w = viewBox.w - dw

                    scale = svgSize.w / viewBox_w;
                    let scaleRound = `${Math.round(scale*100)/100}`;
                    if (scaleRound > 0.9 && scaleRound < 2) {
                        viewBox = {
                            x: viewBox.x + dx,
                            y: viewBox.y + dy,
                            w: viewBox.w - dw,
                            h: viewBox.h - dh
                        };
                        svgContainer.style.transform = `scale(${scaleRound})`
                    }
                }
            }
            lastDif = curDif;
        }
    }

    function myPointerUp(evt) {
        // Remove pointer from array
        for (var i = 0; i < myPointers.length; i++) {
            if (myPointers[i].pointerId == evt.pointerId) {
                myPointers.splice(i, 1);
                break;
            }
        }
        if (myPointers.length < 2) {
            lastDif = -1;
        }
    }

    if (action) {
        svgContainer.addEventListener("pointerdown", myPointerDown, true);
        svgContainer.addEventListener("pointermove", myPointerMove, true);
        svgContainer.addEventListener("pointerup", myPointerUp, true);
        svgContainer.addEventListener("pointercancel", myPointerUp, true);
    } else {
        svgContainer.removeEventListener("pointerdown", myPointerDown, true);
        svgContainer.removeEventListener("pointermove", myPointerMove, true);
        svgContainer.removeEventListener("pointerup", myPointerUp, true);
        svgContainer.removeEventListener("pointercancel", myPointerUp, true);
    }
}