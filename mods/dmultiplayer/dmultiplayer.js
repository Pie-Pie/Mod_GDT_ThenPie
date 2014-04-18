(function()
{
	var ready = function()
	{
		dMultiplayer.init();
	};

	var error = function()
	{
		alert("Failed to initialize dMultiplayer");
	};
	
	var fs = require("fs");
	var filestoload = ["mods/dmultiplayer/inside/dmultiplayer.js"];
	var langfile = "mods/dmultiplayer/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
	
	GDT.loadJs(filestoload, ready, error);
})();