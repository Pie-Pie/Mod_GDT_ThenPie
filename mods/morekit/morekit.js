(function()
{
	// Fonction appelé au démarage
	var startFunction = function()
	{	
		// TOPIC
		//MoreKit_topic.addTopic();
		
		
		// PLATEFORM
		//MoreKit_platform.addPlatform();
		
		
		// RESEARCH
		//MoreKit_research.addResearch();
		
		
		// EVENT
		//MoreKit_event.addEvent();
		
		
		// OTHER
		//MoreKit_other.addPlatform();
		
	};

	var error = function()
	{
		alert("Failed to initialize MoreKit");
	};
	
	var fs = require("fs");
	var filestoload = ["mod/morekit/inside/morekit.js"]; // Ici sans doute plusieurs fichiers à lire Genre morekit-topic.js, ect...
	
	GDT.loadJs(filestoload, startFunction, error);
		
	
	var langfile = "mod/morekit/lang/" + GameManager.getPreferredLanguage() + ".js";
	
	if (fs.existsSync(langfile))
		filestoload.push(langfile);
})();