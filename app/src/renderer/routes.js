export default [
    {
        path: '/',
        name: 'home',
        component: require('components/home')
    },
    {
        path: '/edit-config',
        name: 'editConfig',
        component: require('components/EditConfig')
    },
    {
        path: '*',
        redirect: '/'
    }
]

