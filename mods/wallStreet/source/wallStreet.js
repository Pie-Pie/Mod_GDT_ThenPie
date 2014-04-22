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
	var m_storedDatas;
	var m_haveTrader = false;
	
	var saveData = function() 
	{
		// Save mod datas
		m_storedDatas.data["haveTrader"] = m_haveTrader;
	}
	
	var loadData = function() 
	{
		m_storedDatas = GDT.getDataStore("wallStreet");
		
		// Load mod datas
		m_haveTrader = m_storedDatas.data["haveTrader"];
	}
	
	wallStreet.init = function()
	{
		// Event to save and load mod datas
		GDT.on(GDT.eventKeys.saves.saving, saveData);
		GDT.on(GDT.eventKeys.saves.loading, loadData);
		
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
											text: "Do you want to hire a Trader ?".dlocalize(),
											options: ["Yes".dlocalize(), "No".dlocalize()]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				var notif = new Notification(
											{
												header: "Trader Hired".dlocalize(),
												text: "You have successfully hire a Trader.\n\nYou can now train him and allocate a budget that he can use to do some speculations!".dlocalize(),
											});
				
				m_haveTrader = true;
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(hireTraderEvent);
		
		// Add if necessary an item to context menu to hire a trader (when click on PDG)
		var baseContextMenu = UI.showContextMenu;	// Recover actual function on the show context Menu
		var hireTrader = function(items, pos)
		{
			// Recover which character has been clicked
			var selectedCharacter = UI.getCharUnderCursor();
			// Check if the PDG as been clicked
			var pdgSelected = (selectedCharacter && selectedCharacter == GameManager.company.staff[0]);
			
			// Check if the player is at lvl 4 with no trader hired
			if (pdgSelected && GameManager.company.currentLevel >= 4 && !m_haveTrader)
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

			// Call to the old function to keep the same behaviour
			baseContextMenu(items, pos);
		};
		UI.showContextMenu = hireTrader;	// Put our custom function on show context Menu	
	};
	
})();