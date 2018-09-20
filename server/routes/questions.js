const router = require('express').Router();
const { create,findAll,remove,update,findOne,upvote,downvote } = require('../controllers/questionController');
const { auth } = require('../middlewares/auth');

router.post('/', auth, create);
router.get('/', findAll);
router.delete('/:id',auth, remove);
router.put('/:id', auth, update);
router.get('/:id', findOne);
router.put('/upvote/:id',auth, upvote);
router.put('/downvote/:id',auth, downvote);

module.exports = router;