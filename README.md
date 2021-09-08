# blink 项目前端



### 前置补充

#### 小程序基础

#### 懂flex布局





## 组件

### like组件开发

#### rpx和px使用场景

在大部分情况下，我们都使用 **rpx**单位，因为rpx可以进行自适应，在屏幕尺寸和分辨率发生改变的情况下，会自动进行适应。

而px则不会进行适应。

**一般来说：**例如像字体这种，我们有时候不让其自适应。有时候我们设置 边框，border 也可能不应该自适应。



**所有的页面，小程序默认在最外层加上了page标签。**所以有些公共的样式我们可以写在app.wxss文件里面。也要注意，不是所有的公共样式都会被其他页面或者组件继承。比如我们设置的全局页面背景颜色，是不会被组件继承的。但是大部分css样式都是可以被页面继承的。



#### 自适应弹性盒模型

设置display属性的值为 inline-flex。整体盒外模型是自适应，内部还是flex盒子。也还是蛮不错的选择。

```css
.container{
  /* 设置弹性盒，且宽度高度还是自适应 inline-flex */
  display: inline-flex;
  flex-direction: row;
  /* 给一个内边距 */
  padding-top: 10rpx;
}
```



#### 自定义触发事件

**triggerEvent()**方法

- 参数一：自定义事件名称
- 参数二：js对象，用来传递我们当前的数据，提供给外界的监听函数。默认在外界接收参数的detail属性下。**一般也就是在event.detail**
- 参数三：触发事件的选项，对象类型。可选属性有三：
  - bubbles： 是否冒泡，默认false
  - composed： 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部，默认false
  - capturePhase：默认false，事件是否拥有捕获阶段



|    选项名    |  类型   | 是否必填 | 默认值 |                             描述                             |
| :----------: | :-----: | :------: | :----: | :----------------------------------------------------------: |
|   bubbles    | Boolean |    否    | false  |                         事件是否冒泡                         |
|   composed   | Boolean |    否    | false  | 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部 |
| capturePhase | Boolean |    否    | false  |                     事件是否拥有捕获阶段                     |



#### 组件的properties属性和data属性

在定义组件的时候，我们在properties中定义的数据，是提供给外界的出口属性，一般小程序会给其我们设置属性的默认值的，当然也可以通过value属性指定默认值。而在data中定义属性的时候，如果直接将某个属性赋值为Number，String，等等，是不会给其该属性的默认值的。这些属性本来就是构造函数。

**这两个属性，在最后都会合并到一个对象中。也就是properties中和data中定义的属性，都会合并到一起的。**所以我们在定义变量的时候，这两个地方的变量不要设置为同名的变量。





##### properties属性定义的属性的observer属性

observer属性的类型是一个函数。在这个函数里面，不要修改属性自己的值。不然会引起无限递归。

```js
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
            // 直接无限递归了
            // index:val,
          _index: val
        })
      }
    }
  }
```



#### 组件的代码复用：behavior

behavior：行为。

给多个组件定义共同的行为。

将多个组件的共性抽取出来，定义在一个单独的文件中。供多个组件一起使用。

进行代码的复用，是通过定义 **Behavior**来实现的。

可以把该文件认为和组件的js文件基本一致，都可以定义properties，data，methods等属性。

也可以有生命周期。

```js
// Behavior 就是一个构造器

export default Behavior({
  properties: {
    // 图片
    img: String,
    // 内容
    content: String
  },
  data: {},
  methods: {

  }
})
```

**组件想要使用这些定义好的行为，需要显示的继承。一个组件可以继承多个行为，就有了他们共有的属性。**

```js
Component({
  // 指定继承的behavior，可以继承多个，继承了就有了这些定义好的属性和方法等
  behaviors:[classicBeha],
})
```

继承的生命周期和组件内部定义的生命周期会合并。但是像属性和方法，组件内部定义了的为主，继承的属性和组件内部属性发生冲突时，以组件内部为主。多继承时，继承的属性发生冲突的时候，以最后一个聚餐的behavior为准。



#### 注意promise方式调用get/setStorege

不管是直接传入回调函数，还是以promise来执行回调函数。返回值的data属性才是我们实际拿到的数据。res并不是。

```js
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
wx.getStorage({
  key: 'key'
}).then(res=>{
    console.log(res.data)
})
```





#### css代码复用解决

```css
@import "需要复用的wxss文件";
<!-- 别忘了后面需要分号结束 -->
```



#### 背景音频管理对象wx.getBackgroundAudioManager();

小程序将背景音频相关的操作，都放到该对象中。注意：只要给该对象赋值了src属性，就会自动开始播放了。

```js
// 背景音乐管理对象
const mgr = wx.getBackgroundAudioManager();

// 切换暂停和播放的图标
      this.setData({
        playing: !this.data.playing
      });
      if (this.data.playing) {
        // 音乐播放
        mgr.src = this.properties.musicSrc;
        mgr.title = "听雨少年！";
        console.log(this.properties.musicSrc);
      }else{
        // 音乐暂停
        mgr.pause();
      }
```

在现在的小程序，背景音频对象的 **title属性和src属性属于必填项，不然不会生效。**

![image-20210907220349454](https://gitee.com/mao0826/picture/raw/master/images/web/wei_chat/image-20210907220349454.png)

当然，如上配置出现暂停的时候，会报上面的错误。

需要在app.json中配置小程序退到后台时，也可以继续播放音频的属性。

```json
{
    "requiredBackgroundModes": ["audio","location"],
}
```

申明需要后台运行的能力，类型为数组。目前支持以下项目：

- `audio`: 后台音乐播放
- `location`: 后台定位
