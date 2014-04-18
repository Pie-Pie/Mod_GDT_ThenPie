//Platforms Matari

var icon = './mods/SuperConsoles/source/img/Matari.png';
GDT.addPlatform({
	id : '16537DF1-58F1-4S2derp3-8854F1A2621933BF',
	name : 'Matari 2600',
	company : 'Matari',
	startAmount : 0.22,
	unitsSold : 0.32,
	licencePrize : 5000,
	published : '1/1/1',
	platformRetireDate : '9/10/2',
	developmentCosts : 25000,
	genreWeightings : [0.7, 0.9, 0.9, 0.9, 0.6, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 1,
	iconUri : icon,
				});

var icon = './mods/SuperConsoles/source/img/Matari.png';
GDT.addPlatform({
	id : '16537DF1-58F1-4S23-8854-F1A2621933BF',
	name : 'Matari 5200',
	company : 'Matari',
	startAmount : 0.33,
	unitsSold : 0.645,
	licencePrize : 5000,
	published : '3/2/2',
	platformRetireDate : '5/3/4',
	developmentCosts : 27500,
	genreWeightings : [0.8, 0.8, 0.8, 0.9, 0.8, 1],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 1,
	iconUri : icon,
	events : [{
			id : '16a2c63b-921c-456c-86b8-763b86dcc843',
			date : '3/1/3',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Matari has just announced new console called Matari 5200. Matari wants to beat Ninvento. It will be better than old Matari, but experts said that games and consoles will lost its popularity. It can affect sales. {n} Matari said that it will be published {0}.".localize().format(General.getETADescription('3/1/3', '3/2/2')),
					image : icon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : 'Matari7800',
	name : 'Matari 7800',
	company : 'Matari',
	startAmount : 0.29,
	unitsSold : 0.701,
	licencePrize : 7800,
	published : '7/1/2',
	platformRetireDate : '9/6/2',
	developmentCosts : 35000,
	genreWeightings : [0.8, 0.9, 1, 0.8, 0.9, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 2,
	iconUri : icon,
	events : [{
			id : 'a7589459-7f7c-4b54-b132-994cfc8f9c26',
			date : '7/7/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Matari announced their newest console which we name dont know. Matari only said about codename which is: Matari 3,50-B1 . Some experts are talking about 'Matari 7200' or 7500. We know that their new game console will hit shelves in {0}.".localize().format(General.getETADescription('7/7/2', '7/9/2')),
					image : icon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : '16537DF1-58F1-4S23-8854-F1A262NOO33BF',
	name : 'Matari Januar',
	company : 'Matari',
	startAmount : 0.19,
	unitsSold : 0.220,
	licencePrize : 100000,
	published : '12/2/2',
	platformRetireDate : '15/8/4',
	developmentCosts : 80000,
	genreWeightings : [0.9, 1, 0.7, 0.6, 0.8, 0.7],
	audienceWeightings : [0.7, 1, 0.9],
	techLevel : 4,
	iconUri : icon,
	events : [{
			id : '16a2c63b-921c-456c-86b8-763b86dccLEL3',
			date : '11/11/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Matari has just announced their new console called Matari Januar. Its 64-bit gaming console, while Ninvento or Venna uses 16 bit. It haves good specification, but experts think that its the last Matari`s console. It will hit shelves {0}.".localize().format(General.getETADescription('11/11/4', '12/2/2')),
					image : icon
				});
			}
		}
	]
});


//Videopac

var Cricon = './mods/SuperConsoles/source/img/Vid.png';
GDT.addPlatform({
	id : '16537DF1-58F1-4S23-HAX0R-F1A262NOO33BF',
	name : 'Crodanavox Odyssei 2',
	company : 'Crodanavox',
	startAmount : 0.12,
	unitsSold : 0.2,
	licencePrize : 1337,
	published : '1/1/1',
	platformRetireDate : '4/1/1',
	developmentCosts : 666,
	genreWeightings : [0.7, 0.9, 0.9, 0.7, 0.7, 1],
	audienceWeightings : [0.8, 1, 0.6],
	techLevel : 1,
	iconUri : Cricon,
				});



//Platforms Coden

var qicon = './mods/SuperConsoles/source/img/Coden16.png';
GDT.addPlatform({
	id : 'Coden16',
	name : 'Coden 16',
	company : 'Coden',
	startAmount : 0.39,
	unitsSold : 1.001,
	licencePrize : 75000,
	published : '5/10/2',
	platformRetireDate : '9/10/2',
	developmentCosts : 45000,
	genreWeightings : [1, 0.8, 0.9, 0.8, 0.9, 0.8],
	audienceWeightings : [0.7, 0.9, 1],
	techLevel : 3,
	iconUri : qicon,
	events : [{
			id : '92230381-51b5-452d-898c-d91c19fc0b31',
			date : '5/8/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden, small company founded by one rich man just announced their first 16-bit console. Everyone wants it, because it will be best console ever. CEO of Coden said that Coden 16 will be destined for mature gamers. Sell starts {0}.".localize().format(General.getETADescription('5/8/2', '5/10/2')),
					image : qicon
				});
			}
		}
	]
});

var aicon = './mods/SuperConsoles/source/img/Coden16x.png';
GDT.addPlatform({
	id : 'Coden16x',
	name : 'Coden 16x',
	company : 'Coden',
	startAmount : 0.37,
	unitsSold : 0.970,
	licencePrize : 95000,
	published : '7/2/1',
	platformRetireDate : '10/12/1',
	developmentCosts : 120000,
	genreWeightings : [0.9, 0.8, 0.8, 0.7, 0.9, 0.7],
	audienceWeightings : [0.6, 1, 0.9],
	techLevel : 4,
	iconUri : aicon,
	events : [{
			id : '64c3f193-6419-4c05-b8b2-064a8f48a698',
			date : '7/1/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden known for its good previous console 'Coden 16' announced new gaming console called Coden 16x. Its very similar to Coden 16, only with new and better components. Gamers dont seem to be excited like when Coden 16 was announced. It will hit shelves {0}.".localize().format(General.getETADescription('7/1/1', '7/2/1')),
					image : aicon
				});
			}
		}
	]
});

var ficon = './Game Dev Tycoon/images/platforms/superb/iPhone2.png';
GDT.addPlatform({
	id : 'Fon',
	name : 'CFon',
	company : 'Coden',
	startAmount : 2.2,
	unitsSold : 5,
	licencePrize : 450000,
	published : '22/4/4',
	platformRetireDate : '33/8/4',
	developmentCosts : 75000,
	genreWeightings : [0.6, 0.8, 0.8, 0.9, 0.8, 1],
	audienceWeightings : [1, 0.9, 0.6],
	techLevel : 5,
	iconUri : ficon,
	events : [{
			id : 'df872a6a-adfd-4b18-85c9-13ff7d870600',
			date : '22/3/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden, small company known for many small games, and their Coden 16, 16x has just announced their first smart phone. Its called the CFon. First analysis told us that CFon will be very similar to the grPhone released almost year ago. Coden said that CFon will hit the shelves {0}. ".localize().format(General.getETADescription('22/3/4', '22/4/4')),
					image : ficon
				});
			}
		}
	]
});

var pricon = './mods/SuperConsoles/source/img/Premium.png';
GDT.addPlatform({
	id : 'pFon',
	name : 'CFon Premium',
	company : 'Coden',
	startAmount : 1,
	unitsSold : 8.013,
	licencePrize : 600000,
	published : '22/12/4',
	platformRetireDate : '33/12/4',
	developmentCosts : 100000,
	genreWeightings : [0.7, 0.8, 0.8, 0.9, 0.8, 1],
	audienceWeightings : [1, 0.9, 0.6],
	techLevel : 6,
	iconUri : pricon,
	events : [{
			id : 'df872a6a-adfd-4b18-85c9-13ff7d6667600',
			date : '22/10/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden has just announced new version of CFon, called CFon Premium. It will have 2,5 GB of RAM, and the same processor as the normal CFon, just smaller. Those specification makes the CFon Premium 4th most advanced phone ever. {n} Looks like Coden is in war with Grapple, and its losing it. CFon Premium will hit the shelves {0}. ".localize().format(General.getETADescription('22/10/4', '22/12/4')),
					image : pricon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : 'p2Fon',
	name : 'CFon 2',
	company : 'Coden',
	startAmount : 0.98,
	unitsSold : 4.203,
	licencePrize : 800000,
	published : '24/10/2',
	platformRetireDate : '34/6/4',
	developmentCosts : 75000,
	genreWeightings : [0.7, 0.8, 0.7, 0.9, 0.7, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 6,
	iconUri : ficon,
	events : [{
			id : 'df872a6a-adfd-4b18-85hAX0R13ff7d6667600',
			date : '24/8/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden has just announced the CFon 2. It looks exactly like first CFon, and uses same technology as the grPhone. Every expert we ask said that Coden copied the grPhone. This wont help Coden and their financial problems. Anyway, the CFon 2 will be released {0}. ".localize().format(General.getETADescription('24/8/4', '24/10/2')),
					image : ficon
				});
			}
		}
	]
});

