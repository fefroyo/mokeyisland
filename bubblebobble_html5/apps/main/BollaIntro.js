BollaIntro = function(sheet,template,area){
	this.sheet = sheet;
	this.template = template;
	this.area = area;
	this.mc = undefined;
	this.animSet = new Array();
}

BollaIntro.ID = 0;

BollaIntro.TEMPO_FOTOGRAMMI = 250;


BollaIntro.prototype.init = function(){
	this.creaBollaIntro();
	this.setNascita();
	this.nasci();
}

BollaIntro.prototype.nasci = function(){
	this.draw();
}

BollaIntro.prototype.setPosition = function(pos){
	this.mc.css({left:pos.left,top:pos.top});
}

BollaIntro.prototype.getPosition = function(){
	return this.mc.position();
}

BollaIntro.prototype.draw = function(){
	this.animSet[0].play();
}


BollaIntro.prototype.creaBollaIntro = function(){
	BollaIntro.ID++;
	this.mc = this.template.clone();
	this.mc.attr("id","bollaIntro"+BollaIntro.ID);
	this.area.append(this.mc);
}

BollaIntro.prototype.setNascita = function(){
	var nascita = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 0;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = BollaIntro.TEMPO_FOTOGRAMMI;
	var frame = new SocaFrame(oInit);
	nascita.push(frame);

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	nascita.push(frame);
	
	oInit.x = 128;
	frame = new SocaFrame(oInit);
	nascita.push(frame);
	
	oInit.x = 192;
	frame = new SocaFrame(oInit);
	nascita.push(frame);
	
	oInit.x = 256;
	frame = new SocaFrame(oInit);
	nascita.push(frame);

	oInit.x = 320;
	frame = new SocaFrame(oInit);
	nascita.push(frame);
	
	var soca = new SocaAnim(nascita,this.sheet,this.mc)
	this.animSet.push(soca);

}

