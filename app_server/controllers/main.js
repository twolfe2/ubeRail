//Get home page

module.exports.index = function (req,res) {
	res.render('index', {title: 'UbeRail '});
};

module.exports.getDirections = function (req,res) {
	res.render('index', {title: 'Get directions '});
};