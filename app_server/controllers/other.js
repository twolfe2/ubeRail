//Get home page

module.exports.about = function (req,res) {
	res.render('index', {title: 'UbeRail '});
};

module.exports.feedback = function (req,res) {
	res.render('index', {title: 'feedback '});
};

