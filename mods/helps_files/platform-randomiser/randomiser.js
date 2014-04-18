(function() {
	var ready = function() {
		Randomiser.init();
	};

	var error = function() {
	};

	GDT.loadJs(['mods/platform-randomiser/randomiser/core.js', 'mods/platform-randomiser/randomiser/gui.js'], ready,
		error);

})();
