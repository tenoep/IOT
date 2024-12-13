const { getAllTests, createTest } = require('./testController')
const router = require('express').Router();



router.get('/', getAllTests)
router.post('/create', createTest)

module.exports = router