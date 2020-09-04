//Javascript レスポンシブ
$(function(){
    var ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
    } else {
        $('head').prepend('<meta name="viewport" content="width=745">');
    }
});

//-----------------------------------------------------------------
// 紙吹雪
//-----------------------------------------------------------------
function confetti() {
// Setting constants thar can be adjusted.
const NUM = 40;      // number of element
const MSEC = 30;     // update interval(millimeters second)
const MAX_SIZE = 15; // maximum size(pixel)
const MIN_SIZE = 5;  // minimum size(pixel)
const DROP = 1.2;      // drop speed
const AMPL = 0.08;   // amplitude rate
const WIND = 0;      // quantity of wind(positive:right,negative:left)
const PLC = 0;       // place to display
                     // (0:all, 1:center, 2:right, 3:left)
//-----------------------------------------------------------------
const OBJ = new Array(); // stores the information of the object
var sizew = new Array(); // width of the image
var sizeh = new Array(); // height of the image
var posx = new Array();  // x coordinate position
var posy = new Array();  // y coordinate position
var ampl = new Array();  // stores a value of the amplitude
var steps = new Array(); // value of the amplitude every step
var speed = new Array(); // speed to fall
var freq = new Array();  // condition of the frequency
var ang = new Array();   // set the angle
var type = new Array();  // set rotate type
var winx = 1200;          // width of the window(default:800px)
var winy = 600;          // height of the window(default:600px)

// Output of the element.
for( var i=0; i<NUM; i++ ){
  const ADD_DIV = document.createElement('div');
  ADD_DIV.setAttribute('id','Lay'+i);
  const DIVS = ADD_DIV.style;
  DIVS.position = 'fixed';
  DIVS.left = '-50px';
  DIVS.top  = '-50px';
  DIVS.width  = MAX_SIZE+'px';
  DIVS.height = MAX_SIZE+'px';
  DIVS.backgroundColor = '#fff';
  document.body.appendChild(ADD_DIV);
}

// Initial setting of the variable.
var le = 0;        // position from the left edge
var dw = 0;        // size of the width to display
var ms = MAX_SIZE; // largest size in the image
//document.addEventListener('DOMContentLoaded',initSet,false);
initSet();
function initSet(){
  getWindowSize();
  const RANGE_SIZE = MAX_SIZE-MIN_SIZE+1;
  if(PLC==0)     { dw = winx-ms;   le = 0; }      //all
  else if(PLC==1){ dw = winx/3;    le = winx/3; } //center
  else if(PLC==2){ dw = winx/2-ms; le = winx/2; } //right
  else if(PLC==3){ dw = winx/2;    le = 0; }      //left
  for( var i=0; i<NUM; i++ ){
    ampl[i]  = Math.random()*(Math.PI*2);
    steps[i] = Math.random()*0.1+AMPL;
    speed[i] = Math.floor(Math.random()*5)+DROP;
    freq[i]  = Math.floor(Math.random()*3)+2;
    ang[i] = 0;
    type[i] = Math.floor(Math.random()*4);
    sizew[i] = Math.floor(Math.random()*RANGE_SIZE+MIN_SIZE);
    sizeh[i] = sizew[i];
    posx[i] = Math.floor(Math.random()*dw)+le;
    posy[i] = Math.floor(Math.random()*(winy-sizeh[i]));
    OBJ[i] = document.getElementById('Lay'+i).style;
    OBJ[i].zIndex = Math.floor(Math.random()*NUM);
    OBJ[i].left = posx[i] + 'px';
    OBJ[i].top  = posy[i] + 'px';
    OBJ[i].width  = sizew[i] + 'px';
    OBJ[i].height = sizeh[i] + 'px';
    OBJ[i].backgroundColor = setColor();
  }
  Moves();
}

// Main routine,Moving images.
function Moves(){
  getWindowSize();
  if(PLC==0)     { dw = winx-ms;   le = 0; }      //all
  else if(PLC==1){ dw = winx/3;    le = winx/3; } //center
  else if(PLC==2){ dw = winx/2-ms; le = winx/2; } //right
  else if(PLC==3){ dw = winx/2;    le = 0; }      //left
  for( var i=0; i<NUM; i++ ){
    ampl[i] += steps[i];
    posx[i] += Math.sin(ampl[i])*freq[i]+WIND;
    posy[i] += Math.cos(Math.PI/180)*speed[i];
    ang[i] = (ang[i]%360)+5;

    if( posx[i]>winx || posy[i]>winy ){
      posx[i] = Math.floor(Math.random()*dw)+le;
      posy[i] = -50;
      type[i] = Math.floor(Math.random()*4);
      OBJ[i].backgroundColor = setColor();
    }
    rotateElem( i, type[i], ang[i] );
    OBJ[i].left = posx[i] + 'px';
    OBJ[i].top  = posy[i] + 'px';
  }
  setTimeout( Moves, MSEC );
}

// Rotate the element.(*)
function rotateElem( n, t, ang ){
  if( t==0 ){
    OBJ[n].transform       = 'rotate('+ang+'deg)';
    OBJ[n].MozTransform    = 'rotate('+ang+'deg)';
    OBJ[n].WebkitTransform = 'rotate('+ang+'deg)';
    OBJ[n].msTransform     = 'rotate('+ang+'deg)';
  }else if( t==1 ){
    OBJ[n].transform       = 'rotateX('+ang+'deg)';
    OBJ[n].MozTransform    = 'rotateX('+ang+'deg)';
    OBJ[n].WebkitTransform = 'rotateX('+ang+'deg)';
  }else if( t==2 ){
    OBJ[n].transform       = 'rotateY('+ang+'deg)';
    OBJ[n].MozTransform    = 'rotateY('+ang+'deg)';
    OBJ[n].WebkitTransform = 'rotateY('+ang+'deg)';
  }else if( t==3 ){
    OBJ[n].transform       = 'rotate3D(1,0,1,'+ang+'deg)';
    OBJ[n].MozTransform    = 'rotate3D(1,0,1,'+ang+'deg)';
    OBJ[n].WebkitTransform = 'rotate3D(1,0,1,'+ang+'deg)';
  }
  else return;
}

// c.sort(function(){}) : 並び替え方法を示す関数
// 戻り値が正数なら昇順、負数なら降順、省略は文字コード順
// Color settings.
function setColor(){ 
  var c = new Array(3);
  c[0] = Math.floor(255);
  c[1] = Math.floor(Math.random()*256);
  c[2] = Math.floor(Math.random()*(256-c[1]/2));
  c[0] = ('0' + c[0].toString(16)).slice(-2);
  c[1] = ('0' + c[1].toString(16)).slice(-2);
  c[2] = ('0' + c[2].toString(16)).slice(-2);
  c.sort(
    function(){
      var n = [1,'',-1];
      return (n[Math.floor(Math.random()*3)]);
    }
  );
  return ('#'+c[0]+c[1]+c[2]);
}

// Get size of the window.
window.addEventListener('resize',getWindowSize,false);
function getWindowSize(){
  const propType = (document.documentElement)?
    document.documentElement:document.body;
  if( typeof window.innerWidth != 'number' ){
    winx = window.innerWidth-18;
    winy = window.innerHeight-18;
  }else{
    winx = propType.clientWidth;
    winy = propType.clientHeight;
  }
}
}





