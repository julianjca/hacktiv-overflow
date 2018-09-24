const router = require('express').Router();
const { create,findAll,remove,update,upvote,downvote } = require('../controllers/commentController');
const { auth } = require('../middlewares/auth');


router.post('/',auth, create);
router.get('/', findAll);
// router.get('/:id', findOne);
router.delete('/:id',auth, remove);
router.put('/:id',auth, update);
router.put('/upvote/:id',auth, upvote);
router.put('/downvote/:id',auth, downvote);


module.exports = router;