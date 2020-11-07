Intro = function(area,areaDest,callback){
	this.callback = callback;
	this.area = area;
	this.areaDest = areaDest;
	this.sheet = jQuery("#bollaIntro");
	this.sheetDragoVerde = jQuery("#sheetDragoVerdeBollaIntro");
	this.sheetDragoBlu = jQuery("#sheetDragoBluBollaIntro");
	this.bolleCreate = 0;
	this.stopRotazioneDraghi = false;
}

Intro.VELOCITA_BOLLE = 1.5;
Intro.DELAY_TRA_BOLLE = 40;
Intro.MAX_BOLLE = 120;
Intro.SFASO_ANGOLO_BOLLE = 3;
Intro.INCREMENTO_ANGOLO_BOLLE = 10;
Intro.DELAY_RUOTA_DRAGO = 30;

Intro.prototype.init = function(){
	this.creaDraghetti();
	this.creaBolle();
	this.scrittaSadOnTop();
}

Intro.prototype.scrittaSadOnTop = function(){
	jQuery(".scrittaSad").css("z-index",450)
}

Intro.prototype.creaDraghetti = function(){
	this.dragoVerde = new DragoIntro(this.sheetDragoVerde,jQuery("#dragoIntro"),this.area)
	this.dragoVerde.init();
	// lo posizione
	this.dragoVerde.setPosition({left:200,top:420});
	this.dragoVerde.mc.css("z-index",400)
	this.faiRuotare(this.dragoVerde,true);
	
	
	this.dragoBlu = new DragoIntro(this.sheetDragoBlu,jQuery("#dragoIntro"),this.area)
	this.dragoBlu.init();
	this.dragoBlu.setPosition({left:692,top:292});
	this.dragoBlu.mc.css("z-index",401)
	this.faiRuotare(this.dragoBlu,false);
	
}

Intro.prototype.faiRuotare = function(drago,antiClockWise){	
	var mc = drago.mc;
	
	if (antiClockWise){
		drago.angolo = 0;
		drago.incremento = -5;
	}else{
		drago.angolo = 0;
		drago.incremento = 5;
	}
	this.ruota(drago);
}

Intro.prototype.ruota = function(drago){
	var radianti = drago.angolo * (Math.PI/180)
	var pos = drago.getPosition();
	var endx = pos.left+drago.incremento*Math.cos(radianti);  // ipotetico raggio 
	var endy = pos.top+drago.incremento*Math.sin(radianti);  // ipotetico raggio 
	drago.setPosition({left:endx,top:endy});
	
	var ct = this;
	if (!this.stopRotazioneDraghi){
		setTimeout(function(){ct.incrementaAngoloDrago(ct,drago)} , Intro.DELAY_RUOTA_DRAGO);
	}
}

Intro.prototype.incrementaAngoloDrago = function(ct,drago){
	drago.angolo+=5;
	ct.ruota(drago);
}



Intro.prototype.creaBolle = function(){
	this.angolo = 0;
	this.n = 0;
	this.creaNextBolla();
}

Intro.prototype.creaNextBolla = function(){
	var bolla = new BollaIntro(this.sheet,jQuery("#bolla"),this.area);
	bolla.init();
	bolla.id = this.bolleCreate;
	bolla.setPosition({left:480,top:384}); // al centro
	bolla.mc.css("z-index",this.bolleCreate);
	var radianti = this.angolo * (Math.PI/180)
	var endx = Math.floor(480+500*Math.cos(radianti));  // ipotetico raggio di 500
	var endy = Math.floor(384+500*Math.sin(radianti));  // ipotetico raggio di 500
	TweenMax.to(bolla.mc,Intro.VELOCITA_BOLLE,{css:{left:endx,top:endy},onComplete:this.rimuoviBolla,onCompleteParams:[bolla,this],ease:Linear.easeNone});
	var ct = this;
	this.bolleCreate++;
	setTimeout(function(){ct.incrementaAngolo(ct)} , Intro.DELAY_TRA_BOLLE);
	
}

Intro.prototype.incrementaAngolo = function(ct){
	if (ct.bolleCreate <= Intro.MAX_BOLLE){
		if (ct.angolo > 360){
			ct.angolo = Intro.INCREMENTO_ANGOLO_BOLLE;
			ct.n = Intro.SFASO_ANGOLO_BOLLE;
		}
		ct.angolo += Intro.INCREMENTO_ANGOLO_BOLLE +ct.n;
		ct.creaNextBolla();
		ct.n+=Intro.SFASO_ANGOLO_BOLLE;
	}
	
}


Intro.prototype.rimuoviBolla = function(bolla,ct){
	bolla.mc.remove();
	if (bolla.id == Intro.MAX_BOLLE){
		ct.sfuma();
	}
}

Intro.prototype.sfuma = function(){
	this.areaDest.append(this.dragoBlu.mc);
	this.areaDest.append(this.dragoVerde.mc);
	TweenMax.to(this.area,2,{css:{opacity:0},onComplete:this.fineIntro,onCompleteParams:[this],ease:Linear.easeNone});	
}

Intro.prototype.fineIntro = function(ct){
	ct.idallinea = setInterval(function(){ct.allineaDraghi(ct)} , 30);
}

Intro.prototype.allineaDraghi = function(ct){
	if (Math.abs(ct.dragoVerde.mc.position().top  - ct.dragoBlu.mc.position().top) < 10){
		clearInterval(ct.idallinea);
		ct.stopRotazioneDraghi = true;
		ct.callback(ct.dragoVerde,ct.dragoBlu);
	}
}