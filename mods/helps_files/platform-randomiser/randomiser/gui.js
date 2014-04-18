var Randomiser = Randomiser || {};
(function() {

	/**
	 * Creates a <div> which can be used for toggling a 
	 * boolean option in the preferences dialog. The use
	 * of a div rather than a checkbox or button is because
	 * the togglebuttons in the game are implemented as divs
	 * and this way the styling can be reused without much
	 * difficulty.
	 *
	 * options - An object with options that contains this preference
	 *			 option
	 * optName - The key in the above option for this option this option.
	 */
	Randomiser.makeBooleanOptionDiv = function(options, optName) {
		var opt = options[optName];
		if(opt.type == 'boolean') {
			var initValue = (opt.currentValue == undefined) ? 
				opt.defValue : opt.currentValue;
			opt.currentValue = initValue;

			var div = $(document.createElement('div'));
			div.addClass('selectableGameFeatureItem');

			if(initValue) {
				div.addClass('selectedFeature');
			}

			div.html(opt.display);
			div.on('click', function(e) {
				var o = opt; // Get a new reference so that
							 // when opt moves on, the event handlers
							 // aren't all associated with the same one
				o.currentValue = !o.currentValue;
				div.toggleClass('selectedFeature');
				console.log(options);
			});
			return div;
		}
	};

	/**
	 * Show a GUI with preferences that can be changed.
	 *
	 * title - The title to display for the GUI.
	 * options - An object containing different types of options
	 *			that can be changed.
	 * callback - A function that takes one parameter to be called when
	 *			the dialog is dismissed. The parameter contains the
	 *			updated values as chosen by the user.
	 */
	Randomiser.displayPreferencesGUI = function(title, options, callback) {
		var body = $('body');
		var dialog = $(document.createElement('div'));
		dialog.addClass("windowBorder tallWindow");

		var heading = $(document.createElement('h3'));
		heading.html(title);
		heading.addClass('windowTitle');
		dialog.append(heading);

		Object.getOwnPropertyNames(options).forEach(function(optName, i) {	
			dialog.append(Randomiser.makeBooleanOptionDiv(options, optName));
		});

		dialog.gdDialog({
			popout: true,
			close: true,
			onClose: function() {
				callback(options);
				GameManager.resume(true);
			}
		})
	};
	
	/**
	 * Used for keeping track of whether or not a context menu has been
	 * added yet.
	 */
	Randomiser.contextAdded = false;


	/**
	 * Add the randomiser options to the context menu.
	 */
	Randomiser.initContextMenu = function() {
		if(Randomiser.contextAdded) { return; };
		var oldContextMenu = UI._showContextMenu;
		var newContextMenu = function(b, c, d, h) {
			c.push({
				label: "Randomiser...",
				action: function () {
					Sound.click();
					Randomiser.displayPreferencesGUI( 
						'Randomiser Config', Randomiser.ds.data.opts,
						function(opts) { 
							Randomiser.ds.data.opts = opts;
						}
					);
				}
			});
			oldContextMenu(b, c, d, h);
		};
		UI._showContextMenu = newContextMenu;
		Randomiser.contextAdded = true;
	};

})();