/*-----------------------------------------------------
下から上にスクロール
-------------------------------------------------------*/	
// ボディを取得
let elBody = document.querySelector('.background-layer-pc','.background-layer-sp');

// バックグラウンドポジションの設定
let bgh = '-' + elBody.clientHeight + 'px';
elBody.style.backgroundPositionY = bgh;

// スクロールイベントの制御
var timeoutId ;

window.addEventListener( "scroll", function () {
	// setTimeout()がセットされていたら無視
	if ( timeoutId ) return ;

	timeoutId = setTimeout( function () {
		timeoutId = 0 ;
		// 処理内容
    bgMove();
	}, 30 ) ;
} ) ;

function bgMove () {
	if(window.pageYOffset >= document.querySelector('#bg-stop').offsetTop) {
		confetti();
    return;
	}
  // ここで計算
    elBody.style.backgroundPositionY = - elBody.clientHeight + window.pageYOffset * 2.2 +'px';
//  console.log(window.pageYOffset);
}

/*-----------------------------------------------------
navigation for PC  ※スクロール時非表示
-------------------------------------------------------*/
$(function(){
	$(window).on("scroll",function(){
		$(".site-header").stop();
		$(".site-header").css('display','none').delay(500).fadeIn('fast');
	});
});


/*-----------------------------------------------------
scrollTo  ※指定の位置に移動
-----------------------------------------------*/
$(function(){	
  $('.global-nav__item a[href^="#"]').click(function(){
    var speed = 2500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var header = $('header').height();
    var position = target.offset().top - header - 80;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
	
var headerHeight = $('.site-header').outerHeight();
var urlHash = location.hash;
if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function(){
        var target = $(urlHash);
        var position = target.offset().top - headerHeight - 40;
        $('body,html').stop().animate({scrollTop:position}, 2800);
    }, 100);
}
});


/*-----------------------------------------------------
navigation for SP ※ハンバーガーメニュー
-------------------------------------------------------*/

$(".btn-trigger").on("click",function(){
		$(this).toggleClass("active");
		$(".header_nav").fadeToggle(500);
});
