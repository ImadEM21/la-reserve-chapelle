const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const controller = require('../controllers/employee');

router.get('/', auth, controller.getEmployees);
router.post('/', auth, controller.createEmployee);
router.get('/:id', auth, controller.getEmployee);
router.put('/:id', auth, controller.updateAEmployee);
router.delete('/:id', auth, controller.deleteEmployee);
router.post('/auth/login', controller.login);

module.exports = router;