var airicon = './mods/SuperConsoles/source/img/Air.png';
GDT.addPlatform({
	id : 'p55Fon',
	name : 'CFon Slim',
	company : 'Coden',
	startAmount : 1.999999999999,
	unitsSold : 2.999,
	licencePrize : 950000,
	published : '26/8/1',
	platformRetireDate : '256/12/4',
	developmentCosts : 150000,
	genreWeightings : [0.7, 0.8, 0.7, 0.9, 0.7, 1],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 7,
	iconUri : airicon,
	events : [{
			id : 'df872a6a-aHAXdfd-4b18-85hAX0R13ff7d6667600',
			date : '26/6/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden announced their last platform ever. Its the CFon Slim. Its REALLY slim, its height is 110mm and width is 29,2mm! Even if it is so thin it offers 2GB of RAM and 1,9 GHz Processor, very similar as in CFon Premium. You will can buy it {0}. {n} We also want to say about Coden. They said that CFon Slim is their last platform. Its because their financial debt. No one knows isnt that just some sort of joke, but many pepole were waiting for real consoles, like the Coden 16 just optimalized for our technology. And, Coden said only about their hardware, so we think that they will still release games, and cool applications. {n} Maybe if the CFon Slim will be succes Coden will be back? We will find it out.".localize().format(General.getETADescription('26/6/1', '26/8/1')),
					image : airicon
				});
			}
		}
	]
});



var gicon = './mods/SuperConsoles/source/img/Coden24.png';
GDT.addPlatform({
	id : 'Wteff',
	name : 'Coden 24',
	company : 'Coden',
	startAmount : 0.40,
	unitsSold : 0.809,
	licencePrize : 0,
	published : '8/7/4',
	platformRetireDate : '13/10/1',
	developmentCosts : 100000,
	genreWeightings : [1, 0.6, 0.7, 0.6, 0.9, 0.9],
	audienceWeightings : [0.6, 1, 1],
	techLevel : 4,
	iconUri : gicon,
	events : [{
			id : '38b1LOL0-064b-IDC1-bcb7-d5ddb622eb68',
			date : '8/7/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden isn't happy with their last console, Coden 16x and they want to create another gaming console. Coden announced it as 'Coden 24'. It will be like Coden 16x, It even looks very similar to it, only with more power. Its another Coden's console is created for mature gamers. It will hit shelves {0}.".localize().format(General.getETADescription('8/7/1', '8/7/4')),
					image : gicon
				});
			}
		}
	]
});

var tabicon = './Game Dev Tycoon/images/platforms/superb/iPad2.png';
GDT.addPlatform({
	id : 'Noppeeee',
	name : 'CTap',
	company : 'Coden',
	startAmount : 5,
	unitsSold : 7,
	licencePrize : 400000,
	published : '22/6/2',
	platformRetireDate : '33/8/4',
	developmentCosts : 80000,
	genreWeightings : [0.8, 0.7, 0.6, 0.9, 0.9, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 5,
	iconUri : tabicon,
	events : [{
			id : 'b59c37f6-4c05-40a6-996c-c448696a0151',
			date : '22/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden has just released their CFon, and the same day announced CTap, which isn't a tablet, but a phablet. Phablets are big phones, or small tablets. CTap offers good resolution touch screen, and 1GB RAM. Its not so much, but its processor, the SDX 2.1 offers full 3 GhZ. It will hit shelves {0}.".localize().format(General.getETADescription('22/4/4', '22/6/2')),
					image : tabicon
				});
			}
		}
	]
});

var CWicon = './mods/SuperConsoles/source/img/Watch.png';
GDT.addPlatform({
	id : 'supersCmrtlol',
	name : 'CWatch',
	company : 'sTV',
	startAmount : 0.62,
	unitsSold : 1.10000002,
	licencePrize : 225000,
	published : '22/4/4',
	platformRetireDate : '28/8/4',
	developmentCosts : 100000,
	genreWeightings : [0.7, 0.7, 0.7, 0.7, 0.7, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 5,
	iconUri : CWicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nLOLedc4',
			date : '22/2/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Coden has just announced the CWatch. It looks very similar to Smart Watch. Looks like Coden is copying other platforms (like CFon-grPhone), because their own arent selling so good. {n} Back to the CWatch. Its bigger than Smart Watch, and offers 128 MB RAM. The first tests said, that CWatch is nothing compared to Smart Watch. It will hit shelves {0}. We will see how it will sell.".localize().format(General.getETADescription('22/2/4', '22/4/4')),
					image : CWicon
				});
			}
		}
	]
});


//Platforms sTV

var bicon = './mods/SuperConsoles/source/img/Flat.png';
GDT.addPlatform({
	id : 'Flat',
	name : 'FlatTV',
	company : 'sTV',
	startAmount : 0.99,
	unitsSold : 5.994,
	licencePrize : 25000,
	published : '22/3/4',
	platformRetireDate : '28/12/4',
	developmentCosts : 120000,
	genreWeightings : [0.6, 0.7, 0.7, 0.9, 0.6, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 5,
	iconUri : bicon,
	events : [{
			id : 'a080cf6c-ad80-4937-b1b6-f10ecd61d096',
			date : '22/1/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "sTV known for futuristic TVs has just announced their first platform ever. Its a TV with move detector, its more advanced than mBox`s Konnect and PlaySystem`s camera. There is 1 minus - development its hard, especially debugging process. It will hit the shelves {0}.".localize().format(General.getETADescription('22/1/4', '22/3/4')),
					image : bicon
				});
			}
		}
	]
});

var smrticon = './mods/SuperConsoles/source/img/Watch.png';
GDT.addPlatform({
	id : 'smrtlol',
	name : 'Smart Watch',
	company : 'sTV',
	startAmount : 1.5,
	unitsSold : 3,
	licencePrize : 200000,
	published : '22/6/4',
	platformRetireDate : '30/4/4',
	developmentCosts : 120000,
	genreWeightings : [0.6, 0.6, 0.6, 0.7, 0.7, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 5,
	iconUri : smrticon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9e696edc4',
			date : '22/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "sTV has released its well known platform, smartTV, and now they announced Smart Watch. It will be watch-sized flat touch screen. Its first device like that, it seems like sTV wants to make our life easier. {n} Back to the Smart Watch, it offers very good touch screen and 256MB of RAM, and the Outtel i1. The biggest surprise is with the 1GB build-in memory. It will hit shelves {0}.".localize().format(General.getETADescription('22/4/4', '22/6/4')),
					image : smrticon
				});
			}
		}
	]
});

var smrtsicon = './mods/SuperConsoles/source/img/2Watch.png';
GDT.addPlatform({
	id : 'supersmrtlol',
	name : 'Smart Watch 2',
	company : 'sTV',
	startAmount : 2,
	unitsSold : 3.1,
	licencePrize : 275000,
	published : '23/4/4',
	platformRetireDate : '31/8/4',
	developmentCosts : 130000,
	genreWeightings : [0.6, 0.6, 0.6, 0.8, 0.7, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 6,
	iconUri : smrtsicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nopeedc4',
			date : '23/2/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "sTV well known for their futuristic TVs, and Smart Watch, has just announced The Smart Watch 2. It offers 1GB of RAM and the newest Snapdragon, Snapdragon Q4000. Its very small processor with 1,7 GhZ. Smart Watch 2 is slightly bigger, and heavier, but its specification is very good in this scale. {n} Even when Smart Watch 2 will be released the old one will be in sale. Smart Watch 2 will be released {0}.".localize().format(General.getETADescription('23/2/4', '23/4/4')),
					image : smrtsicon
				});
			}
		}
	]
});

