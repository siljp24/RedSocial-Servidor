const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require('../utils').multer;
const values = require('../values');

const router = Router();


router.post('/upload',uploads.single(values.imageFolder), controllers.post.upload);
router.get('/recentUploads', controllers.post.recentUploads);
router.get('/stast', controllers.post.stast);
router.get('/mostPopular', controllers.post.mostPopular);
router.get('/details/:postId', controllers.post.details);
router.delete('/delete', controllers.post.remove);
router.post('/like', controllers.post.like);
router.post('/view', controllers.post.view);

module.exports = router;