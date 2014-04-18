//Warning: reading this code as an experienced developer may cause you to bang your head into the wall
//I am not responsible for you being sent to the hospital because of my mod

var MoreKit_topic = {};
(function () {

	MoreKit_topic.addTopic = function () {
		GDT.addTopics([
		{
			id: "ID_TOPIC",
			name: "NAME_TOPIC".localize("game topic"),
			genreWeightings: [1, 1, 1, .6, .7 .6],
			audienceWeightings: [0.9, 0.8, 1]
		}
		]);
	};
	
})();
