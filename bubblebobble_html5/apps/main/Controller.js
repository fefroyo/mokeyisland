var aBolle = new Array();
function mainLoop(){
	checkBounds(dragoVerde);
	checkBounds(dragoBlu);
	checkJump(dragoVerde)
	checkJump(dragoBlu)
	checkFire(dragoVerde)
	checkFire(dragoBlu)
	checkBolle();
}

function checkBounds(drago){
	// Se il drago è in movimento controlla che stia nei confini
	if (drago.isWalking || drago.isJumping){
		drago.muoviti();
		var position = drago.getPosition();
		if (position.left < 60){
			drago.setPosition(60);
		}
		if (position.left > 896){
			drago.setPosition(896);
		}
	}
}
function checkJump(drago){
	// Se il drago è in movimento controlla che stia nei confini
	if (drago.mustJump){
		drago.mustJump = false;
		drago.isJumping = true;
		drago.iniziaSalto();
	}
}

function checkFire(drago){
	// Se il drago deve sparare lo fa sparare
	if (drago.mustFire){
		drago.mustFire = false;
		drago.isFiring = true;
		creaBolla(drago)
	}
}


function checkBolle(){
	var attive = new Array();
	for (var x=0;x<aBolle.length;x++){
		var bolla = aBolle[x];
		if (bolla.toGarbage){
			bolla.mc.remove();
		}else{
			attive.push(bolla);
		}
	}
	aBolle = attive;
}

function muovi(drago,combinazione){
	
	var lLeft = combinazione[0] == 1 ? true : false;
	var lRight = combinazione[1] == 1 ? true : false;
	var lJump = combinazione[2] == 1 ? true : false;
	var lFire = combinazione[3] == 1 ? true : false;
	
	// Controlla se c'e' stato un cambio direzione
	var lDirezioneCambiata = false;
	//trace(lLeft + " " + drago.direction + " "+ Drago.DIRECTION_RIGHT + (drago.direction == Drago.DIRECTION_RIGHT));
	if ((lLeft) && (drago.direction == Drago.DIRECTION_RIGHT)){
		lDirezioneCambiata = true;
	}
	if ((lRight) && (drago.direction == Drago.DIRECTION_LEFT)){
		lDirezioneCambiata = true;
	}
	
	if (lDirezioneCambiata){
		drago.toggleDirection();
	}

	// Controlla se è in movimento o se è fermo
	if (lLeft || lRight){
		if (drago.isIdle){
			drago.isIdle = false;
			drago.isWalking = true;
			if (!drago.isJumping){
				if (!drago.isFiring){
					drago.walk();
				}
			}
		}
	}else{
		if (drago.isWalking){
			drago.isIdle = true;
			drago.isWalking = false;
			if (!drago.isJumping){
				if (!drago.isFiring){
					drago.idle();
				}
			}
		}
	}
	
	// Controlla se deve saltare
	if (lJump){
		if (!drago.isJumping){
			drago.mustJump = true;
			drago.soundJump();
			if (!drago.isFiring){
				drago.jump();
			}
		}
	}
	
	// Controlla se deve sparare
	if (lFire){
		if (!drago.isFiring){
			drago.mustFire = true;
			drago.fire();
		}
	}

}

function creaBolla(drago){
	var sheet = drago.sheetBolle;
	var bolla = new Bolla(sheet,jQuery("#bolla"),jQuery("#areaBolle"));
	bolla.init();
	// La posiziona
	var pos = drago.getPosition();
	bolla.setPosition(pos);
	// Attiva l'animazione
	var dest;
	if (drago.direction == Drago.DIRECTION_RIGHT){
		dest = Drago.AMPIEZZA_FUOCO;
	}else{
		dest = -Drago.AMPIEZZA_FUOCO;
	}
	dest = pos.left + dest;
	if (dest < 60){
		dest = 60;
	}
	if (dest > 896){
		dest = 896;
	}
	var tempoMax = Drago.TEMPO_FUOCO
	var distanzaMassima = Drago.AMPIEZZA_FUOCO 
	var distanza = dest-pos.left;
	// distanza : tempo = distanzaMassima : tempoMax
	var tempo = Math.abs(Math.floor(((distanza * tempoMax)/distanzaMassima)*10)/10);

	
	TweenMax.to(bolla.mc,tempo,{css:{left:dest},onComplete:bollaSparata,onCompleteParams:[bolla],ease:Linear.easeNone});
	
	aBolle.push(bolla);
	
}
function bollaSparata(bolla){
	bolla.idle();
	var pos = bolla.getPosition();
	var tempoMax = Bolla.TEMPO_RISALITA_MASSIMO
	var distanzaMassima = Bolla.DISTANZA_MASSIMA_DI_RISALITA 
	var distanza = (pos.top-32);
	// distanza : tempo = distanzaMassima : tempoMax
	var tempo = Math.floor(((distanza * tempoMax)/distanzaMassima)*10)/10;
	TweenMax.to(bolla.mc,tempo,{css:{top:32},onComplete:bollaScoppia,onCompleteParams:[bolla],ease:Linear.easeNone});
}

function bollaScoppia(bolla){
	bolla.esplodi();
}