var glicon = './mods/SuperConsoles/source/img/Glass.png';
GDT.addPlatform({
	id : 'THE ID',
	name : 'Smart Glasses',
	company : 'sTV',
	startAmount : 3,
	unitsSold : 3.1,
	licencePrize : 300000,
	published : '24/6/4',
	platformRetireDate : '33/6/4',
	developmentCosts : 175000,
	genreWeightings : [0.6, 0.6, 0.6, 0.9, 0.6, 1],
	audienceWeightings : [0.8, 1, 0.6],
	techLevel : 6,
	iconUri : glicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nohueheuheueheuc4',
			date : '24/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "sTV, the leader of small platforms has just announced their another platform. Its called Smart Glasses. They Are glasses on one eye with modified Humanoid. Its operated by voice. Smart Glasses arent platform for games, only for applications. It looks promising. They will hit the shelves {0}.".localize().format(General.getETADescription('24/4/4', '24/6/4')),
					image : glicon
				});
			}
		}
	]
});

var holicon = './mods/SuperConsoles/source/img/Holo.png';
GDT.addPlatform({
	id : 'haxoristhebest33',
	name : 'Smart Holo',
	company : 'sTV',
	startAmount : 3.2,
	unitsSold : 4,
	licencePrize : 120000,
	published : '31/6/4',
	platformRetireDate : '265/12/4',
	developmentCosts : 1000000,
	genreWeightings : [0.6, 1, 0.9, 0.8, 0.8, 1],
	audienceWeightings : [0.8, 1, 0.8],
	techLevel : 7,
	iconUri : holicon,
	events : [{
			id : '9d36daHEXEVERYWHEReuheuehuc4',
			date : '31/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "sTV Known for their Smart Glasses has just announced their newest platform called Smart Holo. We know only its design. And, thats all that sTV announced to us. We can expect it {0}.".localize().format(General.getETADescription('31/4/4', '31/6/4')),
					image : holicon
				});
			}
		}
	]
});


//Micronoft

var boxicon = './mods/SuperConsoles/source/img/Zal.png';
GDT.addPlatform({
id : 'Haxorthebestintheworld',
name : 'mBox Micro',
company : 'Micronoft',
startAmount : 1,
unitsSold : 2,
licencePrize : 100000,
published : '21/1/4',
platformRetireDate : '25/1/4',
developmentCosts : 300000,
genreWeightings : [0.8, 1, 0.8, 0.7, 0.8, 1],
audienceWeightings : [0.8, 1, 0.7],
techLevel : 5, 
iconUri : boxicon,
events : [{
			id : 'f5ff9a10HAX0000r4b1a-8183-505fc8bc1ea7',
			date : '20/12/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Micronoft known mostly for mBox and Vindovs OS has just announced their new console. Its called mBox Micro, and as the name says its small, portable console. The design looks VERY blocky, but the mBox Micro is most powerful handheld console to ever hit the market`s shelves. {n} It offers 1,25 GB of RAM and about 1 GHz Outtels processor. The mBox Micro will hit shelves {0}.".localize().format(General.getETADescription('20/12/1', '21/1/4')),
					image : boxicon
				});
			}
		}
	]
});

//VENA

var masicon = './mods/SuperConsoles/source/img/Master.png';
GDT.addPlatform({
	id : 'supermegaidbyhaxohehr',
	name : 'Master X',
	company : 'Vena',
	startAmount : 0.6,
	unitsSold : 1.2,
	licencePrize : 75000,
	published : '20/6/4',
	platformRetireDate : '23/6/4',
	developmentCosts : 175000,
	genreWeightings : [0.9, 1, 1, 0.7, 0.8, 0.8],
	audienceWeightings : [0.8, 1, 0.6],
	techLevel : 5,
	iconUri : masicon,
	events : [{
			id : 'DERPYROCKShaxs11',
			date : '20/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "The Vena is back! They called their newest console, the Master X, because their first console was called Master V. Some pepole thinks thats because this is last Venas platform. But, back to Master X its small black box, like from 10 years ago. But, it offers excatly same specification as Playsystem 3. It will hit shelves {0}.".localize().format(General.getETADescription('20/4/4', '20/6/4')),
					image : masicon
				});
			}
		}
	]
});


var smasicon = './mods/SuperConsoles/source/img/Des.png';
GDT.addPlatform({
	id : 'supemehaIdbyHAX0r00r',
	name : 'Vena D3stroy3r',
	company : 'Vena',
	startAmount : 2.4,
	unitsSold : 3,
	licencePrize : 1750000,
	published : '30/2/4',
	platformRetireDate : '256/12/4',
	developmentCosts : 500000,
	genreWeightings : [1, 0.8, 0.7, 0.6, 0.9, 0.7],
	audienceWeightings : [0.6, 1, 1],
	techLevel : 7,
	iconUri : smasicon,
	events : [{
			id : 'Dlolhaxorisder12xs11',
			date : '30/2/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "It Is True! There Will Be A New Console by Vena! It Is called Vena D3stroy3r, the name suggested by fans. The Design Is Today-ish. It is not VERY overpowered, it is a bit better than Playsystem 5. Those are only informations we have from Vena, we dont even know the date it will published, but we think that it will be published {0}.".localize().format(General.getETADescription('30/2/2', '30/2/4')),
					image : smasicon
				});
			}
		}
	]
});

// Platforms Govodore 

var cicon = './mods/SuperConsoles/source/img/G.png';
GDT.addPlatform({
	id : 'GCDTV',
	name : 'Govodore CDTV',
	company : 'Govodore',
	startAmount : 0.45,
	unitsSold : 0.8,
	licencePrize : 25000,
	published : '7/5/2',
	platformRetireDate : '10/12/2',
	developmentCosts : 37000,
	genreWeightings : [0.7, 0.9, 0.9, 1, 1, 0.8],
	audienceWeightings : [0.8, 1, 0.7],
	techLevel : 3,
	iconUri : cicon,
	events : [{
			id : 'f5ff9a10-666d-4b1a-8183-505fc8bc1ea7',
			date : '7/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Govodore announced new personal handheld called Govodore CDTV. But, Govodore Business Machines (GBM) was bankrupt, so CDTV is distributed by Govodore International. Anyway, their new console will be competing with Matari. Govodore said that there is no way to CDTV lose with Matari 7800. {n} Govodore CDTV will hit market`s shelves {0}.".localize().format(General.getETADescription('7/4/4', '7/5/2')),
					image : cicon
				});
			}
		}
	]
});

// Platforms Ninvento

var dicon = './mods/SuperConsoles/source/img/Rainbow.png';
GDT.addPlatform({
	id : 'Rainbow',
	name : 'Gameling Rainbow',
	company : 'Ninvento',
	startAmount : 0.74,
	unitsSold : 2.912,
	licencePrize : 95000,
	published : '13/4/4',
	platformRetireDate : '19/4/4',
	developmentCosts : 40000,
	genreWeightings : [0.7, 0.9, 1, 0.6, 0.8, 0.9],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 4,
	iconUri : dicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9e406edc4',
			date : '13/2/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Everyone remembers cult Gameling. Now Ninvento announced its new version: Gameling Rainbow. It will have colour screen, and almost 4x better components. Many game companies said that they will make games for it. It will hit shelves {0}. Will it be better than original Gameling?".localize().format(General.getETADescription('13/2/4', '13/4/4')),
					image : dicon
				});
			}
		}
	]
});

var elicon = './mods/SuperConsoles/source/img/Elite.png';
GDT.addPlatform({
	id : 'Hax0r666133',
	name : 'Gameling Elite',
	company : 'Ninvento',
	startAmount : 2,
	unitsSold : 3.8,
	licencePrize : 125000,
	published : '19/4/4',
	platformRetireDate : '25/8/4',
	developmentCosts : 75000,
	genreWeightings : [0.7, 0.9, 1, 0.6, 0.8, 0.9],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 5,
	iconUri : elicon,
	events : [{
			id : '9d36da57-fcf3-45c466603-7fa9e406edc4',
			date : '19/2/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Ninvento Known for its console TES has just announced new generation of Gameling called Gameling Elite. Its bigger than normal and rainbow, but offers more to-date components. It have backwards compatibility with other Gamelings. Its last version of Gameling. Ninvento only said about other version of Gameling Elite, which will hit shelves {0}.".localize().format(General.getETADescription('19/2/4', '19/4/4')),
					image : elicon
				});
			}
		}
	]
});

