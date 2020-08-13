Component({
  properties: {
    src: {
      type: String,
      value: ""
    }
  },
  data: {

  },
  methods: {
    // 点击,触发父组件的事件,删除图片
    closeImg() {
      let src = this.data.src
      console.log(src)
      this.triggerEvent("closeImg", { src })
    }
  }
})
