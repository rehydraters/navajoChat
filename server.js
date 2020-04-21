const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();
app.set('port', port);
const server = app.listen(port, () => console.log(`Express server listening on port ${port}`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

const io = require('socket.io').listen(server);
var users = [];
var messages = [];
var curStones = [];
var userStones = {};

function curUser(user) {
    curCount = users.length;
    for (let i=0; i<curCount; i++) {
        if (user == users[i]) {
            return true;
        }
    }
    return false;
}

io.sockets.on('connection', function(socket) {
    socket.on('loadPage', function(data) {
        if (curUser(data.user) === true) {
            socket.emit('userExists', {error: 'User already exists'})
        } else {
            users.push(data.user);
            socket.emit('messageLoad', {currentUser: data.user, messages:messages})
            userStones[data.user] = 0;
        }
    });
    socket.on('newMessage', function(data) {
        if (curUser(data.user) === false) {
            users.push(data.user);
            socket.emit('messageLoad', {currentUser: data.user, messages:messages})
            userStones[data.user] = 0;
            io.emit('newMessagePost', {newMessage: 'HAS BEEN RESET', user: data.user + '(' + userStones[data.user] + ')'});
        } else {
            let checker = data.message.toLowerCase();;
            console.log(userStones);
            console.log(curStones);
            if (checker.includes(config.may)) {
                if (curStones.includes(data.user + 'may')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED MAY AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED MAY AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED MAY'});
                    io.emit('newMessagePost', {newMessage: 'HAS OBTAINED COMMERORATED MAY', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'may');
                }
            } else if (checker.includes(config.september)) {
                if (curStones.includes(data.user + 'september')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED SEPTEMBER AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED SEPTEMBER AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED SEPTEMBER'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED SEPTEMBER', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'september');
                }
            } else if (checker.includes(config.october)) {
                if (curStones.includes(data.user + 'october')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED OCTOBER AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED OCTOBER AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED OCTOBER'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED OCTOBER', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'october');
                }
            } else if (checker.includes(config.november)) {
                if (curStones.includes(data.user + 'november')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED NOVEMBER AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED NOVEMBER AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED NOVEMBER'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED NOVEMBER', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'november');
                }
            } else if (checker.includes(config.december)) {
                if (curStones.includes(data.user + 'december')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED DECEMBER AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED DECEMBER AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED DECEMBER'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED DECEMBER ', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'december');
                }
            } else if (checker.includes(config.january)) {
                if (curStones.includes(data.user + 'january')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED JANUARY AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED JANUARY AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED JANUARY'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED JANUARY', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'january');
                }
            } else if (checker.includes(config.february)) {
                if (curStones.includes(data.user + 'february')) {
                    messages.push({name: data.user, message: 'HAS ALREADY COMMEMORATED FEBRUARY AND IS REMINDING ALL'});
                    io.emit('newMessagePost', {newMessage: 'HAS ALREADY COMMEMORATED FEBRUARY AND IS REMINDING ALL', user: data.user});
                } else {
                    userStones[data.user] += 1;
                    messages.push({name: data.user, message: 'HAS COMMEMORATED FEBRUARY'});
                    io.emit('newMessagePost', {newMessage: 'HAS COMMEMORATED FEBRUARY', user: data.user + '(' + userStones[data.user] + ')'});
                    curStones.push(data.user + 'february');
                }
            } else if (checker === 'dersneyrevengers') {
                messages = [];
                curStones = [];
                for (var [key, value] of Object.entries(userStones)) {
                    userStones[key] = 0;
                    console.log(key, value);
                }
                users = [];
                io.emit('newMessagePost', {newMessage: 'ADMIN HAS RESET ALL', user: data.user});
            } else {
                messages.push({name: data.user, message: data.message});
                io.emit('newMessagePost', {newMessage: data.message, user: data.user + '(' + userStones[data.user] + ')'});
            }
            if (userStones[data.user] == 7) {
                messages.push({name: data.user, message: 'HAS GOTTEN ALL ANSWERS AND MAY COMMENCE CELEBRATION BOX STEP DANCE'});
                io.emit('newMessagePost', {newMessage: 'HAS GOTTEN ALL ANSWERS AND MAY COMMENCE CELEBRATION BOX STEP DANCE', user: data.user});
            }
        }
    });
});