let fastStyle;
let video;
let isTransfering = false;
let resultImg;

function setup() {
  createCanvas(800, 600).parent('canvasContainer');


  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // The button to start and stop the transfer process
  select('#startStop').mousePressed(startStop);

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/udnie', video, modelLoaded);
}



function firststyle() {
  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/udnie', video, modelLoaded);
}

function newstyle() {
  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/marvel', video, modelLoaded);
}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransfering) {
    image(resultImg, 0, 0, 800, 600);
  } else {
    image(video, 0, 0, 800, 600);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
}

// Start and stop the transfer process
function startStop() {
  if (isTransfering) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    // Make a transfer using the video
    style.transfer(gotResult); 
  }
  isTransfering = !isTransfering;
}

function goFullScreen(){
    var canvas = document.getElementById("defaultCanvas0");
	document.getElementById("defaultCanvas0").style.width = 2000;
	document.getElementById("defaultCanvas0").style.height = 1500;
	document.getElementById("canvasContainer").style.width = 2000;
	document.getElementById("canvasContainer").style.height = 1500;
	
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

function changeStyle() {
    var styleSelected = document.getElementById("mySelect").value;
	  style = ml5.styleTransfer(styleSelected, video, modelLoaded);
	 
   }


// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransfering) {
    style.transfer(gotResult); 
  }
}