DragoIntro = function(sheet,template,area){
	this.sheet = sheet;
	this.template = template;
	this.area = area;
	this.mc = undefined;
	this.animSet = new Array();
}

DragoIntro.ID = 0;

DragoIntro.TEMPO_FOTOGRAMMI = 150;


DragoIntro.prototype.init = function(){
	this.creaDragoIntro();
	this.setNascita();
	this.nasci();
}

DragoIntro.prototype.nasci = function(){
	this.draw();
}

DragoIntro.prototype.setPosition = function(pos){
	this.mc.css({left:pos.left,top:pos.top});
}

DragoIntro.prototype.getPosition = function(){
	return this.mc.position();
}

DragoIntro.prototype.draw = function(){
	this.animSet[0].play();
}


DragoIntro.prototype.creaDragoIntro = function(){
	DragoIntro.ID++;
	this.mc = this.template.clone();
	this.mc.attr("id","dragoIntro"+DragoIntro.ID);
	this.area.append(this.mc);
}

DragoIntro.prototype.setNascita = function(){
	var nascita = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 0;
	oInit.width = 128;
	oInit.height = 128;
	oInit.lastsFor = DragoIntro.TEMPO_FOTOGRAMMI;
	var frame = new SocaFrame(oInit);
	nascita.push(frame);

	oInit.x = 128;
	frame = new SocaFrame(oInit);
	nascita.push(frame);
	
	
	var soca = new SocaAnim(nascita,this.sheet,this.mc)
	this.animSet.push(soca);

}

