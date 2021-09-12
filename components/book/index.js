// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 图书数据
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      // 事件
      this.triggerEvent("bookDetail",{
        id:this.properties.book.id
      },{});
    }
  }
})
