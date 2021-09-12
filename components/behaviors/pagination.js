// 分页
const paginationBev = Behavior({
  data: {
    searchArray: [],
    // 数据总记录数
    total: 0,
    // 搜索结果是不是为null
    noneResult: false,
    // 锁
    loading: false,
  },
  methods: {
    /**
     * 
     * @param {Array} array 新添加的数据
     */
    setMoreData(array) {
      this.data.searchArray.push(...array);
      this.setData({
        searchArray: this.data.searchArray
      })
    },
    /**
     * @return 返回起始记录数
     */
    getCurrentStart() {
      return this.data.searchArray.length;
    },
    /**
     * 是否还有更多数据需要加载
     */
    hasMore() {
      if (this.data.searchArray.length >= this.data.total)
        return false;
      return true;
    },
    /**
     * 记录服务器返回的记录总数
     * @param {Number} total 
     */
    setTotal(total) {
      this.setData({
        total
      });
      if (this.data.total == 0)
        this.setData({
          noneResult: true
        });
    },
    /**
     * 重置数据，全部恢复最开始的状态
     */
    initialize() {
      this.setData({
        total: 0,
        searchArray: [],
        noneResult: false,
        loading:false
      });
    },
    /**
     * 是否有锁
     */
    isLocked() {
      return this.data.loading ? true : false;
    },
    /**
     * 加锁
     */
    locked() {
      this.setData({
        loading: true
      });
    },
    /**
     * 释放锁
     */
    unLocked() {
      this.setData({
        loading: false
      });
    }
  },
})

export { paginationBev };