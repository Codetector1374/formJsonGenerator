<template>
    <div id='app'>
        <transition :name='transitionName' mode='out-in'>
            <router-view class='child-transition'></router-view>
        </transition>
        <!--<footer class='footer'>-->
        <!--<div class='container'>-->
        <!--<p class='text-muted'>© 2017 木轮子打气筒</p>-->
        <!--</div>-->
        <!--</footer>-->
    </div>
</template>

<script>
//    import iconImage from './assets/icon.png'
    import store from 'renderer/vuex/store'
    import {join} from 'path'
    export default {
        store,
        data () {
            return {
                transitionName: 'slide-left'
            }
        },
        created () {
            const {Menu, app} = this.$electron.remote
            console.log(join(__dirname, 'app/icons/icon.icns'))
            console.log(app)
            const template = [{
                label: 'Application',
                submenu: [
                    {
                        label: '退出',
                        accelerator: 'Command+Q',
                        click: function () {
                            app.quit()
                        }
                    }
                ]
            }, {
                label: '编辑',
                submenu: [
                    {label: '撤销', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
                    {label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
                    {type: 'separator'},
                    {label: '剪切', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
                    {label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
                    {label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
                    {label: '全选', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
                ]
            }
            ]
            Menu.setApplicationMenu(Menu.buildFromTemplate(template))
        },
        methods: {}
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        overflow: hidden;
        /*margin-top: 60px;*/
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
        transition: opacity .2s ease;
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
        transition: opacity .5s ease;
    }

    .child-transition {
        transition: all .4s ease;
    }

    #app {
        /* Margin bottom by footer height */
        /*margin-bottom: 60px;*/
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: right;
        /* Set the fixed height of the footer here */
        height: 60px;
        background-color: #f5f5f5;
    }

    /*.container .text-muted {*/
    /*margin: 20px 0;*/
    /*}*/

</style>
