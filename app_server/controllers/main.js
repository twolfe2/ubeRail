//Get home page

module.exports.index = function (req,res) {
	res.render('index', {title: 'UbeRail '});
};

module.exports.getDirections = function (req,res) {
	res.render('directions', {title: 'Get directions',
														start: req.body.start,
														end: req.body.end
													
													});
};