var boiicon = './mods/SuperConsoles/source/img/Boy.png';
GDT.addPlatform({
	id : 'Hax0r666133haxfaxv',
	name : 'Visual Ling',
	company : 'Ninvento',
	startAmount : 0.2,
	unitsSold : 0.7,
	licencePrize : 125000,
	published : '13/12/2',
	platformRetireDate : '15/6/4',
	developmentCosts : 75000,
	genreWeightings : [0.7, 0.7, 0.7, 1, 0.6, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 2,
	iconUri : boiicon,
	events : [{
			id : '9d36da57-fcf3-45cHAX6603-7fa9e406edc4',
			date : '13/10/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Ninvento has just announced their new console called Visual Ling. Its first console to use REAl 3D. But, Visual Ling isnt perfect. There are only red colors, the Visual Ling which You need to have on Your head is heave, and after 15 mins of gameplay head starts to hurt. We dont think, even when Visual Ling is step forward, it will be a succes. Anyway, its coming to shops {0}.".localize().format(General.getETADescription('13/10/4', '13/12/2')),
					image : boiicon
				});
			}
		}
	]
});

//Smoke Boxes

var smoicon = './mods/SuperConsoles/source/img/Box.png';
GDT.addPlatform({
	id : 'haxorrockzmuhhaha',
	name : 'SmokeCube V1',
	company : 'Nelve',
	startAmount : 1,
	unitsSold : 3.5,
	licencePrize : 100000,
	published : '23/2/1',
	platformRetireDate : '30/8/4',
	developmentCosts : 150000,
	genreWeightings : [1, 0.7, 0.8, 0.6, 0.8, 0.7],
	audienceWeightings : [0.7, 1, 0.9],
	techLevel : 5,
	iconUri : smoicon,
	events : [{
			id : 'HAXHAChaxc05-40a6-996c-c448126a0151',
			date : '23/1/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Company called Nelve announced their console line called SmokeCube months ago, but today they officaly announced first version of SmokeCube. It haves 8GB of RAM and Outtel i5, and this is making it little better than normal PCs. The SmokeCube will work on GridOS, which is for free, but there are not so many games for it right now. The SmokeCube is going to hit shelves {0}. ".localize().format(General.getETADescription('23/1/1', '23/2/1')),
					image : smoicon
				});
			}
		}
	]
});

var smo2icon = './mods/SuperConsoles/source/img/Box2.png';
GDT.addPlatform({
	id : 'SuperBestLol123',
	name : 'SmokeCube V2',
	company : 'Nelve',
	startAmount : 1.1,
	unitsSold : 3.52,
	licencePrize : 120000,
	published : '25/6/1',
	platformRetireDate : '32/10/4',
	developmentCosts : 175000,
	genreWeightings : [1, 0.8, 0.8, 0.6, 0.8, 0.9],
	audienceWeightings : [0.7, 1, 0.9],
	techLevel : 6,
	iconUri : smo2icon,
	events : [{
			id : 'HaxprSuperConsolesSMBox',
			date : '25/4/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Nelve Has Just Announced Second version of their SmokeCube. It Is now white, and ofcourse haves better specifications. Now it is 10 GB of RAM, but the processor is the same, just smaller and it is clocked at 3,2 GHz. It uses GridOS, but it is now way more advanced, and better looking. {n} SmokeCube V2 Looks Promising, and will hit the shelves {0}. ".localize().format(General.getETADescription('25/4/1', '25/6/1')),
					image : smo2icon
				});
			}
		}
	]
});

//Mana

var maicon = './mods/SuperConsoles/source/img/Mana.png';
GDT.addPlatform({
	id : '16537DF1-58F1-4S23-8854-F1A26deepr933BF',
	name : 'Mana',
	company : 'MP',
	startAmount : 0.5,
	unitsSold : 0.99999,
	licencePrize : 75000,
	published : '19/2/2',
	platformRetireDate : '24/2/2',
	developmentCosts : 200000,
	genreWeightings : [0.6, 1, 1, 0.9, 0.8, 0.8],
	audienceWeightings : [1, 0.9, 0.6],
	techLevel : 4,
	iconUri : maicon,
	events : [{
			id : 'haxhaxhaxhaxhax',
			date : '18/12/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "MP, company mostly known for its handhelds and printers has just announced their first console called Mana. Its more destined for young players. Its a little underpowered, but MP said that there will be many games for their newest platform, which will hit shelves {0}.".localize().format(General.getETADescription('18/12/2', '19/2/2')),
					image : maicon
				});
			}
		}
	]
});

var staicon = './mods/SuperConsoles/source/img/Sta.png';
GDT.addPlatform({
	id : '1653HAXOR-rockz-8854-F1ATlolepr933BF',
	name : 'Stamina',
	company : 'MP',
	startAmount : 0.3,
	unitsSold : 0.9,
	licencePrize : 100000,
	published : '20/4/2',
	platformRetireDate : '25/2/2',
	developmentCosts : 250000,
	genreWeightings : [0.7, 1, 1, 0.6, 0.7, 1],
	audienceWeightings : [1, 1, 0.6],
	techLevel : 4,
	iconUri : staicon,
	events : [{
			id : 'halolhaxoerax',
			date : '20/2/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "MP Has just announced their second platform, called Stamina. Thats big controller which can be pinned to PC. So, Stamina is All In One console. Its a bit underpowered, and VERY blocky. Pepole comment it as 'Heavy Block Of .... For Little Kids.'. This hate can relly affect sales, but we will see. Stamina will hit shelves {0}.".localize().format(General.getETADescription('20/2/2', '20/4/2')),
					image : staicon
				});
			}
		}
	]
});

//Platforms Other


var eicon = './mods/SuperConsoles/source/img/Notebook.png';
GDT.addPlatform({
	id : 'Note',
	name : 'Notebooks',
	company : 'many companies',
	startAmount : 0.37,
	unitsSold : 8.312,
	marketKeyPoints : [{date: "20/8/1",amount: 1.096}, {date: "25/10/4",amount: 3.878}, {date: "32/9/3",amount: 9.002}],
	licencePrize : 15000,
	published : '19/8/1',
	platformRetireDate : '265/12/4',
	developmentCosts : 10000,
	genreWeightings : [0.8, 0.7, 0.8, 0.9, 1, 0.9],
	audienceWeightings : [0.8, 1, 0.7],
	techLevel : 5,
	iconUri : eicon,
	events : [{
			id : 'b59c37f6-4c05-40a6-996c-c448126a0151',
			date : '19/7/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Some gamers are talking about PCs that they are so big and too heavy. Mobile market is expanding so many big corporations said that they will make a GAMING notebooks. Small PCs like laptops and notebooks were on market almost from the beginning. But they were just small, but slow. Now we are in miniaturisation era, so we can make good CPUs small. {n} The gaming notebooks boom will start {0}. ".localize().format(General.getETADescription('19/7/1', '19/8/1')),
					image : eicon
				});
			}
		}
	]
});

var wicon = './mods/SuperConsoles/source/img/Web.png';
GDT.addPlatform({
	id : 'Nope',
	name : 'Internet',
	company : 'many companies',
	startAmount : 0.24,
	unitsSold : 5.992,
	licencePrize : 0,
	published : '11/2/1',
	platformRetireDate : '256/12/4',
	developmentCosts : 250,
	genreWeightings : [0.9, 0.8, 0.6, 0.7, 0.8, 1],
	audienceWeightings : [1, 1, 0.7],
	techLevel : 5,
	iconUri : wicon,
	events : [{
			id : 'bLLA37f6-4c05-40a6-996c-c448126a0151',
			date : '10/12/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "The Popularity of internet is high now. We could use it to make our games on it. We will research an optimal way, it will end {0}. ".localize().format(General.getETADescription('10/12/1', '11/2/1')),
					image : wicon
				});
			}
		}
	]
});

var viticon = './mods/SuperConsoles/source/img/PPV.png';
GDT.addPlatform({
	id : 'Noppe',
	name : 'PPV',
	company : 'Vonny',
	startAmount : 0.45,
	unitsSold : 8.010,
	licencePrize : 400000,
	published : '19/10/2',
	platformRetireDate : '256/12/4',
	developmentCosts : 100000,
	genreWeightings : [0.9, 1, 0.6, 0.7, 0.8, 1],
	audienceWeightings : [0.8, 1, 0.9],
	techLevel : 5,
	iconUri : viticon,
	events : [{
			id : 'b59c37f6-4c05-40a6-996c-c448666a0151',
			date : '19/8/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Vonny has just announced their second portable game console called the PlaysystemPortable-Viva. No one will call the PPV (in short) like that. The PPV will be most advanced portable console ever. {n} It offers touch screen, 512 MB of RAM, and graphic card called SGX543MP6-. It will hit the shelves {0}.".localize().format(General.getETADescription('19/8/2', '19/10/2')),
					image : viticon
				});
			}
		}
	]
});

//Platforms Elver

