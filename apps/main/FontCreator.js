function createSpeakerGrandiGrandi(img){
	var sp = new Speaker(img);
	sp.add("a",1192,64,44,64);
	sp.add("b",1236,64,44,64);
	sp.add("c",0,128,40,64);
	sp.add("d",40,128,44,64);
	sp.add("e",84,128,40,64);
	sp.add("f",124,128,36,64);
	sp.add("g",160,128,44,64);
	sp.add("h",204,128,48,64);
	sp.add("i",252,128,24,64);
	sp.add("j",276,128,36,64);
	sp.add("k",312,128,48,64);
	sp.add("l",360,128,24,64);
	sp.add("m",384,128,56,64);
	sp.add("n",440,128,44,64);
	sp.add("o",484,128,44,64);
	sp.add("p",528,128,44,64);
	sp.add("q",572,128,44,64);
	sp.add("r",616,128,44,64);
	sp.add("s",660,128,36,64);
	sp.add("t",696,128,32,64);
	sp.add("u",728,128,48,64);
	sp.add("v",776,128,48,64);
	sp.add("w",824,128,72,64);
	sp.add("x",896,128,52,64);
	sp.add("y",948,128,52,64);
	sp.add("z",1000,128,40,64);
	sp.add(" ",372,0,20,64);

	sp.add("™",120,0,44,64);
	sp.add("!",316,0,24,64);
	sp.add("'",404,0,24,64);
	sp.add(",",460,0,24,64);
	sp.add("-",484,0,32,64);
	sp.add("-",516,0,16,64);
	sp.add("0",540,0,52,64);
	sp.add("1",592,0,32,64);
	sp.add("2",624,0,44,64);
	sp.add("3",668,0,44,64);
	sp.add("4",712,0,44,64);
	sp.add("5",756,0,44,64);
	sp.add("6",808,0,44,64);
	sp.add("7",852,0,44,64);
	sp.add("8",896,0,44,64);
	sp.add("9",940,0,44,64);
	sp.add(":",984,0,24,64);
	sp.add("?",1040,0,44,64);

	sp.add("A",1092,0,64,64);
	sp.add("B",1152,0,44,64);
	sp.add("C",1196,0,48,64);
	sp.add("D",0,64,48,64);
	sp.add("E",48,64,44,64);
	sp.add("F",92,64,40,64);
	sp.add("G",132,64,52,64);
	sp.add("H",184,64,48,64);
	sp.add("I",232,64,24,64);
	sp.add("J",256,64,40,64);
	sp.add("K",296,64,48,64);
	sp.add("L",344,64,48,64);
	sp.add("M",392,64,60,64);
	sp.add("N",452,64,52,64);
	sp.add("O",504,64,52,64);
	sp.add("P",556,64,44,64);
	sp.add("Q",600,64,52,64);
	sp.add("R",652,64,48,64);
	sp.add("S",700,64,44,64);
	sp.add("T",744,64,40,64);
	sp.add("U",784,64,44,64);
	sp.add("V",824,64,44,64);
	sp.add("W",868,64,64,64);
	sp.add("X",932,64,64,64);
	sp.add("Y",988,64,48,64);
	sp.add("Z",1036,64,44,64);

	sp.add("ü",1088,128,48,64);
	sp.add("é",1136,128,40,64);
	sp.add("â",1176,128,44,64);
	sp.add("ä",1220,128,44,64);
	sp.add("à",0,192,44,64);
	sp.add("å",44,192,44,64);
	sp.add("ç",88,192,40,64);
	sp.add("ê",128,192,40,64);
	sp.add("ë",168,192,40,64);
	sp.add("è",208,192,40,64);
	sp.add("ï",248,192,24,64);
	sp.add("ì",272,192,24,64);
	sp.add("ì",296,192,24,64);
	sp.add("Ä",320,192,60,64);
	sp.add("É",380,192,52,64);

	sp.add("á",440,192,44,64);
	sp.add("í",484,192,24,64);
	sp.add("ó",509,192,44,64);
	sp.add("ú",553,192,48,64);
	sp.add("ñ",601,192,44,64);
	sp.add("¡",645,192,24,64);
	sp.add("¿",669,192,44,64);


	sp.adjustY = function(c,bmp){
		// to override
		if (c == "p")	bmp.y += 16*Const.MOB;
		if (c == "q")	bmp.y += 16*Const.MOB;
		if (c == "j")	bmp.y += 12*Const.MOB;
		if (c == "y")	bmp.y += 12*Const.MOB;
		if (c == ",")	bmp.y += 12*Const.MOB;
		if (c == "'")	bmp.y -= 20*Const.MOB;

		if (c == "¡")	bmp.y += 12*Const.MOB;
		if (c == "¿")	bmp.y += 12*Const.MOB;

	}

	sp.interlinea = 64;

	return sp;
}


