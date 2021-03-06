﻿(function()
{
	var ready = function()
	{
		wallStreet.init();
	};

	var error = function()
	{
		alert("Failed to initialize Wall Street");
	};
	
	// Load file with the good language for the mod
	var fs = require("fs");
	var filestoload = ["mods/wallStreet/source/wallStreet.js"];
	var langfile = "mods/wallStreet/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
	
	GDT.loadJs(filestoload, ready, error);
})();