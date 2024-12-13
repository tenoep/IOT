const Test = require('../models/testModel'); // import Mongoose model
const logger = require('../logger');
const log = new logger.Logger('TestService');

// Get all tests
const getAllTests = async () => {
  log.info('Entering getAllTests');
  try {
    const data = await Test.find(); // Mongoose equivalent of `findMany`
    log.info('Tests recovered');
    return data;
  } catch (err) {
    log.error(`Error in getAllTests: ${err.message}`);
    throw new Error('Unable to retrieve tests');
  }
};

// Create a new test
const createTest = async (body) => {
  log.info('Entering createTest');
  const { name } = body;

  try {
    const newTest = new Test({ name });
    const savedTest = await newTest.save(); // Mongoose `save` method
    log.info('Test created successfully');
    return savedTest;
  } catch (err) {
    log.error(`Error in createTest: ${err.message}`);
    throw new Error('Unable to create test');
  }
};

module.exports = {
  getAllTests,
  createTest,
};