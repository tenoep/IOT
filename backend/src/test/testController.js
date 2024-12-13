// controllers/testController.js

const serviceTest = require('./testService');
const logger = require('../logger');
const log = new logger.Logger('TestController');

// Get all tests controller
const getAllTests = async (req, res) => {
  log.info('Entering getAllTests');
  try {
    const data = await serviceTest.getAllTests();
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in getAllTests: ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch tests' });
  }
};

// Create test controller
const createTest = async (req, res) => {
  log.info('Entering createTest');
  try {
    const data = await serviceTest.createTest(req.body);
    return res.status(201).json(data);
  } catch (error) {
    log.error(`Error in createTest: ${error.message}`);
    return res.status(500).json({ error: 'Failed to create test' });
  }
};

module.exports = {
  getAllTests,
  createTest,
};
