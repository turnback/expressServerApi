var express = require('express');
var app = express();


app.use('/public', express.static('public'));

app.get('/index_get.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index_get.html");
})

app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "user": req.query.user,
        "pwd": req.query.pwd
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(9876, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})