
// Sorte de class
var MoreWorkers = {};
(function () {

	var modID = "moreworkers";
	
	var m_dataStore;
	
	
	var load = function () {
		if(!m_dataStore)
			m_dataStore = GDT.getDataStore(modID);

			
		if (!m_dataStore.data.workers)
			m_dataStore.data.workers = [[]]; // Genre workers[idEmploy][data] ==> data peu donner nbWorkersInTeam, EmployEfiencienty, others...
			
	}
	
	MoreWokers.start = function () {
		console.info("Started !");
		
		
		
		
	}
	
	
	
	/////////////////////////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////// EVENTS DEFINITION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	
	
	
	
	
	
	
	
	
	///////////////////////////////////////////// OTHER THINGS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
	
	
})();
