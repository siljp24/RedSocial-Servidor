const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require('../utils').multer;
const values = require('../values');
const middlewares = require('../middlewares');

const router = Router();


router.post('/upload',middlewares.auth.isToken,uploads.single(values.imageFolder),middlewares.auth.userExists, controllers.post.upload);
router.get('/recentUploads', controllers.post.recentUploads);
router.get('/stats', controllers.post.stast);
router.get('/mostPopular', controllers.post.mostPopular);
router.get('/details/:postId',middlewares.auth.detailValidation, controllers.post.details);
router.delete('/delete', controllers.post.remove);
router.post('/like', controllers.post.like);
router.post('/view', controllers.post.view);

module.exports = router;