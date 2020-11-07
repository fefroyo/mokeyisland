Input = function(callback,kLeft,kRight,kJump,kFire){
	this.callback = callback;
	this.kLeft = kLeft;
	this.kRight = kRight;
	this.kJump = kJump;
	this.kFire = kFire;
	this.keys = [kLeft,kRight,kJump,kFire];
	this.combinazione = [0,0,0,0];
	this.lastCombinazione = [0,0,0,0];
}

Input.prototype.init = function(){
	this.activate();
}

Input.prototype.activate = function(){
	jQuery(document).on("keydown",{ct:this},this.onPreKeyDown);
	jQuery(document).on("keyup",{ct:this},this.onPreKeyUp);
}

Input.prototype.onPreKeyDown = function(e){
	//trace(e.keyCode);
	var ct = e.data.ct;
	if ((e.keyCode == ct.kLeft) || (e.keyCode == ct.kRight) || (e.keyCode == ct.kJump) || (e.keyCode == ct.kFire)){
		e.preventDefault();
		ct.pressedUp(e.keyCode)
	}
}

Input.prototype.onPreKeyUp = function(e){
	var ct = e.data.ct;
	if ((e.keyCode == ct.kLeft) || (e.keyCode == ct.kRight) || (e.keyCode == ct.kJump) || (e.keyCode == ct.kFire)){
		e.preventDefault();
		ct.releasedUp(e.keyCode)
	}
}

Input.prototype.pressedUp = function(keyCode){
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

Input.prototype.releasedUp = function(keyCode){
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

Input.prototype.cambiataCombinazione = function(){
	for (var x=0;x<this.combinazione.length;x++){
		if (this.combinazione[x] != this.lastCombinazione[x]){
			return true;
		}
	}
	return false;
}