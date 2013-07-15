(function(){
	var httpRequest = new XMLHttpRequest(),
		url = "//uisacad5.uis.edu/~emyun2/getImage.php?query=",
		imgUrl = "http://uisacad5.uis.edu/~emyun2/images/",
		selectElm  = document.getElementById("find"),
		outputElm  = document.getElementById("output"),
		imgDiv  = document.getElementById("img"),
		leftArrow  = document.getElementById("navigation").childNodes[1],		
		rightArrow  = document.getElementById("navigation").childNodes[3],
		fetchedData, imageIndex = 0;

	// reset the select element
	selectElm.selectedIndex = 0;

	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState === 4) {
		    if (httpRequest.status === 200) {
		        	parseData(httpRequest.responseText);
			} else {
				window.location = 'http://www.knockknockfactory.com/fab404';
			}
		} else {
		    imgDiv.className = 'ajaxloader';
		}
	};

	// bind events to the elements
	selectElm.addEventListener('change', makeQuery, false);
	rightArrow.addEventListener('click', goNext, false);
	leftArrow.addEventListener('click', goPrev, false);

	function makeQuery(e){
		//on each change reset the index counter
		imageIndex = 0;
		// hide left arrow on each change, since counter reset
		leftArrow.className = 'nLeft hide';

		if(e.target.value !== 'default'){
			httpRequest.open('GET', url + e.currentTarget.value , true);
			httpRequest.send(null);
		}
	}

	function parseData(json){
		fetchedData = JSON.parse(json);	
		outputElm.innerHTML =  "1 of " + fetchedData.length;
		if(fetchedData.length > 0) {
			//if there is more than 1 image show the next button
			if(fetchedData.length > 0){
				rightArrow.className = 'nRight'
			}
			// add first image from the response array
			injectImage(imageIndex);
			imageIndex++;
		}
	}

	function injectImage(indx) {
			var imgTag=document.createElement("img");
			imgTag.setAttribute('src', imgUrl + selectElm.value + '/' + fetchedData[indx]);
			imgTag.setAttribute('alt', selectElm.value);
			imgTag.setAttribute('height', '100%');
			imgTag.setAttribute('width', '100%');
			imgTag.setAttribute('id', 'image');
			imgTag.setAttribute('class', 'initImage');
			imgTag.onload = function (){
				//Delete all inside img div
				imgDiv.innerHTML = "";	
				imgDiv.appendChild(imgTag);	
				setTimeout(function(){
					imgTag.setAttribute('class', 'loadedImage');
				}, 200);
				imgDiv.className = '';
				if(imageIndex === fetchedData.length){ // hide next button if reached the end
					rightArrow.className = 'nRight hide';
				}
				else{
					rightArrow.className = 'nRight';	
				}
			}
	}

	function goNext(e){
		var imageTag;
		e.preventDefault();
		if(imageIndex > fetchedData.length - 1){
			return;
		}
		if(imageIndex > 0){ // show prev button
			leftArrow.className = 'nLeft';
		}		
		imgDiv.className = 'ajaxloader';
		imageTag = document.getElementById("image");
		if(imageTag){
			imageTag.setAttribute('style', 'opacity:.3');
		}
		injectImage(imageIndex);
		outputElm.innerHTML =  (imageIndex + 1) + " of " + fetchedData.length;		
		imageIndex++;
	}

	function goPrev(e){
		var imageTag;
		e.preventDefault();
		if(imageIndex == 2){ // hide prev button
			leftArrow.className = 'nLeft hide';
		}
		imgDiv.className = 'ajaxloader';
		imageTag = document.getElementById("image");
		if(imageTag){
			imageTag.setAttribute('style', 'opacity:.3');
		}
		imageIndex--;		
		injectImage(imageIndex-1);
		outputElm.innerHTML =  (imageIndex) + " of " + fetchedData.length;		
	}

}());
