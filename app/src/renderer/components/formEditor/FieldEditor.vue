<template>
    <div class="panel panel-default">
        <div class="panel-heading draggable">
            <a @click="hide=!hide" style="text-decoration: none; cursor: pointer; color: #000;"><h1 class="panel-title">{{value.title}}</h1></a>
            <h1 class="pull-right panel-title" style="margin-top: -1em;">{{nameTypeOf(value.type)}}</h1>
        </div>
        <div class="collapse-animation" :class="{collapsed : hide}">
            <textFieldEdit v-if="value.type === 'text'" v-model="value"></textFieldEdit>
            <selectFieldEdit v-else-if="value.type === 'select'" v-model="value"></selectFieldEdit>
            <multipleSelect v-else-if="value.type === 'select-multiple'" v-model="value"></multipleSelect>
            <otherFieldEdit v-else v-model="value"></otherFieldEdit>
            <div class="panel-footer">
                ID: {{value.id}}
                <div class="pull-right">
                    <button class="btn btn-xs btn-danger" @click="removeSelf"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import textFieldEdit from './textFieldEdit'
    import otherFieldEdit from './otherFieldEdit'
    import selectFieldEdit from './selectFieldEdit'
    import multipleSelect from './multipleSelect'
    export default {
        name: 'FieldEditor',
        components: {
            textFieldEdit,
            otherFieldEdit,
            selectFieldEdit,
            multipleSelect
        },
        data () {
            return {
                hide: this.collapse
            }
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            collapse: {
                type: Boolean,
                default: false
            },
            id: {
                type: Number,
                required: true
            }
        },
        watch: {
            collapse (newVal) {
                this.hide = newVal
            }
        },
        methods: {
            nameTypeOf (type) {
                switch (type) {
                    case 'text':
                        return '文本'
                    case 'select':
                        return '单选'
                    case 'select-multiple':
                        return '多选'
                    default:
                        return '其他(' + type + ')'
                }
            },
            removeSelf () {
                this.$emit('remove', this.id)
            }
        }
    }
</script>

<style scoped>
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
