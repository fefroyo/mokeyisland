SocaAnim = function(aFrames,spriteSheet,area,startFrom){
	this.aFrames = aFrames;
	this.spriteSheet = spriteSheet;
	this.url = this.spriteSheet.attr("src");
	this.lastUrl = undefined;
	this.area = area;
	this.currentFrame = startFrom;	
	if (Pqp.isNull(startFrom)){
		this.currentFrame = 0;
	}
	this.startFrom = this.currentFrame;
	this.idto = -1;
	
}

SocaAnim.prototype.play = function(){
	if (this.idto != -1){
		this.stop();
	}
	if (this.lastUrl != this.url){
		this.area.css("background-image","url('"+this.url+"')")
		this.lastUrl = this.url;
	}
	this.currentFrame = this.startFrom;	
	this.draw();
}

SocaAnim.prototype.preNextFrame = function(ct){
	ct.nextFrame();
}

SocaAnim.prototype.nextFrame = function(){
	this.currentFrame++;
	if (this.currentFrame > this.aFrames.length-1){
		this.currentFrame = 0;
	}
	this.draw();
}

SocaAnim.prototype.draw = function(){	
	var frame = this.aFrames[this.currentFrame];
	this.area.css("background-position", (-frame.x) +"px "+(-frame.y)+"px");
	if (this.aFrames.length > 1){
		var ct = this;
		this.idto = setTimeout(function(){ct.preNextFrame(ct)} , frame.lastsFor);
	}
}

SocaAnim.prototype.pause = function(){
	
}

SocaAnim.prototype.stop = function(){
	clearTimeout(this.idto);
	this.idto = -1;
}