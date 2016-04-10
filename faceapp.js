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

        function makeEye(eyePos, eyeRad)
        {

            var eyeBall = new paper.Path();
            eyeBall.fillColor = 'white';

             for(var i=0;i<360;i+=30){
                // Convert degrees to radians
                var angle = i * (Math.PI*2) / 360;

                var rndAmt = randomIntFromInterval(eyeRad-5,eyeRad+5);

                var x = eyePos.x + Math.cos(angle) * (rndAmt);
                var y = eyePos.y + Math.sin(angle) * (rndAmt);
                var triangleCenter = new paper.Point(x,y);
                eyeBall.add(triangleCenter);
            }

            var pupil = new paper.Path();
            var pupilRad = eyeRad / 2;
            pupil.fillColor = 'black';

             for(var i=0;i<360;i+=30){
                // Convert degrees to radians
                var angle = i * (Math.PI*2) / 360;

                var rndAmt = randomIntFromInterval(pupilRad-1,pupilRad+1);

                var x = eyePos.x + Math.cos(angle) * (rndAmt);
                var y = eyePos.y + Math.sin(angle) * (rndAmt);
                var triangleCenter = new paper.Point(x,y);
                pupil.add(triangleCenter);
            }


            var pupilHL = new paper.Path();
            var pupilHLRad = pupilRad / 4;
            pupilHL.fillColor = 'white';

             for(var i=0;i<360;i+=30){
                // Convert degrees to radians
                var angle = i * (Math.PI*2) / 360;

                var rndAmt = randomIntFromInterval(pupilHLRad-1,pupilHLRad+1);

                var x = (eyePos.x - 5) + Math.cos(angle) * (rndAmt);
                var y = (eyePos.y - 5) + Math.sin(angle) * (rndAmt);
                var triangleCenter = new paper.Point(x,y);
                pupilHL.add(triangleCenter);
            }

        }

        function makeMouth(mouthPos, mouthWidth, mouthRadd)
        {

            var mouth = new paper.Path();
            mouth.strokeColor = 'white';
            mouth.strokeWidth = 10;
            mouth.strokeCap = 'round';
            mouth.strokeJoin = 'round';

            var mouthRad = mouthWidth;

             for(var i=0;i<=180;i+=randomIntFromInterval(3,40)){
                // Convert degrees to radians
                var angle = i * (Math.PI * 2) / 360;

                var rndAmt = randomIntFromInterval(mouthRad-1,mouthRad+1);

                var rndAmt2 = mouthRadd + randomIntFromInterval(-5,5);

                var x = mouthPos.x + Math.cos(angle) * (rndAmt*2);
                var y = mouthPos.y + Math.sin(angle) * (rndAmt2);
                var mouthPoint = new paper.Point(x,y);
                mouth.add(mouthPoint);
            }
        }

        function makeOneSideofNose(nosePath, nosePos, noseWidth, noseHeight)
        {
            nosePath.add(new paper.Point(nosePos));
            nosePath.add(new paper.Point(nosePos.x + noseWidth*0.8, nosePos.y + noseHeight * 0.05));
            nosePath.add(new paper.Point(nosePos.x + noseWidth, nosePos.y + noseHeight * 0.3));
            nosePath.add(new paper.Point(nosePos.x + (noseWidth*2), nosePos.y + noseHeight * 0.4));
            nosePath.add(new paper.Point(nosePos.x + (noseWidth*2.2), nosePos.y + noseHeight * 0.5));
            nosePath.add(new paper.Point(nosePos.x + (noseWidth*2), nosePos.y + noseHeight * 0.6));
            nosePath.add(new paper.Point(nosePos.x, nosePos.y + noseHeight * 0.7));
        }

        function makeNose(nosePos)
        {
            var nose = new paper.Path();
            nose.fillColor = 'white';

            var rndNoseSize = randomIntFromInterval(5, 25);
            var rndNoseHeight = randomIntFromInterval(20, 120);

            makeOneSideofNose(nose, nosePos, rndNoseSize, rndNoseHeight)
            makeOneSideofNose(nose, nosePos, -rndNoseSize, rndNoseHeight)

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


        // for(var j=100;j>50;j-=rndSize){

        //     var myPath = new Path();
        //     var baseColor = Color.random();
        //     myPath.fillColor = baseColor;

        //     for(var i=0;i<360;i+=rndPnts){
        //      // Convert degrees to radians
        //         var angle = i * (Math.PI*2) / 360;
        //         // Get cartesian co-ordinates from that radian value

        //         var rndAmt = randomIntFromInterval(j-10,j+10);

        //         var x = view.center.x + Math.cos(angle) * (rndAmt);
        //         var y = view.center.y + Math.sin(angle) * (rndAmt);
        //         var triangleCenter = new Point(x,y);
        //         myPath.add(triangleCenter);
        //     }
        // }


        var rndEyeRad = randomIntFromInterval(20, 50);
        makeEye(new Point(view.center.x - (rndEyeRad*1.5), 100), rndEyeRad);
        makeEye(new Point(view.center.x + (rndEyeRad*1.5), 100), rndEyeRad);

        var rndMouthWidth = randomIntFromInterval(20, 50);
        var rndMouthHeight = randomIntFromInterval(-30, 30);

        var rndNosePos = randomIntFromInterval(100, 150);
        var rndMouthPos = 200; //rndNosePos + randomIntFromInterval(50,100);

        // makeNose(new Point(150, rndNosePos));
        makeMouth(new Point(150, rndMouthPos), rndMouthWidth, rndMouthHeight);


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