const express = require('express')
const router = express.Router()
const homeworkController = require('../controllers/homework-controller')
const authenticate = require('../middlewares/authenticate')

router.get('/',authenticate, homeworkController.getByTeacher)
router.post('/', authenticate ,homeworkController.addNew)
router.put('/:id', authenticate, homeworkController.update)

module.exports = router