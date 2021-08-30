import { local } from "kurimudb-zero-config";
import Vue from 'vue'

var kurimudb = {
  install(Vue) {
    Vue.prototype.$local = local
  }
}
Vue.use(kurimudb)