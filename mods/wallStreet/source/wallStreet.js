var wallStreet = {};

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
///////////////////////

(function()
{
	var m_idMod = "wallStreet";
	var m_storedDatas;	// Datas used by the mod
	
	var saveData = function() 
	{
		/*// Save mod datas
		m_storedDatas.data["haveTrader"] = m_haveTrader;
		m_storedDatas.data["traderSalary"] = m_traderSalary;*/
	}
	
	var loadData = function() 
	{		
		// Load mod datas
		if(!m_storedDatas)
			m_storedDatas = GDT.getDataStore(m_idMod);

			
		if (!m_storedDatas.data.m_haveTrader)
			m_storedDatas.data.m_haveTrader = false;
			
		if (!m_storedDatas.data.m_traderSalary)
			m_storedDatas.data.m_traderSalary = 35000;
			
		if (!m_storedDatas.data.m_hireCost)
			m_storedDatas.data.m_hireCost = 100000;
	}
	
	var traderSalaryLevy = function()
	{
		var week = parseInt(GameManager.company.currentWeek.toString());

		if (m_storedDatas.data.m_haveTrader && week %4 == 0)
			GameManager.company.adjustCash(-m_storedDatas.data.m_traderSalary, "Trader Salary".dlocalize());
	}
	
	wallStreet.init = function()
	{
		// Event to save and load mod datas
		GDT.on(GDT.eventKeys.saves.saving, saveData);	// Maybe to delete
		GDT.on(GDT.eventKeys.saves.loading, loadData);
		GDT.on(GDT.eventKeys.gameplay.weekProceeded, traderSalaryLevy);
		
		// Event used to indicate that the player can now Hire a Trader (dialog window)
		var unlockTraderHiringEvent =
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
											header: "Hire Trader".dlocalize(),
											text: "With this new office, new opportunities are available to you.\n\nYou can now hire a Trader to deal with stock exchange!\nWith him you can earn a lot of money, but be careful, you also can lose a lot.{n}To hire a Trader see you CEO.".dlocalize(),
										});
			}
		};
		GDT.addEvent(unlockTraderHiringEvent);
		
		// Event to Hire a Trader (Generate a dialog window)
		var hireTraderEvent =
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
											header: "Hire Trader".dlocalize(),
											text: "Do you want to hire a Trader ?\n\nHire Cost : " + (m_storedDatas.data.m_hireCost/1000).toString() + "K\nBase Salary : " + (m_storedDatas.data.m_traderSalary/1000).toString() + "K".dlocalize(),
											options: ["Yes".dlocalize(), "No".dlocalize()]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				// Hire Trader Cost
				GameManager.company.adjustCash(-m_storedDatas.data.m_hireCost, "Hire Trader".dlocalize());
				
				var notif = new Notification(
											{
												header: "Trader Hired".dlocalize(),
												text: "You have successfully hire a Trader.\n\nYou can now train him and allocate a budget that he can use to do some speculations!".dlocalize(),
											});
				
				m_storedDatas.data.m_haveTrader = true;
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(hireTraderEvent);
		
		
		// Event to Fire a Trader (Generate a dialog window)
		var fireTraderEvent =
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
											header: "Fire Trader".dlocalize(),
											text: "Do you want to fire your Trader ?".dlocalize(),
											options: ["Yes".dlocalize(), "No".dlocalize()]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				m_storedDatas.data.m_haveTrader = false;
				
				var notif = new Notification(
											{
												header: "Trader Fired".dlocalize(),
												text: "You have fired your Trader.\n\nYou can hire another one when you want, but you will need to retrain him.".dlocalize(),
											});
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(fireTraderEvent);
		
		// Add if necessary an item to context menu to hire a trader (when click on PDG)
		var baseContextMenu = UI.showContextMenu;	// Recover actual function on the show context Menu
		var hireTrader = function(items, pos)
		{
			// Recover which character has been clicked
			var selectedCharacter = UI.getCharUnderCursor();
			// Check if the PDG as been clicked
			var pdgSelected = (selectedCharacter && selectedCharacter == GameManager.company.staff[0]);
			
			// Check if the player is at lvl 4
			if (pdgSelected && GameManager.company.currentLevel >= 4)
			{			
				// If we have no trader we can hire one
				if (!m_storedDatas.data.m_haveTrader)
				{
					// Create Item for the context menu
					var hireTraderItem =
					{
						label: "Hire a Trader".dlocalize(),
						action: function()
						{
							Sound.click();
							GameManager.company.notifications.insertAt(0, hireTraderEvent.getNotification());
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
						label: "Fire the Trader".dlocalize(),
						action: function()
						{
							Sound.click();
							GameManager.company.notifications.insertAt(0, fireTraderEvent.getNotification());
							GameManager.resume(true);
						}
					};
					
					// Create Item for the context menu
					var allocateTraderBudgetItem =
					{
						label: "Manage Trader".dlocalize(),
						action: function()
						{
							Sound.click();
							//GameManager.company.notifications.insertAt(0, fireTraderEvent.getNotification()); // TODO
							GameManager.resume(true);
						}
					};
					
					// Insert fireTraderItem and manage trader at 2 first pos in context menu
					items.splice(0, 0, fireTraderItem);
					items.splice(1, 0, allocateTraderBudgetItem);
				}
			}

			// Call to the old function to keep the same behaviour
			baseContextMenu(items, pos);
		};
		UI.showContextMenu = hireTrader;	// Put our custom function on show context Menu	
	};
	
})();