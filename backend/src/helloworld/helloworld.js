const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({mssg: 'Hello World !'})
})

module.exports = router