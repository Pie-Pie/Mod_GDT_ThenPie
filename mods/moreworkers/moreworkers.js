(function()
{
	// Fonction appelé au démarage
	var startFunction = function()
	{	
		MoreWorkers.start();
	};

	var error = function()
	{
		alert("Failed to initialize MoreWorkers");
	};
	
	var fs = require("fs");
	var filestoload = ["mod/moreworkers/inside/moreworkers.js"];
	
	GDT.loadJs(filestoload, startFunction, error);
		
	
	var langfile = "mod/moreworkers/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
})();