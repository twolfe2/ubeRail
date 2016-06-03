var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlOther = require('../controllers/other');


/* GET home page. */
router.get('/', ctrlMain.index);

router.post('/directions', ctrlMain.getDirections);

router.get('/about', ctrlOther.about);

router.get('/feedback', ctrlOther.feedback);

module.exports = router;
