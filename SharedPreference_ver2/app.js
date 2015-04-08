var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mainView = require('./routes/mainView');  // RTC Camera View
var JoinRoom2 = require('./routes/JoinRoom2'); // FriendListView
var LoginView = require('./routes/LoginView'); // main  Login View
var Chatting = require('./routes/chatting'); // chatting
var Account = require('./routes/account');  // account login process
var Friends = require('./routes/friends');
var Group = require('./routes/group');
var testFileTransger = require('./routes/fileTransfer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/Room', mainView); // sub 적어주고 다른거 돌리면 됨
app.use('/roomlist', JoinRoom2);
app.use('/', LoginView);
app.use('/chatting', Chatting);
app.use('/account', Account);
app.use('/group', Group);
app.use('/friends/', Friends);
app.use('/file' , testFileTransger);
// catch 404 and forward to error handler



app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
