const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const middlewares = require('../middlewares');

router.get('/lastestComments', controllers.comment.lastestComments);
router.post('/create', middlewares.auth.isToken,middlewares.auth.userExists,controllers.comment.create);

module.exports = router;