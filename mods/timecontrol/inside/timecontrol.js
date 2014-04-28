
// Sorte de class
var TimeControl = {};
(function () {

	var m_modID;
    m_modID = "timecontrol";
	
	var m_dataStore;

    var m_gameTime;
    m_gameTime = 4;
	
	// Menu UIEvent / KeyEvent
    var m_uiShowMenu;
	var m_uiOnKeyUp;




    TimeControl.start = function () {
	
		GDT.on(GDT.eventKeys.saves.loading ,load);
		
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
		
		
		originalPlatforms = [];
		$.extend(true, originalPlatforms, Platforms.allPlatforms);
		
		// BOUTTON MAIN MENU
		$("<div id=\"switchButton\" class=\"selectorButton orangeButton windowLargeOkButton mainMenuButton\">" + "TEST".dlocalize(m_modID) + "</div>").insertBefore(".exitButton");
		
		
		$("#gameUIContainer").append("<div id=\"test\" style=\"width: 440px; height: 100px; position: absolute; font: 13.5px 'Segoe UI', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 40px; bottom: 40px; cursor: default; padding-left: 4px; padding-right: 4px; display: none; overflow: hidden;\"></div>");
		//$("#gameUIContainer").append("<div id=\"testMini\" onmousedown=\"\" style=\"width: 16px; height: 12px; position: absolute; font: 12px 'Arial', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 472px; bottom: 141px; text-align: center; display: none; cursor: pointer; padding-bottom: 4px; border-radius: 4px 4px 0px 0px;\">_</div>");
		
		$("#resources").append("<div id=\"chatDialog\" class=\"windowBorder tallWindow\"><div class=\"windowTitle\">" + "Chat".dlocalize(m_modID) + "</div><div style=\"margin-top: 20px;\"><div class=\"centeredButtonWrapper\"><input type=\"text\" id=\"chatInput\" maxlength=\"120\" style=\"font-size: 18pt; width: 460px;\" />" +
							"</div></div><div class=\"centeredButtonWrapper\"><div id=\"chatButton\" class=\"okButton baseButton disabledButton windowMainActionButton windowLargeOkButton\">" + "Send Message".dlocalize(m_modID) + "</div></div><br /><br /><div style=\"position: absolute; left: 50%; bottom: 32px;\">" +
							"<div style=\"position: relative; left: -50%\"><textarea id=\"chatArea\" style=\"font-size: 8pt; width: 520px; height: 360px;\" readonly></textarea></div></div></div>");
						
		$("#resources").append("<div id=\"tradeDialog\" class=\"tallWindow windowBorder\"><div class=\"dialogScreenContainer tallWindow\"><div class=\"windowTitle\">" + "Trading".dlocalize(m_modID) + "</div><div id=\"tradeCost\" class=\"windowCostLabel\" style=\"font-size: 14pt; width: 200px; text-align: right;\">" + "Research Points:".dlocalize(m_modID) + " 0<br />" + "Cash:".dlocalize(m_modID) + " 0</div><br />" +
							"<div class=\"dialogScreen\"><div class=\"dialogBackButton fontCharacterButton icon-arrow-left\"></div><br /><br /><br /><br /><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeRPText\">" + "Research Points (request)".dlocalize(m_modID) + "</h2><div id=\"tradeRPSlider\"></div></div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeCashText\">" + "Cash (offer)".dlocalize(m_modID) + "</h2><div id=\"tradeCashSlider\"></div></div>" +
							"<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Type".dlocalize(m_modID) + "</h2><div id=\"tradeType\" style=\"height: 160px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"tradeButton\" class=\"okButton baseButton windowMainActionButton orangeButton windowLargeOkButton\">" + "Make offer".dlocalize(m_modID) + "</div></div></div></div></div>");

        // test (ref Alex&Arnaud)
        $("#resources").append("<div id=\"managePopup\" class=\"tallWindow windowBorder\"><div id=\"salaryLabel\" class=\"windowCostLabel\">" + "Test".dlocalize() + "</div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Time: ".dlocalize(m_modID) + "</h2><div id=\"salarySlider\">			</div></div></div>");

        $("#salarySlider").slider(
            {
                min: 4,
                max: 30,
                value: 4,
                step: 1,
                animate: "fast",
                slide: function(event, ui)
                {

                        if (ui)
                        {
                            m_gameTime = ui.value;
                            $("#salarySlider").slider("value", ui.value);
                            $("#salaryLabel").html("Game Time :".dlocalize() + " " + m_gameTime);
                        }

                    GameManager.SECONDS_PER_WEEK = m_gameTime;
                }
            });
        // end test

		$("#tradeButton").clickExcl(TimeControl.trade);
		
		/*$("#tradeNextButton").clickExcl(function()
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
		});*/
		
		/*$("#tradeDialog").find(".dialogBackButton").clickExcl(function()
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
		});*/
		
		m_uiShowMenu = UI.showContextMenu;
		var myShowMenu = function(b, f)
		{
			var selectedStaff = UI.getCharUnderCursor();

			if (!selectedStaff)
			{
				//if (GameManager.company.researchCompleted.indexOf(tradeResearch) > -1)
				{
					b.push(
					{
						label: "Time Speed ...".dlocalize(m_modID),
						action: function()
						{
							Sound.click();
							TimeControl.showTimeWindow();
							//GameManager.resume(true);
						}
					});
				}
				
			}

			m_uiShowMenu(b, f);
		};
		UI.showContextMenu = myShowMenu;
		
		m_uiOnKeyUp = window.onkeyup;
		var myOnKeyUp = function(event)
		{
			m_uiOnKeyUp(event);
			switch (event.which)
			{
				case 't':
					TimeControl.showTimeWindow();
			}
		};
		window.onkeyup = myOnKeyUp;
	}
	

	/////////////////////////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    var load = function () {
        if(!m_dataStore)
            m_dataStore = GDT.getDataStore(m_modID);
    }

	var setSpeedTime = function(speedTime) {
		
		GameManager.SECONDS_PER_WEEK = 30;
		//GameManager.gameTime
	}


	////////////////////////////////////////////// INTERFACE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	TimeControl.time = function() {
		if ($("#tradeNextButton").hasClass("disabledButton")) return;
		
		Sound.click();

		var n = new Notification(
		{
			header: "Time Speed Change".dlocalize(m_modID),
			text: "...............".dlocalize(m_modID)
		});
		GameManager.company.activeNotifications.addRange(n.split());
		//RPToPay + sep + moneyToPay);
		setSpeedTime(1);
		UI.closeModal();
	};
	
	TimeControl.showTimeWindow = function() {
		if (UI.isModalContentOpen()) return;
		
		UI.showModalContent("#managePopup",
		{
			disableCheckForNotifications: true,
			close: true,
			onOpen: function()
			{
                //managePopup
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	

	/////////////////////////////////////////// EVENTS DEFINITION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	


	///////////////////////////////////////////// OTHER THINGS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	// Adding touch/button to control time
	
	/*$("#resources").append("<div id=\"serverBrowserDialog\" class=\"tallWindow windowBorder\"><div class=\"windowTitle\">" + "Server Browser".dlocalize(m_modID) + "</div><br /><div class=\"centeredButtonWrapper\"><div style=\"height: 394px; overflow-y: auto;\">" +
						"<table id=\"browserList\" border=\"1\" style=\"margin-left: auto; margin-right: auto; border: 2px solid #EAB656; background: #F9CE84; width: 540px; table-layout: fixed; font-size: 9pt; border-collapse: collapse;\"></table></div></div>" +
						"<br /><hr /><div style=\"padding: 4px;\"><div style=\"position: relative; top: 10px; left: 6px; float: left;\">" + "Recent servers:".dlocalize(m_modID) + " <select id=\"browserServerHistory\" onchange=\"dMultiplayer.connectFromHistory()\" onkeydown=\"dMultiplayer.disableKeyboard(event)\"><option value=\"none\">" + "Select...".dlocalize(m_modID) + "</option></select></div><div style=\"position: relative; top: 46px; left: 6px; float: left;\"><input type=\"text\" id=\"DCInput\" style=\"font-size: 16pt; width: 368px;\" /></div>" +
						"<div style=\"position: relative; left: -594px; top: -38px; float: right; width: 0px;\"><div id=\"browserOfflineButton\" class=\"dialogNextButton baseButton orangeButton\">" + "Play Offline".dlocalize(m_modID) + "</div><div id=\"DCButton\" class=\"dialogNextButton baseButton orangeButton\">" + "Direct Connect".dlocalize(m_modID) + "</div></div></div></div>");
	
	$("#resources").append("<div id=\"chatDialog\" class=\"windowBorder tallWindow\"><div class=\"windowTitle\">" + "Chat".dlocalize(m_modID) + "</div><div style=\"margin-top: 20px;\"><div class=\"centeredButtonWrapper\"><input type=\"text\" id=\"chatInput\" maxlength=\"120\" style=\"font-size: 18pt; width: 460px;\" />" +
						"</div></div><div class=\"centeredButtonWrapper\"><div id=\"chatButton\" class=\"okButton baseButton disabledButton windowMainActionButton windowLargeOkButton\">" + "Send Message".dlocalize(m_modID) + "</div></div><br /><br /><div style=\"position: absolute; left: 50%; bottom: 32px;\">" +
						"<div style=\"position: relative; left: -50%\"><textarea id=\"chatArea\" style=\"font-size: 8pt; width: 520px; height: 360px;\" readonly></textarea></div></div></div>");
					
	$("#resources").append("<div id=\"tradeDialog\" class=\"tallWindow windowBorder\"><div class=\"dialogScreenContainer tallWindow\"><div class=\"windowTitle\">" + "Trading".dlocalize(m_modID) + "</div><div id=\"tradeCost\" class=\"windowCostLabel\" style=\"font-size: 14pt; width: 200px; text-align: right;\">" + "Research Points:".dlocalize(m_modID) + " 0<br />" + "Cash:".dlocalize(m_modID) + " 0</div><br />" +
						"<div class=\"dialogScreen1\"><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select company".dlocalize(m_modID) + "</h2><div id=\"tradeTargets\" style=\"height: 360px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br /><div id=\"tradeNextButton\" class=\"dialogNextButton baseButton disabledButton\">" + "Next".dlocalize(m_modID) + "</div></div>" +
						"<div class=\"dialogScreen2\"><div class=\"dialogBackButton fontCharacterButton icon-arrow-left\"></div><br /><br /><br /><br /><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeRPText\">" + "Research Points (request)".dlocalize(m_modID) + "</h2><div id=\"tradeRPSlider\"></div></div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2 id=\"tradeCashText\">" + "Cash (offer)".dlocalize(m_modID) + "</h2><div id=\"tradeCashSlider\"></div></div>" +
						"<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Type".dlocalize(m_modID) + "</h2><div id=\"tradeType\" style=\"height: 160px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"tradeButton\" class=\"okButton baseButton windowMainActionButton orangeButton windowLargeOkButton\">" + "Make offer".dlocalize(m_modID) + "</div></div></div></div></div>");
	
	$("#resources").append("<div id=\"advSpyDialog\" class=\"tallWindow windowBorder\"><div class=\"windowTitle\">" + "Advanced Spying".dlocalize(m_modID) + "</div><div id=\"advSpyCost\" class=\"windowCostLabel\">" + "Cost:".dlocalize(m_modID) + " 500K</div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Budget".dlocalize(m_modID) + "</h2><div id=\"advSpyBudgetSlider\"></div></div>" +
						"<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select target".dlocalize(m_modID) + "</h2><div id=\"advSpyTargets\" style=\"height: 280px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br />" +
						"<div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"advSpyButton\" class=\"okButton baseButton windowMainActionButton disabledButton windowLargeOkButton\">" + "Spy".dlocalize(m_modID) + "</div></div></div>");
	
	$("#resources").append("<div id=\"sabotageDialog\" class=\"tallWindow windowBorder\"><div class=\"dialogScreenContainer tallWindow\"><div class=\"windowTitle\">" + "Sabotage".dlocalize(m_modID) + "</div><div id=\"sabotageCost\" class=\"windowCostLabel\" style=\"font-size: 16pt\">" + "Cost:".dlocalize(m_modID) + " 2M</div>" +
						"<div class=\"dialogScreen1\"><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select target".dlocalize(m_modID) + "</h2><div id=\"sabotageTargets\" style=\"height: 360px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br /><div class=\"dialogNextButton baseButton orangeButton\">" + "Next".dlocalize(m_modID) + "</div></div>" +
						"<div class=\"dialogScreen2\"><div class=\"dialogBackButton fontCharacterButton icon-arrow-left\"></div><br /><br /><br /><br /><br /><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Budget".dlocalize(m_modID) + "</h2><div id=\"sabotageBudgetSlider\"></div></div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select method".dlocalize(m_modID) + "</h2><div id=\"sabotageOptions\" style=\"margin: 5px 20px 0px 20px;\"></div></div><br /><br /><br />" +
						"<div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"sabotageButton\" class=\"okButton baseButton windowMainActionButton disabledButton windowLargeOkButton\">" + "Sabotage{0}".dlocalize(m_modID).format("") + "</div></div></div></div></div>");
	
	$("#resources").append("<div id=\"confirmAssassinDialog\"><div>" + "Do you really want to do this? If you get caught and sent to prison, there won't be anybody to run the company for you and the game will end!".dlocalize(m_modID) + "</div><div class=\"centeredButtonWrapper\"><div id=\"assassinYesButton\" class=\"confirmActionButton deleteButton selectorButton\">" + "Yes".dlocalize(m_modID) + "</div><div id=\"assassinYesButton\" class=\"cancelActionButton selectorButton orangeButton\">" + "No".dlocalize(m_modID) + "</div></div></div>");
	
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
