import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const userInfo = {
  _id: 0,
  userId: 'KingSejong',
  userName: '세종대왕',
  userNumber: 1999999999,
};

router.get('/', async (ctx: Koa.Context) => {
  const env = await config;
  const token = jwt.sign(userInfo, env.accessSecretKey, { expiresIn: '1h' });
  ctx.cookies.set('access_token', token, { httpOnly: false, maxAge: 1000 * 60 * 60 });
  // 쿠키 발급, 유효시간 1시간 1000ms * 60 * 60
  ctx.user = userInfo;
  ctx.body = ctx.user;
  ctx.role = String(userInfo.userNumber).charAt(0);
});

export = router
