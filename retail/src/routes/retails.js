const router = require('express').Router()
const { readAllRetails, readOneRetail, createNewRetail, editRetail, deleteRetail } = require('../controllers/retails')

router.get('/retails', readAllRetails)
router.get('/retails/:id', readOneRetail)
router.post('/retails', createNewRetail)
router.put('/retails/:id', editRetail)
router.delete('/retails/:id', deleteRetail)

module.exports = router