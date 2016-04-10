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

            var topColour = new paper.Color(0, 0.3, 0.4);
            var newColour = new paper.Color(0.9, 0.9, 0.9);

            function lerp(a,b,u) {
                return (1-u) * a + u * b;
            };

            function makeSky(){
                for(var i = 0; i < paper.view.bounds.height; i +=10){
                    var sunsetPath = new paper.Path();
                    sunsetPath.add(new paper.Point(0,i));
                    sunsetPath.add(new paper.Point(paper.view.bounds.width,i));

                    var blendStage = i/paper.view.bounds.height;

                    sunsetPath.strokeColor = new paper.Color(
                            lerp(topColour.red, newColour.red, blendStage),
                            lerp(topColour.green, newColour.green, blendStage),
                            lerp(topColour.blue, newColour.blue, blendStage)
                        )

                    // sunsetPath.strokeColor = skyColour.multiply(newColour.add(i/paper.view.bounds.height));
                    sunsetPath.strokeWidth = 10.0;
                }
            }


            lengthArray = [];

            circles = [];
            circles.push(Point.random().multiply([ view.bounds.width, view.bounds.height ]));


        makeBackground();
        makeSky();

        var numClouds = 10;

        for (var i = 0; i < numClouds; i ++)
        {


        }

        paper.view.draw();

        saveCanvasToPNGFile(loopCount +'', function(err) {
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