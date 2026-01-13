var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function FinishLine(){
	var _this = this;
	var _canvas = document.getElementById('finishLine');
	var _ctx = _canvas.getContext('2d');
	var _offsetX = 150-30, _offsetY = 100, _w = 0, _h = 500, radius = 16;
	_this._centerY = 20, _this._endX = 0, _this._endY = 0;
	
	this.resized = function(_new, _sh){
		_w = _new + 60;
		_canvas.setAttribute('width', _new + _offsetX*2 + 60 + 'px');
		_canvas.setAttribute('height', _h + 'px');
		_canvas.style.top = (_sh-160) + "px";
		reDraw();
	}
	
	this.render = function(){
		_this._centerY = 20, _this._endX = 0, _this._endY = 0;
		reDraw();
	}
	
	this.ripOver = function(){
		TweenMax.to(_this, .3, {_centerY:150, onUpdate:reDraw, ease:Linear.easeNone, onComplete:ripOverB});
	}
	
	function ripOverB(){
		_this._endY = _offsetY + _this._centerY;
		_this._endX = _w * .5;
		TweenMax.to(_this, 1.4, {_centerY:300, _endX:0, onUpdate:split, ease:Elastic.easeOut});
	}
	
	function reDraw(){	
		_ctx.clearRect(0, 0, _w + _offsetX*2+60, _h);
		shades();
		_ctx.strokeStyle="#ED1C24";
		_ctx.lineWidth = 10;
		_ctx.beginPath();	  
		//First part
		_ctx.bezierCurveTo(_offsetX, _offsetY, _w*.25+_offsetX, _this._centerY + _offsetY, _w * .5+_offsetX, _offsetY + _this._centerY * .9);
		//Second part
		_ctx.bezierCurveTo(_offsetX+_w*.5, _offsetY + _this._centerY * .9, _offsetX+_w*.75, _this._centerY + _offsetY, _offsetX+_w, _offsetY);
		_ctx.stroke();
		drawBars();
	}	
	function shades(){
		_ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
		_ctx.shadowBlur = 0;
		_ctx.shadowOffsetX = 8;
		_ctx.shadowOffsetY = 8;
	}
	function drawBars(){
		_ctx.fillStyle = "#FFC300";
		_ctx.beginPath();
		_ctx.arc(_offsetX, 100, radius, 0, 2 * Math.PI, false);
		_ctx.arc(_w + _offsetX, 100, radius, 0, 2 * Math.PI, false);
		_ctx.fill();
	}		
	function split(){
		_ctx.clearRect(0, 0, _w + _offsetX*2+60, _h);
		shades();
		_ctx.strokeStyle="#ED1C24";
		_ctx.lineWidth = 10;		
		//Split and draw two
		_ctx.beginPath();
		//First part
		_this._endY = _offsetY + _this._centerY;
		_ctx.bezierCurveTo(_offsetX, _offsetY, _this._endX*.25+_offsetX, _this._endY-10, _this._endX+_offsetX, _this._endY);
		_ctx.stroke();
		//Second part
		_ctx.beginPath();  
		_ctx.bezierCurveTo((_w + _offsetX) - _this._endX, _this._endY, _offsetX+(_w-_this._endX*.75), _this._endY - 10, _offsetX+_w, _offsetY);
		_ctx.stroke();
		drawBars();
	}
	//Render
	reDraw();
}
}
/*
     FILE ARCHIVED ON 20:32:11 Jul 02, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:49:44 Jan 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.568
  exclusion.robots: 0.014
  exclusion.robots.policy: 0.006
  esindex: 0.009
  cdx.remote: 25.972
  LoadShardBlock: 71.232 (3)
  PetaboxLoader3.datanode: 117.066 (5)
  load_resource: 141.268 (2)
  PetaboxLoader3.resolve: 84.625 (2)
*/