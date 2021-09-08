// components/classic/music/index.js
import classicBeha from "../classic-beh.js"
// 背景音乐管理对象
const mgr = wx.getBackgroundAudioManager();
Component({
  behaviors: [classicBeha],
  /**
   * 组件的属性列表
   */
  properties: {
    // 音乐内容
    // content: String,
    // img: String
    // 音乐地址
    musicSrc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 音乐暂停
    pauseSrc: "./images/player@pause.png",
    // 音乐播放
    playSrc: "./images/player@play.png",
    // 音乐播放状态
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 音乐播放按钮回调函数
     * @param {Event} event 
     */
    onPlay(event) {
      // 切换暂停和播放的图标
      this.setData({
        playing: !this.data.playing
      });
      if (this.data.playing) {
        // 音乐播放
        mgr.src = this.properties.musicSrc;
        mgr.title = "听雨少年！";
      } else {
        // 音乐暂停
        mgr.pause();
      }
      
    },
    /**
   * 进行音乐播放状态的切换和检测
   */
    _recoverStatus() {
      // 音乐没有播放，也就是暂停的状态
      if (mgr.paused) {
        this.setData({
          playing: false
        })
      }
      // 正在播放的音乐地址 是否和当前页面的音乐地址一致
      // 一致 则设置音乐播放状态为 true 否则为false 
      else if (mgr.src === this.properties.musicSrc) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch(){
      // 如果点击了背景音频的菜单上的暂停和播放按钮
      // 我们的组件上的暂停和播放图标也要改相应的改变
      mgr.onPause(() => {
        // 点击了暂停，则图标也要改
        this._recoverStatus();
      });
      mgr.onPlay(() => {
        // 音乐开始播放 图标切换为暂停
        this._recoverStatus();
      });
      // 音乐的停止
      mgr.onStop(()=>{
        this._recoverStatus();
      });
      // 音乐自然播放结束
      mgr.onEnded(()=>{
        this._recoverStatus();
      })
    }
  },
  // 生命周期 (只有组件被创建，才会触发，隐藏不会触发下面这两个生命周期)
  lifetimes: {
    // 在组件实例被从页面节点树移除时执行
    detached() {
      // 停止音乐
      // mgr.stop();

    },
    // 在组件实例进入页面节点树时执行
    attached() {
      // 音乐状态的判断
      this._recoverStatus();
      this._monitorSwitch();
    }
  },

})
