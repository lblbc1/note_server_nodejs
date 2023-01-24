/**
 * 厦门大学计算机专业 | 前华为工程师
 * 专注《零基础学编程系列》  http://lblbc.cn/blog
 * 包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
 * 公众号：蓝不蓝编程
 */
const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')

class NoteValidator extends LinValidator {
  constructor() {
    super();

    this.content = [new Rule("isLength", "云笔记内容不能为空", { min: 1 })];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
  }
}

class NoteSearchValidator extends LinValidator {
  constructor() {
    super();
    this.keyword = [
      new Rule('isLength', '必须传入搜索关键字', { min: 1 })
    ]
  }
}

module.exports = {
  NoteValidator,
  PositiveIdParamsValidator,
  NoteSearchValidator
}
