import Vue from 'vue'
import AV from 'leancloud-storage'

var leancloud = {
  install(Vue) {
    const appId = "myXKasrokc55MnDVs83Cuyac-MdYXbMMI";
    const appKey = "I0VLRIE0EC6kuJYUTRvpoBfO";
    AV.init({
      appId,
      appKey,
    });
    Vue.prototype.$AV = AV
  }
}
Vue.use(leancloud)
