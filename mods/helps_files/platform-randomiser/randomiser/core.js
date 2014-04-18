var Randomiser = Randomiser || {};
(function() {
	Randomiser.ds = GDT.getDataStore('Randomiser');

	/**
	 * An event that runs as soon as possible when the
	 * user opens a save file that has not previously had
	 * the randomiser used with it.
	 */
	Randomiser.firstRunEvent = {
		id: 'Randomiser-FirstRun',
		isRandom: false,
		getNotification: function(company) { 
			return new Notification({
				header: 'Randomiser',
				text: "This is the first time the Randomiser has seen this save file. Do you wish to enable the Randomiser on this save?",
				options: ["Yes", "No"],
				sourceId: 'Randomiser-FirstRun'
			});
		},
		trigger: function(company) {
			return Randomiser.ds.data.randomEnabled === undefined; 
		},
		complete: function(decision) {
			var enabled = (decision == 0);
			Randomiser.ds.data.randomEnabled = enabled;
			if(enabled) {
				Randomiser.displayPreferencesGUI('Randomise',
					Randomiser.options,
					function(opts) {
						Randomiser.ds.data.opts = opts;
						Randomiser.randomise(opts);
					}
				);
			} else {
				Platforms.allPlatforms = Randomiser.defaultPlatforms;
			}
		},
		maxTriggers: 1
	};

	Randomiser.reset = function() {
		console.log('Resetting Randomiser');
		Platforms.allPlatforms = Randomiser.defaultPlatforms;
		Randomiser.ds.data = {};
	}

	/**
	 * fix Icons for the PC, G64, TES, Gameling, MasterV which 
	 * are not in the superb directory unlike everything else.
	 */
	Randomiser.fixIcons = function() {
		var affectedPlatforms = ["PC", "G64", "TES", "Gameling", "Master V"];
		for(var i = 0; i < Platforms.allPlatforms.length; i++) {
			var plat = Platforms.allPlatforms[i];
			if(affectedPlatforms.indexOf(plat.id) != -1) {
				plat.iconUri = './images/platforms/{0}.png'.format(plat.id);
			}
		}
	};

	/**
	 * Set up the even for a first run, and the event handler for
	 * when a new game is loaded.
	 */
	Randomiser.init = function() {
		Randomiser.defaultPlatforms = Platforms.allPlatforms;
		GDT.addEvent(Randomiser.firstRunEvent);

		oldStartGame = GameManager.startNewGame;

		GameManager.startNewGame = function() {
			Randomiser.reset();
			oldStartGame();
		};

		/**
		 * Load the previously generated randomised platforms 
		 * for a loaded save file, if they exist.
		 *
		 * e - event with data about the save file being loaded in.
		 */
		GDT.on(GDT.eventKeys.saves.loading, function(e) {
			console.log('Load detected');
			console.log(e);
			Randomiser.ds = GDT.getDataStore('Randomiser');
			// Accessed directly in case modAPI event handler
			// doesn't run until after this.
			var newData = e.data.modData.Randomiser;
			if(newData === undefined || newData.opts === undefined) {
				console.log('Saving settings');
				if(newData === undefined) {
					newData = e.data.modData.Randomiser = {};
				}
				newData.opts = Randomiser.options;
			} else {
				console.log('Settings found');
				console.log(newData.opts);
			}

			if(newData.randomEnabled) {
				Platforms.allPlatforms = newData.platforms;
				Randomiser.fixIcons();
			} else if(newData.randomEnabled === false) {
				Platforms.allPlatforms = Randomiser.defaultPlatforms;
				console.log('Resetting platforms for save file');
			}
			//Randomiser.initContextMenu();
		});
	}

	/**
	 * Randomise the platforms for the current save file based on the 
	 * options passed in.
	 *
	 * opts - An options array controlling what to configure. Possible options
	 *		  are:
	 *			- randomiseInitalSales 
	 *			- randomiseFinalSales
	 *			- randomiseGenreWeightings
	 *			- randomiseAudienceWeightings
	 *			- randomiseLifespans
	 *			- exemptPC
	 */
	Randomiser.randomise = function(opts) {
		var oldPlatforms = $.extend(true, {}, Platforms.allPlatforms);
		for(var i = 0; i < Platforms.allPlatforms.length; i++) {
			var plat = Platforms.allPlatforms[i];
			var year = parseInt(plat.published.split('/')[0]);

			// Used as a modifier for other random values to ensure that
			// there is at least some consistency between good results
			// and not to have platforms that sell 2m on launch day
			// die 6 months later.
			var successFactor = GameManager.company.getRandom() * 2.5;

			if(opts.exemptPC.currentValue && plat.id == "PC") {
				console.log("Skipped PC");
				continue;
			}

			if(opts.randomiseInitialSales.currentValue) {
				var min = 0.25 * successFactor;
				var max = 1 + ((year / 30) * 2) * successFactor;
				plat.startAmount = Math.floor(
					Randomiser.random(min, max) * 1000
				) / 1000;
				console.log('Changed inital {0} sales from {1}m to {2}m'.format(
					plat.name, oldPlatforms[i].startAmount, plat.startAmount));
			}

			if(opts.randomiseFinalSales.currentValue) {
				var min = plat.startAmount * 1.2;
				var max = 1 + ((year / 30) * 3) * successFactor;
				plat.unitsSold = Math.floor(
					Randomiser.random(min, max) * 1000
				) / 1000;
				console.log('Changed final {0} sales from {1}m to {2}m'.format(
					plat.name, oldPlatforms[i].unitsSold, plat.unitsSold));
				delete plat.marketKeyPoints;
			}

			if(opts.randomiseLifespan.currentValue) {
				// 48 weeks in GDT year
				var min = Math.floor((2 * 48) * successFactor);
				var max = Math.floor((5 * 48) * successFactor);
				var lifeSpanInWeeks = Math.floor(
					Randomiser.random(min, max)
				);
				var startWeek = General.getWeekFromDateString(plat.published);
				var endWeek = startWeek + lifeSpanInWeeks;
				var y = Math.floor((endWeek / 48) + 1);
				var m = Math.floor((endWeek % 48) / 4 + 1);
				var d = Math.floor((endWeek % 4) + 1);
				if(y > 30) {
					y = 260; // Add infinite lifespan consoles.
				}
				var endDate = '{0}/{1}/{2}'.format(y, m, d);
				plat.platformRetireDate = endDate;
				console.log('Changed {0} retire date from {1} to {2}'.format(
					plat.name, oldPlatforms[i].platformRetireDate, endDate));
			}

			if(opts.randomiseAudienceWeightings.currentValue) {
				plat.audienceWeightings = Randomiser.randomWeightingsArray(3);
				console.log('Changed {0} audience appeal to {1}'.format(
					plat.name, plat.audienceWeightings));
			}

			if(opts.randomiseGenreWeightings.currentValue) {
				plat.genreWeightings = Randomiser.randomWeightingsArray(6);
				console.log('Changed {0} genre appeal to {1}'.format(
					plat.name, plat.genreWeightings));
			}

		}
		Randomiser.ds.data.oldPlatforms = oldPlatforms;
		Randomiser.ds.data.platforms = Platforms.allPlatforms;
	}

	/**
	 * Get a random array of weightings between 0.6 and 1.0 rounded to one
	 * decimal place that are suitable for use as audience weightings or 
	 * genre weightings.
	 *
	 * len - The length of the array to generate.
	 */
	Randomiser.randomWeightingsArray = function(len) {
		var weightings = []
		for(var j = 0; j < len; j++) {
			var randomNum = (GameManager.company.getRandom() / 2) + 0.500001
			weightings[j] = Math.ceil( randomNum * 10) / 10;
		}
		return weightings;
	}

	/**
	 * Generate a random number within a given inclusive range. Only works
	 * for ranges that are larger than 0-1.
	 *
	 * min - The minimum possible value to return.
	 * max - The maximum possible value to return.
	 */
	Randomiser.random = function(min, max) {
		return GameManager.company.getRandom() * (max - min + 1) + min;
	}

	/**
	 * The default options array for a new save file. Each item
	 * has four potential properties:
	 *
	 *		display - The text to display to the user when editing.
	 *		type - The type of value to use. (Currently only boolean
	 *		supported)
	 *		defValue - The default value if the user doesn't pick one
	 *		currentValue - A user chosen value, if the user has set it yet.
	 */
	Randomiser.options = {
		randomiseInitialSales: {
			display: 'Randomise Launch Sales',
			type: 'boolean',
			defValue: true
		},
		randomiseFinalSales: {
			display: 'Randomise Lifetime Sales',
			type: 'boolean',
			defValue: true
		},
		randomiseLifespan: {
			display: 'Randomise Lifespan',
			type: 'boolean',
			defValue: true
		},
		exemptPC: {
			display: 'Exempt PC from Randomisation',
			type: 'boolean',
			defValue: true
		},
		randomiseGenreWeightings: {
			display: 'Randomise Genre-Console combinations',
			type: 'boolean',
			defValue: false
		},
		randomiseAudienceWeightings: {
			display: 'Randomise Console Audiences',
			type: 'boolean',
			defValue: false
		} 
	};
})();
