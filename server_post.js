var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});

app.use('/public', express.static('public'));

app.get('/index_post.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index_post.html");
})

app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    var response = {
        "user": req.body.user,
        "pwd": req.body.pwd
    };
    //判断是否是管理员
    console.log(response["user"]);
    console.log(response["pwd"]);
    if (response["user"] === "liyang" && response["pwd"] === "admin") {
        // res.end(JSON.stringify(response));
        res.end("yes");
    } else {
        res.end("no");
    }
    // console.log(response);
})

var server = app.listen(7777, "192.168.5.17", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})