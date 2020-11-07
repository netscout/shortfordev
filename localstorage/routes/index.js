var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/token", function (req, res, next) {
  res.json({
    secret: "secret",
  });
});

router.get("/token2", function (req, res, next) {
  res.cookie("secret", JSON.stringify({ secret: "secret" }));

  res.json({
    succeed: true,
  });
});

router.get("/token3", function (req, res, next) {
  if (req.cookies.secret2) {
    console.log(req.cookies.secret2);
  } 
  else {
    res.cookie("secret2", JSON.stringify({ secret: "secret" }), {
      httpOnly: true,
    });
  }

  res.json({
    succeed: true,
  });
});

module.exports = router;
