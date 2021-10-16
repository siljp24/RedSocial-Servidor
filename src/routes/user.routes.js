const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require('../utils').multer;
const values = require('../values');

const router = Router();

router.post('/signUp', uploads.single(values.avatarFolder), controllers.user.signUp);
router.post('/signIn', controllers.user.signIn);

module.exports = router;