var hicon = './mods/SuperConsoles/source/img/Elver.png';
GDT.addPlatform({
	id : 'Wtf',
	name : 'Elver',
	company : 'one man',
	startAmount : 0.003,
	unitsSold : 0.010,
	licencePrize : 0,
	published : '2/3/4',
	platformRetireDate : '2/6/1',
	developmentCosts : 5000,
	genreWeightings : [1, 1, 1, 1, 1, 1],
	audienceWeightings : [1, 1, 1],
	techLevel : 1,
	iconUri : hicon,
	events : [{
			id : '38b172d0-064b-4e80-bcb7-d5ddb622eb68',
			date : '2/3/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Someone on web has just announced his first console called Elver. We know only that it will be cheap. Everyone is surprised with that. You can buy it {0}.".localize().format(General.getETADescription('2/3/2', '2/3/4')),
					image : hicon
				});
			}
		}
	]
});

//Microcorp

var mionicon = './mods/SuperConsoles/source/img/Micro1.png';
GDT.addPlatform({
	id : 'Wt123424f',
	name : 'Micro Box',
	company : 'Microcorp',
	startAmount : 0.105,
	unitsSold : 0.999,
	licencePrize : 175000,
	published : '8/1/4',
	platformRetireDate : '10/11/4',
	developmentCosts : 60000,
	genreWeightings : [0.8, 0.7, 1, 0.8, 0.9, 0.9],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 3,
	iconUri : mionicon,
	events : [{
			id : '38b172d0-064b-4e80-6667-d5ddb622eb68',
			date : '7/11/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "New company called Microcorp has announced their first game console called Micro Box. Its very small white cube, and uses the Mega Cartridges. We dont know anything more, except that it will hit shelves {0}.".localize().format(General.getETADescription('7/11/4', '8/1/4')),
					image : mionicon
				});
			}
		}
	]
});

var miicon = './mods/SuperConsoles/source/img/Micro.png'

GDT.addPlatform({
	id : 'Wt123424flol',
	name : 'Micro Box 3D',
	company : 'Microcorp',
	startAmount : 0.399,
	unitsSold : 1.186,
	licencePrize : 180000,
	published : '10/12/4',
	platformRetireDate : '12/12/4',
	developmentCosts : 80000,
	genreWeightings : [0.8, 0.7, 1, 0.8, 0.9, 0.9],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 4,
	iconUri : miicon,
	events : [{
			id : '38b172d0-064b-4e80-6667-d5ddb62LELb68',
			date : '10/11/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Microcorp has just retired their Micro Box and announced new console called Micro Box 3D. As the name says it offers 3D graphic and 24-bit processor, which is little weird. Anyway, it will hit shleves {0}.".localize().format(General.getETADescription('10/11/4', '10/12/4')),
					image : miicon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : 'Wt123424flolHax0r',
	name : 'Micro Box Portable',
	company : 'Microcorp',
	startAmount : 0.7,
	unitsSold : 1.3,
	licencePrize : 200000,
	published : '11/2/2',
	platformRetireDate : '15/2/1',
	developmentCosts : 92500,
	genreWeightings : [0.7, 0.9, 1, 0.7, 0.6, 1],
	audienceWeightings : [1, 0.9, 0.6],
	techLevel : 3,
	iconUri : miicon,
	events : [{
			id : '38b172d0-064b-4e80-6667-HAX00000000RROX',
			date : '11/1/2',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Microcorp has just announced new PORTABLE game console called Micro Box Portable. It looks very futuristic, but the specification looks more like new Gameling. It is 762MB of RAM and 10 MHz processor. Its screen offers 16-bit colours. The Micro Box Portable (MP in short) will hit the shelves {0}. {n} And we have small news about Microcorp, they found an rich investor, and their consoles are selling well. So, we should see more consoles and games from Microcorp.".localize().format(General.getETADescription('11/1/2', '11/2/2')),
					image : miicon
				});
			}
		}
	]
});


GDT.addPlatform({
	id : 'Wt123424flolHax0rrokz11',
	name : 'Micro Box Extreme',
	company : 'Microcorp',
	startAmount : 0.72,
	unitsSold : 1.1,
	licencePrize : 200000,
	published : '15/2/1',
	platformRetireDate : '25/2/1',
	developmentCosts : 100000,
	genreWeightings : [1, 1, 0.8, 0.6, 0.7, 0.7],
	audienceWeightings : [0.7, 1, 0.9],
	techLevel : 5,
	iconUri : miicon,
	events : [{
			id : '38b172d0-HAX1b-4e80-6667-HAX00000000RROX',
			date : '14/12/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Microcorp announced new console called Micro Box Extreme. As the name says this console will be EXTREME in the components power meaning. Thats true, because it offers 64-bit Monorola 0DX-22.1, with 1GHz and 1 GB RAM. Microcorp said, that the Micro Box Extreme is destined for mature gamers. It will hit shelves {0}.".localize().format(General.getETADescription('14/12/1', '15/2/1')),
					image : miicon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : 'Wt123424fhaxlolh11',
	name : 'Micro Box Slim',
	company : 'Microcorp',
	startAmount : 1,
	unitsSold : 2.3,
	licencePrize : 200000,
	published : '19/4/1',
	platformRetireDate : '24/4/1',
	developmentCosts : 950000,
	genreWeightings : [0.8, 1, 0.9, 0.7, 0.7, 1],
	audienceWeightings : [0.8, 1, 0.7],
	techLevel : 4,
	iconUri : miicon,
	events : [{
			id : '38b172d0-HAX1b-4e80-6667-HASUPERHAX0X',
			date : '19/2/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Microcorp has just announced their new, long waited console called Micro Box Slim. Its just cheap Micro Box, which will hit shelves {0}.".localize().format(General.getETADescription('19/2/1', '19/4/1')),
					image : miicon
				});
			}
		}
	]
});

GDT.addPlatform({
	id : 'WtHunxerlolwtf1',
	name : 'Micro Box Hardcore',
	company : 'Microcorp',
	startAmount : 0.9,
	unitsSold : 1.6,
	licencePrize : 225000,
	published : '24/6/1',
	platformRetireDate : '30/2/1',
	developmentCosts : 1000000,
	genreWeightings : [1, 0.7, 0.8, 0.6, 0.9, 0.7],
	audienceWeightings : [0.7, 1, 0.9],
	techLevel : 5,
	iconUri : miicon,
	events : [{
			id : 'DerpHaxLolHaxer',
			date : '24/4/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Microcorp has just retired thier MicroBox Slim, and now announced the MicroBox Hardcore. It's most advanced console from Microcorp, and first one destined for older gamers. It offers about 256 MB of RAM. It will hit shelves	 {0}.".localize().format(General.getETADescription('24/4/1', '24/6/1')),
					image : miicon
				});
			}
		}
	]
});



//Smiths

var vicon = './mods/SuperConsoles/source/img/Vex.png';
GDT.addPlatform({
	id : 'THE ID21',
	name : 'Vextrec',
	company : 'Smiths',
	startAmount : 0.35,
	unitsSold : 0.570,
	licencePrize : 17500,
	published : '2/7/4',
	platformRetireDate : '4/7/4',
	developmentCosts : 15000,
	genreWeightings : [0.8, 0.9, 0.7, 0.6, 0.9, 0.7],
	audienceWeightings : [0.7, 1, 0.6],
	techLevel : 1,
	iconUri : vicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nohuNEOeuheueheuc4',
			date : '2/6/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Company called Smiths has just announced new game console called Vextrec. The Vextrec is a vector display-based video game console which 1,5 MHz processor and 1 KB of RAM. It looks like little, rectangle TV with small joystick. It will hit shleves {0}.".localize().format(General.getETADescription('2/6/4', '2/7/4')),
					image : vicon
				});
			}
		}
	]
});

//SNX

var Neicon = './mods/SuperConsoles/source/img/Noe.png';
GDT.addPlatform({
	id : 'THE ID212',
	name : 'Noe Goe',
	company : 'SNX',
	startAmount : 0.31,
	unitsSold : 0.599,
	licencePrize : 40000,
	published : '9/6/4',
	platformRetireDate : '13/4/2',
	developmentCosts : 35000,
	genreWeightings : [0.9, 1, 0.7, 0.6, 0.7, 0.6],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 2,
	iconUri : Neicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nohuNEOGOEeuheueheuc',
			date : '9/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Company called SNX announced video game console called Noe Goe. It offers color 2D graphic 12 MHz Monorola`s processor. It will hit shelves {0}.".localize().format(General.getETADescription('9/4/4', '9/6/4')),
					image : Neicon
				});
			}
		}
	]
});

