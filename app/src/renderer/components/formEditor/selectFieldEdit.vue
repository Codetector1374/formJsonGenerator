<template>
    <div class="panel panel-default">
        <div class="panel-heading draggable">
            <h1 class="panel-title">{{value.title}}</h1>
            <h1 class="pull-right panel-title" style="margin-top: -1em;">单选</h1>
        </div>
        <div class="collapse-animation" :class="{collapsed : collapse}">
            <div class="panel-body">
                <div class="form-group row">
                    <label class="col-xs-6">是否必填项</label>
                    <div class="col-xs-6">
                        <CheckBox v-model="value.required"></CheckBox>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-4 control-label">标题</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" v-model="value.title">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-4 control-label">默认值</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" :value="value.default">
                    </div>
                </div>
                <div>
                    <h4>选项列表(拖拽排序)</h4>
                    <editableList v-model="value.options"></editableList>
                </div>
            </div>
            <div class="panel-footer">
                ID: {{value.id}}
            </div>
        </div>
    </div>
</template>

<script>
    import CheckBox from 'components/CheckBox'
    import editableList from './editableList'
    export default {
        name: 'selectFieldEdit',
        methods: {
            test (value) {
            }
        },
        components: {
            CheckBox,
            editableList
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            collapse: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .draggable {
        cursor: move;
    }

    .collapsed {
        height: 0;
        overflow: hidden;
    }

    .collapse-animation {
        -moz-transition: height .5s;
        -ms-transition: height .5s;
        -o-transition: height .5s;
        -webkit-transition: height .5s;
        transition: height .5s;
    }
</style>
