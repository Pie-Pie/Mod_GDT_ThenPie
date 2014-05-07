var wallStreet = {};

//////////////////////////////////////////////////////////////////////
//////////////////////// External functions //////////////////////////
//////////////////////////////////////////////////////////////////////
// Declare the prototype of the function dlocalize, to manage localisation of the mod
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

// Function to check if an array contains a element with the given id
function inArrayElementWithId(id, array)
{
	var len = array.length;
	for(var i = 0 ; i < len ; i++)
	{
		if(array[i].id == id)
			return i;
	}
	return -1;
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

(function()
{
	// Mod variables
	var m_idMod = "wallStreet";
	var m_storedDatas;	// Datas used by the mod
	var m_ceilingPublisher = 1000000000;
	var m_hireCost = 100000;
	var m_publisherCost = 200000000;
	
	// List of notifications
	var listWinFans;
	var listFabulousWinFans;
	var listLostFans;
	var listHugeLostFans;
	var listWinsWithBadResultsFans;
	var listGainHype;
	var listLostHype;
	
	//////////////////////////////////////////////////////////////////////
	////////////////////////// Other functions ///////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.loadData = function() 
	{		
		// Load mod datas
		if(!m_storedDatas)
			m_storedDatas = GDT.getDataStore(m_idMod);

			
		if (!m_storedDatas.data["m_haveTrader"])
			m_storedDatas.data["m_haveTrader"] = false;
			
		if (!m_storedDatas.data["m_isPublisher"])
			m_storedDatas.data["m_isPublisher"] = false;
			
		if (!m_storedDatas.data["m_traderSalary"])
			m_storedDatas.data["m_traderSalary"] = 35000;
			
		if (!m_storedDatas.data["m_traderLevel"])
			m_storedDatas.data["m_traderLevel"] = 0;
			
		if (!m_storedDatas.data["m_traderBudget"])
			m_storedDatas.data["m_traderBudget"] = 0;
		
		if (!m_storedDatas.data["m_traderRisks"])
			m_storedDatas.data["m_traderRisks"] = 1;
			
		if (!m_storedDatas.data["m_traderResearchLevel"])
			m_storedDatas.data["m_traderResearchLevel"] = 0;
			
		if (!m_storedDatas.data["m_gainMoney"])
			m_storedDatas.data["m_gainMoney"] = 0;
			
		if (!m_storedDatas.data["m_bestDeal"])
			m_storedDatas.data["m_bestDeal"] = 0;
			
		//first init for the budget label and slider
		$("#budgetSlider").slider("value", m_storedDatas.data["m_traderBudget"]);
		
		$("#budgetLabel").empty();
		var budget =  m_storedDatas.data["m_traderBudget"]/1000;
		if(budget/1000 < 1)
			$("#budgetLabel").append("Budget: ".dlocalize(m_idMod) + m_storedDatas.data["m_traderBudget"]/1000 + "K".dlocalize(m_idMod));
		else
			$("#budgetLabel").append("Budget: ".dlocalize(m_idMod) + m_storedDatas.data["m_traderBudget"]/1000000 + "M".dlocalize(m_idMod));
			
		//first init for the risk label and slider
		$("#riskSlider").slider("value", m_storedDatas.data["m_traderRisks"]);
		
		$("#riskLabel").empty();
		switch(m_storedDatas.data["m_traderRisks"])
		{
			case 1:
				$("#riskLabel").append("Risk: Noob Trader!!".dlocalize(m_idMod));
				break;
				
			case 2:
				$("#riskLabel").append("Risk: Trader to Trader.".dlocalize(m_idMod));
				break;
				
			case 3:
				$("#riskLabel").append("Risk: True Trader.".dlocalize(m_idMod));
				break;
				
			case 4:
				$("#riskLabel").append("Risk: Angry Trader!!".dlocalize(m_idMod));
				break;
				
			case 5:
				$("#riskLabel").append("Risk: Crazy Trader!!".dlocalize(m_idMod));
				break;
		}
	}
	
	//////////////////////////////////////////////////////////////////////
	///////////////////////// Trading Management /////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.traderSalaryLevy = function()
	{
		var week = parseInt(GameManager.company.currentWeek.toString());
		
		if (m_storedDatas.data["m_haveTrader"] && week %4 == 0)
			GameManager.company.adjustCash(-m_storedDatas.data["m_traderSalary"], "Trader Salary".dlocalize(m_idMod));
	}
	
	wallStreet.tradedActions = function()
	{
		if (m_storedDatas.data["m_traderBudget"] == 0)
			return;
			
		var week = parseInt(GameManager.company.currentWeek.toString());
		
		if (m_storedDatas.data["m_haveTrader"] && week %2 == 0)
		{
			if (wallStreet.tradingActionsSuccess(GameManager.company.getRandom()))	// If trader make benefits
			{
				var benefits = wallStreet.tradingBenefits();
				m_storedDatas.data["m_gainMoney"] += benefits;
				if (m_storedDatas.data["m_bestDeal"] < benefits)
					m_storedDatas.data["m_bestDeal"] = benefits;
				GameManager.company.adjustCash(benefits, "Trading Actions Benefits".dlocalize(m_idMod));
				
				// Chance to win fans
				wallStreet.winFans();
				// Chance to gain hype if a game is in development
				wallStreet.gainHype();
			}
			else
			{
				var deficit = wallStreet.tradingDeficit();
				GameManager.company.adjustCash(-deficit, "Trading Actions Fail".dlocalize(m_idMod));
				// Chance to lose fans, but few percentage to wins fans with bad results
				if(GameManager.company.getRandom() > 0.02)
				{
					wallStreet.loseFans();
					// Chance to lose hype if a game is in development
					wallStreet.loseHype();
				}
				else	// 2% 
					wallStreet.winFansWithBadResults();
			}
		}
	}
	
	wallStreet.tradingActionsSuccess = function(proba)
	{
		var probMakeBenefits;
		if (m_storedDatas.data["m_traderLevel"] < 5)
		{
			probMakeBenefits = (-0.3/5.0)*m_storedDatas.data["m_traderLevel"] + 0.9;
		}
		else
		{
			probMakeBenefits = (-0.4/5.0)*m_storedDatas.data["m_traderLevel"] + 1.0;
		}

		if (proba >= probMakeBenefits)
			return true;
		else
			return false;
	}
	
	wallStreet.tradingBenefits = function()
	{
		var benefits = (((wallStreet.getMaxMultiplicatorAccordingToRisks() - 1.05)/4.0)*m_storedDatas.data["m_traderRisks"] + (1.05 - ((wallStreet.getMaxMultiplicatorAccordingToRisks() - 1.05)/4.0)))*m_storedDatas.data["m_traderBudget"] - m_storedDatas.data["m_traderBudget"];
		
		// Additional changes to wins or lose much money
		var percentage = 0;
		do {
			percentage = GameManager.company.getRandom();
		} while(percentage < 0.01 || percentage > 0.2);	// Reasonable percentage
		
		if (GameManager.company.getRandom() < 0.75)	//	75% to win more
			benefits = benefits + benefits*percentage;
		else
			benefits = benefits - benefits*percentage;
		
		return benefits;
	}
	
	wallStreet.tradingDeficit = function()
	{
		var deficit = (m_storedDatas.data["m_traderBudget"]*m_storedDatas.data["m_traderRisks"]);
		
		// Additional changes to wins or lose much money
		var percentage = 0;
		do {
			percentage = GameManager.company.getRandom();
		} while(percentage < 0.01 || percentage > 0.2);	// Reasonable percentage
		
		if (GameManager.company.getRandom() < 0.5)	//	50% to lose more, 50 % to lose less
			deficit = deficit + deficit*percentage;
		else
			deficit = deficit - deficit*percentage;
		
		return deficit;
	}
	
	wallStreet.getMaxMultiplicatorAccordingToRisks = function()
	{
		return (1.3/7.0)*m_storedDatas.data["m_traderResearchLevel"] + (1.2-(1.3/7.0));
	}
	
	wallStreet.winFans = function()
	{
		if (GameManager.company.getRandom() < 0.05)		// Good luck, Win fans
		{
			if (GameManager.company.getRandom() < 0.05)		// Very Good luck, Win fans
			{
				var percentage = 0;
				do {
					percentage = GameManager.company.getRandom();
				} while(percentage > 0.5 || percentage < 0.05);	// Reasonable percentage
				
				var fansPercentage = GameManager.company.fans*percentage;
				GameManager.company.adjustFans(Math.floor(fansPercentage));
				// Select a notification and display it
				wallStreet.getAFabulousWinFansNotification();
			}
			else
			{
				GameManager.company.adjustFans(Math.floor(GameManager.company.getRandom()*1000));	// Gain a random number of fans
				// Select a notification and display it
				wallStreet.getAWinFansNotification();
			}
		}
	}
	
	wallStreet.loseFans = function()
	{
		if (GameManager.company.getRandom() < 0.05)		// Bad luck, Win fans
		{
			if (GameManager.company.getRandom() < 0.05)		// Very Bad luck, Win fans
			{
				var percentage = 0;
				do {
					percentage = GameManager.company.getRandom();
				} while(percentage > 0.5 || percentage < 0.05);	// Reasonable percentage
				
				var fansPercentage = GameManager.company.fans*percentage;
				if (GameManager.company.fans - fansPercentage >= 0)
					GameManager.company.adjustFans(-Math.floor(fansPercentage));
				else
					GameManager.company.adjustFans(-GameManager.company.fans);
				
				// Select a notification and display it
				wallStreet.getAHugeLostFansNotification();
			}
			else
			{
				var fansLost = GameManager.company.getRandom()*1000;	// Lose a random number of fans
				if (GameManager.company.fans - fansLost >= 0)
					GameManager.company.adjustFans(-Math.floor(fansLost));
				else
					GameManager.company.adjustFans(-GameManager.company.fans);
				
				// Select a notification and display it
				wallStreet.getALostFansNotification();
			}
		}
	}
	
	wallStreet.winFansWithBadResults = function()
	{
		var fansWin = GameManager.company.getRandom()*1000;	// Gain a random number of fans
		GameManager.company.adjustFans(Math.floor(fansWin));
		
		// Select a notification and display it
		wallStreet.getAWinFansWithLostNotification();
	}
	
	wallStreet.fireTrader = function()
	{
		Achievements.activate(Achievements.fireTrader);
		m_storedDatas.data["m_haveTrader"] = false;
		m_storedDatas.data["m_traderSalary"] = 35000;
		m_storedDatas.data["m_traderLevel"] = 0;
		m_storedDatas.data["m_traderBudget"] = 0;
		m_storedDatas.data["m_traderRisks"] = 1;
	}
	
	wallStreet.completeHireTrader = function()
	{
		m_storedDatas.data["m_haveTrader"] = true;
		GameManager.company.adjustCash(-m_hireCost, "Hire Trader".dlocalize(m_idMod));	
	}
	
	wallStreet.becomePublisher = function()
	{
		m_storedDatas.data["m_isPublisher"] = true;
		GameManager.company.adjustCash(-m_publisherCost, "Enter in Stock Exchange".dlocalize(m_idMod));
	}
	
	wallStreet.gainHype = function()
	{
		if (GameManager.company.isGameProgressBetween(0.2, 0.9))	// Game in development
		{
			if (GameManager.company.getRandom() <= 0.25)	// 25% chance to win a bonus
			{
				GameManager.company.adjustHype(5 + 50 * company.getRandom());	//increase hype between 5 and 55.
				
				// Select a notification and display it
				wallStreet.getAWinHypeNotification();
			}
		}
	}
	
	wallStreet.loseHype = function()
	{
		if (GameManager.company.isGameProgressBetween(0.2, 0.9))	// Game in development
		{
			if (GameManager.company.getRandom() <= 0.25)	// 25% chance to have a malus
			{
				// decrease hype between 5 and 55.
				var lostHype = 5 + 50 * company.getRandom();
				if (GameManager.company.hype - lostHype >= 0)
					GameManager.company.adjustHype(-Math.floor(lostHype));
				else
					GameManager.company.adjustHype(-GameManager.company.hype);	
				
				// Select a notification and display it
				wallStreet.getALostHypeNotification();
			}
		}
	}
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////// Notifications ////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.getAFabulousWinFansNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listFabulousWinFans);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getAWinFansNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listWinFans);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getAHugeLostFansNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listHugeLostFans);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getALostFansNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listLostFans);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getAWinFansWithLostNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listWinsWithBadResultsFans);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getAWinHypeNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listGainHype);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.getALostHypeNotification = function()
	{
		var notif = wallStreet.selectNotifInList(listLostHype);
				
		GameManager.company.notifications.push(notif);
	}
	
	wallStreet.selectNotifInList = function(list)
	{
		if (!list)
			return undefined;
			
		var listNotifLenght = list.length;
		if (listNotifLenght == 0)
			return undefined;
			
		var probEachNotif = 1/listNotifLenght;
		var prob = probEachNotif;
		var cumulatedProb = new Array();
		for (var i = 0 ; i < listNotifLenght ; i += 1)
		{
			cumulatedProb.push(prob);
			prob += probEachNotif;
		}
		
		var randomProb = GameManager.company.getRandom();
		var index;
		for (var i = 0 ; i < listNotifLenght ; i += 1)
		{
			if (randomProb > cumulatedProb[i])
				continue;
			else
			{
				index = i;
				break;
			}
		}
		
		var notif = new Notification(
									{
										header: list[index][0],
										text: list[index][1]
									});
		
		return notif;
	}
	
	wallStreet.initNotificationsLists = function()
	{
		// TODO init lists (with .dlocalize(m_idMod))
		// ex : var items = [[1,2],[3,4],[5,6]];
		
		// Init list of notifications [header, text]
		listWinFans = [
						// TODO
						];
						
		listFabulousWinFans = [
								// TODO
								];
						
		listLostFans = [
						// TODO
						];
						
		listHugeLostFans = [
							// TODO
							];
						
		listWinsWithBadResultsFans = [
										// TODO
										];
						
		listGainHype = [
						// TODO
						];
						
		listLostHype = [
						// TODO
						];
	}
	
	//////////////////////////////////////////////////////////////////////
	//////////////////////////////// GUI /////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.initPopup = function()
	{
		var res = $("#resources");
		res.append("<div id=\"managePopup\" class=\"notificationThreeOptions windowBorder\"><div class=\"windowTitle\">" + "Manage Trader".dlocalize(m_idMod) + "</div><p style=\"margin-top: 50px;\"><div id=\"budgetSlider\" class=\"ui-slider-range\" style=\"margin: auto; top: 20px; width: 450px;\">	<div id=\"budgetLabel\" class=\"windowCostLabel\" style=\"width: auto; top:10px;\">	</div></div></p><p style=\"margin-top: 50px;\"><div id=\"riskSlider\" class=\"ui-slider-range\" style=\"margin: auto; top: 20px; width: 450px;\">	<div id=\"riskLabel\" class=\"windowCostLabel\" style=\"width: auto; top:10px;\">	</div></p></div></div>");
		
		//budget slider definition
		$("#budgetSlider").slider(
		{
			min: 0,
			max: 5000000,
			value: 0,
			step: 10000,
			range: "min",
			slide: function(event, ui)
			{
				m_storedDatas.data["m_traderBudget"] = ui.value;
				$("#budgetLabel").empty();
				var budget =  m_storedDatas.data["m_traderBudget"]/1000;
				if(budget/1000 < 1)
					$("#budgetLabel").append("Budget: ".dlocalize(m_idMod) + m_storedDatas.data["m_traderBudget"]/1000 + "K".dlocalize(m_idMod));
				else
					$("#budgetLabel").append("Budget: ".dlocalize(m_idMod) + m_storedDatas.data["m_traderBudget"]/1000000 + "M".dlocalize(m_idMod));
			}
		});
		
		//budget slider definition
		$("#riskSlider").slider(
		{
			min: 1,
			max: 5,
			value: 1,
			step: 1,
			range: "min",
			slide: function(event, ui)
			{
				m_storedDatas.data["m_traderRisks"] = ui.value;
				$("#riskLabel").empty();
				switch(ui.value)
				{
					case 1:
						$("#riskLabel").append("Risk: Noob Trader!!".dlocalize(m_idMod));
						break;
						
					case 2:
						$("#riskLabel").append("Risk: Trader to Trader.".dlocalize(m_idMod));
						break;
						
					case 3:
						$("#riskLabel").append("Risk: True Trader.".dlocalize(m_idMod));
						break;
						
					case 4:
						$("#riskLabel").append("Risk: Angry Trader!!".dlocalize(m_idMod));
						break;
						
					case 5:
						$("#riskLabel").append("Risk: Crazy Trader!!".dlocalize(m_idMod));
						break;
				}
			}
		});
	}
	
	wallStreet.showManagePopup = function()
	{
		//if (UI.isModalContentOpen()) return;
		UI.showModalContent("#managePopup",
		{
			onOpen: function()
			{	
				
			},
			onClose: function()
			{
				GameManager.resume(true);
			}
		});
	};
	
	wallStreet.customContextMenuBehaviour = function()
	{
		// Add if necessary an item to context menu to hire a trader (when click on PDG)
		var baseContextMenu = UI.showContextMenu;	// Recover actual function on the show context Menu
		wallStreet.hireTrader = function(items, pos)
		{
			// Recover which character has been clicked
			var selectedCharacter = UI.getCharUnderCursor();
			// Check if the PDG as been clicked
			var pdgSelected = (selectedCharacter && selectedCharacter == GameManager.company.staff[0]);
			
			// Check if the player has selected the CEO
			if (pdgSelected)
			{
				// Check if the player has done the Trading Research, minimum V1
				if (inArrayElementWithId("EFEF2F70-0A53-4DE8-8205-C124C6310C17", GameManager.company.researchCompleted) != -1)
				{	
					// If we have no trader we can hire one
					if (!m_storedDatas.data["m_haveTrader"])
					{
						// Create Item for the context menu
						var hireTraderItem =
						{
							label: "Hire a Trader".dlocalize(m_idMod),
							action: function()
							{
								Sound.click();
								GameManager.company.notifications.insertAt(0, wallStreet.hireTraderEvent.getNotification());
								GameManager.resume(true);
							}
						};
						
						// Insert hireTraderItem at first pos in context menu
						items.splice(0, 0, hireTraderItem);
					}
					else	// We have already one, so we can fire him
					{
						// Create Item for the context menu
						var fireTraderItem =
						{
							label: "Fire the Trader".dlocalize(m_idMod),
							action: function()
							{
								Sound.click();
								GameManager.company.notifications.insertAt(0, wallStreet.fireTraderEvent.getNotification());
								GameManager.resume(true);
							}
						};
						
						// Create Item for the context menu
						var allocateTraderBudgetItem =
						{
							label: "Manage Trader".dlocalize(m_idMod),
							action: function()
							{
								Sound.click();
								wallStreet.showManagePopup();
								//GameManager.resume(true);
							}
						};
						
						// Insert fireTraderItem and manage trader at 2 first pos in context menu
						items.splice(0, 0, fireTraderItem);
						items.splice(1, 0, allocateTraderBudgetItem);
					}
				}
				
				// If you are not a already a publisher
				if(!m_storedDatas.data["m_isPublisher"])
				{
					// If we have the cash and a trader
					if(m_storedDatas.data["m_haveTrader"] && GameManager.company.cash >= m_ceilingPublisher)
					{
						// Create Item for the context menu
						var becomePublisherItem =
						{
							label: "Become Publisher".dlocalize(m_idMod),
							action: function()
							{
								Sound.click();
								GameManager.company.notifications.insertAt(0, wallStreet.bePublisher.getNotification());
								GameManager.resume(true);
							}
						};
						// Insert becomePublisherItem at first pos in context menu
						items.splice(0, 0, becomePublisherItem);
					}
				}
			}
			
			// Call to the old function to keep the same behaviour
			baseContextMenu(items, pos);
		};
		UI.showContextMenu = wallStreet.hireTrader;	// Put our custom function on show context Menu
	};
	
	//////////////////////////////////////////////////////////////////////
	////////////////////////////// Events ////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.initEvents = function()
	{
		// Event used to indicate that the player can now Hire a Trader (dialog window)
		wallStreet.unlockTraderHiringEvent =
		{
			id: "C32347F2-4AC3-4293-852C-9C122C0C32E5",
			
			maxTriggers: 1,
			
			trigger: function()
			{
				return GameManager.company.currentLevel >= 4;
			},
			
			getNotification: function()
			{
				return new Notification(
										{
											sourceId: "C32347F2-4AC3-4293-852C-9C122C0C32E5",
											header: "Hire Trader".dlocalize(m_idMod),
											text: "With this new office, new opportunities are available to you.\n\nYou can now do the research Trading, and after you will be able to hire a Trader to deal with stock exchange!\nWith him you can earn a lot of money, but be careful, you also can lose a lot.{n}To hire a Trader see you CEO.".dlocalize(m_idMod),
										});
			}
		};
		GDT.addEvent(wallStreet.unlockTraderHiringEvent);
		
		// Event to Hire a Trader (Generate a dialog window)
		wallStreet.hireTraderEvent =
		{
			id: "8FFA272-EF44-44B0-B6F2-9EEE69957996",
			
			trigger: function()
			{
				return false;
			},
			
			getNotification: function()
			{
				return new Notification(
										{
											sourceId: "8FFA272-EF44-44B0-B6F2-9EEE69957996",
											header: "Hire Trader".dlocalize(m_idMod),
											text: "Do you want to hire a Trader ?\n\nHire Cost : ".dlocalize(m_idMod) + (m_hireCost/1000).toString() + "K\nBase Salary : ".dlocalize(m_idMod) + (m_storedDatas.data["m_traderSalary"]/1000).toString() + "K".dlocalize(m_idMod),
											options: ["Yes".dlocalize(m_idMod), "No".dlocalize(m_idMod)]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				// Hire Trader Cost
				wallStreet.completeHireTrader();
				
				var notif = new Notification(
											{
												header: "Trader Hired".dlocalize(m_idMod),
												text: "You have successfully hire a Trader.\n\nYou can now train him and allocate a budget that he can use to do some speculations!".dlocalize(m_idMod),
											});
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(wallStreet.hireTraderEvent);
		
		// Event to Fire a Trader (Generate a dialog window)
		wallStreet.fireTraderEvent =
		{
			id: "33F06DAA-CDC5-4879-B2B8-A2026FDAA562",
			
			trigger: function()
			{
				return false;
			},
			
			getNotification: function()
			{
				return new Notification(
										{
											sourceId: "33F06DAA-CDC5-4879-B2B8-A2026FDAA562",
											header: "Fire Trader".dlocalize(m_idMod),
											text: "Do you want to fire your Trader ?".dlocalize(m_idMod),
											options: ["Yes".dlocalize(m_idMod), "No".dlocalize(m_idMod)]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				wallStreet.fireTrader();
				
				var notif = new Notification(
											{
												header: "Trader Fired".dlocalize(m_idMod),
												text: "You have fired your Trader.\n\nYou can hire another one when you want, but you will need to retrain him.".dlocalize(m_idMod),
											});
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(wallStreet.fireTraderEvent);
		
		// Event to become an publisher and enter in stock exchange
		wallStreet.becomePublisherEvent =
		{
			id: "151BCB5D-A948-4A6b-A944-2B71327EC9B8",
			
			maxTriggers: 1,
			
			trigger: function()
			{
				return GameManager.company.cash >= m_ceilingPublisher;	// 1000M cash
			},
			
			getNotification: function()
			{
				return new Notification(
										{
											sourceId: "151BCB5D-A948-4A6b-A944-2B71327EC9B8",
											header: "Become a Publisher !".dlocalize(m_idMod),
											text: "Congratulations!\nYou now have sufficient capital to become yourself a publisher of video games and enter in stock exchange.{n}To become a Publisher, you must have a Trader, and see you CEO.".dlocalize(m_idMod),
										});
			}
		};
		GDT.addEvent(wallStreet.becomePublisherEvent);
		
		wallStreet.bePublisher = 
		{
			id: "60F74EF2-2281-4B5F-AB56-909C46857297",
			trigger: function()
			{
				return false;
			},
			
			getNotification: function()
			{
				return new Notification(
										{
											sourceId: "60F74EF2-2281-4B5F-AB56-909C46857297",
											header: "Become a Publisher".dlocalize(m_idMod),
											text: "Do you want to become a Publisher ?\n\nCost : ".dlocalize(m_idMod) + (m_publisherCost/1000000).toString() + "M".dlocalize(m_idMod),
											options: ["Yes".dlocalize(m_idMod), "No".dlocalize(m_idMod)]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				// Become a Publisher
				wallStreet.becomePublisher();
				
				var notif = new Notification(
											{
												header: GameManager.company.name + " Publisher !".dlocalize(m_idMod),
												text: "Congratulations!\nNow you are a Publisher.\n\nWith this new state you will have some new opportunities!".dlocalize(m_idMod),
											});
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(wallStreet.bePublisher);
	};
	
	//////////////////////////////////////////////////////////////////////
	///////////////////////////// Research ///////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.initResearch = function()
	{
		var tradingResearchV1 =
								{
									id: "EFEF2F70-0A53-4DE8-8205-C124C6310C17",
									name: "Trading V1".dlocalize(m_idMod),
									pointsCost: 10,
									duration: 8000,
									cost: 20000,
									canResearch: function (company) 
									{
										return GameManager.company.currentLevel >= 4
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "EFEF2F70-0A53-4DE8-8205-C124C6310C17";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																	// Notification
																	var notif = new Notification({
																									header: "Trading V1".dlocalize(m_idMod),
																									text: "Congratulations, you have successfully developed the research 'Trading V1'.\nNow you can hire a Trader!{n}By increasing the level of your research you increase trading opportunities for your speculations. ".dlocalize(m_idMod),
																								});
																	GameManager.company.notifications.push(notif);		
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchV1);
		
		var tradingResearchV2 =
								{
									id: "A16052BB-8882-4741-ABDE-AE37B2E7968F",
									name: "Trading V2".dlocalize(m_idMod),
									pointsCost: 15,
									duration: 10000,
									cost: 40000,
									canResearch: function (company) 
									{
										return inArrayElementWithId("EFEF2F70-0A53-4DE8-8205-C124C6310C17", GameManager.company.researchCompleted) != -1 // Research Trading V1 Done
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "A16052BB-8882-4741-ABDE-AE37B2E7968F";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchV2);
		
		var tradingResearchV3 =
								{
									id: "325C03F2-5FF1-4D34-B993-AFFC32B2252F",
									name: "Trading V3".dlocalize(m_idMod),
									pointsCost: 40,
									duration: 12000,
									cost: 120000,
									canResearch: function (company) 
									{
										return inArrayElementWithId("A16052BB-8882-4741-ABDE-AE37B2E7968F", GameManager.company.researchCompleted) != -1 // Research Trading V2 Done
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "325C03F2-5FF1-4D34-B993-AFFC32B2252F";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchV3);
		
		var tradingResearchV4 =
								{
									id: "39634EBF-1354-4738-99CD-CA0F4453B15C",
									name: "Trading V4".dlocalize(m_idMod),
									pointsCost: 80,
									duration: 14000,
									cost: 180000,
									canResearch: function (company) 
									{
										return inArrayElementWithId("325C03F2-5FF1-4D34-B993-AFFC32B2252F", GameManager.company.researchCompleted) != -1 // Research Trading V3 Done
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "39634EBF-1354-4738-99CD-CA0F4453B15C";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchV4);
		
		var tradingResearchV5 =
								{
									id: "BFFCE3f6-EFF7-4208-BA0D-BA5E8C74EC97",
									name: "Trading V5".dlocalize(m_idMod),
									pointsCost: 100,
									duration: 16000,
									cost: 400000,
									canResearch: function (company) 
									{
										return inArrayElementWithId("39634EBF-1354-4738-99CD-CA0F4453B15C", GameManager.company.researchCompleted) != -1 // Research Trading V4 Done
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "BFFCE3f6-EFF7-4208-BA0D-BA5E8C74EC97";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchV5);
		
		var tradingResearchExpert =
								{
									id: "8E87EE16-F17C-4C1B-BEA9-75B431C76472",
									name: "Expert Trading".dlocalize(m_idMod),
									pointsCost: 150,
									duration: 20000,
									cost: 600000,
									canResearch: function (company) 
									{
										return m_storedDatas.data["m_gainMoney"] >= 1000000 // Have gain 1M Cash with speculations
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "8E87EE16-F17C-4C1B-BEA9-75B431C76472";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchExpert);
		
		var tradingResearchMaster =
								{
									id: "05DD056A-59C2-47D1-93F3-8EEB0FA9364D",
									name: "Master Trading".dlocalize(m_idMod),
									pointsCost: 250,
									duration: 25000,
									cost: 1200000,
									canResearch: function (company) 
									{
										return m_storedDatas.data["m_gainMoney"] >= 5000000 // Have gain 5M Cash with speculations MAYBE TO CHANGE
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "05DD056A-59C2-47D1-93F3-8EEB0FA9364D";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchMaster);
		
		var tradingResearchGod =
								{
									id: "00C70B07-AB3D-41F2-BCC0-788B5C47C344",
									name: "God Trading".dlocalize(m_idMod),
									pointsCost: 300,
									duration: 30000,
									cost: 1600000,
									canResearch: function (company) 
									{
										return m_storedDatas.data["m_gainMoney"] >= 15000000 // Have gain 15M Cash with speculations MAYBE TO CHANGE
									},
									category: "Trading",
									categoryDisplayName: "Trading".dlocalize(m_idMod),
									complete: function () 	{			
																var research =  Research.getAllItems().filter(function (f) { return f.id === "00C70B07-AB3D-41F2-BCC0-788B5C47C344";  });
																if (research)
																{
																	GameManager.company.researchCompleted.push(research);
																	m_storedDatas.data["m_traderResearchLevel"] += 1;
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchGod);
	};
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////// Achievements /////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.initAchievements = function()
	{
		Achievements.unlockTrader = {
										id: "28C7EB8D-BD98-4A66-8A12-AE5E536B3A52",
										title: "Unlock the Trader".dlocalize(m_idMod),
										description: "Do the research 'Trading V1' to unlock the Trader!".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	var res = true;
																	res = inArrayElementWithId("EFEF2F70-0A53-4DE8-8205-C124C6310C17", GameManager.company.researchCompleted) != -1; // Research Trading V1 Done
																	return res;
																}
									};
									
		Achievements.tradingV5unlock = 	{
										id: "65F11C82-C9CD-4F72-B3CF-6C9EDB5100BF",
										title: "Trading Level 5".dlocalize(m_idMod),
										description: "Reach Level 5 in Trading!".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	var res = true;
																	res = inArrayElementWithId("BFFCE3f6-EFF7-4208-BA0D-BA5E8C74EC97", GameManager.company.researchCompleted) != -1; // Research Trading V5 Done
																	return res;
																}
									};
		
		Achievements.tradingGodunlock = {
										id: "8FEA0DEC-46C8-4BA1-ADB8-C58B211FA60E",
										title: "Trading God Level".dlocalize(m_idMod),
										description: "Reach the God Level in Trading!".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	var res = true;
																	res = inArrayElementWithId("00C70B07-AB3D-41F2-BCC0-788B5C47C344", GameManager.company.researchCompleted) != -1; // Research Trading God Done
																	return res;
																}
									};
		
		Achievements.hireTrader = 	{
										id: "D867B4F0-F1E6-46B2-91D2-59E05697BF59",
										title: "Hire a Trader".dlocalize(m_idMod),
										description: "Hire you first Trader!".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_haveTrader"];
																}
									};
									
		Achievements.fireTrader = 	{
										id: "09C19A1C-FBBC-4D30-A5AC-07E1FEB67836",
										title: "Sadistic".dlocalize(m_idMod),
										description: "Fire your Trader!".dlocalize(m_idMod),
										tint: "#FF0000",
										value: 10,
										hidden: true,
										canEarnMultiple: false
									};
									
		Achievements.gainOneMillion = 	{
										id: "56B63313-1B4C-4F93-A4E4-D9F65DDB4E49",
										title: "The Million !".dlocalize(m_idMod),
										description: "Earn 1M cash with the Trader.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_gainMoney"] >= 1000000;
																}
									};
					
		Achievements.gainTenMillions = 	{
										id: "FD15C23E-4754-47E4-88D7-4B1ECD0500D4",
										title: "Ten Million !".dlocalize(m_idMod),
										description: "Earn 10M cash with the Trader.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_gainMoney"] >= 10000000;
																}
									};
									
		Achievements.gainOneBillion = 	{
										id: "4032CB88-3AF7-47A7-BEBB-9EC10A25BCC2",
										title: "The Billion !".dlocalize(m_idMod),
										description: "Earn 1B cash with the Trader.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_gainMoney"] >= 1000000000;
																}
									};
		
		Achievements.becomePublisher = 	{
										id: "27E5f6ED-BB12-473C-8C3B-FA86FD0838C1",
										title: "Publisher !".dlocalize(m_idMod),
										description: "Become an independent Publisher and enter in stock exchange.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_isPublisher"];
																}
									};
		
		Achievements.theGoodDeal = 	{
										id: "67E0B844-37EF-4813-9E6B-32FD05931A66",
										title: "First Deal !".dlocalize(m_idMod),
										description: "Make your first good deal with your Trader.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_bestDeal"] > 0;
																}
									};
		
		Achievements.theGoodDeal = 	{
										id: "766160F8-D92C-4745-AA17-4FDE107BD9A0",
										title: "The Good Deal !".dlocalize(m_idMod),
										description: "Make, with Trader's speculations, in one time, a benefit of 100M.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_bestDeal"] >= 100000000;
																}
									};
		
		Achievements.trainingTrader = 	{
										id: "F6E40A3D-2EB7-4206-855F-E75D8E4EFF0C",
										title: "Train Trader !".dlocalize(m_idMod),
										description: "Train your Trader for the first time.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_traderLevel"] >= 1;
																}
									};
		
		Achievements.trainHard = 	{
										id: "83D55EA7-8E92-4F14-B5A8-05883CFD8F27",
										title: "Train Hard".dlocalize(m_idMod),
										description: "Reach the maximum training level with your Trader.".dlocalize(m_idMod),
										tint: "#FFFF00",
										value: 10,
										hidden: true,
										canEarnMultiple: false,
										isAchieved: function () {
																	return m_storedDatas.data["m_traderLevel"] >= 10;
																}
									};
	}
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////// Init Function ////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.init = function()
	{
		// Event to save and load mod datas
		GDT.on(GDT.eventKeys.saves.loading, wallStreet.loadData);
		GDT.on(GDT.eventKeys.gameplay.weekProceeded, wallStreet.traderSalaryLevy);
		// Trading actions
		GDT.on(GDT.eventKeys.gameplay.weekProceeded, wallStreet.tradedActions);
		
		// Init all research of the mod
		wallStreet.initResearch();
		// Init all events of the mod
		wallStreet.initEvents();
		// Init achievements linked to the mod
		wallStreet.initAchievements();
		// Init lists of notifications used by the mod
		wallStreet.initNotificationsLists();
		// Change behaviour of context menu according to the mod, (keep base behaviour)
		wallStreet.customContextMenuBehaviour();
		
		wallStreet.initPopup();
	};
	
})();