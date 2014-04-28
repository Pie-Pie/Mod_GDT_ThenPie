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
			
		if (!m_storedDatas.data["m_traderSalary"])
			m_storedDatas.data["m_traderSalary"] = 35000;
			
		if (!m_storedDatas.data["m_hireCost"])
			m_storedDatas.data["m_hireCost"] = 100000;
			
		if (!m_storedDatas.data["m_gainMoney"])
			m_storedDatas.data["m_gainMoney"] = 0;
	}
	
	wallStreet.traderSalaryLevy = function()
	{
		var week = parseInt(GameManager.company.currentWeek.toString());

		if (m_storedDatas.data["m_haveTrader"] && week %4 == 0)
			GameManager.company.adjustCash(-m_storedDatas.data["m_traderSalary"], "Trader Salary".dlocalize(m_idMod));
	}
	
	//////////////////////////////////////////////////////////////////////
	//////////////////////////////// GUI /////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.initPopup = function()
	{
		/*var res = $("#resources");
		res.append("<div id=\"advSpyDialog\" class=\"tallWindow windowBorder\"> <div class=\"windowTitle\">" + "Advanced Spying".dlocalize(m_idMod) + "</div><div id=\"advSpyCost\" class=\"windowCostLabel\">" + "Cost:".dlocalize(m_idMod) + " 500K</div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Budget".dlocalize(m_idMod) + "</h2><div id=\"advSpyBudgetSlider\">			</div></div>" + "<div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Select target".dlocalize(m_idMod) + "</h2><div id=\"advSpyTargets\" style=\"height: 280px; overflow-y: auto; margin: 5px 20px 0px 20px;\"></div></div><br />" + "<div class=\"centeredButtonWrapper okButtonWrapper\"><div id=\"advSpyButton\" class=\"okButton baseButton windowMainActionButton disabledButton windowLargeOkButton\">" + "Spy".dlocalize(m_idMod) + "</div></div></div>");
		
		
		$("#advSpyBudgetSlider").empty();
		$("#advSpyBudgetSlider").append($("<div class=\"budgetSlider\"></div>").slider(
		{
			orientation: "vertical",
			min: 0,
			max: 10,
			value: 2,
			animate: "fast",
			slide: function(event, ui)
			{
				//alert($("#advSpyBudgetSlider").slider("value"));
			}
		}));
	
	$("#advSpyDialog").dialog(
			{
				draggable: false,
				modal: true,
				resizable: false,
				show: "fade",
				zIndex: 7000,
				title: "Attention",
				open: function()
				{
					
				},
				close: function()
				{
					$(this).dialog("destroy");
					this.style.cssText = "display: none;";
				}
			});
			
		UI.closeModal();*/
		var res = $("#resources");
		res.append("<div id=\"managePopup\" class=\"tallWindow windowBorder\"><div id=\"salaryLabel\" class=\"windowCostLabel\">" + "Salary:".dlocalize(m_idMod) + " 35K</div><div class=\"centeredButtonWrapper\" style=\"margin-top: 20px\"><h2>" + "Salary: ".dlocalize(m_idMod) + "</h2><div id=\"salarySlider\">			</div></div></div>");
		
		$("#salarySlider").slider(
		{
			min: 0,
			max: 500,
			value: 35,
			step: 10,
			slide: function(event, ui)
			{
				//alert($("#salarySlider").slider("value"));
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
											text: "Do you want to hire a Trader ?\n\nHire Cost : ".dlocalize(m_idMod) + (m_storedDatas.data["m_hireCost"]/1000).toString() + "K\nBase Salary : ".dlocalize(m_idMod) + (m_storedDatas.data["m_traderSalary"]/1000).toString() + "K".dlocalize(m_idMod),
											options: ["Yes".dlocalize(m_idMod), "No".dlocalize(m_idMod)]
										});
			},
			
			complete: function(result)
			{
				if(result != 0) // Case not answer Yes
					return;
				
				// Hire Trader Cost
				GameManager.company.adjustCash(-m_storedDatas.data["m_hireCost"], "Hire Trader".dlocalize(m_idMod));
				
				var notif = new Notification(
											{
												header: "Trader Hired".dlocalize(m_idMod),
												text: "You have successfully hire a Trader.\n\nYou can now train him and allocate a budget that he can use to do some speculations!".dlocalize(m_idMod),
											});
				
				m_storedDatas.data["m_haveTrader"] = true;
				
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
				
				m_storedDatas.data["m_haveTrader"] = false;
				
				var notif = new Notification(
											{
												header: "Trader Fired".dlocalize(m_idMod),
												text: "You have fired your Trader.\n\nYou can hire another one when you want, but you will need to retrain him.".dlocalize(m_idMod),
											});
				
				GameManager.company.notifications.push(notif);
			}
		};
		GDT.addEvent(wallStreet.fireTraderEvent);
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
																}			
															}
								};
		Research.SpecialItems.push(tradingResearchGod);
	};
	
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////// Init Function ////////////////////////////
	//////////////////////////////////////////////////////////////////////
	wallStreet.init = function()
	{
		// Event to save and load mod datas
		GDT.on(GDT.eventKeys.saves.loading, wallStreet.loadData);
		GDT.on(GDT.eventKeys.gameplay.weekProceeded, wallStreet.traderSalaryLevy);
		
		// Init all research of the mod
		wallStreet.initResearch();
		// Init all events of the mod
		wallStreet.initEvents();
		// Change behaviour of context menu according to the mod, (keep base behaviour)
		wallStreet.customContextMenuBehaviour();
		
		wallStreet.initPopup();
		
		//function for event manageTrader
		/*function forEventManage1()
		{*/
		
		//}
	};
	
})();