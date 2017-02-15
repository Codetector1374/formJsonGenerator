<template>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <!--<h1 class="panel-title">Select File</h1>-->
                <button class="btn btn-default" v-if="!hasFileOpen" @click="openFile()">Open</button>
                <button class="btn btn-primary" v-if="hasFileOpen" @click="saveFile()">Save</button>
                <button class="btn btn-danger" v-if="hasFileOpen" @click="closeFile()">Close</button>
            </div>
            <div class="panel-body">
                <b>Current File: </b>{{currentFile}}
            </div>
        </div>
        <div class="panel panel-default" v-if="hasFileOpen">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-target="#fileView"
                       href="javascript:" class="collapsed">
                        File Raw Content
                    </a>
                </h4>

            </div>
            <div id="fileView" class="panel-collapse collapse">
                <div class="panel-body">
                    <pre>{{fileContent}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueNotifications from 'vue-notifications'
    export default {
        name: 'EditConfig',
        data () {
            return {
                currentFile: '',
                fileData: {},
                fileContent: ''
            }
        },
        computed: {
            hasFileOpen () {
                return this.currentFile !== ''
            }
        },
        methods: {
            saveFile () {
                VueNotifications.success({message: 'File Saved!'})
            },
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
//                            VueNotifications.warn({message: 'No File selected'})
                        } else {
                            self.readFile(fileNames[0])
                            self.currentFile = fileNames[0]
                        }
                    })
                }, 0)
            },
            closeFile () {
                this.currentFile = ''
                this.fileContent = ''
                this.fileData = {}
            },
            readFile (filepath) {
                const fs = require('fs')
                const self = this
                fs.readFile(filepath, 'utf-8', function (err, data) {
                    if (err) {
                        VueNotifications.error({message: 'An error ocurred reading the file :' + err.message})
                        return
                    }
                    try {
                        if (data.length > 0) {
                            self.fileData = JSON.parse(data)
                        }
                        VueNotifications.success({message: 'File Opened!'})
                    } catch (magic) {
                        VueNotifications.warn({message: 'Invalid file format'})
                    }
                    // Change how to handle the file content
                    self.fileContent = data
                })
            }
        }
    }
</script>

<style scoped>
    .panel-heading a:after {
        font-family:'Glyphicons Halflings';
        content:"\e114";
        float: right;
        color: grey;
    }
    .panel-heading a.collapsed:after {
        content:"\e080";
    }
</style>
