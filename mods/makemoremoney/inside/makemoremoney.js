// Loan bank Mod
var Makemoremoney = {};

(function () {

	var conjonctur = ["recession", "stagnation", "revival", "expansion"];
	
	var loanAmount;
	var loanRate;
	var loanWeeklyAmount;
	var hasLoan = false;

	Makemoremoney.computeAmount = function (result) {

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

	// TODO
	Makemoremoney.checkLoan = function (result) {
		var game = GameManager.company.gameLog.last();

		
		//if(GameManager.company.lastG
		//return true;
		
		return true;
	}
	
	Makemoremoney.rate = function (result) {
		return 2.2;
	}
	
	var weeklyLoan = function (e) {
		GameManager.company.adjustCash(-loanWeeklyAmount, "Loan Weekly payments");
	}
				
	Makemoremoney.load = function () {
		
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
							options: ["5K".dlocalize(), "10K".dlocalize(), "25K".dlocalize()]
						});
						break;
						
					case 2:
						return new Notification(
						{
							sourceId: "bankLoan",
							header: "You want a bank loan?".dlocalize(),
							text: "Which amount do you want ?.".dlocalize(),
							options: ["500K".dlocalize(), "1M".dlocalize(), "2M".dlocalize()]
						});
						break;
						
						
					case 3,4:
						return new Notification(
						{
							sourceId: "bankLoan",
							header: "You want a bank loan?".dlocalize(),
							text: "Which amount do you want ?".dlocalize(),
							options: ["10M".dlocalize(), "50M".dlocalize(), "100M".dlocalize()]
						});
						break;
						
				}
			},
			
			complete: function(result)
			{
				loanAmount = Makemoremoney.computeAmount(result);
				
				var n;
				
				if(Makemoremoney.checkLoan(result)) {// ICI 2 NOFI ACCEPTER OU PAS

					// Donner le Rate
					loanRate = Makemoremoney.rate(result);
					
					n = new Notification(
					{
						header: "Allow Loan of {0}".dlocalize().format(loanAmount),
						text: "Due to your reputation, we are pleased to allocate to you this loan. \n Rate : {0}%".dlocalize().format(loanRate),
						weeksUntilFired: 2.2,
						options: ["Accept".dlocalize(), "Decline the offer".dlocalize()],
						sourceId: "bankLoanRate" //ENVOIS l'event à l'event d'id bankLoan
					});
				
				}else{
					// Other way to write les Notifications
					n = new Notification("Downright refusal Loan of {0}".dlocalize().format(loanAmount),
						"We have the regret to refuse your loan.".dlocalize(),
						"Thank you in any case, Mr President.".dlocalize(),
						1.4
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
				
				loanWeeklyAmount = (loanAmount/24) * /*taxe*/(1+(loanRate/100)); // 1.022 <=> 1 + (2.2/100)
			
				// Other way to write les Notifications
				n = new Notification("Bank and mortgage interest rates".dlocalize(),
					"You signed for a 27 weeks loan. You should prepare the interest payments elevated at {0} cr. each week. \n\nIf you can pay the interest you should close doors".dlocalize().format(loanWeeklyAmount),
					"Agree".dlocalize(),
					0.0
				);
				
				GameManager.company.activeNotifications.addRange(n.split());// Car direct notification
				
				// Final
				n = new Notification(
				{
					header: "Bank : End your loan".dlocalize().format(loanAmount),
					text: "Your loan is paid off.".dlocalize().format(loanRate),
					weeksUntilFired: 24 + 5 * GameManager.company.getRandom(),
					buttonText: "Finalize".dlocalize(),
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