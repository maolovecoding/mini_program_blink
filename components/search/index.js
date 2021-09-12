// components/search/index.js
import KeywordModel from "../../models/keyword.js"
const keywordModel = new KeywordModel();
import BookModel from "../../models/book"
const bookModel = new BookModel();
import { paginationBev } from "../behaviors/pagination.js";
Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    // 页面是否触发了上拉到底的事件
    more: {
      type: String,
      // 属性值被更改时执行的回调函数
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 历史搜索关键字
    historyWords: [],
    // 热门关键词
    hotKeywords: [],
    // 搜索到的书籍
    // searchArray: [],
    // 是否显示搜索结果
    searching: false,
    // 搜索文本 绑定到搜索标签上
    q: "",
    // 锁 是否能向服务器请求数据
    // loading: false,
    // 加载动画
    loadingCenter: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消搜索
    onCancel(event) {
      this.triggerEvent("searchCancel");
    },
    onConfirm(event) {
      this.showResult();
      // 加载动画
      this.showLoadingCenter();
      // 获取输入框文本 或者点击标签的后的标签上的文本
      const keyword = event.detail.value || event.detail.text;
      this.setData({
        q: keyword
      });
      // 空搜索直接返回 不会发起请求
      if (!keyword) return;
      // 进行查询
      bookModel.getBookSearch({
        q: keyword,
        start: 0
      }).then((res) => {
        this.setMoreData(res?.books);
        // 记录总条数
        this.setTotal(res?.total);
        // 将查询关键字写入缓存 
        keywordModel.addToHistory(keyword);
        // 隐藏加载动画
        this.hideLoadingCenter();
      });
    },
    onDeleteCancel(event) {
      this.closeResult();
      // 清空数据状态
      // 重置数据 将上次搜索的数据清空
      this.initialize();
    },
    // 加载更多
    loadMore() {
      // 正在发起请求获取数据，则不允许在此期间发起二次请求
      if (this.isLocked()) return;
      // 关键字为空则不需要发起请求
      if (!this.data.q) return;
      // 当前数据已经和服务器数据总条数相等，则不需要还发请求获取数据了
      if (!this.hasMore()) return;
      // 加锁
      this.locked();
      bookModel.getBookSearch({
        // start: this.data.searchArray.length,
        start: this.getCurrentStart(),
        q: this.data.q,
      }).then(res => {
        // 更新更多数据 进行数据合并
        this.setMoreData(res?.books);
        // this.setData({
        //   // searchArray: this.data.searchArray,
        //   // 请求完毕，将锁取消
        //   loading: false,
        // });
        this.unLocked();
      }).catch(err => {
        this.unLocked();
      });
    },
    /**
     * 加载动画 展示
     */
    showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    /**
     * 展示搜索结果的列表
     */
    showResult() {
      this.setData({
        searching: true
      })
    },
    /**
     * 关闭搜索结果
     */
    closeResult() {
      this.setData({
        searching: false,
        q: "",
      });
    },
    
  },
  // 生命周期
  lifetimes: {
    attached() {
      // 获取关键字
      // const historyWords = keywordModel.getHistory();
      this.setData({
        historyWords: keywordModel.getHistory()
      });
      keywordModel.getHot().then((res) => {
        this.setData({
          hotKeywords: res.hot
        })
      })
    }
  }
})
