InputMobile = function(callback,kLeft,kRight,kJump,kFire){
	this.callback = callback;
	this.kLeft = kLeft;
	this.kRight = kRight;
	this.kJump = kJump;
	this.kFire = kFire;
	this.keys = [kLeft,kRight,kJump,kFire];
	this.combinazione = [0,0,0,0];
	this.lastCombinazione = [0,0,0,0];
	this.attivo = false;
}

InputMobile.prototype.init = function(){
	this.activate();
}

InputMobile.prototype.interactive = function(lFlag){
	this.attivo = lFlag;

}


InputMobile.prototype.activate = function(){

	this.kLeft.on("touchstart",{ct:this,keyCode:this.kLeft},this.onPreKeyDown)
	this.kRight.on("touchstart",{ct:this,keyCode:this.kRight},this.onPreKeyDown)
	this.kJump.on("touchstart",{ct:this,keyCode:this.kJump},this.onPreKeyDown)
	this.kFire.on("touchstart",{ct:this,keyCode:this.kFire},this.onPreKeyDown)
	
	this.kLeft.on("touchend",{ct:this,keyCode:this.kLeft},this.onPreKeyUp)
	this.kRight.on("touchend",{ct:this,keyCode:this.kRight},this.onPreKeyUp)
	this.kJump.on("touchend",{ct:this,keyCode:this.kJump},this.onPreKeyUp)
	this.kFire.on("touchend",{ct:this,keyCode:this.kFire},this.onPreKeyUp)

	
	// Così funge anche col mouse in locale, ma non viene considerato su mobile
	this.kLeft.on("mousedown",{ct:this,keyCode:this.kLeft},this.onPreKeyDown)
	this.kRight.on("mousedown",{ct:this,keyCode:this.kRight},this.onPreKeyDown)
	this.kJump.on("mousedown",{ct:this,keyCode:this.kJump},this.onPreKeyDown)
	this.kFire.on("mousedown",{ct:this,keyCode:this.kFire},this.onPreKeyDown)
	
	this.kLeft.on("mouseup",{ct:this,keyCode:this.kLeft},this.onPreKeyUp)
	this.kRight.on("mouseup",{ct:this,keyCode:this.kRight},this.onPreKeyUp)
	this.kJump.on("mouseup",{ct:this,keyCode:this.kJump},this.onPreKeyUp)
	this.kFire.on("mouseup",{ct:this,keyCode:this.kFire},this.onPreKeyUp)
	
	
}

InputMobile.prototype.onPreKeyDown = function(e){
	var ct = e.data.ct;
	if (ct.attivo){
		var keyCode = e.data.keyCode;
		if ((keyCode == ct.kLeft) || (keyCode == ct.kRight) || (keyCode == ct.kJump) || (keyCode == ct.kFire)){
			e.preventDefault();
			ct.pressedUp(keyCode)
		}
	}
}

InputMobile.prototype.onPreKeyUp = function(e){
	var ct = e.data.ct;
	if (ct.attivo){
		var keyCode = e.data.keyCode;
		if ((keyCode == ct.kLeft) || (keyCode == ct.kRight) || (keyCode == ct.kJump) || (keyCode == ct.kFire)){
			e.preventDefault();
			ct.releasedUp(keyCode)
		}
	}
}

InputMobile.prototype.pressedUp = function(keyCode){
	for (var x=0;x<this.keys.length;x++){
		if (this.keys[x] == keyCode){
			this.combinazione[x] = 1;
			break;
		}
	}
	if (this.cambiataCombinazione()){
		this.lastCombinazione = this.combinazione.slice();
		this.callback.call(null,this.combinazione);
	}
}

InputMobile.prototype.releasedUp = function(keyCode){
	for (var x=0;x<this.keys.length;x++){
		if (this.keys[x] == keyCode){
			this.combinazione[x] = 0;
			break;
		}
	}
	if (this.cambiataCombinazione()){
		this.lastCombinazione = this.combinazione.slice();	
		this.callback.call(null,this.combinazione);
	}
}

InputMobile.prototype.cambiataCombinazione = function(){
	for (var x=0;x<this.combinazione.length;x++){
		if (this.combinazione[x] != this.lastCombinazione[x]){
			return true;
		}
	}
	return false;
}

