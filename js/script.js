document.addEventListener("DOMContentLoaded", function (event) {

	function stackedCards() {

		let stackedOptions = 'Top';
		let rotate = false;
		let items = 3;
		let elementsMargin = 10;
		let useOverlays = true;
		let maxElements;
		let currentPosition = 0;
		let velocity = 0.3;
		let topObj;
		let rightObj;
		let leftObj;
		let listElNodesObj;
		let listElNodesWidth;
		let currentElementObj;
		let stackedCardsObj;
		let isFirstTime = true;
		let elementHeight;
		let obj;
		let elTrans;

		obj = document.getElementById('stacked-cards-block');
		stackedCardsObj = obj.querySelector('.stackedcards-container');
		listElNodesObj = stackedCardsObj.children;

		topObj = obj.querySelector('.stackedcards-overlay.top');
		rightObj = obj.querySelector('.stackedcards-overlay.right');
		leftObj = obj.querySelector('.stackedcards-overlay.left');

		countElements();
		currentElement();
		changeBackground();
		listElNodesWidth = stackedCardsObj.offsetWidth;
		currentElementObj = listElNodesObj[0];
		updateUi();


		addMargin = elementsMargin * (items - 1) + 'px';

		if (stackedOptions === "Top") {

			for (i = items; i < maxElements; i++) {
				listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
			}

			elTrans = elementsMargin * (items - 1);



		} else if (stackedOptions === "Bottom") {


			for (i = items; i < maxElements; i++) {
				listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
			}

			elTrans = 0;



		} else if (stackedOptions === "None") {

			for (i = items; i < maxElements; i++) {
				listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
			}

			elTrans = 0;

		}

		for (i = items; i < maxElements; i++) {
			listElNodesObj[i].style.zIndex = 0;
			listElNodesObj[i].style.opacity = 0;
			listElNodesObj[i].style.webkitTransform = ' translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
			listElNodesObj[i].style.transform = ' translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
		}

		if (listElNodesObj[currentPosition]) {
			listElNodesObj[currentPosition].classList.add('stackedcards-active');
		}

		if (useOverlays) {
			leftObj.style.transform = 'translateX(0px)  translateZ(0px) rotate(0deg)';
			leftObj.style.webkitTransform = 'translateX(0px) translateZ(0px) rotate(0deg)';

			rightObj.style.transform = 'translateX(0px)  translateZ(0px) rotate(0deg)';
			rightObj.style.webkitTransform = 'translateX(0px)  translateZ(0px) rotate(0deg)';

			topObj.style.transform = 'translateX(0px)  translateZ(0px) rotate(0deg)';
			topObj.style.webkitTransform = 'translateX(0px)  translateZ(0px) rotate(0deg)';

		} else {
			leftObj.className = '';
			rightObj.className = '';
			topObj.className = '';

			leftObj.classList.add('stackedcards-overlay-hidden');
			rightObj.classList.add('stackedcards-overlay-hidden');
			topObj.classList.add('stackedcards-overlay-hidden');
		}


		setTimeout(function () {
			obj.classList.remove('init');
		}, 150);


		function backToMiddle() {

			removeNoTransition();
			transformUi(0, 0, 1, currentElementObj);

			if (useOverlays) {
				transformUi(0, 0, 0, leftObj);
				transformUi(0, 0, 0, rightObj);
				transformUi(0, 0, 0, topObj);
			}

			setZindex(5);

			if (!(currentPosition >= maxElements)) {

				if ((currentPosition + 1) < maxElements) {
					listElNodesObj[currentPosition + 1].style.opacity = '.8';
				}
			}
		};


		function countElements() {
			maxElements = listElNodesObj.length;
			if (items > maxElements) {
				items = maxElements;
			}
		};


		function currentElement() {
			currentElementObj = listElNodesObj[currentPosition];
		};


		function changeBackground() {
			document.body.classList.add("background-" + currentPosition + "");
		};


		function changeStages() {
			if (currentPosition == maxElements) {

				listElNodesObj[maxElements - 1].addEventListener('transitionend', function () {
					document.body.classList.add("background-7");
					document.querySelector('.stage').classList.add('hidden');
					document.querySelector('.final-state').classList.remove('hidden');
					document.querySelector('.final-state').classList.add('active');
					listElNodesObj[maxElements - 1].removeEventListener('transitionend', null, false);
				});
			}
		};


		function onActionLeft() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {
					leftObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					leftObj.style.zIndex = '8';
					transformUi(0, 0, 1, leftObj);

				}

				setTimeout(function () {
					onSwipeLeft();
					resetOverlayLeft();
				}, 300);
			}
		};


		function onActionRight() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					rightObj.style.zIndex = '8';
					transformUi(0, 0, 1, rightObj);
				}

				setTimeout(function () {
					onSwipeRight();
					resetOverlayRight();
				}, 300);
			}
		};


		function onActionTop() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {
					leftObj.classList.remove('no-transition');
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					topObj.style.zIndex = '8';
					transformUi(0, 0, 1, topObj);
				}

				setTimeout(function () {
					onSwipeTop();
					resetOverlays();
				}, 300);
			}
		};


		function onSwipeLeft() {
			removeNoTransition();
			transformUi(-1000, 0, 0, currentElementObj);
			if (useOverlays) {
				transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
				transformUi(-1000, 0, 0, topObj); //Move topOverlay
				resetOverlayLeft();
			}
			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			changeBackground();
			changeStages();
			setActiveHidden();
		};


		function onSwipeRight() {
			removeNoTransition();
			transformUi(1000, 0, 0, currentElementObj);
			if (useOverlays) {
				transformUi(1000, 0, 0, rightObj); //Move rightOverlay
				transformUi(1000, 0, 0, topObj); //Move topOverlay
				resetOverlayRight();
			}

			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			changeBackground();
			changeStages();
			setActiveHidden();
		};


		function onSwipeTop() {
			removeNoTransition();
			transformUi(0, -1000, 0, currentElementObj);
			if (useOverlays) {
				transformUi(0, -1000, 0, leftObj);
				transformUi(0, -1000, 0, rightObj);
				transformUi(0, -1000, 0, topObj);
				resetOverlays();
			}

			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			changeBackground();
			changeStages();
			setActiveHidden();
		};


		function removeNoTransition() {
			if (listElNodesObj[currentPosition]) {

				if (useOverlays) {
					leftObj.classList.remove('no-transition');
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
				}

				listElNodesObj[currentPosition].classList.remove('no-transition');
				listElNodesObj[currentPosition].style.zIndex = 6;
			}

		};


		function resetOverlayLeft() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {
					setTimeout(function () {

						if (stackedOptions === "Top") {

							elTrans = elementsMargin * (items - 1);

						} else if (stackedOptions === "Bottom" || stackedOptions === "None") {

							elTrans = 0;

						}

						if (!isFirstTime) {

							leftObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function () {

							leftObj.style.transform = "translateX(0) translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							leftObj.style.opacity = '0';

							topObj.style.transform = "translateX(0)  translateZ(0)";
							topObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							topObj.style.opacity = '0';

						});

					}, 300);

					isFirstTime = false;
				}
			}
		};


		function resetOverlayRight() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {
					setTimeout(function () {

						if (stackedOptions === "Top") {
							+2

							elTrans = elementsMargin * (items - 1);

						} else if (stackedOptions === "Bottom" || stackedOptions === "None") {

							elTrans = 0;

						}

						if (!isFirstTime) {

							rightObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function () {

							rightObj.style.transform = "translateX(0)  translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							rightObj.style.opacity = '0';

							topObj.style.transform = "translateX(0)  translateZ(0)";
							topObj.style.webkitTransform = "translateX(0) translateZ(0)";
							topObj.style.opacity = '0';

						});

					}, 300);

					isFirstTime = false;
				}
			}
		};


		function resetOverlays() {
			if (!(currentPosition >= maxElements)) {
				if (useOverlays) {

					setTimeout(function () {
						if (stackedOptions === "Top") {

							elTrans = elementsMargin * (items - 1);

						} else if (stackedOptions === "Bottom" || stackedOptions === "None") {

							elTrans = 0;

						}

						if (!isFirstTime) {

							leftObj.classList.add('no-transition');
							rightObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function () {

							leftObj.style.transform = "translateX(0)  translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							leftObj.style.opacity = '0';

							rightObj.style.transform = "translateX(0)  translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							rightObj.style.opacity = '0';

							topObj.style.transform = "translateX(0)  translateZ(0)";
							topObj.style.webkitTransform = "translateX(0)  translateZ(0)";
							topObj.style.opacity = '0';

						});

					}, 300);

					isFirstTime = false;
				}
			}
		};

		function setActiveHidden() {
			if (!(currentPosition >= maxElements)) {
				listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
				listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}
		};


		function setZindex(zIndex) {
			if (listElNodesObj[currentPosition]) {
				listElNodesObj[currentPosition].style.zIndex = zIndex;
			}
		};



		function removeElement() {
			currentElementObj.remove();
			if (!(currentPosition >= maxElements)) {
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}
		};


		function transformUi(moveX, moveY, opacity, elementObj) {
			requestAnimationFrame(function () {
				let element = elementObj;


				function RotateRegulator(value) {
					if (value / 10 > 15) {
						return 15;
					} else if (value / 10 < -15) {
						return -15;
					}
					return value / 10;
				}

				if (rotate) {
					rotateElement = RotateRegulator(moveX);
				} else {
					rotateElement = 0;
				}

				if (stackedOptions === "Top") {
					elTrans = elementsMargin * (items - 1);
					if (element) {
						element.style.webkitTransform = "translateX(" + moveX + "px)  translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}
				} else if (stackedOptions === "Bottom" || stackedOptions === "None") {

					if (element) {
						element.style.webkitTransform = "translateX(" + moveX + "px)  translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}

				}
			});
		};


		function updateUi() {
			requestAnimationFrame(function () {
				elTrans = 0;
				let elZindex = 5;
				let elScale = 1;
				let elOpac = 1;
				let elTransTop = items;
				let elTransInc = elementsMargin;

				for (i = currentPosition; i < (currentPosition + items); i++) {
					if (listElNodesObj[i]) {
						if (stackedOptions === "Top") {

							listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');

							if (useOverlays) {
								leftObj.classList.add('stackedcards-origin-top');
								rightObj.classList.add('stackedcards-origin-top');
								topObj.classList.add('stackedcards-origin-top');
							}

							elTrans = elTransInc * elTransTop;
							elTransTop--;

						} else if (stackedOptions === "Bottom") {
							listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');

							if (useOverlays) {
								leftObj.classList.add('stackedcards-origin-bottom');
								rightObj.classList.add('stackedcards-origin-bottom');
								topObj.classList.add('stackedcards-origin-bottom');
							}

							elTrans = elTrans + elTransInc;

						} else if (stackedOptions === "None") {

							listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
							elTrans = elTrans + elTransInc;

						}

						listElNodesObj[i].style.transform = ' translateX(0)  translateZ(0)';
						listElNodesObj[i].style.webkitTransform = ' translateX(0)  translateZ(0)';
						listElNodesObj[i].style.opacity = elOpac;
						listElNodesObj[i].style.zIndex = elZindex;

						elScale = elScale - 0.04;
						elOpac = elOpac - (1 / items);
						elZindex--;
					}
				}

			});

		};


		let element = obj;
		let startTime;
		let startX;
		let startY;
		let translateX;
		let translateY;
		let currentX;
		let currentY;
		let touchingElement = false;
		let timeTaken;
		let topOpacity;
		let rightOpacity;
		let leftOpacity;

		function setOverlayOpacity() {

			topOpacity = (((translateY + (elementHeight) / 2) / 100) * -1);
			rightOpacity = translateX / 100;
			leftOpacity = ((translateX / 100) * -1);


			if (topOpacity > 1) {
				topOpacity = 1;
			}

			if (rightOpacity > 1) {
				rightOpacity = 1;
			}

			if (leftOpacity > 1) {
				leftOpacity = 1;
			}
		}

		function gestureStart(evt) {
			startTime = new Date().getTime();

			startX = evt.changedTouches[0].clientX;
			startY = evt.changedTouches[0].clientY;

			currentX = startX;
			currentY = startY;

			setOverlayOpacity();

			touchingElement = true;
			if (!(currentPosition >= maxElements)) {
				if (listElNodesObj[currentPosition]) {
					listElNodesObj[currentPosition].classList.add('no-transition');
					setZindex(6);

					if (useOverlays) {
						leftObj.classList.add('no-transition');
						rightObj.classList.add('no-transition');
						topObj.classList.add('no-transition');
					}

					if ((currentPosition + 1) < maxElements) {
						listElNodesObj[currentPosition + 1].style.opacity = '1';
					}

					elementHeight = listElNodesObj[currentPosition].offsetHeight / 3;
				}

			}

		};

		function gestureMove(evt) {
			currentX = evt.changedTouches[0].pageX;
			currentY = evt.changedTouches[0].pageY;

			translateX = currentX - startX;
			translateY = currentY - startY;

			setOverlayOpacity();

			if (!(currentPosition >= maxElements)) {
				evt.preventDefault();
				transformUi(translateX, translateY, 1, currentElementObj);

				if (useOverlays) {
					transformUi(translateX, translateY, topOpacity, topObj);

					if (translateX < 0) {
						transformUi(translateX, translateY, leftOpacity, leftObj);
						transformUi(0, 0, 0, rightObj);

					} else if (translateX > 0) {
						transformUi(translateX, translateY, rightOpacity, rightObj);
						transformUi(0, 0, 0, leftObj);
					}

					if (useOverlays) {
						leftObj.style.zIndex = 8;
						rightObj.style.zIndex = 8;
						topObj.style.zIndex = 7;
					}

				}

			}

		};

		function gestureEnd(evt) {

			if (!touchingElement) {
				return;
			}

			translateX = currentX - startX;
			translateY = currentY - startY;

			timeTaken = new Date().getTime() - startTime;

			touchingElement = false;

			if (!(currentPosition >= maxElements)) {
				if (translateY < (elementHeight * -1) && translateX > ((listElNodesWidth / 2) * -1) && translateX < (listElNodesWidth / 2)) { //is Top?

					if (translateY < (elementHeight * -1) || (Math.abs(translateY) / timeTaken > velocity)) { // Did It Move To Top?
						onSwipeTop();
					} else {
						backToMiddle();
					}

				} else {

					if (translateX < 0) {
						if (translateX < ((listElNodesWidth / 2) * -1) || (Math.abs(translateX) / timeTaken > velocity)) { // Did It Move To Left?
							onSwipeLeft();
						} else {
							backToMiddle();
						}
					} else if (translateX > 0) {

						if (translateX > (listElNodesWidth / 2) && (Math.abs(translateX) / timeTaken > velocity)) { // Did It Move To Right?
							onSwipeRight();
						} else {
							backToMiddle();
						}

					}
				}
			}
		};

		element.addEventListener('touchstart', gestureStart, false);
		element.addEventListener('touchmove', gestureMove, false);
		element.addEventListener('touchend', gestureEnd, false);


		let buttonLeft = document.querySelector('.left-action');
		let buttonTop = document.querySelector('.top-action');
		let buttonRight = document.querySelector('.right-action');

	}

	stackedCards();

});