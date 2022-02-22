class Tiar {
	constructor(text, video, arVideo, kanonaki, lyra, pandouradiv, sakafliasdiv, BG, startingNumber, tData) {
		if (
			typeof text == "string" &&
			typeof video == "string" &&
			typeof arVideo == "string"
		) {
			//settings things
			this.text = document.getElementById(text);
			this.video = document.getElementById(video);
			this.arVideo = document.getElementById(arVideo);
			this.kanonaki = document.getElementById(kanonaki);
			this.lyra = document.getElementById(lyra);
			this.pandoura = document.getElementById(pandouradiv);
			this.sakaflias = document.getElementById(sakafliasdiv);
			this.BG = document.getElementById(BG);

			this.disableBG();
			this.disableKanonaki();
			this.disableLyra();
			this.disableSakaflias();
			this.disablePandoura();

			this.buttonEnabled = true;

			this.startingNumber = startingNumber;
			this.tData = tData;

			this.reader = new FileReader();

			//for detection purposes
			this.animationID;
			this.isDetected = false;
			this.currentAnchor = "";
			//......................

			this.constructPipelineInfrastructure();
			this.copilotPermissionGrantRequest();
			//...............

			this.pztValues = [
				"1a",
				"1b",
				"1c",
				"1d",
				"1e",
				"2a",
				"2b",
				"2c",
				"3a",
				"3b",
				"3c",
			];

			//this.pipeline = pipeline;

			this.initializeTrackingSequence(this.pipeline);
		}
	}

	constructPipelineInfrastructure() {
		//setting canbas and pipline
		this.gl = this.arVideo.getContext("webgl");
		//gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.pipeline = new Zappar.Pipeline();
		this.pipeline.glContextSet(gl);
	}

	copilotPermissionGrantRequest() {
		this.deviceId = Zappar.cameraDefaultDeviceID();
		this.source = new Zappar.CameraSource(this.pipeline, this.deviceId);

		//Show zappar's built-in ui to request camera permissions
		Zappar.permissionRequestUI().then((granted) => {
			if (granted) {
				//this.source.start();
			} else {
				Zappar.permissionRequestUI();
			}
		});

		//window.addEventListener("blur", () => source.pause());
		//window.addEventListener("focus", () => source.start());

		//pipeline.processGL();
		//pipeline.frameUpdate();
		//console.log(pipeline);

		//pipeline.cameraFrameUploadGL();

		//pipeline.cameraFrameDrawGL(300, 300);

		//pipeline.cameraPoseDefault();
		//animate();
	}

	initializeTrackingSequence(pipeline) {
		this.imageTrackers = {};
		//loads all trackers
		for (let x = 0; x < this.pztValues.length; x++) {
			this.imageTrackers[this.pztValues[x]] = new Zappar.ImageTracker(
				pipeline
			);
			this.imageTrackers[this.pztValues[x]].loadTarget(
				"assets/tracking_images/" + this.pztValues[x] + ".zpt"
			);
		}
	}

	callNext(clickSound, optionNumber) {
		//itterates through everything
		clickSound.play();
		if (optionNumber != 0) {
			this.startingNumber = optionNumber;
		}
		switch (this.startingNumber) {
			case 0:
				this.startingNumber += 1;
				this.summonANewPage("/load/load.html");
				break;
			case 1:
				//clickSound.play();
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("1.1.1"));
				break;
			case 2:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("1.1.2"));
				break;
			case 3:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("2.1"));
				break;
			case 4:
				this.enableBG();
				//this.startVideoProcedure("2.6");
				this.startARProcedure("1a", "2.4");
				break;
			case 5:
				this.enableBG();
				this.startVideoProcedure("2.6");
				break;
			case 6:
				this.enableBG();
				this.savePicture();
				this.stopVideoProcedure();
				this.setDocText(this.getCorrectTextValue("2.6"));
				break;
			case 7:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("2.7"));
				break;
			case 8:
				this.enableBG();
				this.disableMainText();
				this.enablePandoura();
				break;
			case 9:
				this.enableBG();
				this.disablePandoura();
				this.enableMainText();
				this.setDocText(this.getCorrectTextValue("3.1"));
				break;
			case 10:
				this.enableBG();
				this.startARProcedure("1c", "3.4");
				break;
			case 11:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("3.5"));
				break;
			case 12:
				this.enableBG();
				this.startingNumber += 1;
				this.summonANewPage("/matching_game/sound-mobile.html");
				break;
			case 13:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("3.7"));
				break;
			case 14:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("4.1"));
				break;
			case 15:
				this.enableBG();
				this.startARProcedure("1e", "4.4");
				break;
			case 16:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("4.5"));
				break;
			case 17:
				this.enableBG();
				this.startKanonakiProcedure();
				break;
			case 18:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("4.6"));
				this.disableKanonaki();
				this.enableMainText();
				break;
			case 19:
				this.enableBG();
				this.startLyraProcedure();
				break;
			case 20:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("5.1"));
				this.disableLyra();
				this.enableMainText();
				break;
			case 21:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("5.2"));
				break;
			case 22:
				this.enableBG();
				this.startARProcedure("2b", "5.5"); //edw prepei na balw quiz
				break;
			case 23:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("6.1"));
				break;
			case 24:
				this.enableBG();
				this.startARProcedure("3a", "6.4");
				break;
			case 25:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("6.5"));
				break;
			case 26:
				this.enableBG();
				this.disableMainText();
				this.enableSakaflias();
				break;
			case 27:
				this.enableBG();
				this.enableMainText();
				this.disableSakaflias();
				this.setDocText(this.getCorrectTextValue("6.6"));
				break;
			case 28:
				this.enableBG();
				this.startingNumber += 1;
				this.summonANewPage("/quizbuilding/quizjavascript.html");
				break;
			case 29:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("7.1"));
				break;
			case 30:
				this.enableBG();
				this.startARProcedure("3c", "7.3");
				break;
			case 31:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("8.1"));
				break;
			case 32:
				this.enableBG();
				this.setDocText(this.getCorrectTextValue("8.2"));
				break;
		}
		this.startingNumber += 1;
	}

	isButtonEnabled() {
		return this.buttonEnabled;
	}

	getCorrectTextValue(textValue) {
		return this.tData.mainContent[textValue][0].text;
	}

	getCorrecthrefValue(textValue) {
		return this.tData.mainContent[textValue][0].text;
	}

	setDocText(text) {
		this.text.innerHTML = text;
	}

	startARProcedure(anchorName, anchorText) {
		this.source.start();
		this.currentAnchor = anchorName;
		this.currentAnchorText = anchorText;
		this.enableARCamera();
		this.disableMainText();
		this.disableMainCamera();
		this.buttonEnabled = false;
		this.animate();
	}

	startVideoProcedure(anchortText) {
		this.currentAnchorText = anchortText;
		this.enableMainCamera();
		this.disableMainText();
		this.getVideo();
	}

	stopVideoProcedure() {
		this.disableMainCamera();
		this.enableMainText();

		var balloon = document.getElementsByClassName("balloon")[0];

		balloon.style.height = 300 + "px";
	}

	startImageShowing() {}

	startKanonakiProcedure() {
		this.disableARCamera();
		this.disableMainText();
		this.disableMainCamera();
		this.disableLyra();
		this.enableKanonaki();
	}

	startLyraProcedure() {
		this.disableARCamera();
		this.disableMainText();
		this.disableMainCamera();
		this.disableKanonaki();
		this.enableLyra();
	}

	savePicture() {
		let video = document.querySelector("#video");
		let myElm = document.createElement("canvas");

		let myElmC = myElm
			.getContext("2d")
			.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

		let image_data_url = myElm.toDataURL("image/jpeg");
		console.log(image_data_url);
		let aDownload = document.createElement("a");
		aDownload.href = image_data_url;
		aDownload.download = "image.jpeg";
		aDownload.style.height = "100px";
		aDownload.style.width = "100px";
		aDownload.style.backgroundImage = "url('assets/download.png')";
		aDownload.style.display = "inline-block";
		aDownload.onclick = function () {
			aDownload.remove();
		};
		document.getElementById("BG").appendChild(aDownload);
		myElm.remove();
	}

	async getVideo() {
		console.log("async getVideo started");
		if (
			"mediaDevices" in navigator &&
			"getUserMedia" in navigator.mediaDevices
		) {
			let stream = null;
		console.log("let stream = null");

			try {
				console.log("started try");
console.log("stream = await navigator.mediaDevices");
				stream = await navigator.mediaDevices
						.getUserMedia({
						video: {
							height: 300, facingMode: "environment"
						},
						audio: false
					})
					.then(function (mediaStream) {
						console.log("then(function (mediaStream) started");

						let video = document.querySelector("#video");
						cameraVideo = document.querySelector("#video");
						console.log("video.srcObject = stream; ready to start");
						video.srcObject = mediaStream;
						console.log("video.srcObject = stream; started");
						video.onloadedmetadata = function () {
							var balloon =
								document.getElementsByClassName("balloon")[0];
							console.log(
								video.clientHeight +
									" " +
									video.offsetHeight +
									" " +
									video.videoHeight
							);
							balloon.style.height =
								video.clientHeight + 10 + "px";
						};
					});
				//const video2 = document.createElement('video');

				//video.style.display = "block";
				console.log(stream);

				document.getElementById("video").getBoundingClientRect()
					.height + 10;
			} catch (error) {
				alert(error.message);
				return;
			}
		}
	}

	animate() {
		this.animationID = requestAnimationFrame(() => this.animate());
		console.log("yea");

		// Ask the browser to call this function again next frame

		// Zappar's library uses this function to prepare camera frames for processing
		// Note this function will change some WebGL state (including the viewport), so you must change it back
		this.pipeline.processGL();

		this.gl.viewport(0, 0, this.arVideo.width, this.arVideo.height);

		// This function allows to us to use the tracking data from the most recently processed camera frame
		this.pipeline.frameUpdate();

		// Upload the current camera frame to a WebGL texture for us to draw
		this.pipeline.cameraFrameUploadGL();

		// Draw the camera to the screen - width and height here should be those of your canvas
		this.pipeline.cameraFrameDrawGL(
			this.arVideo.width,
			this.arVideo.height
		);

		let model = this.pipeline.cameraModel();
		let projectionMatrix = Zappar.projectionMatrixFromCameraModel(
			model,
			this.arVideo.width,
			this.arVideo.height
		);

		let cameraPoseMatrix = this.pipeline.cameraPoseDefault(0);

		for (let anchor of this.imageTrackers[this.currentAnchor].visible) {
			if (!isDetected) {
				let anchorPoseMatrix = anchor.pose(cameraPoseMatrix);
				console.log("yes");
				// Render content using projectionMatrix, cameraPoseMatrix and anchorPoseMatrix

				//alert("LEITOURGEWI");
				this.setDocText(
					this.getCorrectTextValue(this.currentAnchorText)
				);

				if (this.tData.mainContent[this.currentAnchorText][0].href) {
					this.summonANewPage(
						this.tData.mainContent[this.currentAnchorText][0].href
					);
				}

				this.isDetected = true;

				this.disableARCamera();
				this.enableMainText();
				cancelAnimationFrame(this.animationID);
				//this.source.stop();
				this.buttonEnabled = true;
			}
		}

		//imageTracker.onVisible.bind((anchor) => {
		//	console.log("Anchor is visible:", anchor.id);
		//});
	}

	summonANewPage(hrefName) {
		window.location.href = hrefName + "?lastoption=" + this.startingNumber;
	}

	enableMainText() {
		this.text.style.display = "block";
	}
	disableMainText() {
		this.text.style.display = "none";
	}

	enableMainCamera() {
		this.video.style.display = "block";
	}
	disableMainCamera() {
		this.video.style.display = "none";
	}

	enableARCamera() {
		this.arVideo.style.display = "";
	}
	disableARCamera() {
		//print("yes man");
		this.arVideo.style.display = "none";
	}

	enableKanonaki() {
		this.kanonaki.style.display = "";
	}
	disableKanonaki() {
		//print("yes man");
		this.kanonaki.style.display = "none";
		lyra.pause();
	}

	enableLyra() {
		this.lyra.style.display = "";
	}

	disableLyra() {
		//print("yes man");
		this.lyra.style.display = "none";
		lyra2.pause();
	}

	enableSakaflias() {
		this.sakaflias.style.display = "";
	}

	disableSakaflias() {
		this.sakaflias.style.display = "none";
		lyra3.pause();
	}

	enablePandoura() {
		this.pandoura.style.display = "";
	}

	disablePandoura() {
		this.pandoura.style.display = "none";
	}

	enableBG() {
		this.BG.style.display = "block";
	}

	disableBG() {
		this.BG.style.display = "none";
	}


}
