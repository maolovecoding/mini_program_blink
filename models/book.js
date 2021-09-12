import Http from "../utils/http-promise.js";

class BookModel extends Http {
  // 获取热门书籍
  getHotList() {
    return this.request({
      url: "book/hot_list"
    });
  }
  /**
   * 获取喜欢书籍数量
   */
  getMyBookCount() {
    return this.request({
      url: "book/favor/count"
    })
  }

  /**
   *  获取书籍详情
   * @param {*} bookId id
   */
  getBookDetail(bookId) {
    return this.request({
      url: `book/${bookId}/detail`
    })
  }
  /**
   * 获取文章的点赞状态
   * @param {*} bookId 
   */
  getBookLikeStatus(bookId) {
    return this.request({
      url: `book/${bookId}/favor`
    })
  }
  /**
   * 获取文章的短评
   * @param {*} bookId 
   */
  getBookComments(bookId) {
    return this.request({
      url: `book/${bookId}/short_comment`
    })
  }
  /**
   * 添加文章短评
   * @param {Object} param
   */
  addBookShortComment({ book_id, content }) {
    return this.request({
      url: `book/add/short_comment`,
      data: {
        book_id, content
      },
      method: "POST"
    })
  }
  /**
   * 根据关键字 搜索书籍
   * @param {*} param0 
   * start 开始记录数 
   * count 条数 
   * summary 0 完整内容 1 简介 
   * q 搜索内容
   */
  getBookSearch({ start = 0, count = 20, summary = 1, q }) {
    return this.request({
      url:"book/search",
      data:{
        q,
        start:start,
        summary,
        count
      }
    })
  }
}

export default BookModel;