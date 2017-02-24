<template>
    <div id="app">
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-transition"></router-view>
        </transition>
        <!--<footer class="footer">-->
            <!--<div class="container">-->
                <!--<p class="text-muted">© 2017 木轮子打气筒</p>-->
            <!--</div>-->
        <!--</footer>-->
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    export default {
        store,
        data () {
            return {
                transitionName: 'slide-left'
            }
        },
        methods: {
        }
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
