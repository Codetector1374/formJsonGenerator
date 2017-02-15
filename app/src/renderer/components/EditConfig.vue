<template>
    <div class="container">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Edit Config</a>
                </div>
            </div>
        </nav>
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
        <div class="panel panel-default" v-if="hasFileOpen">
            <div class="panel-heading">
                <h1 class="panel-title">Edit Template</h1>
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <li class="list-group-item form-horizontal" v-for="(value, key) in fileData">
                        <div class="form-group">
                            <label :for="key" class="col-xs-2 control-label">{{key}}</label>
                            <div class="col-xs-9">
                                <input type="text" class="form-control" :id="key" :value="value"
                                       @input="change(key, $event)">
                            </div>
                            <div class="col-xs-1">
                                <button class="btn btn-danger btn-block" @click="remove(key)"><i class="fa fa-trash fa-lg"></i></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueNotifications from 'vue-notifications'
    import fs from 'fs'
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
            remove (key) {
                Vue.delete(this.fileData, key)
            },
            change (key, event) {
                this.fileData[key] = event.target.value
            },
            saveFile () {
                fs.writeFile(this.currentFile, JSON.stringify(this.fileData), 'utf8', function (err) {
                    if (err) {
                        VueNotifications.err({message: 'Failed to save file'})
                    } else {
                        VueNotifications.success({message: 'File Saved!'})
                    }
                })
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
    .list-group-item .form-group {
        margin-bottom: 0 !important;
    }

    .panel-heading a:after {
        font-family: 'Glyphicons Halflings';
        content: "\e114";
        float: right;
        color: grey;
    }

    .panel-heading a.collapsed:after {
        content: "\e080";
    }
</style>