//NIC

var Gfxicon = './mods/SuperConsoles/source/img/Noe.png';
GDT.addPlatform({
	id : 'THE ID21223',
	name : 'MegaGraphz-16',
	company : 'NIC',
	startAmount : 0.31,
	unitsSold : 0.599,
	licencePrize : 40000,
	published : '8/6/4',
	platformRetireDate : '10/4/2',
	developmentCosts : 35000,
	genreWeightings : [0.9, 0.7, 0.9, 0.6, 0.8, 0.8],
	audienceWeightings : [0.8, 1, 0.8],
	techLevel : 3,
	iconUri : Gfxicon,
	events : [{
			id : '9d36da57-fcf3-45c4-8f03-7fa9nohuNEGFXEeuheueheuc',
			date : '8/4/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Small company called NIC has just announced the MegaGraphz-16. Its 16 bit console with 8 - 64 KB RAM. Its pretty small dark video console. It will hit shelves {0}.".localize().format(General.getETADescription('8/4/4', '8/6/4')),
					image : Gfxicon
				});
			}
		}
	]
});


//MBox

var Inficon = './mods/SuperConsoles/source/img/Inf.png';
GDT.addPlatform({
	id : 'DATBELONGSTOHAX0R',
	name : 'mBox Infinity',
	company : 'Micronoft',
	startAmount : 2,
	unitsSold : 3.7,
	licencePrize : 1250000,
	published : '27/11/4',
	platformRetireDate : '265/12/4',
	developmentCosts : 175000,
	genreWeightings : [0.8, 0.8, 0.9, 0.8, 0.9, 0.9],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 7,
	iconUri : Inficon,
	events : [{
			id : '9d36da57-INFf3-45c4-8f03-7fa9nohuNEGFXEeuheueheuc',
			date : '27/9/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "One Week ago Micronoft released their clever mBox Next. Now They announced the mBox Infinity, the cheaper version of mBox Next. Its not so big at it looks like, but definitely bigger. Gamers liked the mBox One, and mBox Next`s Konnects, but Infinity`s Konnect will be build-in low quality move detector. But, Infinity is 120$ cheaper than mBox Next. It will hit shelves {0}.".localize().format(General.getETADescription('27/9/4', '27/11/4')),
					image : Inficon
				});
			}
		}
	]
});


//VGAGE

var gagicon = './mods/SuperConsoles/source/img/Gage.png';
GDT.addPlatform({
	id : 'DATBELONGSAX0Rwhickz',
	name : 'Nonia VGage',
	company : 'Nonia',
	startAmount : 0.2,
	unitsSold : 0.4,
	licencePrize : 75000,
	published : '20/11/4',
	platformRetireDate : '22/1/4',
	developmentCosts : 175000,
	genreWeightings : [0.7, 1, 0.9, 0.6, 0.6, 1],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 3,
	iconUri : gagicon,
	events : [{
			id : '9d36da57-INFfhaxhaxhaxhahxhac',
			date : '20/9/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Nonia, known phone manufacturer has announced their platform called VGage. Its phone and handheld console in one. It doesnt offer good components, and if You want to use it to talk, You need to do it in weird position. We dont really know anything more, except that, that it will hit shelves {0}.".localize().format(General.getETADescription('20/9/4', '20/11/4')),
					image : gagicon
				});
			}
		}
	]
});


//GHG

var ghgicon = './mods/SuperConsoles/source/img/GHG.png';
GDT.addPlatform({
	id : 'DADeprlolhaxorez',
	name : 'Jupiter',
	company : 'GreenheartGames',
	startAmount : 0.2,
	unitsSold : 0.4,
	licencePrize : 20000,
	published : '2/10/4',
	platformRetireDate : '4/10/4',
	developmentCosts : 30000,
	genreWeightings : [0.7, 1, 1, 0.8, 0.8, 1],
	audienceWeightings : [1, 1, 0.6],
	techLevel : 1,
	iconUri : ghgicon,
	events : [{
			id : '9dHaxorisntsupidxhaxhahxhac',
			date : '2/9/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "GreenheartGames, the company known for its small, very profitable games has just announced their first platform. It is called Jupiter. It has specification like TES, but Jupiter is smaller, and way lighter. However, there are some things which aren't better. Only one player at once can play games on Jupiter, and the cartridges port is at the side, so the cartridges are just standing out of the box. {n} The Jupiter (Which full name is Jupiter The Box.) will hit shelves {0}.".localize().format(General.getETADescription('2/9/4', '2/10/4')),
					image : ghgicon
				});
			}
		}
	]
});

var ghg2icon = './mods/SuperConsoles/source/img/GHG2.png';
GDT.addPlatform({
	id : '123-Hax-123-SupCon',
	name : 'Apollo',
	company : 'GreenheartGames',
	startAmount : 0.4,
	unitsSold : 0.91,
	licencePrize : 27500,
	published : '5/12/4',
	platformRetireDate : '8/10/4',
	developmentCosts : 42000,
	genreWeightings : [0.6, 0.9, 1, 0.7, 0.9, 0.9],
	audienceWeightings : [0.9, 1, 0.6],
	techLevel : 1,
	iconUri : ghg2icon,
	events : [{
			id : '111-Hax-111-Event',
			date : '5/10/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Company GreenheartGames has just announced their second console called Apollo. It is a thin rectangle, and it seems to do everything like Jupiter, but better. With that also comes the better specification, and Apollo is destined ONLY for best games for Jupiter. It will hit shelves {0}.".localize().format(General.getETADescription('5/10/4', '5/12/4')),
					image : ghg2icon
				});
			}
		}
	]
});

//HyperScan

var hypicon = './mods/SuperConsoles/source/img/Hyper.png';
GDT.addPlatform({
	id : 'HyperScan1haxor',
	name : 'MegaSkan',
	company : 'Hottel',
	startAmount : 0.31,
	unitsSold : 0.7482,
	licencePrize : 75000,
	published : '22/5/1',
	platformRetireDate : '23/6/4',
	developmentCosts : 100000,
	genreWeightings : [0.7, 0.9, 1, 0.7, 0.7, 0.9],
	audienceWeightings : [0.9, 1, 0.7],
	techLevel : 3,
	iconUri : hypicon,
	events : [{
			id : 'HAXHAChaxchunxeven26a0151',
			date : '22/3/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Hottel, Manufacturer of toys, has just announced their second console. Its called MegaSkan, because it uses RFID to scan CDs in UDF format. Its really underpowered, but cheap. It looks like bad quality console for kids. It will hit shelves {0}.".localize().format(General.getETADescription('22/3/1', '22/5/1')),
					image : hypicon
				});
			}
		}
	]
});

//Zeebo

var zebicon = './mods/SuperConsoles/source/img/Zeb.png';
GDT.addPlatform({
	id : 'Zeebo1haxor',
	name : 'Neeboz',
	company : 'Company With Same Name As Its Consoles',
	startAmount : 0.42,
	unitsSold : 0.91,
	licencePrize : 80000,
	published : '27/2/1',
	platformRetireDate : '32/6/4',
	developmentCosts : 120000,
	genreWeightings : [0.6, 0.9, 0.9, 0.8, 0.7, 1],
	audienceWeightings : [1, 0.9, 0.6],
	techLevel : 5,
	iconUri : zebicon,
	events : [{
			id : 'HAXORmodSCmod-c448126a0151',
			date : '26/12/1',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "Neeboz has just announced their platform, called also Neeboz. Its more small console for teens, than an alternative for mBox or PlaySystem. We don't know much more, except that it will hit shelves in {0}. ".localize().format(General.getETADescription('26/12/1', '27/2/1')),
					image : zebicon
				});
			}
		}
	]
});

//dono

var donicon = './mods/SuperConsoles/source/img/Dono.png';
GDT.addPlatform({
	id : 'DONO2HAXXX',
	name : 'DONO',
	company : 'Mad Dogz',
	startAmount : 0.2,
	unitsSold : 1,
	licencePrize : 75000,
	published : '26/8/2',
	platformRetireDate : '256/12/4',
	developmentCosts : 100000,
	genreWeightings : [0.9, 0.7, 0.9, 0.6, 0.9, 1],
	audienceWeightings : [0.7, 1, 0.8],
	techLevel : 5,
	iconUri : donicon,
	events : [{
			id : 'DONOMADDOGZSCMOD123',
			date : '26/7/4',
			getNotification : function (company) {
				return new Notification({
					header : "Industry News".localize(),
					text : "We saw DONO on G3, but Mad Dogz only said about its name. Now they showed the design and features. Mad Dogz also said that DONO will run on Hard-droid system, used in smartphones. It will connect directly with Dongle Store, that means the DONO is un-portable phone. It will hit shelves {0}. ".localize().format(General.getETADescription('26/7/4', '26/8/2')),
					image : donicon
				});
			}
		}
	]
});

