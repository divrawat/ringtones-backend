var express = require('express');
var GetAllSongs = require('../controllers/getsongs.js').GetAllSongs;
var GetAllSongsDashBoard = require('../controllers/getsongs.js').GetAllSongsDashBoard;
var UpdateSong = require('../controllers/getsongs.js').UpdateSong;
var addSong = require('../controllers/getsongs.js').addSong;
var DeleteSong = require('../controllers/getsongs.js').DeleteSong;
var GetSingleSong = require('../controllers/getsongs.js').GetSingleSong;
var GetSongsPerCategory = require('../controllers/getsongs.js').GetSongsPerCategory;
var SearchSongs = require('../controllers/getsongs.js').SearchSongs;
var Download = require('../controllers/getsongs.js').Download;
var SongsSitemap = require('../controllers/getsongs.js').SongsSitemap;
var WriteAllRingtoneSlugs = require('../controllers/getsongs.js').WriteAllRingtoneSlugs;
var authController = require('../controllers/auth.js');

var router = express.Router();

// router.get('/write', WriteAllRingtoneSlugs);
router.get('/get-single-song/:slug', GetSingleSong);
router.get('/songs-sitemap', SongsSitemap);
router.get('/getallsongs', GetAllSongs);
router.get('/download/:slug/:Name', Download);

router.get('/category/get-songs', GetSongsPerCategory);
router.get('/search-songs', SearchSongs);

router.get('/getallsongsdashboard', authController.requireSignin, authController.adminMiddleware, GetAllSongsDashBoard);
router.post('/add-song', addSong);

router.delete('/delete-song/:id', authController.requireSignin, authController.adminMiddleware, DeleteSong);
router.post('/updatesong/:id', authController.requireSignin, authController.adminMiddleware, UpdateSong);

module.exports = router;
