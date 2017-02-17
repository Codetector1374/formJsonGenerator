<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <router-link class="navbar-brand" :to="{name: 'home'}">Form Editor</router-link>
                </div>
            </div>
        </nav>
        <div class="container first">
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
                    <h1 class="panel-title">Edit Form</h1>
                    <div class="pull-right" style="margin-top: -1.3em">
                        <button class="btn btn-default btn-xs" @click="fold=!fold">折叠/展开</button>
                    </div>
                </div>
                <div class="panel-body">
                    <draggable :list="fileData.form" @start="fold=true" @end="fold=false">
                        <div v-for="(item, index) in fileData.form">
                            <textFieldEdit :collapse="fold" v-if="item.type === 'text'" v-model="fileData.form[index]"></textFieldEdit>
                            <selectFieldEdit :collapse="fold" v-else-if="item.type === 'select'" v-model="fileData.form[index]"></selectFieldEdit>
                            <otherFieldEdit :collapse="fold" v-else v-model="fileData.form[index]"></otherFieldEdit>
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import Vue from 'vue'
    import VueNotifications from 'vue-notifications'
    import fs from 'fs'
    import textFieldEdit from './formEditor/textFieldEdit'
    import otherFieldEdit from './formEditor/otherFieldEdit'
    import selectFieldEdit from './formEditor/selectFieldEdit'
    export default {
        name: 'FormEditor',
        components: {
            textFieldEdit,
            draggable,
            otherFieldEdit,
            selectFieldEdit
        },
        data () {
            return {
                currentFile: '',
                fileData: {},
                fileContent: '',
                fold: false
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
                fs.writeFile(this.currentFile, JSON.stringify(this.fileData, null, 2), 'utf8', function (err) {
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
//                            console.log(self.fileData.form)
                            if (self.fileData.form === undefined) {
                                VueNotifications.warn({message: 'Not a form def file'})
                                self.closeFile()
                                return
                            }
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
    .container.first {
        margin-top: 60px;
    }
</style>
