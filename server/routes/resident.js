const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const controller = require('../controllers/resident');

router.get('/', auth, controller.getResidents);
router.post('/', controller.createResident);
router.get('/:id', auth, controller.getResident);
router.put('/:id', auth, controller.updateResident);
router.delete('/:id', auth, controller.deleteResident);
router.post('/auth/login', controller.login);

module.exports = router;