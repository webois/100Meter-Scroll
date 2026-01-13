var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function Ribbon(){
	//Ribbon used for end screen
	this.drawRibbon = function(_canvas, _w, _h){
		_ctx = _canvas.getContext('2d');
		var _blurOffsetY = 5;
		//Draw shadow
		_ctx.fillStyle="rgba(0, 0, 0, 0.2)";
		_ctx.fillRect(20,_h,_w-40,_blurOffsetY);		
		
		//Shade left
		_ctx.fillStyle="#7A1900";
		_ctx.beginPath();
		_ctx.moveTo(0,_h);
		_ctx.lineTo(20,_h);
		_ctx.lineTo(20,_h+10);
		_ctx.lineTo(0,_h);
		_ctx.fill();
		
		//Shade right
		_ctx.fillStyle="#7A1900";
		_ctx.beginPath();
		_ctx.moveTo(_w-20,_h);
		_ctx.lineTo(_w,_h);
		_ctx.lineTo(_w-20,_h+10);
		_ctx.lineTo(_w-20,_h);
		_ctx.fill();
		
		//Solid square
		_ctx.fillStyle="#EF2000";
		_ctx.fillRect(0,0,_w,_h);
	}
	
	//Label used for top title
	this.drawRibbonLabel = function(_canvas, _w, _h){
		_ctx = _canvas.getContext('2d');
		var _wingW = _w * .12;
		var _centerW = _w * .72;
		var _centerX = _w*.5 - _centerW*.5;
		var _offsetY = 16, _blurOffsetX = 12, _blurOffsetY = 12;
				
		//Draw shadow
		_ctx.fillStyle="rgba(0, 0, 0, 0.2)";
		_ctx.beginPath();
		_ctx.moveTo(_blurOffsetX, _offsetY + _blurOffsetY);
		_ctx.lineTo(_w+_blurOffsetX,_offsetY+_blurOffsetY);
		_ctx.lineTo(_w-20+_blurOffsetX,_offsetY+_blurOffsetY+_h*.5);
		_ctx.lineTo(_w+_blurOffsetX,_offsetY+_blurOffsetY+_h);
		_ctx.lineTo(_blurOffsetX,_offsetY+_blurOffsetY+_h);
		_ctx.lineTo(20+_blurOffsetX,_offsetY+_blurOffsetY+_h*.5);
		_ctx.lineTo(_blurOffsetX,_offsetY+_blurOffsetY);
		_ctx.fill();
		
		//Left wing
		_ctx.fillStyle="#7DBBDC";
		_ctx.beginPath();
		_ctx.moveTo(0, _offsetY);
		_ctx.lineTo(_wingW*2,_offsetY);
		_ctx.lineTo(_wingW*2,_offsetY+_h);
		_ctx.lineTo(0,_offsetY+_h);
		_ctx.lineTo(20,_offsetY+_h*.5);
		_ctx.lineTo(0,_offsetY);
		_ctx.fill();
		
		//Right wing
		_ctx.fillStyle="#7DBBDC";
		_ctx.beginPath();
		_ctx.moveTo(_w-_wingW*2, _offsetY);
		_ctx.lineTo(_w,_offsetY);
		_ctx.lineTo(_w-20,_offsetY+_h*.5);
		_ctx.lineTo(_w,_offsetY+_h);
		_ctx.lineTo(_w-_wingW*2,_offsetY+_h);
		_ctx.lineTo(_w-_wingW*2,_offsetY);
		_ctx.fill();
		
		//Center square
		_ctx.fillStyle="#88CDF1";
		_ctx.fillRect(_centerX,0,_centerW,_h);
		
		//Black triangles in between
		_ctx.fillStyle="#6190A9";
		_ctx.beginPath();
		_ctx.moveTo(_centerX, _h);
		_ctx.lineTo(_wingW*2, _h);
		_ctx.lineTo(_wingW*2, _h+_offsetY);
		_ctx.lineTo(_centerX, _h);
		_ctx.fill();
		_ctx.beginPath();
		_ctx.moveTo(_w-_wingW*2, _h);
		_ctx.lineTo(_centerX+_centerW, _h);
		_ctx.lineTo(_w-_wingW*2, _h+_offsetY);
		_ctx.lineTo(_w-_wingW*2, _h);
		_ctx.fill();		
	}
}
}
/*
     FILE ARCHIVED ON 16:27:26 Jul 02, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:49:44 Jan 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.553
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.009
  esindex: 0.012
  cdx.remote: 4.983
  LoadShardBlock: 77.504 (3)
  PetaboxLoader3.datanode: 134.433 (5)
  load_resource: 171.621 (2)
  PetaboxLoader3.resolve: 90.648 (2)
*/