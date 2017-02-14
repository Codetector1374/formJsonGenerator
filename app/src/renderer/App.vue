<template>
    <div id="#app">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Dummyc0m</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="#" @click="openFile()">Open</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    export default {
        store,
        methods: {
            openFile () {
                console.log(this.$electron.remote.app.getName())
            }
        }
    }
</script>

<style>

</style>
