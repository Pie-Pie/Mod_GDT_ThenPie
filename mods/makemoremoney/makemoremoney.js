(function()
{
	var ready = function()
	{
		Makemoremoney.init();
		
	};

	var error = function()
	{
		alert("Failed to initialize BANK LOAN");
	};
	
	var fs = require("fs");
	var filestoload = ["mods/makemoremoney/inside/makemoremoney.js"];
	var langfile = "mods/makemoremoney/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
	
	GDT.loadJs(filestoload, ready, error);
})();