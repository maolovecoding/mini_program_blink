// components/navigation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: String,
    // 是否是最新的一期
    first: Boolean,
    // 期刊是否是最后一期
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片路径
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击左按钮
    onLeft(event) {
      // 不是最新的一期，才能获取上一期，才可以触发这个事件
      !this.properties.latest &&
        this.triggerEvent("left", {}, {});
    },
    // 点击右按钮
    onRight(event) {
      // 不是最后一期 才可以查看下一期
      !this.properties.first &&
        this.triggerEvent("right", {}, {})
    }
  }
})
