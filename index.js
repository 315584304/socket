var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('用户已连接');
    io.emit('chat message','欢迎链接');
    socket.on('disconnect', function(){
        console.log('用户已断开连接');
        io.emit('chat message','用户已断开连接');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });//这会将事件发送到所有连接的套接字

http.listen(3000, function(){
    console.log('listening on *:' + port);
});


//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- `.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG
//
//          佛曰:
//
//                  写字楼里写字间，写字间里程序员；
//
//                  程序人员写程序，又拿程序换酒钱。
//
//                  酒醒只在网上坐，酒醉还来网下眠；
//
//                  酒醉酒醒日复日，网上网下年复年。
//
//                  但愿老死电脑间，不愿鞠躬老板前；
//
//                  奔驰宝马贵者趣，公交自行程序员。
//
//                  别人笑我忒疯癫，我笑自己命太贱；
//
//                  不见满街漂亮妹，哪个归得程序员？
//
