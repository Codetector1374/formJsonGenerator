<template>
    <div id="app">
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-transition"></router-view>
        </transition>
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
        margin-top: 60px;
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
</style>
