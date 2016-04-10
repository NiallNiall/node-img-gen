var paper = require('paper');
var path = require('path');
var fs = require('fs');

var loopCount = 0;


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


function makeSvg(loopCount){

    with (paper) {


        function saveCanvasToPNGFile(filename, callback)
        {
            filename += ".png";
            var fullpath = __dirname + '/img2/'+filename;

            // Saving the canvas to a file.
            out = fs.createWriteStream(fullpath);
            stream = paper.view.element.pngStream();

            stream.on('data', function(chunk) {
                out.write(chunk);
            });

            stream.on('end', function() {
                console.log('saved png '+filename);
                callback( fullpath, filename );
            });

        }

            paper.setup(new Size(300, 300));


    
            function makeBackground(){
                var bgShape = new paper.Path.Rectangle(new paper.Point(0, 0), new paper.Point(paper.view.bounds.width, paper.view.bounds.height));
                bgShape.fillColor = paper.Color.random();
            }


            function makeCircle(circleCenter, circleWidth){

                var color1 = paper.Color.random();

                for(var j=circleWidth;j>10;j-=10){
                    var circle = new paper.Path.Circle(circleCenter, j);

                    var color2 = new paper.Color(0, 1, 1);
                    var color3 = new paper.Color(1, 0, 0);
                    var result = color2.add(j/100);
                    // console.log(result);

                    circle.fillColor = result;
                    // circle.fillColor = { hue: color1.hue, saturation: j/50, lightness: j/50 };
                    // circle.strokeWidth= 3.0;

                }
    
            }


            lengthArray = [];

            circles = [];
            circles.push(Point.random().multiply([ view.bounds.width, view.bounds.height ]));


        makeBackground();

        for (var i = 0; i < 10; i ++)
        {

                            // var point1 = Point.random().multiply([ view.bounds.width, view.bounds.height ]);

                    var makePoint = false;

                    var testCount = 0;

                    while(testCount< 1000){

                        var legalPoint = true;
                        var randomPoint = Point.random().multiply([ view.bounds.width, view.bounds.height ]);
                           
                        for(var cp = 0; cp < circles.length; cp++) {
                            var nearLength = (randomPoint.subtract(circles[cp])).length;
                            // console.log(nearLength);

                            if(nearLength < 100) {
                                legalPoint = false;
                            }
                        }

                        if(legalPoint){
                            lengthArray.push(nearLength);
                            testCount = 1000;
                            point1 = randomPoint;
                            // console.log(nearLength);
                            makePoint = true;
                            // console.log(legalPoint);
                        }

                        testCount ++;
                    }

                    var minimum = Array.min(lengthArray);
                    // console.log(minimum);

                    if(makePoint) {
                        circles.push(point1);
                        makeCircle(point1, minimum/3);
                    }

                    // while(testCount< 1000){

                    //     var randomPoint = Point.random().multiply([ view.bounds.width, view.bounds.height ]);
                           
                    //         for(var cp = 0; cp < circles.length; cp++) {
                    //             var nearLength = randomPoint.length(circles[cp]);
                    //             console.log(nearLength);
                    //         }

                    //     if(legalPoint){
                    //         testCount = 1000;
                    //         makePoint = true;
                    //         // console.log(legalPoint);
                    //     }

                    //     // makePoint = false;
                    //     // console.log(legalPoint);
                    //     testCount ++;
                    // }


            // var point1 = Point.random().multiply([ view.bounds.width, view.bounds.height ]);
            // circles.push(point1);
            // console.log(point1);
            // makeCircle(point1, 50);//randomIntFromInterval(50, 125));

        }

                    // console.log(lengthArray);

        // console.log(circles);

        paper.view.draw();

        saveCanvasToPNGFile(loopCount +'', function(err) {
           // console.log('a');
        });

    }

}






function loop()
{
var lcString = loopCount.toString();

    makeSvg(loopCount);
    loopCount +=1;

    setTimeout(loop, 1000);
}

loop();