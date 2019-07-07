import Vue from "vue";
// import "/socket.io/socket.io.js";
import "./rem.js"
import "./index.css"
import App from "./vue/index.vue";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element);
var socket = io(location.host);
window.socket = socket;
new Vue({
    el:".app",
    render: h => h(App)
})

