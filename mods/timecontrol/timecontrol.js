(function()
{
	var startFunction = function()
	{	
		TimeControl.start();
	};

	var error = function()
	{
		alert("Failed to initialize TimeContol");
	};
	
	var fs = require("fs");
	var filestoload = ["mods/timecontrol/inside/timecontrol.js"];
	
	GDT.loadJs(filestoload, startFunction, error);
		
	
	var langfile = "mods/timecontrol/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
})();