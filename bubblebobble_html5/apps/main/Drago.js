Drago = function(mc,sheet,sheetBolle,audioFire,audioJump,direction){
	this.mc = mc;
	this.sheet = sheet;
	this.sheetBolle = sheetBolle;
	this.audioFire = audioFire;
	this.audioJump = audioJump;
	if (Pqp.isNull(direction)){
		this.direction = Drago.DIRECTION_RIGHT;
	}else{
		this.direction = direction;
	}
	
	this.lastStatus = undefined;
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_IDLE_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_IDLE_LEFT;
	}
	
	//
	this.animSet = new Array();
	//
	this.isIdle = true;
	this.mustJump = false;
	this.isJumping = false;
	this.isFalling = false;
	this.isWalking = false;
	this.mustFire = false;
	this.isFiring = false;
	this.jumpDirection = -1;
	
	this.idmovimento = -1;
	this.jumpIsWalking = false;
	
	this.idrf = -1;
}

Drago.STATUS_IDLE_LEFT = 0;
Drago.STATUS_IDLE_RIGHT = 1;
Drago.STATUS_WALK_LEFT = 2;
Drago.STATUS_WALK_RIGHT = 3;
Drago.STATUS_FIRE_LEFT = 4;
Drago.STATUS_FIRE_RIGHT = 5;
Drago.STATUS_JUMP_LEFT = 6;
Drago.STATUS_JUMP_RIGHT = 7;
Drago.STATUS_FALL_LEFT = 8;
Drago.STATUS_FALL_RIGHT = 9;

Drago.DIRECTION_LEFT = 0;
Drago.DIRECTION_RIGHT = 1;

Drago.TEMPO_FOTOGRAMMI_IDLE = 500;
Drago.TEMPO_FOTOGRAMMI_WALK = 100;
Drago.TEMPO_FOTOGRAMMI_FIRE = 80;
Drago.TEMPO_FOTOGRAMMI_JUMP = 200;
Drago.TEMPO_FOTOGRAMMI_FALL = 200;

Drago.INCREMENTO_PIXEL = 4;
Drago.TEMPO_INCREMENTO_PIXEL = 25;

Drago.AMPIEZZA_SALTO = 160;
Drago.TEMPO_SALTO = 0.4
Drago.SALTO_INCREMENTO_PIXEL_STESSA_DIREZIONE = 1
Drago.SALTO_DECREMENTO_PIXEL_ALTRA_DIREZIONE = 2

Drago.DELAY_FUOCO = 400;
Drago.AMPIEZZA_FUOCO = 256;
Drago.TEMPO_FUOCO = 0.40;


Drago.prototype.init = function(){
	// Crea i fotogrammi e le animazioni
	this.setFrames();
	// Setta la giusta animazione
	this.draw();
}

Drago.prototype.getPosition = function(){
	return this.mc.position();
}

Drago.prototype.setPosition = function(n){
	this.mc.css("left",n);
}

Drago.prototype.setDirection = function(dir){
	if (this.direction != dir){
		this.direction = dir;
		if (this.currentStatus % 2 == 0){
			this.currentStatus++;
		}else{
			this.currentStatus--;
		}
		this.draw();
	}
}

Drago.prototype.toggleDirection = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.setDirection(Drago.DIRECTION_LEFT);
	}else{
		this.setDirection(Drago.DIRECTION_RIGHT);
	}
}

Drago.prototype.idle = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_IDLE_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_IDLE_LEFT;
	}
	this.draw();
}

Drago.prototype.walk = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_WALK_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_WALK_LEFT;
	}
	this.draw();
}

Drago.prototype.jump = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_JUMP_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_JUMP_LEFT;
	}
	this.draw();
	

}

Drago.prototype.fall = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_FALL_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_FALL_LEFT;
	}
	this.draw();
}

