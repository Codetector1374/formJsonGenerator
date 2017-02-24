export default [
    {
        path: '/home',
        name: 'home',
        component: require('components/home')
    },
    {
        path: '/edit-config',
        name: 'editConfig',
        component: require('components/EditConfig')
    },
    {
        path: '/edit-form',
        name: 'editForm',
        component: require('components/FormEditor')
    },
    {
        path: '*',
        redirect: '/edit-form'
    }
]

