var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/events', function(req, res, next) {
  //Server Sent Events 헤더 추가
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  //응답에 헤더 추가
  res.flushHeaders();

  let interval = setInterval(function (){
    //1초 마다 임의의 수를 생성하여 전송
    res.write(`data: ${Math.random()}\n\n`)
  }, 1000);

  //브라우저에서 SSE 연결을 끊으면
  res.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

module.exports = router;