Drago.prototype.fire = function(){
	if (this.direction == Drago.DIRECTION_RIGHT){
		this.currentStatus = Drago.STATUS_FIRE_RIGHT;
	}else{
		this.currentStatus = Drago.STATUS_FIRE_LEFT;
	}
	this.draw();
	this.delayResetFire();
	if (!this.isFiring){
		this.soundFire();
	}
}

Drago.prototype.soundFire = function(){
	this.audioFire.get(0).currentTime = 0;
	this.audioFire.get(0).play();
}

Drago.prototype.soundJump = function(){
	this.audioJump.get(0).currentTime = 0;
	this.audioJump.get(0).play();

}

Drago.prototype.setFrames = function(){
	this.setIdle();
	this.setWalk();
	this.setFire();
	this.setJump();
	this.setFall();
}

Drago.prototype.draw = function(){
	if (this.lastStatus != this.currentStatus){
		if (this.lastStatus != undefined){
			// Stoppa l'animazione corrente
			this.animSet[this.lastStatus].stop();
		}
		this.animSet[this.currentStatus].play();
		this.lastStatus = this.currentStatus;
	}
}


Drago.prototype.setIdle = function(){
	var idleLeft = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 0;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Drago.TEMPO_FOTOGRAMMI_IDLE;
	var frame = new SocaFrame(oInit);
	idleLeft.push(frame);

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	idleLeft.push(frame);
	
	var socaLeft = new SocaAnim(idleLeft,this.sheet,this.mc)
	this.animSet.push(socaLeft);

	// Speculare
	var idleRight = this.buildRight(idleLeft,320);
	var socaRight = new SocaAnim(idleRight,this.sheet,this.mc)
	this.animSet.push(socaRight);

}

Drago.prototype.setWalk = function(){
	var walkLeft = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 64;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Drago.TEMPO_FOTOGRAMMI_WALK;
	var frame = new SocaFrame(oInit);
	walkLeft.push(frame);
	//trace(oInit)

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	walkLeft.push(frame);
	//trace(oInit)
	
	oInit.x = 128;
	frame = new SocaFrame(oInit);
	walkLeft.push(frame);
	//trace(oInit)
	
	
	var socaLeft = new SocaAnim(walkLeft,this.sheet,this.mc)
	this.animSet.push(socaLeft);

	// Speculare
	var walkRight = this.buildRight(walkLeft,320);
	var socaRight = new SocaAnim(walkRight,this.sheet,this.mc)
	this.animSet.push(socaRight);


}

Drago.prototype.setFire = function(){
	var fireLeft = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 128;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Drago.TEMPO_FOTOGRAMMI_FIRE;
	var frame = new SocaFrame(oInit);
	fireLeft.push(frame);

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	fireLeft.push(frame);
	
	oInit.x = 128;
	frame = new SocaFrame(oInit);
	fireLeft.push(frame);

	oInit.x = 192;
	frame = new SocaFrame(oInit);
	fireLeft.push(frame);
	
	
	oInit.x = 0;
	oInit.y = 0;
	frame = new SocaFrame(oInit);
	fireLeft.push(frame);
	

	
	var socaLeft = new SocaAnim(fireLeft,this.sheet,this.mc)
	this.animSet.push(socaLeft);

	// Speculare
	var fireRight = this.buildRight(fireLeft,320);
	var socaRight = new SocaAnim(fireRight,this.sheet,this.mc)
	this.animSet.push(socaRight);

}


Drago.prototype.setJump = function(){
	var jumpLeft = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 192;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Drago.TEMPO_FOTOGRAMMI_JUMP;
	var frame = new SocaFrame(oInit);
	jumpLeft.push(frame);

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	jumpLeft.push(frame);
	
	var socaLeft = new SocaAnim(jumpLeft,this.sheet,this.mc)
	this.animSet.push(socaLeft);

	// Speculare
	var jumpRight = this.buildRight(jumpLeft,320);
	var socaRight = new SocaAnim(jumpRight,this.sheet,this.mc)
	this.animSet.push(socaRight);
}

