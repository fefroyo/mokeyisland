var ID_DEMO = "bb"
var dragoVerde;
var dragoBlu;
var joyVerde;
var joyBlu;
var idml;
var mossi;
var lMobile = false;
var currentDragoMobile = 0;

function appReady(){
  showPreloaderapp();
  Global._app.hide();
  preloadImages();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		lMobile = true;
	}
	//lMobile = true;	
	//setLabels();

	hideMobileControllers(true);
	
}

function setLabels(){
	if (!lMobile){
		jQuery("#istruzioni label").html("<b>Bubblun</b> (the green dragon) keys: <b>D</b> left, <b>F</b> right, <b>A</b> fire, <b>S</b> jump<br><b>Bobblun</b> (the blue dragon) keys: <b>Arrow Left</b> left, <b>Arrow Right</b> right, <b>;</b> fire, <b>:</b> jump<br>The purpose of this demo is only to test html+js animations so you can't do much more than moving, jumping and firing bubbles, and... no, you can't jump on bubbles or break them! ;-)");
	}else{
		jQuery("#istruzioni label").html("Use <b>left</b> and <b>right</b> arrows on screen to move <b>Bubblun</b>: make him <b>jump</b> or <b>fire</b> by pressing the <b>buttons</b> on the left.<br>You can switch from controlling <b>Bubblun</b> (the green dragon) to <b>Bobblun</b> (the blue dragon) by pressing the icons on the right side.<br>The purpose of this demo is only to test html+js animations so you can't do much more than moving, jumping and firing bubbles, and... no, you can't jump on bubbles or break them! ;-)");
	}
}


function hideMobileControllers(lHide){
	if (lHide){
		jQuery("#arrowLeft").hide();
		jQuery("#arrowRight").hide();
		jQuery("#arrowJump").hide();
		jQuery("#arrowFire").hide();
		jQuery("#selectVerde").hide();
		jQuery("#selectBlu").hide();
	}else{
		jQuery("#arrowLeft").show();
		jQuery("#arrowRight").show();
		jQuery("#arrowJump").show();
		jQuery("#arrowFire").show();
		jQuery("#selectVerde").show();
		jQuery("#selectBlu").show();
	}
}


function preloadImages(){
	var images = new Array();
	images.push(jQuery("#sfondo").attr("src"));
	images.push(jQuery("#sheetDragoVerdeBolle").attr("src"));
	images.push(jQuery("#sheetDragoBluBolle").attr("src"));
	images.push(jQuery("#sheetDragoVerde").attr("src"));
	images.push(jQuery("#sheetDragoBlu").attr("src"));
	images.push(jQuery("#bollaIntro").attr("src"));
	images.push(jQuery("#sheetDragoVerdeBollaIntro").attr("src"));
	images.push(jQuery("#sheetDragoBluBollaIntro").attr("src"));
	images.push(jQuery("#imgArrowLeft").attr("src"));
	images.push(jQuery("#imgArrowRight").attr("src"));
	images.push(jQuery("#imgArrowJumpFire").attr("src"));
	images.push(jQuery("#imgSelectVerde").attr("src"));
	images.push(jQuery("#imgSelectBlu").attr("src"));
	
  jQuery.imgpreload(images,{
		all: imagesPreloaded
  },null);  
}

function imagesPreloaded(){
	// attende ancora un paio di secondi così magari carica l'audio
	setTimeout(attendiAudio,3000);
}

function attendiAudio(){
	initAudio();
	allReady();
}

function allReady(){
  hidePreloaderapp();
  Global._app.show();
	showIntro();
}

function showIntro(){
	mossi = 0;
	var intro = new Intro(jQuery("#intro"),jQuery("#screen"),introFinished);
	intro.init();
}

function introFinished(dragoVerdeIntro,dragoBluIntro){
	jQuery("#intro").hide();
	creaDraghi();
	spostaDrago(dragoVerdeIntro,dragoVerde)
	spostaDrago(dragoBluIntro,dragoBlu)
}

function creaDraghi(){
	dragoVerde = new Drago(jQuery("#dragoVerde"),jQuery("#sheetDragoVerde"),jQuery("#sheetDragoVerdeBolle"),jQuery("#audioFireVerde audio"),jQuery("#audioJumpVerde audio"));
	dragoVerde.init();
	dragoVerde.mc.hide();
	dragoBlu = new Drago(jQuery("#dragoBlu"),jQuery("#sheetDragoBlu"),jQuery("#sheetDragoBluBolle"),jQuery("#audioFireBlu audio"),jQuery("#audioJumpBlu audio"),Drago.DIRECTION_LEFT);
	dragoBlu.init();
	dragoBlu.mc.hide();
}


function muoviVerde(combinazione){
	muovi(dragoVerde,combinazione);
}


function muoviBlu(combinazione){
	muovi(dragoBlu,combinazione);
}

function initAudio(){
	startIntroAudio();
}
function startIntroAudio(){
	var intro = jQuery("#audioIntro audio");
	intro.get(0).play();
	intro.get(0).addEventListener('ended', function(){
		mainLoopAudio();
	}, false);	
}

function mainLoopAudio(){
	var theme = jQuery("#audioTheme audio");
	theme.get(0).play();
}

function spostaDrago(fromDrago,toDrago){
	toDrago.mc.show();
	var pos = toDrago.getPosition();
	toDrago.mc.hide();
	TweenMax.to(fromDrago.mc,2,{css:{left:pos.left-32,top:pos.top-32},onComplete:popDrago,onCompleteParams:[fromDrago,toDrago]});
	
}

function popDrago(fromDrago,toDrago){
	mossi++;
	fromDrago.mc.remove();
	toDrago.mc.show();
	if (mossi == 2){		
		fineIntro();
	}
}

function fineIntro(){
	initControllers();
	initMainLoop();
	joyVerde.init();
	joyBlu.init();
	if (lMobile){
		attivaVerde()
	}
	setLabels();
}

function setSceltaDrago(){
	var verde = jQuery("#selectVerde");
	var blu = jQuery("#selectBlu");
	if (currentDragoMobile == 0){
		verde.css("opacity",0.5);
		blu.css("opacity",1);
		blu.on("click",attivaBlu);
		verde.off("click",attivaVerde);
	}else{
		verde.css("opacity",1);
		blu.css("opacity",0.5);
		verde.on("click",attivaVerde);
		blu.off("click",attivaBlu);
	}
}

function attivaVerde(){
	currentDragoMobile = 0;
	setSceltaDrago();
	joyVerde.interactive(true);
	joyBlu.interactive(false);
}

function attivaBlu(){
	currentDragoMobile = 1;
	setSceltaDrago();
	joyVerde.interactive(false);
	joyBlu.interactive(true);
	
}

function initControllers(){
	if (!lMobile){
		joyVerde = new Input(muoviVerde,68,70,83,65)
		joyBlu = new Input(muoviBlu,37,39,190,188)
	}else{
		hideMobileControllers(false);
		joyVerde = new InputMobile(muoviVerde,jQuery("#arrowLeft"),jQuery("#arrowRight"),jQuery("#arrowJump"),jQuery("#arrowFire"));
		joyBlu = new InputMobile(muoviBlu,jQuery("#arrowLeft"),jQuery("#arrowRight"),jQuery("#arrowJump"),jQuery("#arrowFire"));
	}
}

function initMainLoop(){
	idml = setInterval(mainLoop,18);
}
