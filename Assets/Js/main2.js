var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/
(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this); 
function showStats(){	
	function addStats(){
		var stats = new Stats();
		stats.domElement.style.position = 'fixed';
		stats.domElement.style.left = '0px';
		stats.domElement.style.bottom = '0px';
		document.body.appendChild( stats.domElement );
		setInterval(function(){stats.update();}, 1000 / 60 );
	}		
	var script = document.createElement("script");
	script.type = "text/javascript", script.src = "Assets/Js/stats.min.js";
	script.onload = addStats;
	document.body.appendChild(script);	
}

function Scroller(){	
	CSSPlugin.defaultTransformPerspective = 256;
	var _isTouch = "ontouchstart" in window;	
	var _this = this;
	var _added = 0, _lastMoved = 0, _totalCm = 10000, _totalFieldH = 0, _top = 0, dpr = window.devicePixelRatio, _scrolledDelta = 0, _totalToScroll = 0, _tOnDown = 0, _tTotal = 0, _sw = 0, _sh = 0, _oldSw = 0, _oldSh = 0, _fieldW = 770, _timeout = 0;
	var _isDragging = false, _allowWheel = true, _isCompleted = false;
	var _field = document.getElementById("field");
	var _fieldBg = document.getElementById("fieldBg");
	var _topTitle = document.getElementById("topTitle");
	var _topMenu = document.getElementById("topMenu");
	var _fieldBorder = document.getElementById("fieldBgWhite");
	var _meterField = document.getElementById("meter");
	var _coin = document.getElementById('rankCoin');
	var _rank = document.getElementById('rankContainer');
	var _nameF = document.getElementById('enterName');	
	var _finishScreen = document.getElementById('finishScreen');
	var _finalTime = document.getElementById('finalTime');
	var _scoreTable = document.getElementById('scoreTableOuter');
	var _tableHolder = document.getElementById('tableHolder');	
	var _score = document.getElementById('scoreTable');
	var _sendBtn = document.getElementById('sendBtn');
	var _ribbonRedEnd = document.getElementById('ribbonRedEnd');
	var _topTitleCanvas = document.getElementById('topTitleCanvas');
	var _tryAgain = document.getElementById('tryagain');
	var _fb = document.getElementById('facebook');
	var _tw = document.getElementById('twitter');
	var _cupL = document.getElementById('cupL');
	var _cupR = document.getElementById('cupR');
	var _startBtn = document.getElementById('startBtn');
	var _startTxt = document.getElementById('startTxt');
	var _soundBtn = document.getElementById('soundBtn');
	var _fakeScrollbar = document.getElementById('fakeScrollbar');
	if(_isTouch) _fakeScrollbar.style.visibility = "hidden";
	var _scrollBar;
	var _finalRank;
	var _showBtnOn = false, _scrollAdded = false, _online = true, _soundOn = true;
	
	function toggleSound(e){
		_soundOn = !_soundOn;
		if(_soundOn){
			_soundBtn.innerHTML = "sound off";
			_bgSound.play();
		}
		else{
			_soundBtn.innerHTML = "sound on";
			_bgSound.stop();
		}
	}
	if(_useSounds){
		_soundBtn.style.visibility = "visible";	
		$(_soundBtn).bind('click', toggleSound);
	}
	else{
		_soundBtn.innerHTML = "";
		_soundOn = false;
	}
	
	//Start/stop wheel/touch
	function startGame(){
		//Add wheel listener
		if(_isTouch) document.addEventListener("touchstart", initTouch);
		else $(window).bind('mousewheel', updatedWheel);
		_timer.start();
		_meterField.innerHTML = "0 METER";
		if(_soundOn) _startSound.play();
	}
	
	var _countDown = 3;
	function countDown(e){
		if(e){
			$(_startBtn).unbind('click', countDown);
			$(_startBtn).unbind('touchstart', countDown);
		}
		_countDown--;
		if(_countDown < -1){
			_countDown = 3;
			startGame();
			TweenMax.to(_startBtn, .2, {autoAlpha:0, scaleX:2, scaleY:2, delay:.2, ease:Expo.easeOut});
		}
		else{
			if(_soundOn) _bipSound.play();
			//Pulsate
			TweenMax.to(_startBtn, .5, {bezier:{values:[{scaleX:.6, scaleY:.6}, {scaleX:1, scaleY:1}]}, ease:Quad.easeInOut});
			setTimeout(function(){
				if(_countDown == -1) _startTxt.innerHTML = "SCROLL";
				else _startTxt.innerHTML = (_countDown+1);
			}, 350);
			//Next count
			setTimeout(countDown, 700);
		}
	}
	
	function listenStart(){
		$(_startBtn).bind('click', countDown);
		$(_startBtn).bind('touchstart', countDown);
	}
	
	function stopGame(){
		if(_isTouch){
			document.removeEventListener("touchstart", initTouch);
			document.removeEventListener("touchmove", touchMove);
			document.removeEventListener("touchcancel", touchEnded);
			document.removeEventListener("touchend", touchEnded);
			TweenMax.killTweensOf(_this);
			TweenMax.ticker.removeEventListener('tick', touchEngine);
			//setTimeout(showEndScreen, 1200);
		}
		else{
			$(window).unbind('mousewheel', updatedWheel);
		}
		_timer.stop();
		_finishLine.ripOver();
		_top -= 150;
		TweenMax.to(_field, 1.2, {y:_top, ease:Quad.easeOut, delay:.2, onComplete:showEndScreen});
		if(_online) $.post("Assets/Php/highscore.php?action=seePosition&nocache=" + new Date().getTime(), {score:_timer.getTotalTime(true), kode:0101}, positionReceived);
	}
		
	function positionReceived(data){
		var _final = 'no<span id="rank">' + data + '</span>';
		_finalRank = data + "";
		if(_finalRank.length > 4) _final = 'no<span id="rankSmall">' + data + '</span>';
		$(_rank).html(_final);
		$(_finalTime).html(_timer.getTotalTime(false));
	}
	
	function showEndScreen(){
		_top -= _sh;
		_finishScreen.style.marginTop = "32px";
		_finishScreen.style.visibility = "visible";
		_finishScreen.style.opacity = "0";
		_nameF.style.marginTop = "16px";
		TweenMax.to(_finishScreen, .5, {alpha:1, marginTop:0, delay:1.3, ease:Quad.easeOut, onComplete:flipCoin});
		TweenMax.to(_field, 1.8, {y:_top, ease:Quad.easeInOut});
		TweenMax.to(_coin, 0, {alpha:0, rotationY:90, rotationX:-20, rotationZ:-8});
		//Hide topmenu in tablet/smartphone
		if(_isTouch) TweenMax.to(_topMenu, .4, {alpha:0, ease:Power2.easeOut});
	}
	
	function flipCoin(){
		_showBtnOn = false;
		_nameF.style.visibility = "visible";
		_nameF.style.opacity = "0";
		$('input').val("ENTER YOUR NAME");
		TweenMax.to(_coin, .8, {alpha:1, rotationY:360, rotationX:0, rotationZ:0, ease:Back.easeOut});
		TweenMax.to(_nameF, .3, {alpha:1, marginTop:0, delay:1, ease:Power2.easeOut});
		if(_soundOn) _cheerSound.play();
	}
	
	//Input field
	$('input').focus(function() {
		if (!$(this).data('originalValue')) $(this).data('originalValue', $(this).val());
		if ($(this).val() == $(this).data('originalValue')) $(this).val('');
		showSendBtn();
	}).blur(function(){
	    if ($(this).val() == '') $(this).val($(this).data('originalValue'));
	});	
	$('input').keydown( function(e) {
	        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	        if(key == 13) {
	            e.preventDefault();
				if(!validateInput($('input').val())){
					//console.log("Couldn't validate!");
					return;
				}
				//Simluate pressing the "send" button
				$('input').blur();
				sendData(e);
				$('input').keydown( function(e) {} );
	        }
	    });
	
	function showSendBtn(){
		if(_showBtnOn) return;
		_showBtnOn = true;
		//Anim in button and add listeners
		if(!_isTouch){
			$(_sendBtn).bind('mouseover', overSend);
			$(_sendBtn).bind('mouseout', outSend);
		}
		$(_sendBtn).bind('click', sendData);
		_sendBtn.style.marginTop = "16px";
		_sendBtn.style.visibility = "visible";
		_sendBtn.style.opacity = "0";
		TweenMax.to(_sendBtn, .4, {alpha:1, marginTop:0, delay:.4, ease:Quad.easeOut});
		//Remove entire topMenu and make container scrollable
		if(_isTouch){			
			_topTitle.style.position = "absolute";
			_topMenu.style.visibility = "hidden";
			_finishScreen.style.position = "absolute";
		}
	}

	function overSend(e){
		TweenMax.to(_sendBtn, .4, {backgroundColor:"#E4E5E6", color:"#777777", ease:Expo.easeOut});
	}
	function outSend(e){
		TweenMax.to(_sendBtn, .4, {backgroundColor:"#88cdf1", color:"#FFFFFF", ease:Quad.easeOut});
	}
	function overTry(e){
		TweenMax.to(_tryAgain, .4, {backgroundColor:"#E4E5E6", color:"#777777", ease:Expo.easeOut});
	}
	function outTry(e){
		TweenMax.to(_tryAgain, .4, {backgroundColor:"#88CDF1", color:"#FFFFFF", ease:Quad.easeOut});
	}
	
	function validateInput(_str){
		if(_str.length < 2 || _str == "ENTER YOUR NAME" || _str.toLowerCase() == "fuck") return false;
		return true;
	}
	
	function sendData(e){
		if(!validateInput($('input').val())){
			//console.log("Couldn't validate!");
			return;
		}
		if(!_isTouch){
			$(_sendBtn).unbind('mouseover', overSend);
			$(_sendBtn).unbind('mouseout', outSend);
		}
		$(_sendBtn).unbind('click', sendData);
		//Send data
		TweenMax.to(_finishScreen, .3, {autoAlpha:0, marginTop:-64, ease:Power2.easeOut, onComplete:sendHighscore});
	}
	
	function sendHighscore(){
		if(!_isTouch) document.body.style.cursor = "progress";
		if(_online) $.post("Assets/Php/highscore.php?action=saveScore&nocache=" + new Date().getTime(), {name:$('input').val() + "", score:_timer.getTotalTime(true), kode:0101}, receivedScores);	
		else receivedScores();
	}
	
	function receivedScores(data){
		//Scroll window back (after keyboard)
		if(_isTouch) window.scrollTo(0, 0);
		//NEW
		var _final = '<table id="scores"><tr><td class="scoreHeader">RANK</td><td class="scoreHeader">TIME</td><td class="scoreHeader">NAME</td></tr>' + data + '</table>';
		if(_online){
			_tableHolder.innerHTML = _final;
			//Scroll to user
			var _userLine = document.getElementById("activeUser");
			_userLine.scrollIntoView(false);
		}
		//Show score table
		_scoreTable.style.marginTop = "32px";		
		_scoreTable.style.visibility = "visible";
		
		//Listen for scroll in highscores
		if(_isTouch){
			document.addEventListener("touchstart", highscoreScrollStart);
		}
		
		//OLD				
		/*
		var _final = '<table id="scores"><tr><td class="scoreHeader">RANK</td><td class="scoreHeader">TIME</td><td class="scoreHeader">NAME</td></tr>' + data + '</table>';
		if(_online) $(_tableHolder).html(_final);
		var _delay = .1;
		if(_isTouch) _delay = .5;
		TweenMax.to(_finishScreen, .3, {autoAlpha:0, marginTop:-64, delay:_delay, ease:Power2.easeOut});
		//Scroll window back (after keyboard)
		if(_isTouch) window.scrollTo(0, 0);
		//Scrollbar
		if(!_scrollAdded) $(_score).jScrollPane();
		_scrollAdded = true;		
		var api = $(_score).data('jsp');
		if(_finalRank * 1 > 5) api.scrollToY((_finalRank * 1 - 2) * 44);		
		_scrollBar = $(_score).find('div.jspVerticalBar')[0];
		if(_scrollBar) TweenMax.to(_scrollBar, .4, {alpha:1, delay:_delay + .7, ease:Quad.easeInOut});
		//Show score table
		_scoreTable.style.marginTop = "32px";
		_scoreTable.style.opacity = "0";
		_scoreTable.style.visibility = "visible";
		TweenMax.to(_scoreTable, .3, {alpha:1, marginTop:0, delay:_delay+.4, ease:Power2.easeOut});
		*/
		
		//Try again button
		if(!_isTouch){
			$(_tryAgain).bind('mouseover', overTry);
			$(_tryAgain).bind('mouseout', outTry);
			_scoreTable.style.opacity = "0";
			TweenMax.to(_scoreTable, .3, {alpha:1, marginTop:0, delay:2.5, ease:Power2.easeOut, onComplete:scoresReady});
		}
		$(_tryAgain).bind('click', restart);
		$(_tryAgain).bind('touchstart', restart);
	}
	
	var _initHighscoreY = 0, _scrollInitY = 0;
	function highscoreScrollStart(e){
		e.stopPropagation();
		_scrollInitY = _score.scrollTop;
		_initHighscoreY = e.touches[0].pageY;
		//Listen for movement
		document.addEventListener("touchmove", highscoreMove);
		document.addEventListener("touchcancel", highscoreEnded);
		document.addEventListener("touchend", highscoreEnded);
	}
	
	function highscoreMove(e){
		e.stopPropagation();
		_score.scrollTop = _scrollInitY + (_initHighscoreY - e.touches[0].pageY) * 2;
	}
	
	function highscoreEnded(e){
		document.removeEventListener("touchmove", highscoreMove);
		document.removeEventListener("touchcancel", highscoreEnded);
		document.removeEventListener("touchend", highscoreEnded);
	}
	
	function scoresReady(){
		document.body.style.cursor = "auto";
	}
	
	function restart(e){
		if(!_isTouch){
			$(_tryAgain).unbind('mouseover', overTry);
			$(_tryAgain).unbind('mouseout', outTry);
		}
		else{
			document.removeEventListener("touchstart", highscoreScrollStart);
			highscoreEnded(null);
		}
		$(_tryAgain).unbind('click', restart);
		$(_tryAgain).unbind('touchstart', restart);
		//Anim out current graphics
		TweenMax.to(_scoreTable, .3, {autoAlpha:0, marginTop:16, ease:Power2.easeOut});
		//Move field to the top
		TweenMax.to(_field, 1.8, {y:0, ease:Quad.easeInOut, onComplete:resetScores});
		//Reset
		_timer.reset();
		TweenMax.to(_startBtn, 0, {scaleX:1, scaleY:1});
		TweenMax.to(_startBtn, .4, {autoAlpha:1, delay:2, ease:Quad.easeOut, onStart:_finishLine.render, onComplete:listenStart});
		percentCompleted = _scrolledDelta = _tTotal = _top = percentCompletedRaw = 0;
		_meterField.innerHTML = "0 METER";
		_isCompleted = false;
		_sendBtn.style.visibility = "hidden";
		_nameF.style.visibility = "hidden";
		//Show topmenu again in tablet/smartphone
		if(_isTouch){
			_topMenu.style.opacity = "0";
			_topMenu.style.visibility = "visible";
			TweenMax.to(_topMenu, .6, {alpha:1, delay:1.9, ease:Quad.easeInOut});
		}
		_startTxt.innerHTML = "START";
	}
	
	function resetScores(){
		_tableHolder.innerHTML = "";
	}
			
	//Touch ________
	function initTouch(e){
		e.stopPropagation();
		_tOnDown = e.touches[0].pageY;
		_isDragging = true;
		_isThrown = false;
		//Start listening for moving touchpoint
		document.addEventListener("touchmove", touchMove);
		document.addEventListener("touchcancel", touchEnded);
		document.addEventListener("touchend", touchEnded);
		TweenMax.ticker.addEventListener('tick', touchEngine);
		TweenMax.killTweensOf(_this);
	}
	
	function touchMove(e){
		e.stopPropagation();
		_lastMoved = _tOnDown - e.touches[0].pageY;
		_tTotal -= _lastMoved;
		_tOnDown = e.touches[0].pageY;
		if(_tTotal > 0) _tTotal = 0;
	}
	
	var _isThrown = false;
	function touchEnded(e){
		e.stopPropagation();
		//Throw
		_added = _lastMoved;
		_isThrown = true;
		throwOver();
		//TweenMax.to(_this, .4, {_added:_lastMoved*.5, ease:Quad.easeOut, onUpdate:updateThrow, onComplete:throwOver});
		//TweenMax.to(_this, Math.max(0.3, Math.min(Math.abs(_lastMoved) * 0.01, 1.0)), {_added:0, ease:Power2.easeOut, onUpdate:updateThrow, onComplete:throwOver});
	}
	
	function updateThrow(){
		_tTotal -= _added;
		if(_tTotal > 0) _tTotal = 0;
	}
	
	function throwOver(){
		_isDragging = false;
		document.removeEventListener("touchmove", touchMove);
		document.removeEventListener("touchcancel", touchEnded);
		document.removeEventListener("touchend", touchEnded);
		document.addEventListener("touchstart", initTouch);
	}
	//Touch end ________
	
	function updateCounter(){
		percentCompletedRaw = -_top / _totalToScroll * 100;
		percentCompleted = Math.floor(percentCompletedRaw);
		if(!_isCompleted && percentCompleted >= 100){
			percentCompleted = 100;
			//Remove engine and show finish screen
			stopGame();
			_isCompleted = true;
		}
		_meterField.innerHTML = Math.min(percentCompleted, 100) + " METER";
	}

	function updatedWheel(e, delta){
		e.stopImmediatePropagation();
		e.preventDefault();
		if(!_allowWheel) return;		
		if(isNaN(delta)) delta = 0;
		if(delta > 10) delta = 10;
		else if(delta < -10) delta = -10;
		_scrolledDelta -= delta * 0.002;
		if(_scrolledDelta < 0) _scrolledDelta = 0;
		engine();
		updateCounter();
		if(_isTouch) return;
		if(_soundOn) _wheelSound.play();
	/*	_allowWheel = false;
		if(dpr > 1) setTimeout(unSuspend, 50); //New MBPro probably
		else setTimeout(unSuspend, 30);*/
		//Play wheel sound
	}

	function unSuspend(){
		_allowWheel = true;
	}
	
	function engine(){
		_top = -_scrolledDelta * 10000;
		if(_top < -_totalToScroll) _top = -_totalToScroll;
		_top = Math.round(_top);
		//TweenMax.to(_field, 0.6, {css:{transform:"translateY(" + _top + "px)"}, ease:Quad.easeOut});
		TweenMax.to(_field, 0.6, {y:_top, ease:Quad.easeOut});
		//console.log(_top, _totalToScroll);
	}	
	
	function touchEngine(e){
		if(_isThrown){
			_added *= .9;
			if(Math.abs(_added) < .03) _isThrown = false;
			_tTotal -= _added;
			if(_tTotal > 0) _tTotal = 0;
		}
		if(!_isDragging && !_isThrown && Math.abs(_tTotal - _top) < .1){
			_top = Math.round(_top);
			TweenMax.ticker.removeEventListener('tick', touchEngine);
		}
		else _top += (_tTotal - _top) * .6;
		//TweenMax.to(_field, 0, {y:_top});
		//TweenMax.to(_field, 0.4, {css:{transform:"translateY(" + _top + "px)"}, ease:Quad.easeOut});
		//_field.style.top = _top + "px";
		//TweenMax.to(_field, 0, {css:{transform:"translateY(" + _top + "px)"}});
		TweenMax.to(_field, 0, {y:_top});
		updateCounter();
	}
	
	//Position on init
	function positionBushes(){
		var _bushes = $("#field").find('div.bush');
		var _n = _bushes.length, _sideMargin = 0, _t = 0, _z = 0;
		for(var i = 0; i < _n; ++i){
			_t = (_totalToScroll+_sh)/_n * (i+1) + Math.round(Math.random() * 200 - 50) - 100;
			if(i < 3) _t *= .1;
			_z = Math.round(Math.random() * 1.5);
			if(i > 5) _sideMargin = 100 + Math.abs(_z) * 200;
			else _sideMargin = 100 + Math.abs(_z) * 100;
			//Check if too near the finishline
			if(Math.abs((_t-70)-(_totalToScroll-100)) < 300){
				if(_t-70 < (_totalToScroll-100)) _t -= 200;
				else _t += 200;
				_sideMargin += 150;
			}
			_bushes[i].style.top = _t + "px";
			if(i%2 == 0) _bushes[i].style.right = -_sideMargin + "px";
			else _bushes[i].style.left = -_sideMargin + "px";
			//Type of bush
			if(Math.random() < .5) $(_bushes[i]).addClass("bushA");
			else $(_bushes[i]).addClass("bushB");
			//Size (not for top area)
			if(i > 5 && _sw > 600) TweenMax.to(_bushes[i], 0, {scaleX:_z, scaleY:_z});
		}
	}
	
	function positionLines(){
		var _lines = $("#field").find('div.fieldLine');
		var _n = _lines.length;
		for(var i = 0; i < _n; ++i){
			//_lines[i].style.top = (_totalFieldH + _sh)/(_n+1) * (i+1) + "px";
			_lines[i].style.top = _totalToScroll/_n * (i+1) + "px";
		}
		var _startlines = $("#field").find('div.fieldStartLine');
		_n = _startlines.length;
		for(i = 0; i < _n; ++i){
			_startlines[i].style.marginLeft = 190 * i + 90 + "px";
		}
	}
	
	
	function resize(){
		clearTimeout(_timeout);
		_timeout = setTimeout(doResize, 100);		
	}
		
	function doResize(){
		_sw = window.innerWidth, _sh = window.innerHeight;
		if(_oldSw == _sw && _oldSh == _sh) return; //No change made!
		//else console.log(_sw + " " + _sh);
		_oldSw = _sw, _oldSh = _sh;
		//Remove while changing height
		window.onresize = null;
		//Set the size of the field
		_totalFieldH = (_totalCm/2.54)*96;
		//DPI is higher, so make field a little longer and add HD images
		if(dpr > 1){
			_totalFieldH *= 1.5;
			_finishScreen.style.backgroundImage = "url(Assets/Grx/kransHD.png)";
			_fb.style.backgroundImage = "url(Assets/Grx/fbHD.png)";
			_tw.style.backgroundImage = "url(Assets/Grx/twHD.png)";
			_cupL.style.backgroundImage = "url(Assets/Grx/cupHD.png)";
			_cupR.style.backgroundImage = "url(Assets/Grx/cupHD.png)";
		}
		else{
			if(_sh > _sw && _isTouch) _totalFieldH *= 1.5; //device in portrait
		}
		_totalFieldH = Math.round(_totalFieldH);		
		_field.style.height = _totalFieldH + _sh * 3 + "px"; //Extra _sh added to be sure we never see ending of field
		//Redraw canvas
		var _addedMargin = 300;
		if(_sw > 800){
			_timer.updatePadding(false);
			_addedMargin = 300;
			_totalToScroll = Math.round(_totalFieldH+_addedMargin);
			_finishLine.resized(790, _totalToScroll + 65);
			if(!_isTouch) _topMenu.style.visibility = "visible";
			if(_sh < 650){
				_finishScreen.style.top = Math.max(150,(_sh*.5-165)) + "px";
				_scoreTable.style.top = Math.max(150,(_sh*.5-165)) + "px";	
			}
			else{
				if(_isTouch){
					_finishScreen.style.top = Math.max(155,(_sh*.5-180)) + "px";
					_scoreTable.style.top = Math.max(155,(_sh*.5-180)) + "px";
				}
				else{
					_finishScreen.style.top = Math.max(230,(_sh*.5-150)) + "px";
					_scoreTable.style.top = Math.max(230,(_sh*.5-150)) + "px";
				}				
			}
		}
		else{
			//Mobile version
			_addedMargin = 130;
			_totalToScroll = Math.round(_totalFieldH+_addedMargin);
			_finishLine.resized(220, _totalToScroll + 65);
			_finishScreen.style.top = "0px";
			_scoreTable.style.top = "0px";
			_timer.updatePadding(true);
			//Hide topmenu!
			if(!_isTouch) _topMenu.style.visibility = "hidden";
			//Hide extra start lines
			var _startlines = $("#field").find('div.fieldStartLine');
			var _n = _startlines.length;
			for(var i = 1; i < _n; ++i) _startlines[i].style.visibility = "hidden";			
		}
		//Set height
		document.body.style.height = _totalFieldH + _sh * 3 + _addedMargin + "px";
		//Listen again
		window.onresize = resize;
	}
	
	//Manage sharing
	function socialPopup(_url, _name){
		var NewWindow = window.open(_url,_name,"width=540,height=580,left="+(screen.availWidth / 2 - 270)+",top="+(screen.availHeight / 2 - 290)+",toolbar=No,location=No,scrollbars=Yes,status=Yes,resizable=Yes,fullscreen=No");
		NewWindow.focus();
	}
	function shareFB(e){
		socialPopup("/http://www.facebook.com/sharer/sharer.php?u=http://the100meterscroll.com", "Share on Facebook");
	}
	function shareTw(e){
		//socialPopup("https://web.archive.org/web/20170702200804/http://twitter.com/home?status=I scrolled 100 meters in " + _timer.getTotalTime(false) + " - How fast are you? http://the100meterscroll.com", "Share on Twitter");
		socialPopup("http://twitter.com/home?status=I'm no. " + _finalRank + " best scroller in the world - 100 meters in " + _timer.getTotalTime(false) + ". Can you outscroll me? http://the100meterscroll.com", "Share on Twitter");
	}
	$(_fb).bind('click', shareFB);
	$(_tw).bind('click', shareTw);
	$(_fb).bind('mouseover', overAlpha);
	$(_fb).bind('mouseout', outAlpha);
	$(_tw).bind('mouseover', overAlpha);
	$(_tw).bind('mouseout', outAlpha);
	function overAlpha(e){
		var targ;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		TweenMax.to(targ, .4, {alpha:.5, ease:Quad.easeOut});
	}
	function outAlpha(e){
		var targ;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		TweenMax.to(targ, .4, {alpha:1, ease:Quad.easeOut});
	}
	doResize();
	
	positionBushes();
	positionLines();
	
	//Draw ribbon for end screen
	_ribbon.drawRibbon(_ribbonRedEnd, 680, 40);
	_ribbon.drawRibbonLabel(_topTitleCanvas, 640, 66);
		
	//If touch version we change scroll to affect entire window
	if(_isTouch){
		document.ontouchmove = function(e){ e.preventDefault(); }
		window.scrollTo(0, 0);
	}	
	
	//Anim in
	TweenMax.to(_startBtn, 0, {scaleX:0, scaleY:0});
	_field.style.marginTop = _sh + "px";	
	TweenMax.to(_topTitle, .5, {opacity:1, top:0, delay:.6, ease:Quad.easeOut});
	TweenMax.to(_topMenu, .5, {opacity:1, marginTop:0, delay:.7, ease:Quad.easeOut});	
	TweenMax.to(_startBtn, .4, {autoAlpha:1, scaleX:1, scaleY:1, delay:2.0, ease:Back.easeOut, onComplete:listenStart});	
	TweenMax.to(_field, 1.2, {marginTop:0, delay:.9, onStart:showField, ease:Quad.easeOut});
	function showField(){_field.style.visibility = "visible";}
}
if ( ! window.console ) console = { log: function(){} };
var _timer;
var _finishLine;
var _ribbon;
var percentCompleted = 0, percentCompletedRaw = 0;
var _useSounds = true;
$(document).ready(function(){
	//Determine support for html5 features (canvas etc.)
	var _oldBrowser = document.getElementById("oldBrowser");
	try{
		document.getElementById('finishLine').getContext("2d");
		_oldBrowser.style.visibility = "hidden";
	} catch (e) {
		_oldBrowser.innerHTML = "You need a modern browser!<br />Please go and download one.<br />We recommend <a href='https://web.archive.org/web/20170702200804/http://www.google.com/chrome' title='Google Chrome'>Google Chrome</a>";
		document.getElementById('topTitle').style.visibility = "hidden";
		document.getElementById('topMenu').style.visibility = "hidden";
		document.getElementById('field').style.visibility = "hidden";
		return;
	}	
	_finishLine = new FinishLine();
	_timer = new Timer();
	_ribbon = new Ribbon();
	//showStats();
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) _useSounds = false;
	new Sounds();
	new Scroller();
});

var _bgSound, _startSound, _bipSound, _wheelSound, _cheerSound;
function Sounds(){
	if(_useSounds){
		_bgSound = new buzz.sound("Assets/Sound/baggrundsmelodi", {formats: ["ogg", "mp3"], preload:true, loop: true});
		_startSound = new buzz.sound("Assets/Sound/startshot", {formats: ["ogg", "mp3"], preload:true, loop: false});
		_bipSound = new buzz.sound("Assets/Sound/Bip", {formats: ["ogg", "mp3"], preload:true, loop: false});
		_wheelSound = new buzz.sound("Assets/Sound/whosh", {formats: ["ogg", "mp3"], preload:true, loop: false});
		_cheerSound = new buzz.sound("Assets/Sound/Cheering", {formats: ["ogg", "mp3"], preload:true, loop: false});
		//Start bg sound
		_bgSound.play();
	}
}
}
/*
     FILE ARCHIVED ON 20:08:04 Jul 02, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:49:44 Jan 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.519
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 30.041
  LoadShardBlock: 67.753 (3)
  PetaboxLoader3.datanode: 92.741 (5)
  PetaboxLoader3.resolve: 100.596 (3)
  load_resource: 201.568 (2)
*/