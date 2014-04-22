var wallStreet = {};

// Declare the prototype of the function dlocalize, to manage localisation of the mod
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
///////////////////////

(function()
{
	wallStreet.init = function()
	{
		/*var a = $(".simplemodal-data").find(".characterPreviewCanvas")[0];
        alert(GameManager);
		//a.height = 254;
        /*a.width = 360;
        a = a.getContext("2d");
        a.drawImage("../image/desk.png", 0, 0, 360, 254);*/
		
		
	};
})();