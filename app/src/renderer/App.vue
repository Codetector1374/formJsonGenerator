<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import test from 'components/test.vue'
    import store from 'renderer/vuex/store'
    export default {
        store,
        methods: {
            openFile () {
                const self = this
                setTimeout(function () {
                    const {dialog} = self.$electron.remote
                    dialog.showOpenDialog({
                        filters: [
                            {name: 'Json', extensions: ['json']}
                        ]
                    }, function (fileNames) {
                        console.log(fileNames)
                        if (fileNames === undefined) {
                            console.log('No file selected')
                        } else {
                            self.readFile(fileNames[0])
                        }
                    })
                }, 0)
            },
            readFile (filepath) {
                const fs = require('fs')
                fs.readFile(filepath, 'utf-8', function (err, data) {
                    if (err) {
                        alert('An error ocurred reading the file :' + err.message)
                        return
                    }
                    // Change how to handle the file content
                    console.log('The file content is : ' + data)
                })
            }
        },
        components: {
            test
        }
    }
</script>

<style>

</style>
