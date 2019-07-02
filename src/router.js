import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import('@/views/Home')
    },
    {
      path: '/create_group',
      name: 'create_group',
      component: () =>
        import('@/views/CreateGroup')
    },
    {
      path: '/group_member/:group_id',
      name: 'group_member',
      props: true,
      component: () =>
        import('@/views/GroupMember')
    },
    {
      path: '/add_member/:group_id',
      name: 'add_member',
      props: true,
      component: () =>
        import('@/views/AddMember')
    },
    {
      path: '/person/new/:group_id',
      name: 'create_person',
      props: true,
      component: () =>
        import('@/views/CreatePerson')
    },
    {
      path: '/@chat/:group_id',
      redirect: '/chat/:group_id'
    },
    {
      path: '/chat/:group_id',
      name: 'chat',
      props: true,
      component: () =>
        import('@/views/Chat')
    },
    {
      path: '/sign-in/:redirect',
      name: 'sign-in',
      props: true,
      component: () =>
        import('@/views/SignIn')
    }
  ]
})
