var paper = require('paper');
var path = require('path');
var fs = require('fs');

var loopCount = 0;


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



function makeSvg(loopCount){

    with (paper) {


        function saveCanvasToPNGFile(filename, callback)
        {
            filename += ".png";
            var fullpath = __dirname + '/img/'+filename;

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

        var bgShape = new Path.Rectangle(new Point(0, 0), new Point(view.bounds.width, view.bounds.height));
        bgShape.fillColor = Color.random();


        var radius = Math.random() * 100;

        var c = new Point(view.bounds.width/2, view.bounds.height/2);

        // var myPath = new Path();
        // var baseColor = Color.random();
        // myPath.strokeColor = baseColor;

        var rndSize = randomIntFromInterval(2,10);
        var rndPnts = randomIntFromInterval(5,45);


        for(var j=100;j>50;j-=rndSize){

            var myPath = new Path();
            var baseColor = Color.random();
            myPath.fillColor = baseColor;

            for(var i=0;i<360;i+=rndPnts){
             // Convert degrees to radians
                var angle = i * (Math.PI*2) / 360;
                // Get cartesian co-ordinates from that radian value

                var rndAmt = randomIntFromInterval(j-10,j+10);

                var x = view.center.x + Math.cos(angle) * (rndAmt);
                var y = view.center.y + Math.sin(angle) * (rndAmt);
                var triangleCenter = new Point(x,y);
                myPath.add(triangleCenter);
            }
        }

        paper.view.draw();

        saveCanvasToPNGFile(loopCount +'', function(err) {
           // console.log('a');
        });

        // var svg = project.exportSVG({ asString: true });

        // fs.writeFile(path.resolve('./rndrs/' + loopCount + '.svg'),svg, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });
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