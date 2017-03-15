<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <router-link class="navbar-brand" :to="{name: 'home'}">表格编辑器</router-link>
                </div>
            </div>
        </nav>
        <div class="container first">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <!--<h1 class="panel-title">Select File</h1>-->
                    <button class="btn btn-default" v-if="!hasFileOpen" @click="openFile()">打开文件</button>
                    <button class="btn btn-success" v-if="!hasFileOpen" @click="createAndOpen()">创建并打开文件</button>
                    <button class="btn btn-primary" v-if="hasFileOpen" @click="saveFile()">保存</button>
                    <button class="btn btn-danger" v-if="hasFileOpen" @click="closeFile()">关闭文件</button>
                </div>
                <div class="panel-body">
                    <b>当前文件: </b>{{currentFile}}
                </div>
            </div>
            <!--<div class="panel panel-default" v-if="hasFileOpen">-->
                <!--<div class="panel-heading">-->
                    <!--<h4 class="panel-title">-->
                        <!--<a data-toggle="collapse" data-target="#fileView"-->
                           <!--href="javascript:" class="collapsed">-->
                            <!--File Raw Content-->
                        <!--</a>-->
                    <!--</h4>-->

                <!--</div>-->
                <!--<div id="fileView" class="panel-collapse collapse">-->
                    <!--<div class="panel-body">-->
                        <!--<pre>{{fileContent}}</pre>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="panel panel-default" v-if="hasFileOpen">
                <div class="panel-heading">
                    <h1 class="panel-title">编辑表格</h1>
                    <div class="pull-right" style="margin-top: -1.3em">
                        <button class="btn btn-default btn-xs" @click="fold=!fold">折叠/展开</button>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row" style="margin-bottom: 1em">
                        <div class="col-xs-4"><button class="btn btn-default btn-block" @click="createItem('text')">添加填空</button></div>
                        <div class="col-xs-4"><button class="btn btn-default btn-block" @click="createItem('select')">添加单选</button></div>
                        <div class="col-xs-4"><button class="btn btn-default btn-block" @click="createItem('select-multiple')">添加多选</button></div>
                    </div>
                    <draggable :list="fileData.form" @start="fold=true" @end="fold=false">
                        <FieldEditor v-for="(item, index) in fileData.form" :collapse="fold" v-model="fileData.form[index]" :id="index" @remove="removeItem"></FieldEditor>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uuidV4 from 'uuid/v4'
    import draggable from 'vuedraggable'
    import Vue from 'vue'
    import VueNotifications from 'vue-notifications'
    import fs from 'fs'
    import FieldEditor from './formEditor/FieldEditor'
    export default {
        name: 'FormEditor',
        components: {
            draggable,
            FieldEditor
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
            createItem (type) {
                // uuid
                let newForm = {
                    id: uuidV4().toUpperCase(),
                    required: false,
                    default: '',
                    type: type
                }
                switch (type) {
                    case 'text':
                        newForm.title = '新建文本问题'
                        break
                    case 'select':
                        newForm.title = '新建单选问题'
                        newForm.options = []
                        break
                    case 'select-multiple':
                        newForm.title = '新建多选问题'
                        newForm.options = []
                        break
                }
                this.fileData.form.splice(0, 0, newForm)
            },
            removeItem (id) {
                this.fileData.form.splice(id, 1)
            },
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
            createAndOpen () {
                const self = this
                setTimeout(function () {
                    let defaultForm = {
                        form: []
                    }
                    const {dialog} = self.$electron.remote
                    dialog.showSaveDialog({
                        filters: [

                            {name: 'JsonObject', extensions: ['json']}

                        ]
                    }, function (fileName) {
                        if (fileName === undefined) return
                        fs.writeFile(fileName, JSON.stringify(defaultForm, null, 2), 'utf8', function (err) {
                            if (err) {
                                VueNotifications.err({message: 'Failed to save file'})
                            } else {
                                VueNotifications.success({message: 'File Saved!'})
                                self.readFile(fileName)
                                self.currentFile = fileName
                            }
                        })
                    })
                }, 0)
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
