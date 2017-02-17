import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css'
import 'bootstrap-switch/dist/js/bootstrap-switch'
import 'bootstrap-select/dist/js/bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import miniToastr from 'mini-toastr'

import VueNotifications from 'vue-notifications'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

const toastTypes = {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
}

miniToastr.init({types: toastTypes})

// Here we setup messages output to `mini-toastr`
function toast ({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
}

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our output to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}
Vue.use(VueNotifications, options)
VueNotifications.config.timeout = 3000

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes
})

/* eslint-disable no-new */
new Vue({
    router,
    ...App
}).$mount('#app')
window.addEventListener('dragover', function (e) {
    e = e || event
    e.preventDefault()
}, false)
window.addEventListener('drop', function (e) {
    e = e || event
    e.preventDefault()
}, false)
