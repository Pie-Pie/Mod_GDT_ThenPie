// Loan bank Mod
var Makemoremoney = {};

(function () {

	var conjonctur = ["recession", "stagnation", "revival", "expansion"];
	
	var loanAmount;
	var strLoanAmount;
	var loanRate;
	var loanWeeklyAmount;
	var hasLoan = false;
	
	var store; // For saving data

	var computeAmount = function (result) {

			switch(GameManager.company.currentLevel) {
						case 1:
							if(result == 0) return 5000;
							if(result == 1) return 10000;
							else return 25000;
							
							break;
							
						case 2:
							if(result == 0) return 500000;
							if(result == 1) return 1000000;
							else return 2000000;
							break;
							
						default:
							if(result == 0) return 10000000;
							if(result == 1) return 50000000;
							else return 100000000;
							break;
			}
	}
	
	var intToStr = function (a) {
        var c;
        1E6 <= Math.abs(a) ? c = "{0}M".format(UI.getLongNumberString(Math.roundToDecimals(a / 1E6, 1))) : 1E3 <= Math.abs(a) && (c = "{0}K".format(UI.getLongNumberString(Math.roundToDecimals(a / 1E3, 1))));
		c || (c = Math.roundToDecimals(a, 1));
        return c
    }
	
	
	// TODO
	var checkLoan = function (result) {
		var game = GameManager.company.gameLog.last();

		
		//if(GameManager.company.lastG
		//return true;
		
		return true;
	}
	
	var rate = function (result) {
		return 2.2;
	}
	
	var weeklyLoan = function (e) {
		GameManager.company.adjustCash(-loanWeeklyAmount, "Loan payments");
	}
	
	var load = function () {
		// Chargement des données
		loanAmount = store.data["loanAmount"];
		strLoanAmount = store.data["strLoanAmount"];
		loanRate = store.data["loanRate"];
		loanWeeklyAmount = store.data["loanWeeklyAmount"];
		hasLoan = store.data["hasLoan"];
		// END
	}
	
	var save = function() {
		store.data["loanAmount"] = loanAmount;
		store.data["strLoanAmount"] = strLoanAmount;
		store.data["loanRate"] = loanRate;
		store.data["loanWeeklyAmount"] = loanWeeklyAmount;
		store.data["hasLoan"] = hasLoan;
	}
				
	Makemoremoney.load = function () {
		store = GDT.getDataStore("makemoremoney");
		
		GDT.on(GDT.eventKeys.saves.saving ,save);
		
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
		
		var fesevent =
		{
			id: "bankLoan",
			
			trigger: function()
			{
				return false;
			},
			
			getNotification: function(company)
			{
				switch(GameManager.company.currentLevel) {
					case 1:
						return new Notification(
						{
							sourceId: "bankLoan",
							header: "You want a bank loan".dlocalize(),
							text: "Which amount do you want ?".dlocalize(),
							options: ["5K".dlocalize(), "10K".dlocalize(), "25K".dlocalize(), "CANCEL".dlocalize()]
						});
						break;
						
					case 2:
						return new Notification(
						{
							sourceId: "bankLoan",
							header: "You want a bank loan?".dlocalize(),
							text: "Which amount do you want ?".dlocalize(),
							options: ["500K".dlocalize(), "1M".dlocalize(), "2M".dlocalize(), "CANCEL".dlocalize()]
						});
						break;
						
						
					case 3,4:
						return new Notification(
						{
							sourceId: "bankLoan",
							header: "You want a bank loan?".dlocalize(),
							text: "Which amount do you want ?".dlocalize(),
							options: ["10M".dlocalize(), "50M".dlocalize(), "100M".dlocalize(), "CANCEL".dlocalize()]
						});
						break;
						
				}
			},
			
			complete: function(result)
			{
			
				if(result == 3) // CANCEL case
					return;
				
				loanAmount = computeAmount(result);
				
				var n;
				
				if(checkLoan(result)) {

					// Donner le Rate
					loanRate = rate(result);
					strLoanAmount = intToStr(loanAmount);
					
					n = new Notification(
					{
						header: "Allow Loan of {0}".dlocalize().format(strLoanAmount),
						text: "Due to your reputation, we are pleased to allocate you a {0} loan. \n  The rate is {1}%".dlocalize().format(strLoanAmount, loanRate),
						weeksUntilFired: 2.2 * GameManager.company.getRandom(),
						options: ["Accept".dlocalize(), "Decline the offer".dlocalize()],
						sourceId: "bankLoanRate" //ENVOIS l'event à l'event d'id bankLoan
					});
				
				}else{
					// Other way to write les Notifications
					n = new Notification("Downright refusal Loan of {0}".dlocalize().format(loanAmount),
						"We have the regret to refuse your loan. Your situation is bad, we don't accord you. \nThe bank is still here if you increase your position. \n\nKind regards,\nMr Woody Banker".dlocalize(),
						"Thank you in any case, Mr President.".dlocalize(),
						1.4 * GameManager.company.getRandom()
					);
					
				}
				
				GameManager.company.notifications.push(n);
			}
		};
		GDT.addEvent(fesevent);
		
		// Event to accept the loan rate
		var rateLoanEvent = {
			id: "bankLoanRate",
			trigger: function()
			{
				return false;
			},
			
			getNotification: function(company)
			{
			
			},
			
			complete: function(result)
			{
				if(result != 0)
					return;
					
				var n;
				var nbWeek = 19 + 18 * GameManager.company.getRandom();
				
				loanWeeklyAmount = (loanAmount/nbWeek) * /*taxe*/(1+(loanRate/100)); // 1.022 <=> 1 + (2.2/100)
			
				// Other way to write les Notifications
				n = new Notification("Bank and mortgage interest rates".dlocalize(),
					"You signed for a 27 weeks loan. You should prepare the interest payments elevated at {0} each week. \n\nIf you can pay the interest you should close doors".dlocalize().format(intToStr(loanWeeklyAmount)),
					"Agree".dlocalize(),
					0.0
				);
				
				GameManager.company.activeNotifications.addRange(n.split());// Car direct notification
				
				// Final
				n = new Notification(
				{
					header: "Bank : End your loan".dlocalize().format(loanAmount),
					text: "Your loan is paid off.".dlocalize().format(loanRate),
					buttonText: "Finalize",
					weeksUntilFired: nbWeek,
					sourceId: "bankLoanEnd"
				});
				
				GameManager.company.notifications.push(n);
				
				GDT.on(GDT.eventKeys.gameplay.weekProceeded, weeklyLoan);
				hasLoan = true;
			}
			
		};
		GDT.addEvent(rateLoanEvent);
		
		
		// End the loan
		var endLoanEvent = {
			id: "bankLoanEnd",
			trigger: function()
			{
				return false;
			},
			
			getNotification: function(company)
			{
			
			},
			
			complete: function(result)
			{
				GDT.off(GDT.eventKeys.gameplay.weekProceeded, weeklyLoan);
				hasLoan = false;
			}
			
		};
		GDT.addEvent(endLoanEvent);
		
		oriShowMenu = UI.showContextMenu;
		var myShowMenu = function(items, f)
		{

			var selectedStaff = UI.getCharUnderCursor();
			var vacationlabel = "Bank Loan".localize("menu item");
			
			var triggered = (selectedStaff != null && selectedStaff == GameManager.company.staff[0]);
			
			if (triggered && !hasLoan)
			{
				var fesitem =
				{
					label: vacationlabel,
					action: function()
					{
						Sound.click();
						GameManager.company.notifications.insertAt(0, fesevent.getNotification(GameManager.company, selectedStaff));
						GameManager.resume(true);
					}
				};
				items.splice(items.length - 1, 0, fesitem);
			}
			
			oriShowMenu(items, f);
		};
		UI.showContextMenu = myShowMenu;
	};

})();