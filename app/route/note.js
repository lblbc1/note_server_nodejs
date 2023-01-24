/**
 * 厦门大学计算机专业 | 前华为工程师
 * 专注《零基础学编程系列》  http://lblbc.cn/blog
 * 包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
 * 公众号：蓝不蓝编程
 */
const Router = require('koa-router');

const {
  NoteValidator,
  PositiveIdParamsValidator
} = require('@validators/note');

const { Auth } = require('@middlewares/auth');
const { NoteDao } = require('@dao/note');
const { Resolve } = require('@lib/helper');
const res = new Resolve();

const router = new Router({
  prefix: '/note'
})

/**
 * 创建云笔记
 */
router.post('/notes', new Auth().m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new NoteValidator().validate(ctx);
  var userId = ctx.auth.userId
  // 创建云笔记
  const [err, data] = await NoteDao.create(v, userId);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('');
  } else {
    ctx.body = res.fail(err);
  }
});

/**
 * 删除云笔记
 */
router.delete('/notes/:id', new Auth().m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取云笔记ID参数
  const id = v.get('path.id');
  // 删除云笔记
  const [err, data] = await NoteDao.deleteNote(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('删除云笔记成功');
  } else {
    ctx.body = res.fail(err);
  }
})

/**
 * 更新云笔记
 */
router.put('/notes/:noteId', new Auth().m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);
  const noteId = v.get('path.noteId');
  // 更新云笔记
  const [err, data] = await NoteDao.update(v, noteId, ctx.auth.userId);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('更新云笔记成功');
  } else {
    ctx.body = res.fail(err);
  }
})


/**
 * 获取云笔记列表
 */
router.get('/notes', new Auth().m, async (ctx) => {
  var userId = ctx.auth.userId
  const [err, data] = await NoteDao.queryNotes(userId);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data)
  } else {
    ctx.body = res.fail(err)
  }
});

/**
 * 查询云笔记详情
 */
router.get('/notes/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);
  // 获取云笔记ID参数
  const id = v.get('path.id');
  // 查询云笔记
  const [err, data] = await NoteDao.detail(id, ctx.query);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

module.exports = router
