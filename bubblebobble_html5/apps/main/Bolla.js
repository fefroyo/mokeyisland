Bolla = function(sheet,template,area){
	this.sheet = sheet;
	this.template = template;
	this.area = area;
	this.mc = undefined;
	this.animSet = new Array();
	this.lastStatus = undefined;
	this.currentStatus = Bolla.NASCE
	this.toGarbage = false;
}

Bolla.ID = 0;

Bolla.TEMPO_FOTOGRAMMI_NASCITA = 70;
Bolla.TEMPO_FOTOGRAMMI_IDLE = 200;
Bolla.TEMPO_FOTOGRAMMI_ESPLODE = 50;

Bolla.NASCE = 0;
Bolla.IDLE = 1;
Bolla.ESPLODE = 2;

Bolla.TEMPO_RISALITA_MASSIMO = 8;
Bolla.DISTANZA_MASSIMA_DI_RISALITA = 704;
Bolla.QUANTO_DURA_IL_POP = 500;


Bolla.prototype.init = function(){
	this.creaBolla();
	this.setNascita();
	this.setIdle();
	this.setEsplode();
	this.nasci();
}

Bolla.prototype.nasci = function(){
	this.currentStatus = Bolla.NASCE;
	this.draw();
}

Bolla.prototype.idle = function(){
	this.currentStatus = Bolla.IDLE;
	this.draw();
}

Bolla.prototype.esplodi = function(){
	this.currentStatus = Bolla.ESPLODE;
	this.draw();
	var ct = this;
	this.ides = setTimeout(function(){ct.fineEsplosione(ct)} , Bolla.QUANTO_DURA_IL_POP);
}

Bolla.prototype.setPosition = function(pos){
	this.mc.css({left:pos.left,top:pos.top});
}

Bolla.prototype.getPosition = function(){
	return this.mc.position();
}


Bolla.prototype.draw = function(){
	if (this.lastStatus != this.currentStatus){
		if (this.lastStatus != undefined){
			// Stoppa l'animazione corrente
			this.animSet[this.lastStatus].stop();
		}
		this.animSet[this.currentStatus].play();
		this.lastStatus = this.currentStatus;
	}
}


Bolla.prototype.creaBolla = function(){
	Bolla.ID++;
	this.mc = this.template.clone();
	this.mc.attr("id","bolla"+Bolla.ID);
	this.area.append(this.mc);
}

Bolla.prototype.setNascita = function(){
	var nascita = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 0;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Bolla.TEMPO_FOTOGRAMMI_NASCITA;
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

Bolla.prototype.setIdle = function(){
	var idle = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 64
	oInit.y = 64;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Bolla.TEMPO_FOTOGRAMMI_IDLE;
	var frame = new SocaFrame(oInit);
	idle.push(frame);

	/*oInit.x = 64;
	frame = new SocaFrame(oInit);
	idle.push(frame);
	
	oInit.x = 128;
	frame = new SocaFrame(oInit);
	idle.push(frame);
	*/
	
	var soca = new SocaAnim(idle,this.sheet,this.mc)
	this.animSet.push(soca);

}

Bolla.prototype.setEsplode = function(){
	var esplode = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 192
	oInit.y = 64;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Bolla.TEMPO_FOTOGRAMMI_IDLE;
	var frame = new SocaFrame(oInit);
	esplode.push(frame);

	oInit.x = 256;
	frame = new SocaFrame(oInit);
	esplode.push(frame);
	
	var soca = new SocaAnim(esplode,this.sheet,this.mc)
	this.animSet.push(soca);

}

Bolla.prototype.fineEsplosione = function(ct){
	ct.toGarbage = true;
}