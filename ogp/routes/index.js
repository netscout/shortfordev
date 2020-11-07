var express = require('express');
var router = express.Router();
var ogs = require("open-graph-scraper");

/* GET home page. */
router.get('/ogp', async function(req, res, next) {
  const option = { url: "https://stackoverflow.com/" };
  const data = await ogs(option);
  console.log(data.result);
    
  res.json(data.result);
});

module.exports = router;
