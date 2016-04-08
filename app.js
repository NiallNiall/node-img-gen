var fs = require('fs');


var dirName = 'rndrs/'

function makeAndDraw(nmbr){

      var Canvas = require('canvas')
      , Image = Canvas.Image
      , canvas = new Canvas(200, 200)
      , ctx = canvas.getContext('2d');

      circDraw = canvas.getContext('2d');


      var rndRad = Math.random() * 100;

    circDraw.fillStyle="#112233";
    circDraw.beginPath();
    circDraw.arc(100,100,rndRad,0,2*Math.PI);
    circDraw.fill();

    ctx.fillStyle="#000000";
    ctx.font = '14px Courier';
    ctx.textAlign="right";
    ctx.fillText(nmbr + '', 175, 175);

    fs.writeFile(dirName + nmbr + '.png', canvas.toBuffer());
}

// console.log('<img src="' + canvas.toDataURL() + '" />');


var loopCount = 0;


function loop()
{
var lcString = loopCount.toString();

  makeAndDraw(loopCount);
  // fs.writeFile(lcString, "Hey there!", function(err) {
      // if(err) {
      //     return console.log(err);
      // }
      console.log("The file was saved!");
      loopCount +=1;
  // });
   setTimeout(loop, 1000);
}

loop();
//
//
//
//
// //
// // var fs = require('fs');
// // fs.writeFile("hi", "Hey there!", function(err) {
// //     if(err) {
// //         return console.log(err);
// //     }
// //
// //     console.log("The file was saved!");
// // });
