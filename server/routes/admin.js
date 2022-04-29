const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const controller = require('../controllers/admin');

router.get('/', auth, controller.getAdmins);
router.post('/', auth, controller.createAdmin);
router.get('/:id', auth, controller.getAdmin);
router.put('/:id', auth, controller.updateAdmin);
router.delete('/:id', auth, controller.deleteAdmin);
router.post('/auth/login', controller.login);

module.exports = router;