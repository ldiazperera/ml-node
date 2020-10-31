const express = require('express');
const router = express.Router();
const request = require('axios');
const logger = require('../common/logger');
const returnCommonResponse = require('../common/common');
const URL = process.env.ML_BASE_API_URL;

router.get('/items', async (req, res, next) => {
  const query = req.query.q;
  
  if (!query) {
    next();
  }
  
  const items = await fetchData(query);
  res.json(items.data);
  next();
});

const fetchData = async (query) => {
  const items_query_url = URL + '/sites/MLA/search';
  
  try {
    return await request.get(items_query_url, {
      params: {
        q: query
      }
    });
  } catch(e) {
    const errorMessage = `Error getting products ${e}`;
    logger.error(errorMessage);
    return returnCommonResponse(res, errorMessage, 500);
  }
};

module.exports = {
  router
}
