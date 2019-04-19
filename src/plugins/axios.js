import axios from 'axios'
import { Cookies } from 'quasar'

const axiosInstance = axios.create({ baseURL: '/sketch' })


export default ({ app, router, Vue }) => {
  //全局注册$.axios
  Vue.prototype.$axios = axiosInstance

}
