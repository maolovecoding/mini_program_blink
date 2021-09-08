// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 期刊号
    index: {
      type: String,
      /**
       * 当前属性发生改变的时候，会执行该函数的内容
       * 不能在这个里面更新 index 的值 我们应该修改 _index
       * 修改index 的值会出现无限递归，因为每次修改值都会调用这个函数
       */
      observer(newVal, oldVal, changePath) {
        const val = newVal < 10 ? "0" + newVal : newVal;
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: "",
    _index: "",
    months:[
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ]
  },
  /**
   * 组件生命周期声明对象，组件的生命周期
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      // 获取当前时间
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      // 数据绑定
      this.setData({
        year,
        month:this.data.months[month]
      })
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
