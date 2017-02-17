<template>
    <input type="checkbox" data-size="mini" :checked="processBoolean(value)">
</template>

<script>
    import $ from 'jquery'
    export default {
        name: 'CheckBox',
        mounted () {
            const self = this
            $(this.$el).bootstrapSwitch()
            $(this.$el).on('switchChange.bootstrapSwitch', function (event, state) {
                self.$emit('input', state)
            })
        },
        props: {
            value: {
                type: String | Boolean,
                default: true
            }
        },
        methods: {
            processBoolean (value) {
                switch (typeof value) {
                    case 'boolean':
                        return value
                    case 'number': // (0 | 1)
                        return (value === 1)
                    case 'string': // ('true' | 'false' | '0' | '1')
                        return (value === 'true' || value === '1')
                }
            }
        }
    }
</script>

<style scoped>
</style>
