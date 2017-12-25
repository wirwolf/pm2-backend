const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const debug = require('debug')('koa-socket.io:example');

const Cipher    = require('./../src/Libs/Cipher');

const app = new Koa();
const router = new Router();

router.all('/api/node/verifyPM2', function (ctx, next) {
    var message = Cipher.decipherMessage(ctx.request.body.data, 'k0yplh1i3hgimfs');
    //console.dir(ctx.request.body.data);
    console.log('-----------------------------');
    console.dir(message);
    console.log('-----------------------------');
    ctx.body = {
        "endpoints": {
            "web": "http://localhost:80/socket.io/",
            "reverse": "http://localhost:3000/socket.io/",
            "push": "http://localhost:3000/socket.io/"
        },
        "new": false,
        "active": true,
        "pending": false,
        "disabled": false,
        "name": "local"
    };
    next();
});
app
    .use(json())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(function (ctx) {
        console.log('Request:' + ctx.url);
        console.log('Raw body:' + ctx.request.rawBody);
        //console.dir(ctx.request);
    });

app.listen(2000);

//pub - 2tg4uhrz5r7mq2e
//priv - k0yplh1i3hgimfs