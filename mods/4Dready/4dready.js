

//Ajout de 2 Pcs


var rogicon = 'onverraplustard';

GDT.addPlatform(
	{
		id: 'Asos ROG',
		name: 'Asos ROG',
		company: 'Asos',
		startAmount: 0.15,
		unitsSold: 1.0,
		licencePrize: 500000,
		published: '23/3/4',
		platformRetireDate: '28/6/2',
		developmentCosts: 100000,
		genreWeightings: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
		audienceWeightings: [0.9, 1, 0.8],
		techLevel: 5,
		iconUri: icon,
		events: [
			{
				id: '10537DA1-58F1-4F23-8854-F1E262193ROG',
				date: '23/2/1',
				getNotification: function (company) {
					return new Notification({
						header: "Industry News".localize(),
						text: "Coming out of nowhere a company called Asos has announced that it will publish a new game console called the Asos ROG {0}.".localize().format(General.getETADescription('23/2/1', '23/3/4')),
						image: rogicon
					});
				}
			}
		]
	});
};		

var dragonicon = 'onverraplustard';

GDT.addPlatform(
	{
		id: 'Mso dragon',
		name: 'Mso dragon',
		company: 'Msi',
		startAmount: 0.15,
		unitsSold: 1.0,
		licencePrize: 500000,
		published: '23/6/4',
		platformRetireDate: '28/9/2',
		developmentCosts: 100000,
		genreWeightings: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
		audienceWeightings: [0.9, 1, 0.8],
		techLevel: 5,
		iconUri: icon,
		events: [
			{
				id: '10537DA1-58F1-4F23-8854-F1E262DRAGON',
				date: '23/5/1',
				getNotification: function (company) {
					return new Notification({
						header: "Industry News".localize(),
						text: "Coming out of nowhere a company called Mso has announced that it will publish a new game console called the Mso dragon {0}.".localize().format(General.getETADescription('23/5/1', '23/6/4')),
						image: dragonicon
					});
				}
			}
		]
	});

	
	//Ajout de la 4D
	
GDT.addResearchItem(
    {
        id: "4D1",
        name: "4D V1".localize(),
        v: 1,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('Graphic') > 10  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D2",
        name: "4D V2".localize(),
        v: 2,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D1') > 3  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D3",
        name: "4D V3".localize(),
        v: 4,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D2') > 3  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D4",
        name: "4D V4".localize(),
        v: 6,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D3') > 3  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D5",
        name: "4D V5".localize(),
        v: 8,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D4') > 3  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D6",
        name: "4D V6".localize(),
        v: 10,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D5') > 3  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D7",
        name: "4D V7".localize(),
        v: 12,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D6') > 3 
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D8",
        name: "4D V8".localize(),
        v: 14,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D7') > 3 
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D9",
        name: "4D V9".localize(),
        v: 14,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D8') > 3 
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  GDT.addResearchItem(
    {
        id: "4D10",
        name: "4D final version".localize(),
        v: 14,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('4D9') > 5
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  //Ajout de niveaux superieux en 2D et 3D
  
  
  GDT.addResearchItem(
    {
        id: "2D8",
        name: "2D V8".localize(),
        v: 14,
        canResearch: function (company) {
            return LevelCalculator.getMissionLevel('2D') > 10  
        },
        category: "4D",
        categoryDisplayName: "4D".localize()
  });
  
  
  
  
  
  