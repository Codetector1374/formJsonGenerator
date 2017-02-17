<template>
    <div>
        <ul class="list-group">
            <draggable :list="value">
                <li class="list-group-item" v-for="opt in value">
                    {{opt}}
                    <div class="pull-right" style="margin-top: -0.3em">
                        <button class="btn btn-danger btn-sm" @click="removeRow(opt)"><i class="fa fa-trash fa-lg"></i></button>
                    </div>
                </li>
            </draggable>
        </ul>
        <div class="form-group" :class="{'has-error':hasError, 'has-success':(!hasError)}">
            <label class="col-xs-2">添加</label>
            <div class="col-xs-9">
                <input class="form-control" @keyup.enter="addNewRow()" v-model="newData">
                <span v-if="isEmpty" class="help-block">请填写选项</span>
                <span v-else-if="hasDuplicate" class="help-block">选项不能重复</span>
                <span v-else class="help-block">点击或者回车来添加</span>
            </div>
            <div class="col-xs-1 text-right">
                <button class="btn btn-primary btn-sm" :disabled="hasError" @click="addNewRow()"><i
                        class="fa fa-plus fa-lg"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'editableList',
        components: {
            draggable
        },
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        computed: {
            hasError () {
                return this.isEmpty || this.hasDuplicate
            },
            isEmpty () {
                return this.newData.trim() === ''
            },
            hasDuplicate () {
                return this.value.includes(this.newData)
            }
        },
        data () {
            return {
                newData: ''
            }
        },
        methods: {
            addNewRow () {
                const data = this.newData.trim()
                this.newData = ''
                let newArray = this.value.slice()
                newArray.push(data)
                this.$emit('input', newArray)
            },
            removeRow (value) {
                this.$emit('input', this.value.filter(item => item !== value))
            }
        }
    }
</script>

<style scoped>
</style>
