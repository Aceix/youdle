import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/HomeView').default
    },
    {
      path: '/settings',
      name: 'settings-view',
      component: require('@/components/SettingsView').default
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
});