//arcade

var arcicon = './mods/SuperConsoles/source/img/Arc.png';
GDT.addPlatform({
	id : 'ARCADESUXNOIdeosntlolHaxorderp',
	name : 'Arcade',
	company : 'by some companies',
	startAmount : 0.3,
	unitsSold : 1,
	licencePrize : 0,
	published : '1/1/1',
	platformRetireDate : '12/8/4',
	developmentCosts : 25000,
	genreWeightings : [0.9, 0.9, 0.8, 0.9, 0.7, 1],
	audienceWeightings : [0.8, 1, 0.6],
	techLevel : 1,
	iconUri : arcicon,
	});

//Topics 



GDT.addTopics([
	{ 
		id: "Crime", 
		name: "Crime".localize("game topic"), 
		genreWeightings: [1, 0.7, 0.8, 0.6, 0.8, 0.6], 
		audienceWeightings: [0.6, 0.9, 1] 
	}
]);
 
GDT.addTopics([
	{ 
		id: "Theft", 
		name: "Theft".localize("game topic"), 
		genreWeightings: [1, 0.7, 0.8, 0.6, 0.8, 0.6], 
		audienceWeightings: [0.6, 1, 0.9] 
	}
]);

GDT.addTopics([
	{ 
		id: "Theftnosnad", 
		name: "Sandbox".localize("game topic"), 
		genreWeightings: [0.9, 0.6, 0.7, 0.9, 0.7, 1], 
		audienceWeightings: [0.8, 1, 0.7] 
	}
]);

GDT.addTopics([
	{ 
		id: "Platformer", 
		name: "Platformer".localize("game topic"), 
		genreWeightings: [0.9, 1, 0.8, 0.6, 0.6, 0.7], 
		audienceWeightings: [0.9, 1, 0.7] 
	}
]);

GDT.addTopics([
	{ 
		id: "Empire", 
		name: "Empire".localize("game topic"), 
		genreWeightings: [0.7, 0.8, 0.9, 0.9, 1, 0.7], 
		audienceWeightings: [0.8, 1, 0.6] 
	}
]);

GDT.addTopics([
	{ 
		id: "Sidescroller", 
		name: "SideScroller".localize("game topic"), 
		genreWeightings: [0.9, 1, 0.7, 0.6, 0.7, 0.7], 
		audienceWeightings: [0.7, 1, 0.7] 
	}
]);

GDT.addTopics([
	{ 
		id: "FPS", 
		name: "FPS".localize("game topic"), 
		genreWeightings: [1, 0.6, 0.7, 0.6, 0.7, 0.7], 
		audienceWeightings: [0.6, 0.8, 1] 
	}
]);

GDT.addTopics([
	{ 
		id: "FPsS", 
		name: "TPS".localize("game topic"), 
		genreWeightings: [1, 0.6, 0.6, 0.6, 0.8, 0.6], 
		audienceWeightings: [0.6, 0.9, 1] 
	}
]);

GDT.addTopics([
	{ 
		id: "FPslolS", 
		name: "Puzzle".localize("game topic"), 
		genreWeightings: [0.8, 0.9, 0.8, 0.6, 0.6, 1], 
		audienceWeightings: [0.7, 1, 0.7] 
	}
]);

/* 1-Action 2-Adventure 3-RPG 4-Simulation 5-Strategy 6-Casual */

//p-Research (lol)


GDT.addResearchItem(
	{
		id: "P1",
		name: "144p Support".localize(),
		v: 2,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 2;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "P2Hax",
		name: "240p Support".localize(),
		v: 2,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 3;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	
	GDT.addResearchItem(
	{
		id: "P3Hax",
		name: "360p Support".localize(),
		v: 4,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 5;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "P4Hax",
		name: "480p Support".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 6;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "P5Hax",
		name: "720p Support".localize(),
		v: 8,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 8;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	
	
	GDT.addResearchItem(
	{
		id: "PFinalHaxor",
		name: "1080p Support".localize(),
		v: 12,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 10;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	//K-research
	
	GDT.addResearchItem(
	{
		id: "K1Haxor",
		name: "2K Support".localize(),
		v: 10,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 8;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "K2Haxor",
		name: "4K Support".localize(),
		v: 14,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 11;
		},
		category: "Quality",
		categoryDisplayName: "Quality".localize()
	});
	
	//Screen
	
	GDT.addResearchItem(
	{
		id: "Hax0rrawrlol",
		name: "Multi-Screen Support".localize(),
		v: 8,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Gameplay') > 5;
		},
		category: "Display",
		categoryDisplayName: "Display".localize()
          });


//Psychiclelelleellelelell
	
	 GDT.addResearchItem(
	{
		id: "12345313Haxorlol",
		name: "Real Life Physics".localize(),
		v: 10,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Engine') > 9;
		},
		category: "Engine",
		categoryDisplayName: "Engine".localize()
	});
	
	 GDT.addResearchItem(
	{
		id: "123453DOnotDuplicat",
		name: "Smooth Physics".localize(),
		v: 10,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Engine') > 7;
		},
		category: "Engine",
		categoryDisplayName: "Engine".localize()
	});
	
	//Graphz
	
	 GDT.addResearchItem(
	{
		id: "DatIPBelongstoHax0r",
		name: "Real Life Graphic".localize(),
		v: 10,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 7;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	//Gadgatz
	
	
	 GDT.addResearchItem(
	{
		id: "DatIPBelongstoHaxor1",
		name: "Gadgets".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Gameplay') > 4;
		},
		category: "Gameplay",
		categoryDisplayName: "Gameplay".localize()
	});

GDT.addResearchItem(
	{
		id: "Indie Support",
		name: "Indie Support".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Gameplay') > 4;
		},
		category: "Gameplay",
		categoryDisplayName: "Gameplay".localize()
	});

	GDT.addResearchItem(
	{
		id: "Basic Object Reflection",
		name: "Basic Object Reflection".localize(),
		v: 4,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 2;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Advanced Object Reflection",
		name: "Advanced Object Reflection".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 4;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});

	GDT.addResearchItem(
	{
		id: "Super Advanced Object Reflection",
		name: "Super Advanced Object Reflection".localize(),
		v: 10,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 6;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Basic HUD",
		name: "Basic HUD".localize(),
		v: 2,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 1;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Good HUD",
		name: "Advanced HUD".localize(),
		v: 4,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 3;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Basissc HUD",
		name: "Great HUD".localize(),
		v: 8,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 6;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Basic wwww",
		name: "Basic Main Menu".localize(),
		v: 2,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 1;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "Baswwwic wwww",
		name: "Advanced Main Menu".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 3;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	 
	 GDT.addResearchItem(
	{
		id: "ANIMATIONZZZZ",
		name: "Animated Main Menu".localize(),
		v: 8,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Graphic') > 4;
		},
		category: "Graphic",
		categoryDisplayName: "Graphic".localize()
	});
	
	 //New Research
	 
	  GDT.addResearchItem(
	{
		id: "ANIMATIONZZZZno",
		name: "Simple Story".localize(),
		v: 2,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Story/Quests') > 1;
		},
		category: "Story/Quests",
		categoryDisplayName: "Story/Quests".localize()
	});
	
	 GDT.addResearchItem(
	{
		id: "ANIMATIONZZZZnope",
		name: "Advanced Story".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Story/Quests') > 3;
		},
		category: "Story/Quests",
		categoryDisplayName: "Story/Quests".localize()
	});
	
	 GDT.addResearchItem(
	{
		id: "ANIMATIONZZZZnoOooo",
		name: "Bosses".localize(),
		v: 4,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Level Design') > 2;
		},
		category: "Level Design",
		categoryDisplayName: "Level Design".localize()
	});
	
	 GDT.addResearchItem(
	{
		id: "ANIMATIONZZZZdehel",
		name: "Surrealistic AI".localize(),
		v: 12,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('AI') > 9;
		},
		category: "AI",
		categoryDisplayName: "A.I.".localize()
	});
	 
	 GDT.addResearchItem(
	{
		id: "12Haxorlol",
		name: "Difficulty Settings".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('AI') > 4;
		},
		category: "AI",
		categoryDisplayName: "A.I.".localize()
	});
	
	 GDT.addResearchItem(
	{
		id: "1233Haxorlol",
		name: "Difficult Quests".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Story/Quests') > 4;
		},
		category: "Story/Quests",
		categoryDisplayName: "Story/Quests".localize()
	});
	
	//New
	
