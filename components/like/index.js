// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 属性 供外界传递的
    // 是否点赞
    like: {
      // 属性的类型
      type: Boolean,
      // 属性的默认值
      value: false
    },
    // 点赞数
    count: Number,
    // 只读
    readOnly:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 点赞量
    // count:99,
    // 是否点赞
    // like:true,

    // 点赞后的图标
    yesSrc: "./images/like.png",
    noSrc: "./images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点赞事件的回调函数
     * @param {*} event 事件对象
     */
    onLike(event) {
      if(this.properties.readOnly) return;
      // 切换点赞的图标
      let like = this.properties.like;
      let count = this.properties.count;
      // 更新点赞数
      count = like ? count - 1 : count + 1;
      // 更新数据，需要使用setData
      this.setData({
        count,
        like: !like
      });
      // 发射自定义事件给页面，携带数据 是点赞还是取消点赞
      this.triggerEvent("like", {
        // 行为 like表示点赞 cancel表示取消点赞
        behavior: !like ? "like" : "cancel"
      }, {})
    }
  }
});
