
// Sorte de class
var TimeControl = {};
(function () {

	var modID = "timecontrol";
	
	var m_dataStore;
	
	
	var load = function () {
		if(!m_dataStore)
			m_dataStore = GDT.getDataStore(modID);
	}
	
	TimeControl.start = function () {
	
		var dlocalizeVersion = 3;
		if (typeof String.prototype.dlocalize === "undefined" || (String.prototype.dlocalizeVersion && String.prototype.dlocalizeVersion < dlocalizeVersion))
		{
			String.prototype.dlocalizeVersion = dlocalizeVersion;
			String.prototype.dlocalize = function(mod, comment)
			{
				if (GameManager.getPreferredLanguage() === "en") return this.toString();
				else if (typeof dLocalization === "undefined") return this.localize();
				
				var retval;
				if (mod && typeof dLocalization[mod] !== "undefined" && typeof dLocalization[mod].currentLanguage !== "undefined")
					retval = dLocalization[mod].currentLanguage[this];
				else
					for (var localization in dLocalization)
						if (dLocalization[localization].currentLanguage[this]) return dLocalization[localization].currentLanguage[this];
				
				if (!retval) return this.localize(comment);
				else return retval;
			};
		}
		
		
		/*originalPlatforms = [];
		$.extend(true, originalPlatforms, Platforms.allPlatforms);
		
		$("<div id=\"switchButton\" class=\"selectorButton disabledButton windowLargeOkButton mainMenuButton\">" + "TEST".dlocalize(modid) + "</div>").insertBefore(".exitButton");
		
		$("#gameUIContainer").append("<div id=\"test\" style=\"width: 440px; height: 100px; position: absolute; font: 13.5px 'Segoe UI', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 40px; bottom: 40px; cursor: default; padding-left: 4px; padding-right: 4px; display: none; overflow: hidden;\"></div>");
		$("#gameUIContainer").append("<div id=\"testMini\" onmousedown=\"\" style=\"width: 16px; height: 12px; position: absolute; font: 12px 'Arial', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 472px; bottom: 141px; text-align: center; display: none; cursor: pointer; padding-bottom: 4px; border-radius: 4px 4px 0px 0px;\">_</div>");
		*/
		
		
	}
	
	
	
	/////////////////////////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////// EVENTS DEFINITION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	
	
	
	
	
	
	
	
	
	///////////////////////////////////////////// OTHER THINGS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	// Adding touch/button to control time
	
	/*$("#resources").append("<div id=\"serverBrowserDialog\" class=\"tallWindow windowBorder\"><div class=\"windowTitle\">" + "Server Browser".dlocalize(modid) + "</div><br /><div class=\"centeredButtonWrapper\"><div style=\"height: 394px; overflow-y: auto;\">" +
						"<table id=\"browserList\" border=\"1\" style=\"margin-left: auto; margin-right: auto; border: 2px solid #EAB656; background: #F9CE84; width: 540px; table-layout: fixed; font-size: 9pt; border-collapse: collapse;\"></table></div></div>" +
						"<br /><hr /><div style=\"padding: 4px;\"><div style=\"position: relative; top: 10px; left: 6px; float: left;\">" + "Recent servers:".dlocalize(modid) + " <select id=\"browserServerHistory\" onchange=\"dMultiplayer.connectFromHistory()\" onkeydown=\"dMultiplayer.disableKeyboard(event)\"><option value=\"none\">" + "Select...".dlocalize(modid) + "</option></select></div><div style=\"position: relative; top: 46px; left: 6px; float: left;\"><input type=\"text\" id=\"DCInput\" style=\"font-size: 16pt; width: 368px;\" /></div>" +
						"<div style=\"position: relative; left: -594px; top: -38px; float: right; width: 0px;\"><div id=\"browserOfflineButton\" class=\"dialogNextButton baseButton orangeButton\">" + "Play Offline".dlocalize(modid) + "</div><div id=\"DCButton\" class=\"dialogNextButton baseButton orangeButton\">" + "Direct Connect".dlocalize(modid) + "</div></div></div></div>");
	
	$("#resources").append("<div id=\"chatDialog\" class=\"windowBorder tallWindow\"><div class=\"windowTitle\">" + "Chat".dlocalize(modid) + "</div><div style=\"margin-top: 20px;\"><div class=\"centeredButtonWrapper\"><input type=\"text\" id=\"chatInput\" maxlength=\"120\" style=\"font-size: 18pt; width: 460px;\" />" +
						"</div></div><div class=\"centeredButtonWrapper\"><div id=\"chatButton\" class=\"okButton baseButton disabledButton windowMainActionButton windowLargeOkButton\">" + "Send Message".dlocalize(modid) + "</div></div><br /><br /><div style=\"position: absolute; left: 50%; bottom: 32px;\">" +
						"<div style=\"position: relative; left: -50%\"><textarea id=\"chatArea\" style=\"font-size: 8pt; width: 520px; height: 360px;\" readonly></textarea></div></div></div>");
					
	$("#resources").append("<div id=\"tradeDialog\" class=\"tallWindow windowBorder\"><div class=\"dialogScreenContainer tallWindow\"><div class=\"windowTitle\">" + "Trading".dlocalize(modid) + "</div><div id=\"tradeCost\" class=\"windowCostLabel\" style=\"font-size: 14pt; width: 200px; text-align: right;\">" + "Research Points:".dlocalize(modid) + " 0<br />" + "Cash:".dlocalize(modid) + " 0</div><br />" +
						"<div class=\"dialogScreen1\"><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select company".dlocalize(modid) + "</h2><div id=\"tradeTargets\" style=\"height: 360px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br /><div id=\"tradeNextButton\" class=\"dialogNextButton baseButton disabledButton\">" + "Next".dlocalize(modid) + "</div></div>" +
						"<div class=\"dialogScreen2\"><div class=\"dialogBackButton fontCharacterButton icon-arrow-left\"></div><br /><br /><br /><br /><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeRPText\">" + "Research Points (request)".dlocalize(modid) + "</h2><div id=\"tradeRPSlider\"></div></div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeCashText\">" + "Cash (offer)".dlocalize(modid) + "</h2><div id=\"tradeCashSlider\"></div></div>" +
						"<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Type".dlocalize(modid) + "</h2><div id=\"tradeType\" style=\"height: 160px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"tradeButton\" class=\"okButton baseButton windowMainActionButton orangeButton windowLargeOkButton\">" + "Make offer".dlocalize(modid) + "</div></div></div></div></div>");
	
	$("#resources").append("<div id=\"advSpyDialog\" class=\"tallWindow windowBorder\"><div class=\"windowTitle\">" + "Advanced Spying".dlocalize(modid) + "</div><div id=\"advSpyCost\" class=\"windowCostLabel\">" + "Cost:".dlocalize(modid) + " 500K</div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Budget".dlocalize(modid) + "</h2><div id=\"advSpyBudgetSlider\"></div></div>" +
						"<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select target".dlocalize(modid) + "</h2><div id=\"advSpyTargets\" style=\"height: 280px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br />" +
						"<div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"advSpyButton\" class=\"okButton baseButton windowMainActionButton disabledButton windowLargeOkButton\">" + "Spy".dlocalize(modid) + "</div></div></div>");
	
	$("#resources").append("<div id=\"sabotageDialog\" class=\"tallWindow windowBorder\"><div class=\"dialogScreenContainer tallWindow\"><div class=\"windowTitle\">" + "Sabotage".dlocalize(modid) + "</div><div id=\"sabotageCost\" class=\"windowCostLabel\" style=\"font-size: 16pt\">" + "Cost:".dlocalize(modid) + " 2M</div>" +
						"<div class=\"dialogScreen1\"><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select target".dlocalize(modid) + "</h2><div id=\"sabotageTargets\" style=\"height: 360px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br /><div class=\"dialogNextButton baseButton orangeButton\">" + "Next".dlocalize(modid) + "</div></div>" +
						"<div class=\"dialogScreen2\"><div class=\"dialogBackButton fontCharacterButton icon-arrow-left\"></div><br /><br /><br /><br /><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Budget".dlocalize(modid) + "</h2><div id=\"sabotageBudgetSlider\"></div></div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select method".dlocalize(modid) + "</h2><div id=\"sabotageOptions\" style=\"margin: 5px 20px 0px 20px;\"></div></div><br /><br /><br />" +
						"<div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"sabotageButton\" class=\"okButton baseButton windowMainActionButton disabledButton windowLargeOkButton\">" + "Sabotage{0}".dlocalize(modid).format("") + "</div></div></div></div></div>");
	
	$("#resources").append("<div id=\"confirmAssassinDialog\"><div>" + "Do you really want to do this? If you get caught and sent to prison, there won't be anybody to run the company for you and the game will end!".dlocalize(modid) + "</div><div class=\"centeredButtonWrapper\"><div id=\"assassinYesButton\" class=\"confirmActionButton deleteButton selectorButton\">" + "Yes".dlocalize(modid) + "</div><div id=\"assassinYesButton\" class=\"cancelActionButton selectorButton orangeButton\">" + "No".dlocalize(modid) + "</div></div></div>");
	
	$("#switchButton").clickExcl(dMultiplayer.switchServer);
	$("#chatButton").clickExcl(dMultiplayer.sendChat);
	$("#DCButton").clickExcl(dMultiplayer.directConnect);
	$("#browserOfflineButton").clickExcl(dMultiplayer.playOffline);
	$("#advSpyButton").clickExcl(dMultiplayer.advancedSpy);
	$("#sabotageButton").clickExcl(dMultiplayer.sabotage);
	$("#tradeButton").clickExcl(dMultiplayer.trade);
	
	$("#sabotageDialog").find(".dialogNextButton").clickExcl(function()
	{
		Sound.click();
		$("#sabotageDialog").find(".dialogScreen1").transition(
		{
			"margin-left": "-200%"
		});
		$("#sabotageDialog").find(".dialogScreen2").transition(
		{
			"margin-left": "0"
		});
	});
	
	$("#sabotageDialog").find(".dialogBackButton").clickExcl(function()
	{
		Sound.click();
		$("#sabotageDialog").find(".dialogScreen1").transition(
		{
			"margin-left": "0"
		});
		$("#sabotageDialog").find(".dialogScreen2").transition(
		{
			"margin-left": "100%"
		});
	});
	
	$("#tradeNextButton").clickExcl(function()
	{
		if ($("#tradeNextButton").hasClass("disabledButton")) return;
		
		Sound.click();
		$("#tradeDialog").find(".dialogScreen1").transition(
		{
			"margin-left": "-200%"
		});
		$("#tradeDialog").find(".dialogScreen2").transition(
		{
			"margin-left": "0"
		});
	});
	
	$("#tradeDialog").find(".dialogBackButton").clickExcl(function()
	{
		Sound.click();
		$("#tradeDialog").find(".dialogScreen1").transition(
		{
			"margin-left": "0"
		});
		$("#tradeDialog").find(".dialogScreen2").transition(
		{
			"margin-left": "100%"
		});
	});
	*/
})();