GDT.addResearchItem(
	{
		id: "TheHackor1337661",
		name: "Character Customization".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Engine') > 2;
		},
		category: "Engine",
		categoryDisplayName: "Engine".localize()
	});
	
	GDT.addResearchItem(
	{
		id: "THackHACXor1337661",
		name: "Motion Detectors Support".localize(),
		v: 6,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Gameplay') > 5;
		},
		category: "Gameplay",
		categoryDisplayName: "Gameplay".localize()
	});
	
	//Notifications
GDT.addEvent({
	id: "NewNot1",
	date: "1/1/1",
	isRandom: false,
	ignoreGameLengthModifier: false,
	maxTriggers: 1,
	getNotification: function(company){ return new Notification({
	header: "Thanks For Using SuperConsoles",
	text: "This Is A Quick Thank-You For Downloading This Modification, And Small Info That It Is Working. Enjoy!",
	image: "",
	buttonText: "YeY",
	weeksUntilFired: 0
	});} 
	});
	
	GDT.addEvent({
	id: "NewNot2",
	date: "29/10/1",
	isRandom: false,
	ignoreGameLengthModifier: false,
	maxTriggers: 1,
	getNotification: function(company){ return new Notification({
	header: "New Platform(?)",
	text: "There Are Many People Talking About 'Return Of Vena', The Second One. They Are Talking About Something Very Powerful, Big And That It Will Beat mBox And Playsystem. Those Are Just Small 'Gossips', But We Are Curious.",
	image: "",
	buttonText: "OK",
	weeksUntilFired: 0
	});} 
	});
	
	GDT.addEvent({
	id: "NewNot3",
	date: "29/12/1",
	isRandom: false,
	ignoreGameLengthModifier: false,
	maxTriggers: 1,
	getNotification: function(company){ return new Notification({
	header: "New Platform(?), Part 2",
	text: "Two Months Ago There Were Many 'Gossips' About New Vena's Platform. Today They Look Very Real. Vena Announced 'Something' Really, Thats How They Called It. People Have Also Devised A Name, Vena 'Deleter', 'Destroyer' 'Killer', Because Of It Destroying Competition. We Should See 'Something' Being Announced In About Two Months.",
	image: "",
	buttonText: "OK",
	weeksUntilFired: 0
	});} 
	});
	
	//Events
	
	var Id = "HaxorIsTheBestAndSuperConsolestoo";
	
	var Event1 = {
	id: Id,
	isRandom: true,
	maxTriggers: 4,
	trigger: function (company) {
   company.isGameProgressBetween(0.2, 0.9);
	},
	getNotification: function (company) {
        var game = company.currentGame;
		
		var ms = "While Working On {0} We Had A Blackout! We Think That It Was Because Of Our Power Supplier. Thankfully We Can Repair Everything.".localize().format(game.title);
		return new Notification({
		sourceId: Id,
		header: "Oh No!",
		text: ms,
		options: ["Pay For Damages ~70k", "Go To Court With Our Power Provider"]
		});
		},
		
		
		complete: function (decision) {
		
		 var company = GameManager.company;
		
		if (decision === 0) {
		var n = new Notification({
		header: " ",
		text: "We Have Paid 72.000$ For All The Damage. Everything Is Fine Now.",
		});
		n.adjustCash(-72000, "Repairs");
		 company.notifications.push(n);
		 return;
		}
		
		if (decision === 1) {
		var n = new Notification({
		header: "Court",
		text: "You Have Sued 'Elentrix', Yours Power Supplier. You Have Won! Elentrix Have Paid For All The Damages, And As The Bonus Everyone Heard About That, So Some People Are Hyped For Our New Game!",
		});
		n.adjustHype(10 + 15 * company.getRandom());
		 company.notifications.push(n);
		 return;
		 }
		 }
		 };
		 
		 GDT.addEvent(Event1);
		 
		 var Id2 = "HaxorIsTheBestAndSuperConsolest001";

	var Event2 = {
	id: Id2,
	isRandom: false,
	maxTriggers: 1,
	date: "24/11/4",
	ignoreGameLengthModifier: false,
	getNotification: function (company) {
		
		var msg = "Coden And Grapple Are In Hard Situation. Grapple Sued Coden, Because They Were Copying Their Phones. All CFons Are Very Similar To grPhones. {n} Now, They Sent Us The Messages, They Want Us To Help Them. We Can Choose Grapple or Coden side."
		return new Notification({
		sourceId: Id2,
		header: "Hard Situation",
		text: msg,
		options: ["Help Grapple", "Help Coden", "Forget About Those Messages"]
		});
		},
		
		complete: function (decision) {
		
		if (decision === 0) {  //Grapple
		var n = new Notification({
		header: "Thank You!",
		text: "Thanks for your respect. Now, we will win for sure. Again Thanks. {n} We knew It! We Have won! Those stupid guys from Coden, they should go to jail. CFons are repliques of grPhones! Once again, again Thank You.",
		});
		n.adjustCash(-65000, "Court");
		n.adjustHype(4 + 10 * GameManager.company.getRandom());
		 GameManager.company.notifications.push(n);
		 return;
		}
		
		if (decision === 1) { //Coden
		var n = new Notification({
		header: "Thanks",
		text: "Wow, We didn't expect that, that so big company could help us, because we are smaller company than Grrrapple. Hope That we will win with Grapple now! It will be hard, because they have good lawyers. {n} We have lost. CFons arent just copied grPhones. They were inspired by their succes, but that is something different. Anyway, big thanks for being with us.",
		weeksUntilFired: 1,
		});
		n.adjustCash(-101000, "Court");
		n.adjustHype(12 + 20 * GameManager.company.getRandom());
		 GameManager.company.notifications.push(n);
		 return;
		 }
		 
		 if (decision === 2) { 
		var n = new Notification({
		header: "Grapple",
		text: "You Did Wrong. Those Stupid CFons Are Just grPhones With Very Stupid Names! Thankfully We Have Won Without Your Help.{n} We Did not recieved any message from Coden. They Have lost, just like everyone knew. {n} I Think they will stop developing CFons/CTaps.",
		weeksUntilFired: 1,
		});
		n.adjustFans(2 + 8 * GameManager.company.getRandom());
		 GameManager.company.notifications.push(n);
		 return;
		 }
		 
		 }
		 };
		 
		 GDT.addEvent(Event2);
		 
		//Announce
var hype;
var cost;
var fans;
var shMenu = UI._showContextMenu;
var shMyMenu = function(type, menuItems, x, y) {

		game = GameManager.company.currentGame;
			if (GameManager.company.isCurrentlyDevelopingGame()) {
		menuItems.push({
			label: "Announce {0}".localize().format(GameManager.company.currentGame.title),
			action: function() {
		if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize == "small") {
			hype = GameManager.company.adjustHype(12 + 18 * GameManager.company.getRandom());
			cost = GameManager.company.adjustCash(-30000, "Game Announcement");	
			fans = GameManager.company.adjustFans(2 + 8 *  GameManager.company.getRandom());
		} else if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize == "medium") {
			hype = GameManager.company.adjustHype(22 + 28 * GameManager.company.getRandom());
			cost = GameManager.company.adjustCash(-85000, "Medium Game Announcement");	
			fans = GameManager.company.adjustFans(5 + 12 *  GameManager.company.getRandom());
		} else if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize == "large") {
			hype = GameManager.company.adjustHype(45 + 50 * GameManager.company.getRandom());
			cost = GameManager.company.adjustCash(-275000, "Large Game Announcement");	
			fans = GameManager.company.adjustFans(22 + 25 *  GameManager.company.getRandom());
		} else if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize == "aaa") {
			hype = GameManager.company.adjustHype(80 + 82 * GameManager.company.getRandom());
			cost = GameManager.company.adjustCash(-1000000, "AAA Game Announcement");	
			fans = GameManager.company.adjustFans(40 + 60 *  GameManager.company.getRandom());
		};
				Sound.click();
				GameManager.resume(true);
				GameManager.company.notifications.push(new Notification("Game Announced!", "We Have Succesfully Announced Our Upcoming Game. We Can Do It Again, Just Say More Things About Our Game, To Hype It Even More!"));
				hype;
				cost;
				fans;
			}				
		});
	}

	shMenu(type, menuItems, x, y);
}
UI._showContextMenu = shMyMenu;