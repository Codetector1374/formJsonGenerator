<template>
    <input type="checkbox" data-size="mini" :checked="processBoolean(value)">
</template>

<script>
    import $ from 'jquery'
    import ForceBoolean from 'force-boolean'
    export default {
        name: 'CheckBox',
        mounted () {
            const self = this
            $(this.$el).bootstrapSwitch()
            $(this.$el).on('switchChange.bootstrapSwitch', function (event, state) {
                self.value = state
            })
        },
        props: {
            value: {
                type: String | Boolean,
                default: true
            }
        },
        methods: {
            valueChanged (event) {
                console.log(event)
            },
            processBoolean (value) {
                return ForceBoolean(value)
            }
        }
    }
</script>

<style scoped>
</style>