function createSpeakerGrandi(img){
	var sp = new Speaker(img);
	sp.add("a",1112,40,32,40);
	sp.add("b",1144,40,32,40);
	sp.add("c",1176,40,28,40);
	sp.add("d",1204,40,32,40);
	sp.add("e",1236,40,32,40);
	sp.add("f",0,80,32,40);
	sp.add("g",32,80,32,40);
	sp.add("h",64,80,32,40);
	sp.add("i",100,80,24,40);
	sp.add("j",128,80,28,40);
	sp.add("k",156,80,32,40);
	sp.add("l",192,80,24,40);
	sp.add("m",216,80,36,40);
	sp.add("n",252,80,32,40);
	sp.add("o",284,80,32,40);
	sp.add("p",316,80,32,40);
	sp.add("q",348,80,32,40);
	sp.add("r",380,80,32,40);
	sp.add("s",412,80,32,40);
	sp.add("t",444,80,32,40);
	sp.add("u",476,80,32,40);
	sp.add("v",508,80,32,40);
	sp.add("w",540,80,36,40);
	sp.add("x",576,80,32,40);
	sp.add("y",608,80,32,40);
	sp.add("z",640,80,32,40);


	sp.add("ö",672,80,32,40);
	sp.add("ä",704,80,32,40);
	sp.add("Ö",736,80,32,40);
	sp.add("ß",768,80,32,40);

	sp.add("ç",840,80,32,40);
	sp.add("ü",872,80,32,40);
	sp.add("é",904,80,32,40);
	sp.add("â",936,80,32,40);
	sp.add("ä",968,80,32,40);
	sp.add("à",1000,80,32,40);

	sp.add("ê",1068,80,32,40);
	sp.add("ë",1100,80,32,40);
	sp.add("è",1132,80,32,40);
	sp.add("ï",1168,80,24,40);
	sp.add("ï",1196,80,24,40);
	sp.add("ì",1228,80,24,40);

	sp.add("Ä",0,120,32,40);
	sp.add("å",32,120,32,40);
	sp.add("É",64,120,32,40);
	sp.add("ù",92,120,32,40);
	sp.add("ò",124,120,32,40);


	sp.add("?",0,40,32,40);
	sp.add("-",32,40,36,40);
	sp.add("A",68,40,32,40);
	sp.add("B",100,40,32,40);
	sp.add("C",132,40,32,40);
	sp.add("D",164,40,32,40);
	sp.add("E",196,40,32,40);
	sp.add("F",228,40,32,40);
	sp.add("G",260,40,32,40);
	sp.add("H",292,40,32,40);
	sp.add("I",328,40,24,40);
	sp.add("J",356,40,32,40);
	sp.add("K",388,40,32,40);
	sp.add("L",420,40,32,40);
	sp.add("M",452,40,36,40);
	sp.add("N",488,40,32,40);
	sp.add("O",520,40,32,40);
	sp.add("P",552,40,32,40);
	sp.add("Q",584,40,32,40);
	sp.add("R",616,40,32,40);
	sp.add("S",648,40,32,40);
	sp.add("T",680,40,32,40);
	sp.add("U",712,40,32,40);
	sp.add("V",744,40,32,40);
	sp.add("W",776,40,36,40);
	sp.add("X",812,40,32,40);
	sp.add("Y",844,40,32,40);
	sp.add("Z",876,40,32,40);
	sp.add("ü",908,40,32,40);
	sp.add("ä",940,40,32,40);
	sp.add("Ü",972,40,32,40);


	sp.add("™",120,0,44,40);
	sp.add(" ",164,0,12,40);
	sp.add("!",324,0,16,40);
	sp.add('"',340,0,32,40);
	sp.add("#",372,0,40,40);
	sp.add("$",412,0,32,40);
	sp.add("%",444,0,32,40);
	sp.add("&",476,0,32,40);
	sp.add("'",516,0,20,40);
	sp.add("(",540,0,28,40);
	sp.add(")",564,0,28,40);
	sp.add("*",592,0,40,40);
	sp.add("+",632,0,32,40);
	sp.add(",",668,0,20,40);
	sp.add("-",688,0,32,40);

	sp.add(".",728,0,16,40);
	sp.add("/",744,0,36,40);

	sp.add("0",780,0,32,40);
	sp.add("1",812,0,32,40);
	sp.add("2",844,0,32,40);
	sp.add("3",876,0,32,40);
	sp.add("4",908,0,36,40);
	sp.add("5",944,0,32,40);
	sp.add("6",976,0,32,40);
	sp.add("7",1008,0,32,40);
	sp.add("8",1040,0,32,40);
	sp.add("9",1072,0,32,40);
	sp.add(":",1108,0,24,40);
	sp.add(";",1132,0,24,40);
	sp.add("<",1152,0,32,40);
	sp.add("©",1184,0,32,40);
	sp.add(">",1220,0,32,40);


	sp.add("á",156,120,32,40);
	sp.add("í",186,120,24,40);
	sp.add("ó",210,120,32,40);
	sp.add("ú",242,120,32,40);
	sp.add("ñ",274,120,32,40);
	sp.add("¡",306,120,16,40);
	sp.add("¿",322,120,32,40);
	sp.add("ã",354,120,32,40);
	sp.add("õ",386,120,32,40);

 
	sp.adjustY = function(c,bmp){
		// to override
		if (c == "p")	bmp.y += 4*Const.MOB;
		if (c == "q")	bmp.y += 4*Const.MOB;
		if (c == "j")	bmp.y += 4*Const.MOB;
		if (c == "y")	bmp.y += 4*Const.MOB;
		if (c == "g")	bmp.y += 4*Const.MOB;
		if (c == ",")	bmp.y += 4*Const.MOB;
		if (c == "¡")	bmp.y += 4*Const.MOB;
		if (c == "¿")	bmp.y += 4*Const.MOB;
	}

	sp.interlinea = 36;

	return sp;
}



