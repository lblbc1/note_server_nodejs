/**
 * 厦门大学计算机专业 | 前华为工程师
 * 专注《零基础学编程系列》  http://lblbc.cn/note
 * 包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
 * 公众号：蓝不蓝编程
 */
const { Note } = require('@models/note')

// 定义云笔记模型
class NoteDao {

  // 创建云笔记
  static async create(v, userId) {
    const note = new Note();
    note.content = v.get('body.content');
    note.user_id = userId;

    try {
      const res = await note.save();
      return [null, res]
    } catch (err) {
      console.log(err)
      return [err, null]
    }
  }

  //查询指定用户云笔记
  static async queryNotes(userId) {
    try {
      const note = await Note.findAndCountAll({
        where: {
          user_id: userId
        }
      });
      let rows = note.rows
      return [null, rows]
    } catch (err) {
      return [err, null]
    }
  }

  // 删除云笔记
  static async deleteNote(id) {
    // 检测是否存在云笔记
    const note = await Note.findOne({
      where: { id }
    });
    // 不存在抛出错误
    if (!note) {
      throw new global.errs.NotFound('没有找到相关云笔记');
    }

    try {
      const res = await note.destroy({force:true})
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

  // 更新云笔记
  static async update(v, noteId, userId) {
    const note = await Note.findByPk(noteId);
    if (!note) {
      throw new global.errs.NotFound('没有找到相关云笔记');
    }

    note.content = v.get('body.content');
    note.user_id = userId;

    try {
      const res = await note.save();
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }


  // 云笔记详情
  static async detail(id, query) {
    const { keyword } = query
    try {
      let filter = {
        id,
        deleted_at: null
      }

      let note = await Note.findOne({
        where: filter,
      });

      if (!note) {
        throw new global.errs.NotFound('没有找到相关云笔记');
      }

      return [null, note];
    } catch (err) {
      return [err, null]
    }
  }

}

module.exports = {
  NoteDao
}
