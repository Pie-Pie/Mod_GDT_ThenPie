//Warning: reading this code as an experienced developer may cause you to bang your head into the wall
//I am not responsible for you being sent to the hospital because of my mod

var dMultiplayer = {};

(function()
{
	var dmod;
	var sep = "\xFA";
	var minsrvver = "1.4.0.1";
	var modid = "dmultiplayer";

	var settings =
	{
		offlineconsoles: false,
		reviewbattle: false,
		syncconsoles: true,
		timesync: false
	};

	var socket;
	var isConnected = false;
	var triedConnect = false;
	var oriOnKeyUp;
	var oriRelGame;
	var oriCloseGameDef;
	var oriBuyPlat;
	var oriFinishResearch;
	var oriShowMenu;
	var oriPickCheat;
	var oriAnnConsole;
	var oriFinishConsole;
	var oriCompLoad;
	var oriPlatLoad;
	var oriPlatImage;
	var oriRevWind;
	var oriWeekPro;
	var oriCreateEngine;
	var oriFinishEngine;
	var oriStartGame;
	var oriPlatEnd;
	var oriSellGame;
	var oriFireNotification;
	var oriLocalizationCredits;
	var playerCode;
	var playerID;
	var serverID = "133333337";
	var kicked = false;
	var kickmessage = "none";
	var lastAnnouncedGame = "";
	var mpstore;
	var pushNew;
	var competitors = [];
	var statusLog = "";
	var chatOpen = false;
	var sentJoin = false;
	var tradeResearch;
	var spyResearch;
	var advancedSpyResearch;
	var sabotageResearch;
	var tradeEvent;
	var advancedSpyPoliceEvent;
	var sabotagePoliceEvent;
	var murderPoliceEvent;
	var assassinEvent;
	var employeeToKill;
	var isTargetSelected = false;
	var budgetFactor;
	var sliderMoneyToPay;
	var moneyToPay;
	var RPToPay;
	var originalPlatforms;
	var tmax;
	var tmax2;
	var tradeCompany;
	var tradeType;
	var tradeRP;
	var tradeMoney;
	var sentBL = false;
	var sentRQ = false;
	var loopingSC = false;
	var activeMessages = 0;
	var activeReviews = 0;
	var activeAdditionalMessage = false;
	var modsAtLoad;
	var serverCount = 0;
	var lastPMPlayerIndex;
	var listMinimized = false;

	dMultiplayer.init = function()
	{
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

		modsAtLoad = [];
		$.extend(true, modsAtLoad, ModSupport.availableMods);
		
		dmod = modsAtLoad[dMultiplayer.getObjectArrayIndex(modsAtLoad, "id", modid)];
		var savebackupmodindex = dMultiplayer.getObjectArrayIndex(modsAtLoad, "id", "savebackup");
		if (savebackupmodindex > -1 && modsAtLoad[savebackupmodindex].active && dMultiplayer.compareVersions("1.0.2", modsAtLoad[savebackupmodindex].version, false))
		{
			alert("You are using an incompatible version of SaveBackup. Please update or disable it to use GDTMP.");
			return;
		}
		
		dMultiplayer.checkForUpdates(true);
		
		originalPlatforms = [];
		$.extend(true, originalPlatforms, Platforms.allPlatforms);
		
		$(".languageSelection").append('<option value="sr_el">Srpski (GDTMP only)</option>');
		
		$("<div id=\"switchButton\" class=\"selectorButton disabledButton windowLargeOkButton mainMenuButton\">" + "Switch Server".dlocalize(modid) + "</div>").insertBefore(".exitButton");
		
		$("#gameUIContainer").append("<div id=\"gdtmpcard\" style=\"width: 440px; height: 100px; position: absolute; font: 13.5px 'Segoe UI', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 40px; bottom: 40px; cursor: default; padding-left: 4px; padding-right: 4px; display: none; overflow: hidden;\"></div>");
		$("#gameUIContainer").append("<div id=\"gdtmpminimize\" onmousedown=\"dMultiplayer.toggleListMinimized()\" style=\"width: 16px; height: 12px; position: absolute; font: 12px 'Arial', 'Open Sans'; border: 1px solid #181818; background-color: rgba(255, 255, 255, 0.498); left: 472px; bottom: 141px; text-align: center; display: none; cursor: pointer; padding-bottom: 4px; border-radius: 4px 4px 0px 0px;\">_</div>");
		
		$("#resources").append("<div id=\"serverBrowserDialog\" class=\"tallWindow windowBorder\"><div class=\"windowTitle\">" + "Server Browser".dlocalize(modid) + "</div><br /><div class=\"centeredButtonWrapper\"><div style=\"height: 394px; overflow-y: auto;\">" +
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
		
		tradeResearch =
		{
			id: "Trading",
			name: "Trading".dlocalize(modid),
			pointsCost: 20,
			duration: 15000,
			canResearch: function(company)
			{
				return company.staff[0].getLevel() > 1;
			},
			category: "Multiplayer",
			categoryDisplayName: "Multiplayer".dlocalize(modid)
		};
		Research.SpecialItems.push(tradeResearch);
		
		spyResearch =
		{
			id: "Spying",
			name: "Spying".dlocalize(modid),
			pointsCost: 40,
			duration: 15000,
			cost: 1000000,
			canResearch: function(company)
			{
				return company.isLaterOrEqualThan(7) && company.staff[0].getLevel() > 2;
			},
			category: "Multiplayer",
			categoryDisplayName: "Multiplayer".dlocalize(modid)
		};
		Research.SpecialItems.push(spyResearch);
		
		advancedSpyResearch =
		{
			id: "Advanced Spying",
			name: "Advanced Spying".dlocalize(modid),
			pointsCost: 60,
			duration: 15000,
			canResearch: function(company)
			{
				return company.isLaterOrEqualThan(12) && company.staff[0].getLevel() > 4;
			},
			category: "Multiplayer",
			categoryDisplayName: "Multiplayer".dlocalize(modid)
		};
		Research.SpecialItems.push(advancedSpyResearch);
		
		sabotageResearch =
		{
			id: "Sabotage",
			name: "Sabotage".dlocalize(modid),
			pointsCost: 80,
			duration: 15000,
			canResearch: function(company)
			{
				return company.isLaterOrEqualThan(15) && company.staff[0].getLevel() > 5;
			},
			category: "Multiplayer",
			categoryDisplayName: "Multiplayer".dlocalize(modid)
		};
		Research.SpecialItems.push(sabotageResearch);
		
		tradeEvent =
		{
			id: "tradeEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function(id, company, type, rp, money)
			{
				tradeID = id;
				tradeType = type;
				tradeRP = type == "reqcash" || rp <= GameManager.company.researchPoints ? rp : GameManager.company.researchPoints;
				tradeMoney = money;
				
				var offer = 0;
				var request = 0;
				
				if (type == "reqrp")
				{
					offer = "{0} cr.".dlocalize(modid).format(UI.getShortNumberString(money));
					request = "{0} research points".dlocalize(modid).format(rp);
				}
				else if (type == "reqcash")
				{
					offer = "{0} research points".dlocalize(modid).format(rp);
					request = "{0} cr.".dlocalize(modid).format(UI.getShortNumberString(money));
				}
				
				return new Notification(
				{
					sourceId: "tradeEvent",
					header: "{0} want to trade".dlocalize(modid).format(company),
					text: "Offer: {0}".dlocalize(modid).format(offer) + "\n" + "Request: {0}".dlocalize(modid).format(request),
					options: ["Accept".dlocalize(modid), "Decline".dlocalize(modid)]
				});
			},
			complete: function(result)
			{
				if (result === 0)
				{
					if (tradeType == "reqrp")
					{
						GameManager.company.researchPoints -= parseInt(tradeRP);
						GameManager.company.adjustCash(parseInt(tradeMoney), "Trade".dlocalize(modid));
					}
					else if (tradeType == "reqcash")
					{
						GameManager.company.researchPoints += parseInt(tradeRP);
						GameManager.company.adjustCash(-parseInt(tradeMoney), "Trade".dlocalize(modid));
					}
					VisualsManager.updatePoints();
				}
				dMultiplayer.sendStatus("TRADERES", tradeID + sep + result + sep + tradeType + sep + tradeRP + sep + tradeMoney);
			}
		};
		GDT.addEvent(tradeEvent);
		
		advancedSpyPoliceEvent =
		{
			id: "advancedSpyPoliceEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function()
			{
				return new Notification(
				{
					sourceId: "advancedSpyPoliceEvent",
					header: "Caught by police!".dlocalize(modid),
					text: "You have been arrested by police for illegally spying on other companies! In addition, you will be fined {0} cr.!".dlocalize(modid).format(UI.getShortNumberString(Math.floor(GameManager.company.cash / 10))),
					weeksUntilFired: 6 + 4 * GameManager.company.getRandom()
				});
			},
			complete: function()
			{
				var fine = Math.floor(GameManager.company.cash / 10);
				if (GameManager.company.cash > 0)
				fine *= -1;
				
				GameManager.company.adjustCash(fine, "Fined for spying".dlocalize(modid));
				dMultiplayer.sendStatus("CAUGHT", fine + sep + "illegal spying".dlocalize(modid));
				
				if (GameManager.company.staff[0].state != "Researching")
					dMultiplayer.arrestCEO();
				else
					mpstore.data.arrested = true;
			}
		};
		GDT.addEvent(advancedSpyPoliceEvent);
		
		hackInterviewPoliceEvent =
		{
			id: "hackInterviewPoliceEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function()
			{
				return new Notification(
				{
					sourceId: "hackInterviewPoliceEvent",
					header: "Caught by police!".dlocalize(modid),
					text: "You have been arrested by police for hacking other companies' interviews! In addition, you will be fined {0} cr.!".dlocalize(modid).format(UI.getShortNumberString(Math.floor(GameManager.company.cash / 8))),
					weeksUntilFired: 6 + 6 * GameManager.company.getRandom()
				});
			},
			complete: function()
			{
				var fine = Math.floor(GameManager.company.cash / 8);
				if (GameManager.company.cash > 0)
				fine *= -1;
				
				GameManager.company.adjustFans(-2500 - GameManager.company.fans / 30 * GameManager.company.getRandom());
				GameManager.company.adjustCash(fine, "Fined for hacking interviews".dlocalize(modid));
				dMultiplayer.sendStatus("CAUGHT", fine + sep + "hacking interviews".dlocalize(modid));
				
				if (GameManager.company.staff[0].state != "Researching")
					dMultiplayer.arrestCEO();
				else
					mpstore.data.arrested = true;
			}
		};
		GDT.addEvent(hackInterviewPoliceEvent);
		
		sabotagePoliceEvent =
		{
			id: "sabotagePoliceEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function()
			{
				return new Notification(
				{
					sourceId: "sabotagePoliceEvent",
					header: "Caught by police!".dlocalize(modid),
					text: "You have been arrested by police for sabotaging other companies! In addition, you will be fined {0} cr.!".dlocalize(modid).format(UI.getShortNumberString(Math.floor(GameManager.company.cash / 3))),
					weeksUntilFired: 6 + 6 * GameManager.company.getRandom()
				});
			},
			complete: function()
			{
				var fine = Math.floor(GameManager.company.cash / 3);
				if (GameManager.company.cash > 0)
				fine *= -1;
				
				GameManager.company.adjustFans(-2500 - GameManager.company.fans / 12 * GameManager.company.getRandom());
				GameManager.company.adjustCash(fine, "Fined for sabotage".dlocalize(modid));
				dMultiplayer.sendStatus("CAUGHT", fine + sep + "sabotage".dlocalize(modid));
				
				if (GameManager.company.staff[0].state != "Researching")
					dMultiplayer.arrestCEO();
				else
					mpstore.data.arrested = true;
			}
		};
		GDT.addEvent(sabotagePoliceEvent);
		
		murderPoliceEvent =
		{
			id: "murderPoliceEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function()
			{
				return new Notification(
				{
					sourceId: "murderPoliceEvent",
					header: "Caught by police!".dlocalize(modid),
					text: "You have been arrested and sent to prison for murder! In addition, you will be fined {0} cr.!".dlocalize(modid).format(UI.getShortNumberString(Math.floor(GameManager.company.cash / 1.5))),
					weeksUntilFired: 6 + 8 * GameManager.company.getRandom()
				});
			},
			complete: function()
			{
				var fine = Math.floor(GameManager.company.cash / 1.5);
				if (GameManager.company.cash > 0)
				fine *= -1;
				
				GameManager.company.adjustFans(-2500 - GameManager.company.fans / 4 * GameManager.company.getRandom());
				GameManager.company.adjustCash(fine, "Fined for murder".dlocalize(modid));
				dMultiplayer.sendStatus("CAUGHT", fine + sep + "murder".dlocalize(modid));
				
				if (GameManager.company.staff.length > 1)
				{
					if (GameManager.company.staff[0].state != "Researching")
						dMultiplayer.sendCEOToPrison();
					else
						mpstore.data.goingtoprison = true;
				}
				else
					GameManager.company.notifications.push(company.notifications.push(DecisionNotifications.gameOver.getNotification(a.company)));
			}
		};
		GDT.addEvent(murderPoliceEvent);
		
		assassinEvent =
		{
			id: "assassinEvent",
			trigger: function()
			{
				return false;
			},
			getNotification: function()
			{
				employeeToKill = Math.floor(GameManager.company.getRandom() * GameManager.company.staff.length - 1) + 1;
				var employeename = GameManager.company.staff[employeeToKill].name;
				
				var causes = [" was run over by an airplane in flight".dlocalize(modid), " died in an explosion from a bomb that was following him after a race he lost".dlocalize(modid), " travelled 7 years into the future".dlocalize(modid), " got crushed by the Eiffel Tower".dlocalize(modid), " was killed by a green exploding pig".dlocalize(modid), " was eaten by a pizza monster".dlocalize(modid), "'s pet monkey shot him with a gun".dlocalize(modid), " was abducted by aliens".dlocalize(modid)];
				var cause = causes[Math.floor(GameManager.company.getRandom() * causes.length)];
				
				return new Notification(
				{
					sourceId: "assassinEvent",
					header: "{0} is no longer with us".dlocalize(modid).format(employeename),
					text: "It is with great sadness that we inform you that {0}{1} yesterday. Police are currently investigating whether this was a coincidence or not. We shall always remember him...".dlocalize(modid).format(employeename, cause),
					weeksUntilFired: 2 + 6 * GameManager.company.getRandom(),
					buttonText: ":'-(".dlocalize(modid)
				});
			},
			complete: function()
			{
				GameManager.company.staff[employeeToKill].fire();
				dMultiplayer.sendStatus("SABOTAGD", "employee passed away".dlocalize(modid));
			}
		};
		GDT.addEvent(assassinEvent);
		
		Achievements.hiNotCaughtAchievement =
		{
			id: "hiNotCaught",
			title: "Anomalous Materials".dlocalize(modid),
			description: "Hack a competitor's interviews without getting caught.".dlocalize(modid),
			tint: "#FDD017",
			value: 50
		};
		Achievements.rgNotCaughtAchievement =
		{
			id: "rgNotCaught",
			title: "Sapped".dlocalize(modid),
			description: "Corrupt a competitor's game in development without getting caught.".dlocalize(modid),
			tint: "#FDD017",
			value: 50
		};
		Achievements.assassinNotCaughtAchievement =
		{
			id: "assassinNotCaught",
			title: "My Faith In The Dagger".dlocalize(modid),
			description: "Assassinate a competitor's employee without getting caught.".dlocalize(modid),
			tint: "#E5E4E2",
			value: 80
		};
		
		Achievements.dlicence1Achievement =
		{
			id: "dlicence1",
			title: "Licence Money".dlocalize(modid),
			description: "Sell 5 console licences to your competitors.".dlocalize(modid),
			tint: "#FDD017",
			value: 50
		};
		Achievements.dlicence2Achievement =
		{
			id: "dlicence2",
			title: "Console Popularity".dlocalize(modid),
			description: "Sell 10 console licences to your competitors.".dlocalize(modid),
			tint: "#FDD017",
			value: 50
		};
		Achievements.dlicence3Achievement =
		{
			id: "dlicence3",
			title: "Third Party Support Master".dlocalize(modid),
			description: "Sell 20 console licences to your competitors.".dlocalize(modid),
			tint: "#E5E4E2",
			value: 80
		};
		
		oriOnKeyUp = window.onkeyup;
		var myOnKeyUp = function(event)
		{
			oriOnKeyUp(event);
			switch (event.which)
			{
				case 13:
					dMultiplayer.directConnect();
					dMultiplayer.sendChat();
					break;
				
				case 84:
					if ($("input:focus").length > 0 && !event.ctrlKey) break;
					dMultiplayer.showChatWindow();
			}
		};
		window.onkeyup = myOnKeyUp;
		
		oriCloseGameDef = UI.closeGameDefinition;
		var myCloseGameDef = function()
		{
			oriCloseGameDef();
			
			if (lastAnnouncedGame != GameManager.company.currentGame.title)
			{
				dMultiplayer.sendStatus("ANNGAME", GameManager.company.currentGame.title + sep + GameManager.company.currentGame.topic.id + sep + GameManager.company.currentGame.genre.id);
				lastAnnouncedGame = GameManager.company.currentGame.title;
			}
			
			if (mpstore && mpstore.data.mpplatforms)
			{
				var endfe = false;
				GameManager.company.currentGame.platforms.forEach(function(consinarr)
				{
					if (!endfe)
					{
						var index = dMultiplayer.getObjectArrayIndex(mpstore.data.mpplatforms, "id", consinarr.id);
						if (index > -1)
						{
							dMultiplayer.sendStatus("MONEY", index + sep + consinarr.developmentCosts + sep + "Platform development income");
							endfe = true;
						}
					}
				});
			}
		};
		UI.closeGameDefinition = myCloseGameDef;
		
		oriBuyPlat = GameManager.buyPlatform;
		var myBuyPlat = function(platform)
		{
			var index = dMultiplayer.getObjectArrayIndex(mpstore.data.mpplatforms, "id", platform.id);
			if (index !== undefined)
				mpstore.data.mpplatforms[index].licenced = true;
			
			if (platform.playerid > -1)
				dMultiplayer.sendStatus("MONEY", platform.playerid + sep + platform.licencePrize + sep + "Platform licence income");
			
			oriBuyPlat(platform);
		};
		GameManager.buyPlatform = myBuyPlat;
		
		oriRelGame = General.releaseGame;
		var myRelGame = function(company)
		{
			dMultiplayer.sendStatus("RELGAME", company.currentGame.title + sep + company.currentGame.topic.id + sep + company.currentGame.genre.id);
			oriRelGame(company);
		};
		General.releaseGame = myRelGame;
		
		oriFinishResearch = GameManager.finishResearch;
		var myFinishResearch = function(character)
		{
			var lastresearch = GameManager.currentResearches.first(function(research)
			{
				if (character) return research.staffId === character.id;
			});
			
			oriFinishResearch(character);
			
			if (character && character.id == 0)
			{
				if (mpstore.data.arrested)
				{
					dMultiplayer.arrestCEO();
					mpstore.data.arrested = false;
				}
				else if (mpstore.data.goingtoprison)
				{
					dMultiplayer.sendCEOToPrison();
					mpstore.data.goingtoprison = false;
				}
			}
			
			if (lastresearch && lastresearch.id && lastresearch.id !== "New Topic" && GameManager.company.researchCompleted && GameManager.company.researchCompleted.last() && GameManager.company.researchCompleted.last().id === lastresearch.id)
				dMultiplayer.sendStatus("RESEARCH", GameManager.company.researchCompleted.last().id);
		};
		GameManager.finishResearch = myFinishResearch;
		
		oriShowMenu = UI.showContextMenu;
		var myShowMenu = function(b, f)
		{
			var selectedStaff = UI.getCharUnderCursor();
			var triggered = selectedStaff == GameManager.company.staff[0];
			
			if (triggered)
			{
				if (GameManager.company.researchCompleted.indexOf(tradeResearch) > -1)
				{
					b.push(
					{
						label: "Trading...".dlocalize(modid),
						action: function()
						{
							Sound.click();
							dMultiplayer.showTradeWindow();
							GameManager.resume(true);
						}
					});
				}
				if (GameManager.company.researchCompleted.indexOf(advancedSpyResearch) > -1)
				{
					b.push(
					{
						label: "Advanced spying...".dlocalize(modid),
						action: function()
						{
							Sound.click();
							dMultiplayer.showAdvSpyWindow();
							GameManager.resume(true);
						}
					});
				}
				if (GameManager.company.researchCompleted.indexOf(sabotageResearch) > -1)
				{
					b.push(
					{
						label: "Sabotage...".dlocalize(modid),
						action: function()
						{
							Sound.click();
							dMultiplayer.showSabotageWindow();
							GameManager.resume(true);
						}
					});
				}
			}
			
			oriShowMenu(b, f);
		};
		UI.showContextMenu = myShowMenu;
		
		oriPickCheat = UI.pickCheatClick;
		myPickCheat = function(a)
		{
			if (!sentBL)
				dMultiplayer.sendStatus("BADLOSER");
			
			oriPickCheat();
		};
		UI.pickCheatClick = myPickCheat;
		
		oriAnnConsole = DecisionNotifications.announceConsole.complete;
		var myAnnConsole = function(result)
		{
			oriAnnConsole(result);
			if (result === 1)
				dMultiplayer.sendStatus("ANNCONS", GameManager.currentHwProject.name);
		};
		DecisionNotifications.announceConsole.complete = myAnnConsole;
		
		oriFinishConsole = GameManager.finishCustomConsole;
		var myFinishConsole = function(c)
		{
			oriFinishConsole(c);

			var lastplatform = GameManager.company.licencedPlatforms.last(function(platinarr)
			{
				return platinarr.isCustom && platinarr.saleCancelled;
			});

			if (lastplatform)
				dMultiplayer.sendStatus("ENDCONS", lastplatform.name + sep + lastplatform.id);

			dMultiplayer.sendConsole(true);
		};
		GameManager.finishCustomConsole = myFinishConsole;
		
		oriCompLoad = Company.load;
		var myCompLoad = function(company)
		{
			Platforms.allPlatforms = [];
			$.extend(true, Platforms.allPlatforms, originalPlatforms);
			
			if (mpstore.data.mpplatforms)
			{
				mpstore.data.mpplatforms.forEach(function(consinarr)
				{
					pushNew = true;
					dMultiplayer.overwriteObjectByID(Platforms.allPlatforms, consinarr);
					
					if (pushNew)
						GDT.addPlatform(consinarr);
				});
			}
			var retcomp = oriCompLoad(company);
			dMultiplayer.fixEmptyDuplicateArrayElements(retcomp.licencedPlatforms);
			dMultiplayer.fixEmptyDuplicateArrayElements(retcomp.availablePlatforms);
			return retcomp;
		};
		Company.load = myCompLoad;
		
		oriPlatLoad = PlatformsSerializer.load;
		var myPlatLoad = function(platform)
		{
			var loadnext = true;
			
			if (mpstore && mpstore.data.mpplatforms)
			{
				mpstore.data.mpplatforms.forEach(function(consinarr)
				{
					if (consinarr.id == platform.id && (settings.offlineconsoles || (!settings.offlineconsoles && dMultiplayer.getObjectArrayIndex(competitors, "id", consinarr.playerid) !== undefined)))
						return consinarr;
					else if (consinarr.id == platform.id)
						loadnext = false;
				});
			}
			
			if (loadnext)
				return oriPlatLoad(platform);
		};
		PlatformsSerializer.load = myPlatLoad;
		
		//nasty hack
		oriPlatImage = Platforms.getPlatformImage;
		var myPlatImage = function(platform, week)
		{
			var imageurl = oriPlatImage(platform, week);
			var index = dMultiplayer.getObjectArrayIndex(Platforms.allPlatforms, "id", platform.id);
			
			if ((index < 5 && index > 0) || (platform.id == "PC" && General.getWeekFromDateString(platform.imageDates[1]) >= week))
				imageurl = imageurl.replace("/superb/", "/");
				
			return imageurl;
		};
		Platforms.getPlatformImage = myPlatImage;
		
		oriRevWind = UI.showReviewWindow;
		var myRevWind = function(b, c)
		{
			oriRevWind(b, c);
			
			$("#reviewWindow").find(".okButton").click(function(e)
			{
				if (!e.isDefaultPrevented())
				{
					var reviewindex = Math.ceil(GameManager.company.getRandom() * 4) - 1;
					
					var name = GameManager.company.gameLog.last().title;
					var score = GameManager.company.gameLog.last().reviews.average(function(game)
					{
						return game.score;
					});
					var message = GameManager.company.gameLog.last().reviews[reviewindex].message;
					var reviewer = GameManager.company.gameLog.last().reviews[reviewindex].reviewerName;
					
					dMultiplayer.sendStatus("REVIEW", name + sep + score + sep + message + sep + reviewer + sep + GameManager.company.lastTopScore + sep + GameManager.company.previousTopScore);
				}
			});
		};
		UI.showReviewWindow = myRevWind;
		
		oriWeekPro = General.proceedOneWeek;
		var myWeekPro = function(a, b)
		{
			if (mpstore && mpstore.data.unplatforms)
			{
				mpstore.data.unplatforms.forEach(function(consinarr)
				{
					var reduce = Math.floor(General.getWeekFromDateString(consinarr.published, true)) > Math.floor(GameManager.company.currentWeek) ? 1 : 0;
					if (consinarr.relNow || reduce === 1)
					{
						var date = GameManager.company.getDate(Math.ceil((GameManager.company.currentWeek - reduce) / GameManager.flags.gameLengthModifier));
						consinarr.published = date.year + "/" + date.month + "/" + date.week;
					}
				
					GDT.addPlatform(consinarr);
					
					if (consinarr.relNow)
						consinarr.licenced = false;
					
					mpstore.data.mpplatforms.push(consinarr);
					
					if (!consinarr.relNow && Math.floor(General.getWeekFromDateString(consinarr.published)) != Math.floor(GameManager.company.currentWeek))
						GameManager.company.availablePlatforms.push(consinarr);
				});
				
				mpstore.data.unplatforms = [];
			}
			
			oriWeekPro(a, b);
		};
		General.proceedOneWeek = myWeekPro;
		
		oriCreateEngine = GameManager.createEngine;
		var myCreateEngine = function(b, f)
		{
			oriCreateEngine(b, f);
			dMultiplayer.sendStatus("CREENG", GameManager.currentEngineDev.name);
		};
		GameManager.createEngine = myCreateEngine;
		
		oriFinishEngine = GameManager.finishEngine;
		var myFinishEngine = function()
		{
			oriFinishEngine();
			dMultiplayer.sendStatus("FINENG", GameManager.company.engines.last().name);
		};
		GameManager.finishEngine = myFinishEngine;
		
		oriStartGame = GameManager.save;
		var myStartGame = function(b, c, g)
		{
			oriStartGame(b, c, g);
			dMultiplayer.initData(false);
		};
		GameManager.save = myStartGame;
		
		oriPlatEnd = Media.createConsoleEndStory;
		var myPlatEnd = function(platform)
		{
			dMultiplayer.sendMessage("ENDCONS", platform.name + sep + platform.id);
			oriPlatEnd(platform);
		};
		Media.createConsoleEndStory = myPlatEnd;
		
		oriSellGame = Sales.sellGame;
		var mySellGame = function(company, game, d)
		{
			oriSellGame(company, game, d);
			if (game.soldOut)
				dMultiplayer.sendStatus("SOLDGAME", game.title + sep + game.unitsSold + sep + game.revenue);
		};
		Sales.sellGame = mySellGame;
		
		oriFireNotification = DecisionNotifications.fireEmployee.getNotification;
		var myFireNotification = function(company, employee)
		{
			var notificationtext = "Are you sure you want to fire {0}?".localize("{0} staff name").format(employee.name);
			
			if (mpstore.data.assassintrycount > 0 && GameManager.company.staff.length < 3)
				notificationtext += " Be aware that if you assassinate someone and get sent to jail, an employee will have to replace you!".dlocalize(modid);
			
			if (employee) return company.flags.fireEmployeeId = employee.id, new Notification(
			{
				sourceId: "fireEmployee",
				header: "Fire employee?".localize("heading"),
				text: notificationtext,
				options: ["Yes".dlocalize(modid), "No".dlocalize(modid)]
			});
		};
		DecisionNotifications.fireEmployee.getNotification = myFireNotification;
		
		oriLocalizationCredits = UI.showLocalizationCredits;
		var myLocalizationCredits = function(language, html, d)
		{
			oriLocalizationCredits(language, html, d);
			if (language != "en" && typeof dLocalization !== "undefined" && language == dLocalization[modid].currentLanguageCode && typeof dLocalization !== "undefined" && typeof dLocalization[modid] !== "undefined" && typeof dLocalization[modid].currentLanguageTranslator !== "undefined" && typeof dLocalization[modid].currentLanguageCode !== "undefined")
				html.append("<h3>" + "GDTMP Translator(s)".dlocalize(modid) + "</h3><small>" + dLocalization[modid].currentLanguageTranslator + "</small>");
		};
		UI.showLocalizationCredits = myLocalizationCredits;
		
		GDT.on(GDT.eventKeys.saves.loading, dMultiplayer.initData);
	};
	
	dMultiplayer.initData = function(override)
	{
		if (!mpstore)
			mpstore = GDT.getDataStore(modid);
		if (!mpstore.data.advspycount)
			mpstore.data.advspycount = 0;
		if (!mpstore.data.sabotagecount)
			mpstore.data.sabotagecount = 0;
		if (!mpstore.data.assassintrycount)
			mpstore.data.assassintrycount = 0;
		if (!mpstore.data.sabotagedcount)
			mpstore.data.sabotagedcount = 0;
		if (!mpstore.data.platformlicencessold)
			mpstore.data.platformlicencessold = 0;
		if (!mpstore.data.arrested)
			mpstore.data.arrested = false;
		if (!mpstore.data.goingtoprison)
			mpstore.data.goingtoprison = false;
		if (!mpstore.data.mpplatforms)
			mpstore.data.mpplatforms = [];
		if (!mpstore.data.unplatforms)
			mpstore.data.unplatforms = [];
		if (!mpstore.settings.mpsrvhistory)
			mpstore.settings.mpsrvhistory = [];
		
		if (override === true || (!isConnected && !triedConnect))
		{
			playerCode = Math.round(Math.random() * 10000000);
			$("#mainMenu").dialog("close");
			dMultiplayer.showServersWindow(triedConnect);
			triedConnect = true;
		}
			
		if ($("#switchButton").hasClass("disabledButton"))
			$("#switchButton").removeClass("disabledButton").addClass("orangeButton");
	};

	dMultiplayer.initSocket = function(ip, desc)
	{
		if (isConnected)
		{
			dMultiplayer.setConnected(false);
			competitors = [];
			
			if (!listMinimized)
			{
				$("#gdtmpcard").height("100px");
				$("#gdtmpminimize").css("bottom", "141px");
			}
			
			dMultiplayer.refresh();
			GameManager.resume(true);
			
			if (ip)
				dMultiplayer.displayMessage("Reconnecting...".dlocalize(modid));
			
			socket.close();
		}
		
		if (!ip)
		{
			$("#gdtmpcard").html("");
			$("#gdtmpcard").hide();
			$("#gdtmpminimize").hide();
			return;
		}
		else
		{
			$("#gdtmpcard").show();
			$("#gdtmpminimize").show();
		}
		
		var ipPort = ip;
		var hasPort = ip.split(":").length > 1;
		if (!hasPort)
			ipPort += ":3966";
		
		socket = new WebSocket("ws://" + ipPort);

		socket.onopen = function()
		{
			dMultiplayer.setConnected(true);
			dMultiplayer.sendStatus("REQID", playerCode + sep + dmod.version);
			
			setTimeout(function() { dMultiplayer.sendCompany(!loopingSC); }, 1000);
			dMultiplayer.refresh();
			
			var badmodindex = dMultiplayer.getObjectArrayIndex(modsAtLoad, "id", "CheatMod-kristof1104");
			if (badmodindex > -1 && modsAtLoad[badmodindex].active)
			{
				dMultiplayer.sendStatus("BADLOSER"); //hehe
				sentBL = true;
			}
			
			var historydesc = desc ? desc : ipPort;
			var historyitem =
			{
				ip: ipPort,
				description: historydesc
			};
			
			var pushtohistory = true;
			mpstore.settings.mpsrvhistory.forEach(function(srvinarr, index)
			{
				if (srvinarr.ip == ipPort)
				{
					pushtohistory = false;
					mpstore.settings.mpsrvhistory[index].description = historydesc;
				}
			});
			
			if (pushtohistory)
			{
				mpstore.settings.mpsrvhistory.push(historyitem);
				if (mpstore.settings.mpsrvhistory.length > 10)
					mpstore.settings.mpsrvhistory.shift();
				
				DataStore.saveSettings();
			}
		};

		socket.onmessage = function(event)
		{
			var data = event.data.split(sep);
			if (data.length < 2) return;
			var id = data[data.length - 1];
			var index = dMultiplayer.getObjectArrayIndex(competitors, "id", id);
			if (index === undefined && id != serverID && data[0] != "COMPANY" && data[0] != "REQCOMP") return;
			
			if (data[0] != "YOURID")
				data.pop();
			
			switch (data[0])
			{
				case "ASPIED":
					var company = competitors[index].name;
					dMultiplayer.displayMessage("{0} had lots of documents stolen, police are investigating...".dlocalize(modid).format(company));
					break;
				
				case "ADVSPY":
					if (data.length < 3) return;
					
					var target = data[1];
					var factor = data[2];
					
					if (target == playerID)
					{
						var design = 0;
						var tech = 0;
						var efficiency = 0;
						
						GameManager.company.staff.forEach(function(staffinarr)
						{
							design += Math.floor(staffinarr.designFactor * 500);
							tech += Math.floor(staffinarr.technologyFactor * 500);
							efficiency += Math.round(staffinarr.efficiency) * 100 / GameManager.company.staff.length;
						});
						
						efficiency = Math.round(efficiency) + "%";
						
						var research = GameManager.company.researchPoints;
						var advspycount = mpstore.data.advspycount;
						var sabotagecount = mpstore.data.sabotagecount;
						var sabotagedcount = mpstore.data.sabotagecount;
						
						var researchedtopics = "";
						GameManager.company.topics.forEach(function(topicinarr)
						{
							researchedtopics += topicinarr.name + "\n";
						});
						
						var researchedfeatures = "";
						GameManager.company.researchCompleted.forEach(function(rsinarr)
						{
							researchedfeatures += rsinarr.name + "\n";
						});
						
						if (factor > GameManager.company.getRandom())
						{
							dMultiplayer.sendStatus("ASPYDATA", id + sep + factor + sep + design + sep + tech + sep + efficiency + sep + research + sep + advspycount + sep + sabotagecount + sep + sabotagedcount + sep + researchedtopics + sep + researchedfeatures);
							dMultiplayer.sendStatus("ASPIED");
						}
						else
							dMultiplayer.sendStatus("ASPYFAIL", id);
							
						var n = new Notification(
						{
							header: "Abnormal Activity".dlocalize(modid),
							text: "It seems like someone has broken into our servers and downloaded a lot of files. Police are investigating this matter...".dlocalize(modid),
							weeksUntilFired: 2 + 2 * GameManager.company.getRandom()
						});
						GameManager.company.notifications.push(n);
					}
					
					break;
					
				case "ASPYDATA":
					if (data.length < 12) return;
					
					var company = competitors[index].name;
					var target = data[1];
					var factor = data[2];
					var design = data[3];
					var tech = data[4];
					var efficiency = data[5];
					var research = data[6];
					var advspycount = data[7];
					var sabotagecount = data[8];
					var sabotagedcount = data[9];
					var researchedtopics = data[10] ? data[10] : "none";
					var researchedfeatures = data[11] ? data[11] : "none";
					
					var caught = factor / 0.5 < GameManager.company.getRandom();
					
					if (target == playerID)
					{
						var n = new Notification(
						{
							header: "{0} spy report".dlocalize(modid).format(company),
							text: ("Total team design: {0}\nTotal team technology: {1}\nCurrent team efficiency: {2}\nResearch points: {3}\nTimes used advanced spying: {4}\nTimes sabotaged other companies: {5}\nTimes sabotaged by other companies: {6}" +
									"\n\nTopics available:\n{7}\nResearched features:\n{8}\nWe appreciate your trust in us.\nAgent Rijndael").dlocalize(modid).format(design, tech, efficiency, research, advspycount, sabotagecount, sabotagedcount, researchedtopics, researchedfeatures),
							weeksUntilFired: 1 + 2 * GameManager.company.getRandom()
						});
						GameManager.company.notifications.push(n);
						
						mpstore.data.advspycount++;
						
						if (caught)
							GameManager.company.notifications.insertAt(0, advancedSpyPoliceEvent.getNotification());
					}
					
					break;
					
				case "ASPYFAIL":
					if (data.length < 2) return;
					
					var company = competitors[index].name;
					var target = data[1];
					
					if (target == playerID)
					{
						var n = new Notification(
						{
							header: "{0} spy report".dlocalize(modid).format(company),
							text: "Sorry, we weren't able to complete the mission.\n\nApologies,\nAgent Rijndael".dlocalize(modid),
							weeksUntilFired: 1 + 2 * GameManager.company.getRandom()
						});
						GameManager.company.notifications.push(n);
					}
					break;
					
				case "ANNCONS":
					if (data.length < 2) return;
						
					var company = competitors[index].name;
					var console = data[1];
					
					dMultiplayer.displayMessage("{0} announced the \"{1}\"".dlocalize(modid).format(company, console));
					break;
					
				case "ANNGAME":
					if (data.length < 4) return;
					
					var company = competitors[index].name;
					var game = data[1];
					var topic = data[2].localize("game topic");
					var genre = data[3].localize("genre");
					
					dMultiplayer.displayMessage("{0} announced \"{1}\" ({2}/{3})".dlocalize(modid).format(company, game, topic, genre));
					break;
					
				case "CAUGHT":
					if (data.length < 3) return;
					
					var company = competitors[index].name;
					var fine = data[1];
					var reason = data[2];
					
					dMultiplayer.displayMessage("{0} was arrested and fined {1} cr. for {2}!".dlocalize(modid).format(company, UI.getShortNumberString(Math.floor(fine)), reason));
					break;
				
				case "COMPANY":
					if (data.length < 7) return;
					
					var competitor = 
					{
						id: id,
						name: data[1],
						boss: data[2],
						cash: parseInt(data[3]),
						fans: parseInt(data[4]),
						rp: parseInt(data[5]),
						week: parseInt(data[6]),
						muted: false,
						indicator: false
					};
					
					pushNew = true;
					dMultiplayer.overwriteObjectByID(competitors, competitor);
					
					if (pushNew)
					{
						competitors.push(competitor);
						
						if (data.length > 7 && data[7] == "join")
							dMultiplayer.displayMessage("{0} joined".dlocalize(modid).format(competitor.name));
						
						if (competitors.length > 5 && !listMinimized)
						{
							$("#gdtmpcard").height("+=20px");
							$("#gdtmpminimize").css("bottom", "+=20px")
						}
					}
					
					dMultiplayer.refresh();
					break;
					
				case "CONSOLE":
					if (data.length < 10 || !GameManager.company || competitors[index].name == GameManager.company.name) return;
					
					pushNew = true;
					var cid = id;
					
					var console = 
					{
						id: data[1],
						iconUri: data[2],
						name: "\"" + data[3] + "\"",
						company: competitors[index].name,
						licencePrize: 1000000,
						published: data[4],
						platformRetireDate: "260/12/4",
						developmentCosts: 100000,
						genreWeightings: data[5].split(":"),
						audienceWeightings: data[6].split(":"),
						techLevel: parseFloat(data[7]),
						startAmount: parseFloat(data[8]),
						unitsSold: parseFloat(data[9]),
						isGDTMP: true,
						relNow: false,
						playerid: cid
					};
					
					if (General.getWeekFromDateString(console.published, true) > GameManager.company.currentWeek)
					{
						if (settings.syncconsoles) return;

						var date = GameManager.company.getDate(Math.ceil(GameManager.company.currentWeek) / GameManager.flags.gameLengthModifier);
						console.published = date.year + "/" + date.month + "/" + date.week;
					}
					
					dMultiplayer.overwriteObjectByID(Platforms.allPlatforms, console, "console");
					dMultiplayer.overwriteObjectByID(GameManager.company.availablePlatforms, console, "console");
					dMultiplayer.overwriteObjectByID(GameManager.company.licencedPlatforms, console, "console");
					dMultiplayer.overwriteObjectByID(mpstore.data.mpplatforms, console, "console");
					
					existsoutsideun = !pushNew;
					
					dMultiplayer.overwriteObjectByID(mpstore.data.unplatforms, console);
					
					if (pushNew)
					{
						if (data.length > 10 && data[10] == "rel")
							console.relNow = true;

						mpstore.data.unplatforms.push(console);
					}
					else if (!existsoutsideun && data.length > 10 && data[10] == "rel")
					{
						var index = dMultiplayer.getObjectArrayIndex(mpstore.data.unplatforms, "id", console.id);
						mpstore.data.unplatforms[index].relNow = true;
					}
					
					break;
					
				case "CREENG":
					if (GameManager.company.researchCompleted.indexOf(spyResearch) == -1 || data.length < 2) return;
					
					var company = competitors[index].name;
					var engine = data[1];
					
					dMultiplayer.displayMessage("{0} started working on engine \"{1}\"".dlocalize(modid).format(company, engine));
					break;
				
				case "DISCONN":
					if (data.length < 3 || id != serverID) return;
					
					var playerid = data[1];
					var action = data[2];
					
					var playerindex = dMultiplayer.getObjectArrayIndex(competitors, "id", playerid);
					
					if (playerindex > -1)
					{
						var displayedaction = "left".dlocalize(modid);
						if (action == "was kicked")
							displayedaction = action.dlocalize(modid);
						
						dMultiplayer.displayMessage(competitors[playerindex].name + " " + displayedaction);
						competitors.splice(playerindex, 1);
						
						if (competitors.length > 4 && !listMinimized)
						{
							$("#gdtmpcard").height("-=20px");
							$("#gdtmpminimize").css("bottom", "-=20px")
						}
						
						dMultiplayer.refresh();
					}
					break;

				case "ENDCONS":
					if (data.length < 4) return;
					
					var company = competitors[index].name;
					var consolename = data[1];
					var consoleid = data[2];
					var units = data[3];
					
					var aindex = dMultiplayer.getObjectArrayIndex(GameManager.company.availablePlatforms, "id", consoleid);
					var lindex = dMultiplayer.getObjectArrayIndex(GameManager.company.licencedPlatforms, "id", consoleid);

					if (aindex !== undefined)
						GameManager.company.availablePlatforms.splice(aindex, 1);
					if (lindex !== undefined)
						GameManager.company.licencedPlatforms.splice(lindex, 1);

					dMultiplayer.displayMessage("{0} took their platform \"{1}\" off the market ({2} units sold)".dlocalize(modid).format(company, consolename, UI.getShortNumberString(units)));
					break;
				
				case "FINENG":
					if (GameManager.company.researchCompleted.indexOf(spyResearch) == -1 || data.length < 2) return;
					
					var company = competitors[index].name;
					var engine = data[1];
					
					dMultiplayer.displayMessage("{0} finished engine \"{1}\"".dlocalize(modid).format(company, engine));
					break;
				
				case "KICK":
					if (id != serverID) return;
					
					if (data.length > 1)
						kickmessage = data[1];
					else
						kickmessage = "none";
					
					kicked = true;
					socket.close();
					socket.onclose();
					break;
				
				case "MONEY":
					if (data.length < 4) return;
					
					var target = data[1];
					var money = data[2];
					var message = data[3];
					
					if (target == playerID)
					{
						GameManager.company.adjustCash(parseInt(money), message.dlocalize(modid));
						
						if (message == "Platform licence income".dlocalize(modid))
						{
							mpstore.data.platformlicencessold++;
							
							if (mpstore.data.platformlicencessold == 5)
								Achievements.activate(Achievements.dlicence1Achievement);
							else if (mpstore.data.platformlicencessold == 10)
								Achievements.activate(Achievements.dlicence2Achievement);
							else if (mpstore.data.platformlicencessold == 20)
								Achievements.activate(Achievements.dlicence3Achievement);
						}
					}
					
					break;
				
				case "MSG":
					if (data.length < 2 || (competitors[index] && competitors[index].muted)) return;
					
					var boss = id != serverID ? "<" + competitors[index].boss + "> " : "[" + "Server".dlocalize(modid) + "] ";
					var message = data[1];
					
					dMultiplayer.displayMessage(boss + message);
					break;

				case "PRIVMSG":
					if (data.length < 3 || (competitors[index] && competitors[index].muted)) return;
					
					var boss = id != serverID ? "[" + competitors[index].boss + " -> " + GameManager.company.staff[0].name + "] " : "{" + "Server".dlocalize(modid) + " -> " + GameManager.company.staff[0].name + "} ";
					var target = data[1];
					var message = data[2];
					
					if (target == playerID)
						dMultiplayer.displayMessage(boss + message);

					break;
				
				case "RELGAME":
					if (data.length < 4) return;
					
					var company = competitors[index].name;
					var game = data[1];
					var topic = data[2].localize("game topic");
					var genre = data[3].localize("genre");
					
					dMultiplayer.displayMessage("{0} released \"{1}\" ({2}/{3})".dlocalize(modid).format(company, game, topic, genre));
					if (GameManager.company.isCurrentlyDevelopingGame() && GameManager.company.currentGame.topic && GameManager.company.currentGame.getGenreDisplayName() == genre)
					{
						var factor = Math.min(GameManager.company.fans, competitors[index].fans) / Math.max(GameManager.company.fans, competitors[index].fans);
						
						if (factor < 0.8)
							factor = 0.8;
						else if (GameManager.company.currentGame.flags.salesAnomaly < 0.8)
							factor = 1;
						
						GameManager.company.currentGame.flags.salesAnomaly *= factor;
						
						var n = new Notification(
						{
							header: "Similar Genre".dlocalize(modid),
							text: "{0}'s newly released game is a(n) {1} game, just like the game we're working on. This might negatively affect our sales.".dlocalize(modid).format(company, genre)
						});
						GameManager.company.activeNotifications.addRange(n.split());
					}
					break;
				
				case "REQCOMP":
					dMultiplayer.sendCompany(false);
					break;
				
				case "RESEARCH":
					if (GameManager.company.researchCompleted.indexOf(spyResearch) == -1 || data.length < 2) return;
					
					var company = competitors[index].name;
					var research = data[1];
					
					dMultiplayer.displayMessage("{0} researched {1}".dlocalize(modid).format(company, research));
					break;
					
				case "REVIEW":
					if (data.length < 7) return;
					
					var company = competitors[index].name;
					var game = data[1];
					var score = data[2];
					var message = data[3];
					var reviewer = data[4];
					var lasttopscore = parseFloat(data[5]);
					var previoustopscore = parseFloat(data[6]);
					
					dMultiplayer.displayReviews(game + " (" + company + ")", score, message, reviewer);
					
					if (settings.reviewbattle && GameManager.company.lastTopScore > 0 && GameManager.company.previousTopScore > 0)
					{
						var lasttopscorediff = GameManager.company.lastTopScore / lasttopscore;
						if (lasttopscorediff > 0.95 && lasttopscorediff < 1.05)
							GameManager.company.lastTopScore = lasttopscore;
						else if (lasttopscorediff <= 0.95)
							GameManager.company.lastTopScore *= 0.99;
						else
							GameManager.company.lastTopScore *= 1.01;
							
						var previoustopscorediff = GameManager.company.previousTopScore / previoustopscore;
						if (previoustopscorediff > 0.95 && previoustopscorediff < 1.05)
							GameManager.company.previousTopScore = previoustopscore;
						else if (previoustopscorediff <= 0.95)
							GameManager.company.previousTopScore *= 0.99;
						else
							GameManager.company.previousTopScore *= 1.01;
					}
					break;
					
				case "SABODATA":
					if (data.length < 4) return;
					
					var company = competitors[index].name;
					var target = data[1];
					var type = data[2];
					var caught = data[3];
					
					if (target == playerID)
					{
						var n = new Notification(
						{
							header: "{0} sabotage report".dlocalize(modid).format(company),
							text: "We have successfully done what you told us to.\n\nThanks for making business with us,\nAgent Rijndael".dlocalize(modid),
							weeksUntilFired: 1 + 2 * GameManager.company.getRandom()
						});
						GameManager.company.notifications.push(n);
						
						mpstore.data.sabotagecount++;
						
						if (caught == "true")
						{
							switch (type)
							{
								case "hackinterviews":
									GameManager.company.notifications.insertAt(0, hackInterviewPoliceEvent.getNotification());
									break;
								
								case "ruingame":
									GameManager.company.notifications.insertAt(0, sabotagePoliceEvent.getNotification());
									break;
								
								case "assassin":
									GameManager.company.notifications.insertAt(0, murderPoliceEvent.getNotification());
							}
						}
						else
						{
							switch (type)
							{
								case "hackinterviews":
									setTimeout(function() { Achievements.activate(Achievements.hiNotCaughtAchievement); }, 15000);
									break;
								
								case "ruingame":
									setTimeout(function() { Achievements.activate(Achievements.rgNotCaughtAchievement); }, 15000);
									break;
								
								case "assassin":
									setTimeout(function() { Achievements.activate(Achievements.assassinNotCaughtAchievement); }, 15000);
							}
						}
					}
					break;
					
				case "SABOFAIL":
					if (data.length < 2) return;
					
					var company = competitors[index].name;
					var target = data[1];
					
					if (target == playerID)
					{
						var n = new Notification(
						{
							header: "{0} sabotage report".dlocalize(modid).format(company),
							text: "Sorry, we weren't able to complete the mission.\n\nApologies,\nAgent Rijndael".dlocalize(modid),
							weeksUntilFired: 1 + 2 * GameManager.company.getRandom()
						});
						GameManager.company.notifications.push(n);
					}
					break;
				
				case "SABOTAGE":
					if (data.length < 4) return;
					
					var target = data[1];
					var factor = data[2];
					var type = data[3];
					
					var success = type == "hackinterviews" || (type == "ruingame" && GameManager.company.currentGame && factor > GameManager.company.getRandom()) || (type == "assassin" && GameManager.company.staff.length > 1 && factor / 2 > GameManager.company.getRandom());
					var caught = success && ((type == "hackinterviews" || type == "ruingame") && factor < GameManager.company.getRandom()) || (type == "assassin" && factor / 1.5 < GameManager.company.getRandom());
					
					if (target == playerID)
					{
						if (success)
						{
							switch (type)
							{
								case "hackinterviews":
									var n = new Notification(
									{
										header: "Dissing the fans".dlocalize(modid),
										text: ("In a recent interview {0}, CEO of {1}, criticized their fans, saying they get way too excited for new games, and \"should just shut up for their own sake\".\n" +
												"{1} insist that {0} did not write this, or rather that \"this very insulting assertion wasn't made by anyone within the company\", but we don't know if that's simply a bad excuse or not.").dlocalize(modid).format(GameManager.company.staff[0].name, GameManager.company.name),
										weeksUntilFired: 1 + 2 * GameManager.company.getRandom()
									});
									n.adjustFans(-2500 - GameManager.company.fans / 30 * GameManager.company.getRandom());
									GameManager.company.notifications.push(n);
									
									dMultiplayer.sendStatus("SABOTAGD", "interviews hacked".dlocalize(modid));
									break;
								
								case "ruingame":
									var n = new Notification(
									{
										header: "We've been hacked!".dlocalize(modid),
										text: "It seems like someone has broken into our servers and corrupted some of the files for the game in development. Police are investigating this matter...".dlocalize(modid)
									});
									GameManager.company.activeNotifications.addRange(n.split());
									
									GameManager.company.currentGame.designPoints *= 0.7 + 0.25 * GameManager.company.getRandom();
									GameManager.company.currentGame.technologyPoints *= 0.7 + 0.25 * GameManager.company.getRandom();
									VisualsManager.updatePoints();
									
									dMultiplayer.sendStatus("SABOTAGD", "project corrupted".dlocalize(modid));
									break;
								
								case "assassin":
									GameManager.company.notifications.insertAt(0, assassinEvent.getNotification());
							}
							
							mpstore.data.sabotagedcount++;
							dMultiplayer.sendStatus("SABODATA", id + sep + type + sep + caught.toString());
						}
						else
							dMultiplayer.sendStatus("SABOFAIL", id);
					}
					
					break;
					
				case "SABOTAGD":
					var company = competitors[index].name;
					if (data.length < 2 || GameManager.company.researchCompleted.indexOf(spyResearch) == -1 || company == GameManager.company.name) return;
					
					var type = data[1];
							
					dMultiplayer.displayMessage("{0} was sabotaged ({1}!)".dlocalize(modid).format(company, type));
					break;

				case "SETTINGS":
					if (data.length < 2 || id != serverID) return;
					
					var version = data[1];
					
					if (!dMultiplayer.compareVersions(version, minsrvver, true))
					{
						socket.close();
						dMultiplayer.displayMessage("The server is outdated.".dlocalize(modid));
						socket.onclose();
						return;
					}
					
					if (data.length < 6) return;
					
					var timesync = data[2];
					var syncconsoles = data[3];
					var offlineconsoles = data[4];
					var reviewbattle = data[5];
					
					settings.version = version;
					settings.timesync = timesync == "true";
					settings.syncconsoles = syncconsoles == "true";
					settings.offlineconsoles = offlineconsoles == "true";
					settings.reviewbattle = reviewbattle == "true";
					
					break;
				
				case "SOLDGAME":
					if (data.length < 4) return;
					
					var company = competitors[index].name;
					var game = data[1];
					var units = data[2];
					var revenue = data[3];
					
					dMultiplayer.displayMessage("{0}'s game \"{1}\" is now off the market ({2} units sold, {3} in revenue)".dlocalize(modid).format(company, game, UI.getShortNumberString(units), UI.getShortNumberString(revenue)));
					break;
					
				case "TRADEREQ":
					if (data.length < 5) return;
					
					var company = competitors[index].name;
					var target = data[1];
					var type = data[2];
					var rp = data[3];
					var money = data[4];
					
					if (target == playerID)
						GameManager.company.notifications.insertAt(0, tradeEvent.getNotification(id, company, type, rp, money));
					
					break;
					
				case "TRADERES":
					if (data.length < 6) return;
					
					var company = competitors[index].name;
					var target = data[1];
					var result = data[2];
					var type = data[3];
					var rp = data[4];
					var money = data[5];
					
					if (target == playerID)
					{
						var n;
						if (result == 0)
						{
							n = new Notification(
							{
								header: "{0} trade".dlocalize(modid),
								text: "{0} accepted the offer.\n({1} research points <-> {2} cr.)".dlocalize(modid).format(company, rp, UI.getShortNumberString(money))
							});
							
							if (type == "reqrp")
							{
								GameManager.company.researchPoints += parseInt(rp);
								GameManager.company.adjustCash(-parseInt(money), "Trade");
							}
							else if (type == "reqcash")
							{
								GameManager.company.researchPoints -= parseInt(rp);
								GameManager.company.adjustCash(parseInt(money), "Trade");
							}
							VisualsManager.updatePoints();
						}
						else if (result == 1)
						{
							n = new Notification(
							{
								header: "{0} trade".dlocalize(modid),
								text: "{0} declined the offer.".dlocalize(modid)
							});
						}
						GameManager.company.activeNotifications.addRange(n.split());
					}
					break;
				
				case "YOURID":
					if (data.length < 3) return;
					
					var code = data[1];
					var yourid = data[2];
					if (code != playerCode) return;
					
					playerID = yourid;
			}
		};

		socket.onclose = function()
		{
			if (!kicked)
				isConnected ? dMultiplayer.displayMessage("Lost connection to server, continuing in offline mode.".dlocalize(modid)) : dMultiplayer.displayMessage("Couldn't connect to server, playing in offline mode.".dlocalize(modid));
			else if (kickmessage != "none")
				dMultiplayer.displayMessage("You have been kicked from the server. Message: {0}".dlocalize(modid).format(kickmessage));
			else
				dMultiplayer.displayMessage("You have been kicked from the server, continuing in offline mode.".dlocalize(modid));
			
			dMultiplayer.setConnected(false);
			dMultiplayer.initSocket();
		};
	};
	
	dMultiplayer.playOffline = function()
	{
		dMultiplayer.initSocket();
		UI.closeModal();
	};
	
	dMultiplayer.sendStatus = function(type, str)
	{
		if (!isConnected) return;
		
		var data = type.toUpperCase();
		if (str)
			data += sep + str;
		
		try
		{
			socket.send(data);
		}
		catch (ex)
		{
			dMultiplayer.displayMessage("ERROR: Failed to send some data.".dlocalize(modid));
		}
	};
	
	dMultiplayer.displayMessage = function(str)
	{
		dMultiplayer.log(str);
		if (chatOpen || !GameManager.company) return;
		
		var additionalmessage = UI.isModalContentOpen() && activeMessages > 5;
		
		var container = new createjs.Container();
		var text;
		
		if (additionalmessage)
		{
			if (activeAdditionalMessage) return;
			
			activeAdditionalMessage = true;
			text = new createjs.Text("Additional messages visible in the chat log.".dlocalize(modid), "18pt Arial", "black");
		}
		else
			text = new createjs.Text(str, "18pt Arial", "black");
			
		text.textBaseline = "top";
		
		var width = text.getMeasuredWidth() + 8;
		var height = text.getMeasuredLineHeight() + 8;
		
		container.x = 70 - (width / 2) + 150 * GameManager.company.getRandom() * (window.innerWidth / 1024);
		container.y = window.innerHeight;
		
		var rect = new createjs.Shape();
		var graphics = rect.graphics;
		
		graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 0.8));
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.drawRoundRect(-4, -4, width, height, 5);
		graphics.closePath();
		
		container.addChild(rect);
		container.addChild(text);
		container.alpha = 0;
		
		VisualsManager.gameStatusBar.addChild(container);
		
		setTimeout(function()
		{
			activeMessages++;
			createjs.Tween.get(container).to(
			{
				alpha: 1,
				y: container.y - 30 - 60 * GameManager.company.getRandom()
			}, 1000).to(
			{
				y: container.y - 85 - 50 * GameManager.company.getRandom()
			}, 5000).to(
			{
				y: container.y - 110 - 75 * GameManager.company.getRandom()
			}, 1000).to(
			{
				alpha: 0,
				y: container.y - 200 - 40 * GameManager.company.getRandom()
			}, 500).call(function()
			{
				activeMessages--;
				if (additionalmessage)
					activeAdditionalMessage = false;
				
				VisualsManager.gameStatusBar.removeChild(container);
			});
		}, (activeMessages - 1) * (activeMessages - 1) * 40);
	};
	
	dMultiplayer.displayReviews = function(game, score, message, reviewer)
	{
		dMultiplayer.log("{0} got an average score of {1}".dlocalize(modid).format(game, score));
		if (chatOpen || !GameManager.company) return;
		
		var container = new createjs.Container();
		
		var text = new createjs.Text(game, "16pt Arial", "black");
		var text2 = new createjs.Text(score, "22pt Arial", "black");
		var text3 = new createjs.Text("\"" + message + "\"", "12pt Arial");
		var text4 = new createjs.Text("... " + reviewer, "12pt Arial");
		
		var width = Math.max(text.getMeasuredWidth(), text.getMeasuredWidth(), text3.getMeasuredWidth() + 8, text4.getMeasuredWidth() + 48) + 16;
		var height = text.getMeasuredLineHeight() + text2.getMeasuredLineHeight() + text3.getMeasuredLineHeight() * 2 + 38;
		
		text.textBaseline = "top";
		text2.textBaseline = "top";
		text3.textBaseline = "top";
		text4.textBaseline = "top";
		
		text.textAlign = "center";
		text2.textAlign = "center";
		
		text.x = width / 2 - 4;
		text2.x = width / 2 - 4;
		text3.x = 8;
		text4.x = 48;
		
		text2.y = text.getMeasuredLineHeight() + 10;
		text3.y = text.getMeasuredLineHeight() + text2.getMeasuredLineHeight() + 24;
		text4.y = text.getMeasuredLineHeight() + text2.getMeasuredLineHeight() + text3.getMeasuredLineHeight() + 30;
		
		container.x = (width / 2) + 150 * GameManager.company.getRandom() * (window.innerWidth / 1024);
		container.y = window.innerHeight;
		
		var rect = new createjs.Shape();
		var graphics = rect.graphics;
		
		graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 0.8));
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.drawRoundRect(-4, -4, width, height, 5);
		graphics.closePath();
		
		container.addChild(rect);
		container.addChild(text);
		container.addChild(text2);
		container.addChild(text3);
		container.addChild(text4);
		container.alpha = 0;
		
		VisualsManager.gameStatusBar.addChild(container);
		
		setTimeout(function()
		{
			if (!GameManager.company) return;
			activeReviews++;
			createjs.Tween.get(container).to(
			{
				alpha: 1,
				y: container.y - 80 - 60 * GameManager.company.getRandom()
			}, 1000).to(
			{
				y: container.y - 135 - 50 * GameManager.company.getRandom()
			}, 5000).to(
			{
				y: container.y - 160 - 75 * GameManager.company.getRandom()
			}, 1000).to(
			{
				alpha: 0,
				y: container.y - 250 - 40 * GameManager.company.getRandom()
			}, 500).call(function()
			{
				VisualsManager.gameStatusBar.removeChild(container);
				activeReviews--;
			});
		}, activeReviews * activeReviews * 40);
	};
	
	dMultiplayer.refresh = function()
	{
		if (!GameManager.company) return;
		
		var totalweek = 0;
		competitors.forEach(function(compinarr)
		{
			totalweek += compinarr.week;
		});
		
		if (settings.timesync && competitors.length > 0 && GameManager.company.currentWeek && totalweek)
		{
			var divider = GameManager.company.currentWeek > 12 ? 12 : GameManager.company.currentWeek + 1;
			var curcalweek = Math.sqrt(GameManager.company.currentWeek / 20);
			var maxvalue = curcalweek > 0 ? curcalweek : 1;
			
			var minvalue = divider == 12 ? curcalweek / 10 : 1;
			if (minvalue < 0.5 || (divider == 12 && minvalue > 0))
				minvalue = 0.5;
			
			var finaldivide = Math.floor(GameManager.company.currentWeek / divider);
			if (finaldivide < 1)
				finaldivide = 1;
			
			var timemodifier = totalweek / divider / competitors.length / finaldivide;
			if (timemodifier > maxvalue)
				timemodifier = maxvalue;
			else if (timemodifier < minvalue)
				timemodifier = minvalue;
			else if (!timemodifier)
				timemodifier = 1;
			
			!GameManager.isGamePaused() ? GameManager._timeModifier = timemodifier : GameManager._oldTimeModifier = timemodifier;
		}
		else
			!GameManager.isGamePaused() ? GameManager._timeModifier = 1 : GameManager._oldTimeModifier = 1;
		
		$("#gdtmpcard").html("");
		
		var i = 0;
		competitors.sort(function(compinarra, compinarrb)
		{
			if (compinarra.cash != compinarrb.cash)
				return compinarrb.cash - compinarra.cash;
			else if (compinarra.fans != compinarrb.fans)
				return compinarrb.fans - compinarra.fans;
			else 
				return compinarrb.rp - compinarra.rp;
		}).forEach(function(compinarr)
		{
			var image = "blank";
			if (compinarr.prevposition > -1 || compinarr.indicator)
			{
				if (i < compinarr.prevposition)
					image = "up";
				else if (i > compinarr.prevposition)
					image = "down";
				
				if (!compinarr.indicator)
					setTimeout(function(img) { compinarr.indicator = false; }, 5000);
				
				compinarr.indicator = true;
			}
			
			$("#gdtmpcard").append("<img src=\"./mods/dmultiplayer/img/" + image + ".png\" style=\"width: auto; height: auto;\" /> " + compinarr.name + " <sup>("  + compinarr.boss + ")</sup><span style=\"float: right\">" + "Cash:".dlocalize(modid) + " " + UI.getShortNumberString(compinarr.cash) + "&nbsp;&nbsp;&nbsp;" + "Fans:".dlocalize(modid) + " " + UI.getShortNumberString(compinarr.fans) + "</span><br />");
			compinarr.prevposition = i;
			i++;
		});
		
		if ($("#gdtmpcard").html() === "")
			$("#gdtmpcard").html("You are the only connected player.".dlocalize(modid));
		
		GameManager.company.licencedPlatforms = GameManager.company.licencedPlatforms.map(function(consinarr)
		{
			return PlatformsSerializer.load(consinarr);
		});
		GameManager.company.availablePlatforms = GameManager.company.availablePlatforms.map(function(consinarr)
		{
			return PlatformsSerializer.load(consinarr);
		});
		
		mpstore.data.mpplatforms.forEach(function(consinarr)
		{
			if (settings.offlineconsoles || (!settings.offlineconsoles && dMultiplayer.getObjectArrayIndex(competitors, "id", consinarr.playerid) !== undefined))
			{
				var index = dMultiplayer.getObjectArrayIndex(mpstore.data.mpplatforms, "id", consinarr.id);
				
				if (dMultiplayer.getObjectArrayIndex(GameManager.company.licencedPlatforms, "id", consinarr.id) === undefined && dMultiplayer.getObjectArrayIndex(GameManager.company.availablePlatforms, "id", consinarr.id) === undefined)
					mpstore.data.mpplatforms[index].licenced ? GameManager.company.licencedPlatforms.push(mpstore.data.mpplatforms[index]) : GameManager.company.availablePlatforms.push(mpstore.data.mpplatforms[index]);
			}
		});
		
		dMultiplayer.fixEmptyDuplicateArrayElements(GameManager.company.licencedPlatforms);
		dMultiplayer.fixEmptyDuplicateArrayElements(GameManager.company.availablePlatforms);
	};
	
	dMultiplayer.showChatWindow = function()
	{
		if (UI.isModalContentOpen() || GameManager.isGamePaused()) return;
		
		UI.showModalContent("#chatDialog",
		{
			disableCheckForNotifications: true,
			close: true,
			onOpen: function()
			{
				chatOpen = true;
				$("#chatArea").html(statusLog);
				$("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
			},
			onClose: function()
			{
				GameManager.resume(true);
				chatOpen = false;
			}
		});
	};
	
	dMultiplayer.showServersWindow = function(closebutton)
	{
		UI.showModalContent("#serverBrowserDialog",
		{
			disableCheckForNotifications: true,
			close: closebutton,
			onOpen: function()
			{
				GameManager.pause(true);
				setTimeout(function() { GameManager.pause(true); }, 500); //in case it didn't pause
				
				$("#browserList").empty();
				$("#browserList").append("<tr style=\"background: #FFB437;\"><td style=\"width: 270px;\"><b>" + "Description".dlocalize(modid) + "</b></td><td style=\"width: 60px;\"><b>" + "Players".dlocalize(modid) + "</b></td><td style=\"width: 80px;\"><b>" + "Cheating".dlocalize(modid) + "</b></td><td style=\"width: 130px;\"><b>" + "IP Address".dlocalize(modid) + "</b></td></tr>");
				
				$.get("http://data.gdtmp.tk/bsrvs", function(content)
				{
					var srvs = content.split(",");
					if (srvs.length > 0 && srvs[0])
						for (var i = 0; i < srvs.length; i++)
							dMultiplayer.pollServer(srvs[i], i);
				});
				
				if (mpstore.settings.mpsrvhistory.length > 0)
				{
					mpstore.settings.mpsrvhistory.concat().reverse().forEach(function(srvinarr)
					{
						$("#browserServerHistory").append("<option value=\"" + srvinarr.ip + "\">" + srvinarr.description + "</option>");
					});
				}
				else
					$("#browserServerHistory option:selected").text("None");
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	
	dMultiplayer.showTradeWindow = function()
	{
		if (UI.isModalContentOpen()) return;
		
		UI.showModalContent("#tradeDialog",
		{
			disableCheckForNotifications: true,
			close: true,
			onOpen: function()
			{
				var tmin = 0;
				tmax = GameManager.company.researchPoints;
				
				var tmin2 = 0;
				tmax2 = GameManager.company.cash > 0 ? GameManager.company.cash : 0;
				
				isTargetSelected = false;
				RPToPay = 0;
				moneyToPay = 0;
				
				dMultiplayer.tradeSliders(tmin, tmin2);
				
				$("#tradeTargets").empty();
				var i = 0;
				competitors.forEach(function(compinarr)
				{
					if (compinarr.cash > -1)
					{
						var listitem = $("<div class=\"selectableGameFeatureItem\">" + compinarr.name + "</div>");
						listitem.val(i);
						listitem.clickExcl(function()
						{
							if (!listitem.hasClass("selectedFeature"))
							{
								$("#tradeTargets").find(".selectedFeature").removeClass("selectedFeature");
								listitem.addClass("selectedFeature");
								isTargetSelected = true;
									
								dMultiplayer.tradeSliders(tmin, tmin2);
								
								$("#tradeNextButton").removeClass("disabledButton").addClass("orangeButton");
							}
							else
							{
								if ($("#tradeNextButton").hasClass("orangeButton"))
									$("#tradeNextButton").removeClass("orangeButton").addClass("disabledButton");
								
								listitem.removeClass("selectedFeature");
								isTargetSelected = false;
							}
						});
						$("#tradeTargets").append(listitem);
					}
					
					i++;
				});
				
				$("#tradeType").empty();
				i = 0;
				var options = ["Request Research Points".dlocalize(modid), "Request Cash".dlocalize(modid)];
				options.forEach(function(option)
				{
					var extraclass = i === 0 ? " selectedFeature" : "";
					
					var listitem = $("<div class=\"selectableGameFeatureItem" + extraclass + "\">" + option + "</div>");
					listitem.val(i);
					listitem.clickExcl(function()
					{
						var index = $("#tradeTargets").find(".selectedFeature").val();
						if (!listitem.hasClass("selectedFeature") && (!(listitem.val() == 1 && GameManager.company.cash < 0)))
						{
							Sound.click();
						
							$("#tradeType").find(".selectedFeature").removeClass("selectedFeature");
							listitem.addClass("selectedFeature");
							
							dMultiplayer.tradeSliders(tmin, tmin2);
							
							if (isTargetSelected && $("#tradeNextButton").hasClass("disabledButton"))
								$("#tradeNextButton").removeClass("disabledButton").addClass("orangeButton");
						}
						else return;
					});
					$("#tradeType").append(listitem);
					
					i++;
				});
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	
	dMultiplayer.showAdvSpyWindow = function()
	{
		if (UI.isModalContentOpen()) return;
		
		UI.showModalContent("#advSpyDialog",
		{
			disableCheckForNotifications: true,
			close: true,
			onOpen: function()
			{
				var bmin = 500;
				var bmax = 2500;
				
				isTargetSelected = false;
				budgetFactor = (bmin / bmax) - 0.05;
				moneyToPay = bmin * 1000;
				
				if (moneyToPay > GameManager.company.cash)
				{
					$("#advSpyCost").css("color", "red");
					$("#advSpyButton").removeClass("orangeButton").addClass("disabledButton");
				}
				
				$("#advSpyBudgetSlider").empty();
				$("#advSpyBudgetSlider").append($("<div class=\"budgetSlider\"></div>").slider(
				{
					orientation: "horizontal",
					range: "min",
					min: bmin,
					max: bmax,
					value: bmin,
					animate: "fast",
					slide: function(event, ui)
					{
						if (ui)
						{
							budgetFactor = (ui.value / bmax) - 0.05;
							moneyToPay = ui.value * 1000;
							$("#advSpyBudgetSlider").slider("value", ui.value);
							$("#advSpyCost").html("Cost:".dlocalize(modid) + " " + UI.getShortNumberString(moneyToPay));
							
							if (GameManager.company.cash > moneyToPay)
							{
								$("#advSpyCost").css("color", "black");
								
								if ($("#advSpyButton").hasClass("disabledButton") && isTargetSelected)
									$("#advSpyButton").removeClass("disabledButton").addClass("orangeButton");
							}
							else
							{
								$("#advSpyCost").css("color", "red");
								
								if ($("#advSpyButton").hasClass("orangeButton"))
									$("#advSpyButton").removeClass("orangeButton").addClass("disabledButton");
							}
						}
					}
				}));
					
				$("#advSpyTargets").empty();
				var i = 0;
				competitors.forEach(function(compinarr)
				{
					var listitem = $("<div class=\"selectableGameFeatureItem\">" + compinarr.name + "</div>");
					listitem.val(i);
					listitem.clickExcl(function()
					{
						Sound.click();
						
						if (!listitem.hasClass("selectedFeature"))
						{
							$("#advSpyTargets").find(".selectedFeature").removeClass("selectedFeature");
							listitem.addClass("selectedFeature");
							
							if (GameManager.company.cash > moneyToPay)
								$("#advSpyButton").removeClass("disabledButton").addClass("orangeButton");
						}
						else
						{
							if ($("#advSpyButton").hasClass("orangeButton"))
								$("#advSpyButton").removeClass("orangeButton").addClass("disabledButton");
							
							listitem.removeClass("selectedFeature");
						}
					});
					$("#advSpyTargets").append(listitem);
					
					i++;
				});
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	
	//this part is so stupid
	dMultiplayer.showSabotageWindow = function()
	{
		if (UI.isModalContentOpen()) return;
		
		UI.showModalContent("#sabotageDialog",
		{
			disableCheckForNotifications: true,
			close: true,
			onOpen: function()
			{
				var bmin = 2000;
				var bmax = 10000;
				
				isTargetSelected = false;
				budgetFactor = (bmin / bmax) - 0.05;
				sliderMoneyToPay = bmin * 1000;
				moneyToPay = sliderMoneyToPay;
				
				if (moneyToPay > GameManager.company.cash)
				{
					$("#sabotageCost").css("color", "red");
					$("#sabotageButton").removeClass("orangeButton").addClass("disabledButton");
				}
					
				$("#sabotageTargets").empty();
				i = 0;
				competitors.forEach(function(compinarr)
				{
					var listitem = $("<div class=\"selectableGameFeatureItem\">" + compinarr.name + "</div>");
					listitem.val(i);
					listitem.clickExcl(function()
					{
						Sound.click();
						
						if (!listitem.hasClass("selectedFeature"))
						{
							$("#sabotageTargets").find(".selectedFeature").removeClass("selectedFeature");
							listitem.addClass("selectedFeature");
							isTargetSelected = true;
							
							if (GameManager.company.cash > moneyToPay && $("#sabotageButton").hasClass("disabledButton"))
								$("#sabotageButton").removeClass("disabledButton").addClass("orangeButton");
						}
						else
						{
							if ($("#sabotageButton").hasClass("orangeButton"))
								$("#sabotageButton").removeClass("orangeButton").addClass("disabledButton");
							
							listitem.removeClass("selectedFeature");
							isTargetSelected = false;
						}
					});
					$("#sabotageTargets").append(listitem);
					
					i++;
				});
				
				$("#sabotageBudgetSlider").empty();
				$("#sabotageBudgetSlider").append($("<div class=\"budgetSlider\"></div>").slider(
				{
					orientation: "horizontal",
					range: "min",
					min: bmin,
					max: bmax,
					value: bmin,
					animate: "fast",
					slide: function(event, ui)
					{
						if (ui)
						{
							sliderMoneyToPay = ui.value * 1000;
							moneyToPay = sliderMoneyToPay * dMultiplayer.getSabotageMultiplication();
							budgetFactor = (ui.value / bmax) - 0.05;
							$("#sabotageBudgetSlider").slider("value", ui.value);
							$("#sabotageCost").html("Cost:".dlocalize(modid) + " " + UI.getShortNumberString(moneyToPay));
							
							if (GameManager.company.cash > moneyToPay)
							{
								$("#sabotageCost").css("color", "black");
								
								if ($("#sabotageButton").hasClass("disabledButton") && isTargetSelected)
									$("#sabotageButton").removeClass("disabledButton").addClass("orangeButton");
							}
							else
							{
								$("#sabotageCost").css("color", "red");
								
								if ($("#sabotageButton").hasClass("orangeButton"))
									$("#sabotageButton").removeClass("orangeButton").addClass("disabledButton");
							}
						}
					}
				}));
					
				$("#sabotageOptions").empty();
				var i = 0;
				var options = ["Hack Interviews".dlocalize(modid), "Corrupt Game in Development".dlocalize(modid), "Assassinate Employee".dlocalize(modid)];
				options.forEach(function(option)
				{
					var extraclass = i === 0 ? " selectedFeature" : "";
					
					var listitem = $("<div class=\"selectableGameFeatureItem" + extraclass + "\">" + option + "</div>");
					listitem.val(i);
					listitem.clickExcl(function()
					{
						if (!listitem.hasClass("selectedFeature"))
						{
							Sound.click();
							$("#sabotageOptions").find(".selectedFeature").removeClass("selectedFeature");
							listitem.addClass("selectedFeature");
							moneyToPay = sliderMoneyToPay * dMultiplayer.getSabotageMultiplication();
							
							if (GameManager.company.cash > moneyToPay)
							{
								if (isTargetSelected && $("#sabotageButton").hasClass("disabledButton"))
									$("#sabotageButton").removeClass("disabledButton").addClass("orangeButton");
								
								$("#sabotageCost").css("color", "black");
							}
							else 
							{
								if (isTargetSelected && $("#sabotageButton").hasClass("orangeButton"))
									$("#sabotageButton").removeClass("orangeButton").addClass("disabledButton");
								
								$("#sabotageCost").css("color", "red");
							}
						}
						else return;
							
						$("#sabotageCost").html("Cost:".dlocalize(modid) + " " + UI.getShortNumberString(moneyToPay));
					});
					$("#sabotageOptions").append(listitem);
					
					i++;
				});
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	
	dMultiplayer.log = function(str)
	{
		var date = new Date();
		statusLog += "[" + date.toLocaleTimeString() + "] " + str + "\n";
		$("#chatArea").html(statusLog);
		$("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
	};
	
	dMultiplayer.sendCompany = function(loop)
	{
		if (!GameManager.company) return;
		
		if (!sentRQ)
		{
			dMultiplayer.sendStatus("REQCOMP");
			sentRQ = true;
		}
		
		var playerdata = GameManager.company.name + sep + GameManager.company.staff[0].name + sep + Math.floor(GameManager.company.cash) + sep + GameManager.company.fans + sep + GameManager.company.researchPoints + sep + Math.floor(GameManager.company.currentWeek);
		if (!sentJoin)
		{
			playerdata += sep + "join";
			sentJoin = true;
		}
		
		dMultiplayer.sendStatus("COMPANY", playerdata);
		dMultiplayer.sendConsole(false);
		
		if (loop)
		{
			setTimeout(function() { dMultiplayer.sendCompany(true); }, 5000);
			loopingSC = true;
		}
	};
	
	dMultiplayer.sendConsole = function(rel)
	{
		if (GameManager.company.getLatestCustomConsole())
		{
			var console = GameManager.company.getLatestCustomConsole();
			var consoleData = console.id + sep + console.iconUri + sep + console.name + sep + console.published + sep + console.genreWeightings.join(":") + sep + console.audienceWeightings.join(":") + sep + console.techLevel + sep + console.startAmount.toString().split("e")[0] + sep + console.unitsSold.toString().split("e")[0];
			
			if (rel)
				consoleData += sep + "rel";
			
			dMultiplayer.sendStatus("CONSOLE", consoleData);
		}
	};
	
	dMultiplayer.arrestCEO = function()
	{
		GameManager.company.staff[0].efficiency = 0;
		GameManager.company.staff[0].goOnVacation();
	};
	
	dMultiplayer.sendCEOToPrison = function()
	{
		var searchattempts = 0;
		var replacement = Math.ceil(GameManager.company.getRandom() * GameManager.company.staff.length - 1);
		while (GameManager.company.staff[replacement].state == "Researching")
		{
			replacement = Math.ceil(GameManager.company.getRandom() * GameManager.company.staff.length - 1);
			searchattempts++;
			
			if (searchattempts > 9)
			{
				mpstore.data.goingtoprison = true;
				return;
			}
		}
		
		for (var field in GameManager.company.staff[0])
			if (typeof GameManager.company.staff[0][field] !== "function" && field != "id" && field != "salary" && field != "slot")
				GameManager.company.staff[0][field] = GameManager.company.staff[replacement][field];
		
		GameManager.company.staff[0].efficiency = 1;
		GameManager.company.staff[0].flags.needsVacation = false;
		GameManager.company.staff[0].flags.nextVacation = 10800000;
		
		GameManager.company.staff[replacement].fire();
		VisualsManager.resetAllCharacters();
	};
	
	dMultiplayer.getObjectArrayIndex = function(array, _item, _value, last)
	{
		var objs = $.map(array, function(objinarr, index)
		{
			var item = typeof objinarr[_item] === "string" ? objinarr[_item].toLowerCase() : objinarr[_item];
			var value = typeof _value === "string" ? _value.toLowerCase() : _value;

			if (item == value)
				return index;
		});

		if (!last)
			return objs[0];
		else
			return objs.last();
	};
	
	dMultiplayer.getObjectArrayIndexStarting = function(array, item, value, last)
	{
		var objs = $.map(array, function(objinarr, _index)
		{
			if (value.toLowerCase().indexOf(objinarr[item].toLowerCase()) === 0)
			{
				var obj =
				{
					index: _index,
					rest: value.substr(objinarr[item].length)
				};
				return obj;
			}
		});

		if (!last)
			return objs[0];
		else
			return objs.last();
	};
	
	dMultiplayer.fixEmptyDuplicateArrayElements = function(arr)
	{
		for (var i = 0; i < arr.length; i++)
		{
			if (arr[i] === undefined || arr[i] === null || (i > 0 && arr[i] === arr[i - 1]))
			{
				arr.splice(i, 1);
				i--;
			}
		}
	};
	
	dMultiplayer.switchServer = function()
	{
		if ($("#switchButton").hasClass("disabledButton")) return;
		dMultiplayer.initData(true);
	};
	
	dMultiplayer.sendChat = function()
	{
		if (!chatOpen || $("#chatInput").val() === "" || $("#chatButton").hasClass("disabledButton")) return;
		
		Sound.click();
		$("#chatButton").removeClass("orangeButton").addClass("disabledButton");
		
		var datatosend = $("#chatInput").val();
		$("#chatInput").val("");

		setTimeout(function()
		{
			$("#chatButton").removeClass("disabledButton").addClass("orangeButton");
		}, 500);
		
		if (datatosend[0] != "/")
		{
			dMultiplayer.sendStatus("MSG", datatosend);
			dMultiplayer.log("<" + GameManager.company.staff[0].name + "> " + datatosend);
		}
		else
		{
			var command = datatosend.substr(1).split(" ");
			switch (command[0].toLowerCase())
			{
				case "commands":
					dMultiplayer.log("{0} - Shows this message".dlocalize(modid).format("/commands"));
					dMultiplayer.log("{0} <company/player> - Hide messages from a certain player in the chat".dlocalize(modid).format("/mute"));
					dMultiplayer.log("{0} - Shows what settings the server uses".dlocalize(modid).format("/srvsettings"));
					dMultiplayer.log("{0} <company/player> <message> - Private message a player".dlocalize(modid).format("/tell"));
					dMultiplayer.log("{0} <message> - Private message the player you last messaged".dlocalize(modid).format("/tellre"));
					dMultiplayer.log("{0} <company/player> - Disables hiding of messages from a player".dlocalize(modid).format("/unmute"));
					break;
				
				case "mute":
				case "unmute":
					var muting = command[0].toLowerCase() == "mute";
					var target = datatosend.substr(datatosend.indexOf(" ") + 1);
					var bossindex = dMultiplayer.getObjectArrayIndex(competitors, "boss", target, true);
					var companyindex = dMultiplayer.getObjectArrayIndex(competitors, "name", target, true);

					if ((bossindex || bossindex === 0) && competitors[bossindex])
					{
						competitors[bossindex].muted = muting;
						muting ? dMultiplayer.log("Muted player.".dlocalize(modid)) : dMultiplayer.log("Unmuted player.".dlocalize(modid));
					}
					else if ((companyindex || companyindex === 0) && competitors[companyindex])
					{
						competitors[companyindex].muted = muting;
						muting ? dMultiplayer.log("Muted player.".dlocalize(modid)) : dMultiplayer.log("Unmuted player.".dlocalize(modid));
					}
					else
						muting ? dMultiplayer.log("Couldn't mute player (not online?)".dlocalize(modid)) : dMultiplayer.log("Couldn't unmute player (not online?)".dlocalize(modid));

					break;
				
				case "srvsettings":
					dMultiplayer.log("Can use offline players' consoles: {0}".dlocalize(modid).format(settings.offlineconsoles ? "Enabled".dlocalize(modid) : "Disabled".dlocalize(modid)));
					dMultiplayer.log("Can use competitors' consoles before release date: {0}".dlocalize(modid).format(settings.syncconsoles ? "Enabled".dlocalize(modid) : "Disabled".dlocalize(modid)));
					dMultiplayer.log("Time synchronization: {0}".dlocalize(modid).format(settings.timesync ? "Enabled".dlocalize(modid) : "Disabled".dlocalize(modid)));
					dMultiplayer.log("Review scores affect other players: {0}".dlocalize(modid).format(settings.reviewbattle ? "Enabled".dlocalize(modid) : "Disabled".dlocalize(modid)));
					break;

				case "tell":
					var query = datatosend.substr(datatosend.indexOf(" ") + 1);
					var bossindex = dMultiplayer.getObjectArrayIndexStarting(competitors, "boss", query, true);
					var companyindex = dMultiplayer.getObjectArrayIndexStarting(competitors, "name", query, true);
					var bossindexf = dMultiplayer.getObjectArrayIndexStarting(competitors, "boss", query);
					var companyindexf = dMultiplayer.getObjectArrayIndexStarting(competitors, "name", query);
					
					if ((bossindex && bossindexf && bossindex.index != bossindexf.index) || (companyindex && companyindexf && companyindex.index != companyindexf.index))
						dMultiplayer.log("Multiple players with that name exist. Couldn't send message.".dlocalize(modid));
					else if (bossindex && competitors[bossindex.index])
					{
						var message = bossindex.rest.substr(1);
						if ($.trim(message))
						{
							dMultiplayer.sendStatus("PRIVMSG", competitors[bossindex.index].id + sep + message);
							dMultiplayer.log("[" + GameManager.company.staff[0].name + " -> " + competitors[bossindex.index].boss + "] " + message);
							lastPMPlayerIndex = bossindex.index;
						}
					}
					else if (companyindex && competitors[companyindex.index])
					{
						var message = companyindex.rest.substr(1);
						if ($.trim(message))
						{
							dMultiplayer.sendStatus("PRIVMSG", competitors[companyindex.index].id + sep + message);
							dMultiplayer.log("[" + GameManager.company.staff[0].name + " -> " + competitors[companyindex.index].boss + "] " + message);
							lastPMPlayerIndex = companyindex.index;
						}
					}
					else
						dMultiplayer.log("Couldn't PM player (not online)".dlocalize(modid));
					
					break;
				
				case "tellre":
					if (lastPMPlayerIndex > -1)
					{
						if (competitors[lastPMPlayerIndex] && datatosend.indexOf(" ") > -1)
						{
							var message = datatosend.substr(datatosend.indexOf(" ") + 1);
							if ($.trim(message))
							{
								dMultiplayer.sendStatus("PRIVMSG", competitors[lastPMPlayerIndex].id + sep + message);
								dMultiplayer.log("[" + GameManager.company.staff[0].name + " -> " + competitors[lastPMPlayerIndex].boss + "] " + message);
							}
						}
						else
							dMultiplayer.log("Couldn't PM player (not online)".dlocalize(modid));
					}
					else
						dMultiplayer.log("Couldn't PM player (you haven't sent a private message to a player before)".dlocalize(modid));
					
					break;

				default:
					dMultiplayer.sendStatus("MSG", datatosend);
			}
		}
	};
	
	dMultiplayer.directConnect = function()
	{
		if ($("#DCInput").val() === "" || $("#DCButton").hasClass("disabledButton")) return;
		dMultiplayer.initSocket($("#DCInput").val());
		UI.closeModal();
	};
	
	dMultiplayer.trade = function()
	{
		if ($("#tradeNextButton").hasClass("disabledButton")) return;
		
		Sound.click();
		var competitorindex = $("#tradeTargets").find(".selectedFeature").val();
		var competitor = competitors[competitorindex];
		
		var type = parseInt($("#tradeType").find(".selectedFeature").val());
		
		switch (type)
		{
			case 0:
				type = "reqrp";
				break;
			
			case 1:
				type = "reqcash";
		}
		
		var n = new Notification(
		{
			header: "{0} trade".dlocalize(modid).format(competitor.name),
			text: "The offer has been sent.".dlocalize(modid)
		});
		GameManager.company.activeNotifications.addRange(n.split());
		dMultiplayer.sendStatus("TRADEREQ", competitor.id + sep + type + sep + RPToPay + sep + moneyToPay);
		
		UI.closeModal();
	};
	
	dMultiplayer.advancedSpy = function()
	{
		if ($("#advSpyButton").hasClass("disabledButton") || moneyToPay > GameManager.company.cash) return;
		
		Sound.click();
		var competitorindex = $("#advSpyTargets").find(".selectedFeature").val();
		var competitor = competitors[competitorindex];
		
		var n = new Notification(
		{
			header: "{0} advanced spying".dlocalize(modid).format(competitor.name),
			text: "We'll start working on it immediately.\nAgent Rijndael".dlocalize(modid)
		});
		GameManager.company.activeNotifications.addRange(n.split());
		
		GameManager.company.adjustCash(moneyToPay * -1, "Donation to charity".dlocalize(modid));
		dMultiplayer.sendStatus("ADVSPY", competitor.id + sep + budgetFactor);
		
		UI.closeModal();
	};
	
	dMultiplayer.sabotage = function()
	{
		if ($("#sabotageButton").hasClass("disabledButton") || moneyToPay > GameManager.company.cash) return;
		
		Sound.click();
		var type = parseInt($("#sabotageOptions").find(".selectedFeature").val());
		
		if (type == 2 && GameManager.company.staff.length < 2)
		{
			$("#confirmAssassinDialog").dialog(
			{
				draggable: false,
				modal: true,
				resizable: false,
				show: "fade",
				zIndex: 7000,
				title: "Attention",
				open: function()
				{
					$(this).siblings(".ui-dialog-titlebar").remove();
					$("#assassinNoButton").clickExclOnce(function()
					{
						Sound.click();
						$("#confirmAssassinDialog").dialog("close");
					});
					$("#assassinYesButton").clickExclOnce(function()
					{
						Sound.click();
						$("#confirmAssassinDialog").dialog("close");
						
						dMultiplayer._sabotage(type);
					});
				},
				close: function()
				{
					$(this).dialog("destroy");
					this.style.cssText = "display: none;";
				}
			});
		}
		else
			dMultiplayer._sabotage(type);
	};
	
	dMultiplayer._sabotage = function(type)
	{
		var competitor = competitors[$("#sabotageTargets").find(".selectedFeature").val()];
		
		switch (type)
		{
			case 0:
				type = "hackinterviews";
				break;
			
			case 1:
				type = "ruingame";
				break;
			
			case 2:
				type = "assassin";
		}
		
		var n = new Notification(
		{
			header: "{0} sabotage".dlocalize(modid).format(competitor.name),
			text: "We'll start working on it immediately.\nAgent Rijndael".dlocalize(modid)
		});
		GameManager.company.activeNotifications.addRange(n.split());
		
		GameManager.company.adjustCash(moneyToPay * -1, "Donation to charity".dlocalize(modid));
		dMultiplayer.sendStatus("SABOTAGE", competitor.id + sep + budgetFactor + sep + type);
		
		if (type == "assassin")
			mpstore.data.assassintrycount++;
						
		UI.closeModal();
	};
	
	dMultiplayer.getSabotageMultiplication = function()
	{
		var times = 1;
		var type = parseInt($("#sabotageOptions").find(".selectedFeature").val());
		switch (type)
		{
			case 0:
				times = 1;
				break;
			
			case 1:
				times = 4;
				break;
			
			case 2:
				times = 15;
		}
		return times;
	};
	
	dMultiplayer.overwriteObjectByID = function(obj, newobj, type)
	{
		for (var i = 0; i < obj.length; i++)
		{
			if (obj[i].id == newobj.id)
			{
        var olddate;
				if (type == "console")
					olddate = obj[i].published;
					
				obj[i] = $.extend(true, {}, newobj);
				pushNew = false;
				
				if (type == "console")
					obj[i].published = olddate;
			}
		}
	};
	
	dMultiplayer.tradeSliders = function(tmin, tmin2)
	{
		$("#tradeCost").html("Research Points:".dlocalize(modid) + " 0<br />" + "Cash:".dlocalize(modid) + " 0");
		RPToPay = 0;
		moneyToPay = 0;
		
		if (isTargetSelected)
		{
			var index = $("#tradeTargets").find(".selectedFeature").val();
			
			if ($("#tradeType").find(".selectedFeature").val() === 0)
			{
				tmax = competitors[index].rp;
				tmax2 = GameManager.company.cash;
				$("#tradeRPText").text("Research Points (request)".dlocalize(modid));
				$("#tradeCashText").text("Cash (offer)".dlocalize(modid));
			}
			else
			{
				tmax = GameManager.company.researchPoints;
				tmax2 = competitors[index].cash;
				$("#tradeRPText").text("Research Points (offer)".dlocalize(modid));
				$("#tradeCashText").text("Cash (request)".dlocalize(modid));
			}
		}
								
		$("#tradeRPSlider").empty();
		$("#tradeRPSlider").append($("<div class=\"budgetSlider\"></div>").slider(
		{
			orientation: "horizontal",
			range: "min",
			min: tmin,
			max: tmax,
			value: tmin,
			animate: "fast",
			slide: function(event, ui)
			{
				if (ui)
				{
					RPToPay = ui.value;
					$("#tradeRPSlider").slider("value", ui.value);
					$("#tradeCost").html("Research Points:".dlocalize(modid) + " " + RPToPay + "<br />" + "Cash:" + " " + UI.getShortNumberString(moneyToPay));
				}
			}
		}));
		
		$("#tradeCashSlider").empty();
		$("#tradeCashSlider").append($("<div class=\"budgetSlider\"></div>").slider(
		{
			orientation: "horizontal",
			range: "min",
			min: tmin2,
			max: tmax2,
			value: tmin2,
			animate: "fast",
			slide: function(event, ui)
			{
				if (ui)
				{
					moneyToPay = ui.value;
					$("#tradeCashSlider").slider("value", ui.value);
					$("#tradeCost").html("Research Points:".dlocalize(modid) + " " + RPToPay + "<br />" + "Cash:".dlocalize(modid) + " " + UI.getShortNumberString(moneyToPay));
				}
			}
		}));
	};

	dMultiplayer.checkForUpdates = function(first)
	{
		var declinedUpdate = false;
		var log = first ? "true" : "false";

		$.get("http://data.gdtmp.tk/cversion?log=" + log, function(content)
		{
			if (dMultiplayer.compareVersions(content, dmod.version, false))
				confirm("A GDTMP update is available! ({0})\nGo to the official forum thread for more info and downloads?".dlocalize(modid).format(content)) ? PlatformShim.openUrlExternal(dmod.url) : declinedUpdate = true;
		});

		if (declinedUpdate) return;

		setTimeout(dMultiplayer.checkForUpdates, 1800000); //30 minutes
	};
	
	dMultiplayer.compareVersions = function(varr1, varr2, allowsame)
	{
		var splitversion = varr1.replace(/[^0-9.]/g, "").split(".");
		var splitdversion = varr2.split(".");
		
		var versionnum = 0;
		for (var i = 0; i < splitversion.length; i++)
			versionnum += parseInt(dMultiplayer.leadingZero(splitversion[i]));
			
		var dversionnum = 0;
		for (var i = 0; i < splitdversion.length; i++)
			dversionnum += parseInt(dMultiplayer.leadingZero(splitdversion[i]));
			
		return splitversion.length == splitdversion.length && ((allowsame && versionnum >= dversionnum) || (!allowsame && versionnum > dversionnum));
	};
	
	dMultiplayer.leadingZero = function(number)
	{
		if (number < 10) return "0" + number;
		else return number;
	};
	
	dMultiplayer.browserMouseOver = function(id)
	{
		$("#browserItem" + id).css("background", "#F7D7A3");
	};
	
	dMultiplayer.browserMouseOut = function(id)
	{
		$("#browserItem" + id).css("background", "#F9CE84");
	};
	
	dMultiplayer.browserMouseDown = function(event, id)
	{
		if (event.which !== 1) return;
		dMultiplayer.initSocket($("#browserIP" + id).text(), $("#browserDesc" + id).text());
		UI.closeModal();
	};
	
	dMultiplayer.connectFromHistory = function()
	{
		if ($("#browserServerHistory").val() == "none") return;
		dMultiplayer.initSocket($("#browserServerHistory").val(), $("#browserServerHistory option:selected").text());
		UI.closeModal();
	};
	
	dMultiplayer.pollServer = function(srv, id)
	{
		var ipPort = srv;
		var hasPort = srv.split(":").length > 1;
		if (!hasPort)
			ipPort += ":3966";
		
		var pollsocket = new WebSocket("ws://" + ipPort);
		
		pollsocket.onopen = function()
		{
			pollsocket.send("POLL");
		};

		pollsocket.onmessage = function(event)
		{
			var data = event.data.split(sep);
			var resid = data.pop();
			if (resid != serverID) return;
			
			switch (data[0])
			{
				case "KICK":
					pollsocket.close();
					break;
				
				case "POLLRES":
					if (data.length > 4)
					{
						playercount = data[1];
						cheatmodallowed = data[2] == "True" ? "Allowed".dlocalize(modid) : "Not allowed".dlocalize(modid);
						minversion = data[3];
						description = data[4];
						
						if (dMultiplayer.compareVersions(dmod.version, minversion, true))
						{
							$("#browserList").append("<tr onmouseover=\"dMultiplayer.browserMouseOver(" + id + ")\" onmouseout=\"dMultiplayer.browserMouseOut(" + id + ")\" onmousedown=\"dMultiplayer.browserMouseDown(event, " + id + ")\" id=\"browserItem" + id + "\"><td id=\"browserDesc" + id + "\"><div>" + description + "</div></td><td><div>" + playercount + "</div></td><td><div>" + cheatmodallowed + "</div></td><td id=\"browserIP" + id + "\"><div>" + srv + "</div></td></tr>");
							$("#browserItem" + id + " td div").css(
							{
								"overflow": "hidden",
								"height": "16px"
							});
						}
					}
			}
		};
	};
	
	dMultiplayer.disableKeyboard = function(event)
	{
		if (event.which > 9)
			event.preventDefault();
	};
	
	dMultiplayer.setConnected = function(connected)
	{
		isConnected = connected;
		
		if (connected && $("#chatButton").hasClass("disabledButton"))
			$("#chatButton").removeClass("disabledButton").addClass("orangeButton");
		else if (!connected && $("#chatButton").hasClass("orangeButton"))
			$("#chatButton").removeClass("orangeButton").addClass("disabledButton");
	};
	
	dMultiplayer.toggleListMinimized = function()
	{
		if (!listMinimized)
		{
			$("#gdtmpcard").height("60px");
			$("#gdtmpminimize").css("bottom", "101px");
			$("#gdtmpminimize").text("\u25A1");
			listMinimized = true;
		}
		else
		{
			var extraheight = 20 * (competitors.length - 5) > 0 ? 20 * (competitors.length - 5) : 0;
			$("#gdtmpcard").height((100 + extraheight) + "px");
			$("#gdtmpminimize").css("bottom", "141px");
			$("#gdtmpminimize").text("_");
			listMinimized = false;
		}
	};
})();