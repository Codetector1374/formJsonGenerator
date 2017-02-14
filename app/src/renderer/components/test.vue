<template>
    <code lang="json">{{data}}</code>
</template>

<script>
    export default {
        name: 'test',
        props: {
            data: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>