Drago.prototype.setFall = function(){
	var fallLeft = new Array();
	var oInit = new SocaFrameInit();
	oInit.x = 0
	oInit.y = 256;
	oInit.width = 64;
	oInit.height = 64;
	oInit.lastsFor = Drago.TEMPO_FOTOGRAMMI_JUMP;
	var frame = new SocaFrame(oInit);
	fallLeft.push(frame);

	oInit.x = 64;
	frame = new SocaFrame(oInit);
	fallLeft.push(frame);
	
	var socaLeft = new SocaAnim(fallLeft,this.sheet,this.mc)
	this.animSet.push(socaLeft);

	// Speculare
	var fallRight = this.buildRight(fallLeft,320);
	var socaRight = new SocaAnim(fallRight,this.sheet,this.mc)
	this.animSet.push(socaRight);

}


Drago.prototype.buildRight = function(a,offsetY){
	var aRet = new Array();
	for (var x=0;x<a.length;x++){
		var frame = a[x];
		var oInit = new SocaFrameInit();
		oInit.x = frame.x;
		oInit.y = frame.y + offsetY;
		oInit.width = frame.width;
		oInit.height = frame.height;
		oInit.lastsFor = frame.lastsFor;
		aRet.push(new SocaFrame(oInit));
	}
	return aRet;
}

Drago.prototype.muoviti = function(){
	var incNormale = Drago.INCREMENTO_PIXEL;
	var mult = -1;
	if (this.direction == Drago.DIRECTION_RIGHT){
		mult = 1;
	}
	
	if (this.isJumping){
		mult = -1;
		if (this.jumpDirection == Drago.DIRECTION_RIGHT){
			mult = 1;
		}
	}
	
	var incJump = 0;
	if (this.isJumping){
		if (this.direction == this.jumpDirection){
			incJump = Drago.SALTO_INCREMENTO_PIXEL_STESSA_DIREZIONE;
		}else{
			incJump = -Drago.SALTO_DECREMENTO_PIXEL_ALTRA_DIREZIONE;
		}
		
		if (!this.jumpIsWalking){
			if (!this.isWalking){
				incNormale = 0;
			}else{
				this.jumpDirection = this.direction;
				incNormale = incJump;
			}
			incJump = 0;
		}
	}
	
	this.mc.css("left",this.mc.position().left+(incNormale+incJump)*mult);
}

Drago.prototype.iniziaSalto = function(){
	var pos = this.getPosition();
	var endY = pos.top - Drago.AMPIEZZA_SALTO;
	this.jumpDirection = this.direction;
	this.jumpIsWalking = this.isWalking;
	TweenMax.to(this.mc,Drago.TEMPO_SALTO,{css:{top:endY},onComplete:this.onHalfJump,onCompleteParams:[this],ease:Linear.easeNone});
}

Drago.prototype.onHalfJump = function(ct){
	if (!ct.isFiring){
		ct.fall();
	}
	ct.isFalling = true;
	var pos = ct.getPosition();
	var endY = pos.top + Drago.AMPIEZZA_SALTO;
	TweenMax.to(ct.mc,Drago.TEMPO_SALTO,{css:{top:endY},onComplete:ct.onFullJump,onCompleteParams:[ct],ease:Linear.easeNone});
}
Drago.prototype.onFullJump = function(ct){
	ct.isJumping= false;
	ct.isFalling= false;
	if (!ct.isFiring){
		if (ct.isIdle){
			ct.idle();
		}
		if (ct.isWalking){
			ct.walk();
		}
	}
}
Drago.prototype.delayResetFire = function(){
	var ct = this;
	this.idrf = setTimeout(function(){ct.resetFire(ct)} , Drago.DELAY_FUOCO);
}

Drago.prototype.resetFire = function(ct){
	ct.isFiring = false;
	if (ct.isIdle){
		ct.idle();
	}
	if (ct.isWalking){
		ct.walk();
	}
	if (ct.isJumping){
		ct.jump();
	}
	if (ct.isFalling){
		ct.fall();
	}
	
	
}
