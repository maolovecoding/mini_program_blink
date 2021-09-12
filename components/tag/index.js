// components/tag/index.js
Component({
  // 需要在options属性里面 设置 multipleSlots 的值为true
  // 插槽才能起作用
  options:{
    multipleSlots:true
  },
  // 外部样式 在组件内定义好样式名，然后实际引用的样式是外部传递的
  externalClasses:["tag-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    // 文本
    text:String
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
      this.triggerEvent("tapping",{
        text:this.properties.text
      },{});
    }
  }
})
