function Slider(params){

	//catching context
	var _this = this,
		wrapperSelector = params.sliderWrapper || '#slider';
		slideSelector = params.slideSelector || '.slide-item';
	//set of params
	_this.sliderWrapper = document.querySelector(wrapperSelector);
	_this.slides = document.querySelectorAll(wrapperSelector + '>' + slideSelector);
	_this.interval = params.interval || 2000;
	_this.showControls = params.showControls || true;
	_this.autoplay = params.autoplay || true;
	_this.frame = 0; //first slide

	//get amount of slides
	var maxLength = _this.slides.length;

	//slider initialization function
	_this.setActive = function (index, prev) {
		var prevIndex;

		if(prev){
			prevIndex = index === (maxLength - 1) ? 0 : index + 1;
		} else {
			prevIndex = index === 0 ? maxLength - 1 : index - 1;
		}
		_this.slides[prevIndex].classList.remove('active');
		_this.slides[index].classList.add('active');

	},

	_this.init = function() {
		//setting default className for applying styles
		_this.sliderWrapper.className += ' slider-wrapper';

		//event listeners binding
		_this.sliderWrapper.onmouseover = _this.pause;
		_this.sliderWrapper.onmouseout = _this.play;

		//enable controls
		if(_this.showControls){
			var prevButton = document.createElement('button'),
				nextButton = document.createElement('button');
			prevButton.className = 'prev';
			nextButton.className = 'next';
			nextButton.onclick = _this.next;
			prevButton.onclick = _this.prev;
			_this.sliderWrapper.appendChild(prevButton);
			_this.sliderWrapper.appendChild(nextButton);
		}

		//setting first slide
		_this.setActive(_this.frame);

		//enable autoplay
		if(_this.autoplay){
			_this.play();
		}
	},
	//previous slide
	_this.prev = function() {
		_this.frame--;
		if (_this.frame < 0) _this.frame = maxLength - 1;
		_this.setActive(_this.frame, true);
	},
	//next slide
	_this.next = function() { 
		_this.frame++;
		if (_this.frame == maxLength) _this.frame = 0;
		_this.setActive(_this.frame);
	},
	//pause slider
	_this.pause = function() {
		clearInterval(Timer);
	},
	//autoplay function
	_this.play = function(){
		Timer = setInterval(function(){
				_this.next();
			}, _this.interval);
	}

	return _this;
};