function createSpeakerPiccole(img){
	var sp = new Speaker(img);

	sp.add("[",12,0,24,36);
	sp.add("]",36,0,24,36);
	sp.add("{",76,0,24,36);
	sp.add("}",100,0,24,36);
	sp.add("^",140,0,24,36);
	sp.add("=",164,0,24,36);
	sp.add(" ",252,0,16,36);
	sp.add("™",372,0,40,36);
	sp.add("!",564,0,8,36);
	sp.add('"',572,36,20,36);
	sp.add("#",592,0,24,36);
	sp.add("$",616,0,24,36);
	sp.add("%",640,0,32,36);
	sp.add("&",672,0,28,36);
	sp.add("'",700,0,8,36);
	sp.add("(",708,0,16,36);
	sp.add(")",724,0,16,36);
	sp.add("*",740,0,32,36);
	sp.add("+",772,0,24,36);
	sp.add(",",796,0,12,36);
	sp.add("-",808,0,28,36);
	sp.add(".",836,0,8,36);
	sp.add("/",844,0,32,36);
	sp.add("0",876,0,24,36);
	sp.add("1",900,0,24,36);
	sp.add("2",924,0,24,36);
	sp.add("3",948,0,24,36);
	sp.add("4",972,0,24,36);
	sp.add("5",996,0,24,36);
	sp.add("6",1020,0,24,36);
	sp.add("7",1044,0,24,36);
	sp.add("8",1068,0,24,36);
	sp.add("9",1092,0,24,36);
	sp.add(":",1116,0,8,36);
	sp.add(";",1124,0,12,36);
	sp.add("<",1136,0,24,36);
	sp.add("©",1160,0,32,36);
	sp.add(">",1192,0,24,36);
	sp.add("?",1216,0,24,36);
	sp.add("-",1240,0,36,36);





	sp.add("A",0,36,24,36);
	sp.add("B",24,36,24,36);
	sp.add("C",48,36,24,36);
	sp.add("D",72,36,24,36);
	sp.add("E",96,36,24,36);
	sp.add("F",120,36,24,36);
	sp.add("G",144,36,24,36);
	sp.add("H",168,36,24,36);
	sp.add("I",192,36,8,36);
	sp.add("J",200,36,24,36);
	sp.add("K",224,36,24,36);
	sp.add("L",248,36,24,36);
	sp.add("M",272,36,32,36);
	sp.add("N",304,36,28,36);
	sp.add("O",332,36,24,36);
	sp.add("P",356,36,24,36);
	sp.add("Q",380,36,24,36);
	sp.add("R",404,36,24,36);
	sp.add("S",428,36,24,36);
	sp.add("T",452,36,24,36);
	sp.add("U",476,36,24,36);
	sp.add("V",500,36,24,36);
	sp.add("W",524,36,32,36);
	sp.add("X",556,36,32,36);
	sp.add("Y",588,36,24,36);
	sp.add("Z",612,36,24,36);
	sp.add('"',744,36,20,36);
	sp.add("a",764,36,24,36);
	sp.add("b",788,36,24,36);
	sp.add("c",812,36,20,36);
	sp.add("d",832,36,24,36);
	sp.add("e",856,36,24,36);
	sp.add("f",880,36,20,36);
	sp.add("g",900,36,24,36);
	sp.add("h",924,36,24,36);
	sp.add("i",948,36,8,36);
	sp.add("j",956,36,16,36);
	sp.add("k",972,36,20,36);
	sp.add("l",992,36,12,36);
	sp.add("m",1004,36,32,36);
	sp.add("n",1036,36,24,36);
	sp.add("o",1060,36,24,36);
	sp.add("p",1084,36,24,36);
	sp.add("q",1108,36,24,36);
	sp.add("r",1132,36,24,36);
	sp.add("s",1156,36,24,36);
	sp.add("t",1180,36,24,36);
	sp.add("u",1204,36,24,36);
	sp.add("v",1228,36,24,36);



	sp.add("w",0,72,32,36);
	sp.add("x",32,72,24,36);
	sp.add("y",56,72,24,36);
	sp.add("z",80,72,24,36);
	sp.add("Ç",188,72,24,36);
	sp.add("ü",212,72,24,36);
	sp.add("é",236,72,24,36);
	sp.add("â",260,72,24,36);
	sp.add("ä",284,72,24,36);
	sp.add("à",308,72,24,36);
	sp.add("å",332,72,24,36);
	sp.add("ç",356,72,20,36);
	sp.add("ê",376,72,24,36);
	sp.add("ë",400,72,24,36);
	sp.add("è",424,72,24,36);
	sp.add("ï",448,72,16,36);
	sp.add("î",464,72,16,36);
	sp.add("ì",480,72,12,36);
	sp.add("Ä",492,72,24,36);
	sp.add("Å",516,72,24,36);
	sp.add("É",540,72,24,36);
	sp.add("ù",564,72,24,36);
	sp.add("ò",588,72,24,36);

	sp.add("á",612,72,24,36);
	sp.add("í",636,72,12,36);
	sp.add("ó",648,72,24,36);
	sp.add("ú",672,72,24,36);
	sp.add("ñ",696,72,24,36);
	sp.add("¡",720,72,8,36);
	sp.add("¿",728,72,24,36);
	sp.add("ã",755,72,24,36);
	sp.add("õ",776,72,24,36);


	sp.adjustY = function(c,bmp){
		// no override
	}

	sp.interlinea = 36;

	return sp;
}











