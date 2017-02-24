<template>
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
    </div>
</template>

<script>
    import CheckBox from 'components/CheckBox'
    export default {
        name: 'textFieldEdit',
        components: {
            CheckBox
        },
        props: {
            value: {
                type: Object,
                required: true
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
