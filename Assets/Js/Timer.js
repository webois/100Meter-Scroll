var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function Timer(){
	var _this = this;
	//Get time field
	var _timeField = document.getElementById("time");
	//Get m/s field
	var _msField = document.getElementById("ms");
	var _countInterval = 0, _speedInterval = 0, _lastMeter = 0, _miliseconds = 0, _speed = 40, _isMobile = false;	
	
	this.start = function(){
		_time = 0;
		_timeField.style.textAlign = "left";
		if(_isMobile == true) _timeField.style.paddingLeft = "20px";
		else _timeField.style.paddingLeft = "32px";
		_countInterval = setInterval(count, _speed);
		_speedInterval = setInterval(countSpeed, 250);
		_msField.innerHTML = "0 M/SEC";
	}
	
	this.updatePadding = function(_mobile){
		_isMobile = _mobile;
	}
	
	this.stop = function(){
		clearInterval(_countInterval);
		clearInterval(_speedInterval);
	}
	
	this.getTotalTime = function(_rawFormat){
		if(_miliseconds < 2000) _miliseconds = 10000; //cheater...!
		if(_rawFormat) return _miliseconds;
		else return formatTime();
	}
	
	this.reset = function(){
		_countInterval = 0, _speedInterval = 0, _lastMeter = 0, _miliseconds = 0, _speed = 40;
		_msField.innerHTML = "0 M/SEC";
		_timeField.innerHTML = "00:00:00";
	}
	
	//Count up
	function count(){
		_miliseconds += _speed;
		_timeField.innerHTML = formatTime() + "";
	}
	
	//Calculate meters moved during last half second	
	function countSpeed(){
		//_msField.innerHTML = (Math.round(percentCompleted - _lastMeter) * 4) + " M/SEC";
		_msField.innerHTML = (Math.round((percentCompletedRaw - _lastMeter) * 4 * 10) / 10) + " M/SEC";
		_lastMeter = percentCompletedRaw;
	}
	
	function formatTime(){
		var _allSeconds = _miliseconds / 1000;
		var _remain = Math.floor(_miliseconds%1000 / 10);
		var _minutes = Math.floor(_allSeconds/60);
		var _seconds = Math.floor(_allSeconds%60);
		var _finalStr = "";
		if(_minutes < 10) _finalStr += "0" + _minutes;
		else _finalStr += _minutes;
		_finalStr += ":";
		if(_seconds < 10) _finalStr += "0" + _seconds;
		else _finalStr += _seconds;		
		if(_remain < 10) _finalStr += ":0" + _remain;
		else _finalStr += ":" + _remain;
		return _finalStr;
	}
}
}
/*
     FILE ARCHIVED ON 16:50:00 Jul 02, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:49:44 Jan 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.516
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.009
  esindex: 0.01
  cdx.remote: 6.883
  LoadShardBlock: 174.584 (3)
  PetaboxLoader3.datanode: 253.506 (5)
  load_resource: 204.073 (2)
  PetaboxLoader3.resolve: 119.779 (2)
*/