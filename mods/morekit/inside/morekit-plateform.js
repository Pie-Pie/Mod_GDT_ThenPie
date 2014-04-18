//Warning: reading this code as an experienced developer may cause you to bang your head into the wall
//I am not responsible for you being sent to the hospital because of my mod

var MoreKit_platform = {};
(function () {

	// EXAMPLE
	MoreKit_platform.addPlatform = function () {
		var icon = './mods/gdt-modAPI/examples/img/greenheartOne.png';
		GDT.addPlatform(
			{
				id: 'Greenheart One',
				name: 'Greenheart One',
				company: 'Greenheart Games',
				startAmount: 0.15,
				unitsSold: 0.358,
				licencePrize: 5000,
				published: '1/3/4',
				platformRetireDate: '4/6/2',
				developmentCosts: 10000,
				genreWeightings: [0.9, 1, 1, 0.9, 1, 0.7],
				audienceWeightings: [0.9, 1, 0.8],
				techLevel: 1,
				iconUri: icon,
				events: [
					{
						id: '10537DA1-58F1-4F23-8854-F1E2621933BF',
						date: '1/2/1',
						getNotification: function (company) {
							return new Notification({
								header: "Industry News".localize(),
								text: "Coming out of nowhere a company called Greenheart Games has announced that it will publish a new game console called the Greenheart One {0}.".localize().format(General.getETADescription('1/2/1', '1/3/4')),
								image: icon
							});
						}
					}
				]
			});
	};
	
})();
