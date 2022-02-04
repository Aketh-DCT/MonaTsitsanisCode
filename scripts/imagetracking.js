//initialize variables
var clickSound = new Audio("assets/clickSound.mp3");
var isDetected = false;
var animationID;

//url parameters
const queryString = window.location.search;
var lastoption;

console.log("yes query");
console.log(queryString);

if (queryString) {
	const urlParams = new URLSearchParams(queryString);

	try {
		lastoption = parseInt(urlParams.get("lastoption"));

		//console.log(typeof page_type);
	} catch (error) {}
}

var tsitsanis = document.getElementById("tsitsanis");
//var nextBtn = document.getElementById("next");
//var testB = document.getElementById("testB");

//nextBtn.addEventListener("click", nextPart);

//testB.addEventListener("click", function () {
//	imageTracking();
//	text.style.display = "none";
//});
var cameraVideo;
var canvas = document.getElementById("myCanvas");

//setting canbas and pipline
var gl = canvas.getContext("webgl");
//gl.clearColor(0.0, 0.0, 0.0, 1.0);
let pipeline = new Zappar.Pipeline();
pipeline.glContextSet(gl);

let imageTracker = new Zappar.ImageTracker(pipeline);
imageTracker.loadTarget("assets/tracking_images/1a.zpt");
//........................

//Reading text data
var a = 1;
//var test = new Tiar(a);
var tData;
console.log(a);
fetch("scripts/mainContent.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		tData = data;
		tiarObj = new Tiar(
			"text",
			"video",
			"myCanvas",
			"play-area",
			"play-area-lyra",
			0,
			tData
		);

		if (lastoption) {
			tiarObj.callNext(clickSound, lastoption);
		} else {
			tiarObj.callNext(clickSound, 0);
		}
	});
//..................

tsitsanis.addEventListener("click", function () {
	if (tiarObj.isButtonEnabled()) {
		tiarObj.callNext(clickSound, 0);
	}
});

textClicks = 0;

function nextPart() {
	window.location.replace("2-3.html");
}

//kanonaki code
let lyra = new Audio("assets/resources/kanonaki.mp3");
let musBtn = document.getElementById("music-button");

musBtn.addEventListener("click", audioClick);

function audioClick() {
	lyra.pause();
	lyra.currentTime = 0;
	lyra.play();
}

let lyra2 = new Audio("assets/resources/lyra.mp3");
let musBtn2 = document.getElementById("music-button-2");

musBtn2.addEventListener("click", audioClick2);

function audioClick2() {
	lyra2.pause();
	lyra2.currentTime = 0;
	lyra2.play();
}
