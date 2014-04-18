//Warning: reading this code as an experienced developer may cause you to bang your head into the wall
//I am not responsible for you being sent to the hospital because of my mod

var AnytimeVacation = {};

(function()
{
	var modid = "anytimevacation";
	var oriShowMenu;
	var staffToSend;

	AnytimeVacation.init = function()
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
		
		var fesevent =
		{
			id: "fullEffSend",
			trigger: function()
			{
				return false;
			},
			getNotification: function(company, staff)
			{
				staffToSend = staff;
				return new Notification(
				{
					sourceId: "fullEffSend",
					header: "Send employee on vacation?".dlocalize(),
					text: "Are you sure you want to send {0} on vacation? There is a small chance that they will lose points if sent while fully efficient.".dlocalize().format(staff.name),
					options: ["Yes".dlocalize(), "No".dlocalize()]
				});
			},
			complete: function(result)
			{
				if (result != 0) return;
				
				staffToSend.goOnVacation();
				var employee = staffToSend;
				
				if (GameManager.company.getRandom() < 0.15)
				{
					var design = GameManager.company.getRandom() < 0.5;
					var speed = GameManager.company.getRandom() < 0.5;
					
					var stat1name = design ? "Design".localize() : "Technology".localize();
					var stat2name = speed ? "Speed".localize() : "Research".localize();
					
					design ? employee.designFactor *= 0.9 : employee.technologyFactor *= 0.9;
					speed ? employee.speedFactor *= 0.9 : employee.researchFactor *= 0.9;

					var n = new Notification(
					{
						header: "Decreased attributes".dlocalize(),
						text: "{0} had some important ideas in mind, but forgot them since they went on vacation. This caused their {1} and {2} attributes to go down by 10%.".dlocalize().format(employee.name, stat1name, stat2name),
						weeksUntilFired: 3
					});
					GameManager.company.notifications.push(n);
				}
			}
		};
		
		GDT.addEvent(fesevent);
		
		oriShowMenu = UI.showContextMenu;
		var myShowMenu = function(items, f)
		{
			var selectedStaff = UI.getCharUnderCursor();
			var vacationlabel = "Send on Vacation".localize("menu item");
			var triggered = selectedStaff != null && selectedStaff != GameManager.company.staff[0];
			
			if (triggered)
				for (var i = 0; i < items.length; i++)
					if (items[i].label == vacationlabel)
						triggered = false;
			
			if (triggered)
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
	}
})();