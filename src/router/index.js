import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/my',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Index" */ '../views/my/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'casos',
        name: 'Cases',
        component: () =>
          import(/* webpackChunkName: "Cases" */ '../views/my/Cases.vue'),
      },
      {
        path: 'agenda',
        name: 'Schedules',
        component: () =>
          import(
            /* webpackChunkName: "Schedules" */ '../views/my/Schedule.vue'
          ),
      },
      {
        path: 'reportes',
        name: 'Reports',
        component: () =>
          import(/* webpackChunkName: "Reports" */ '../views/my/Report.vue'),
      },

      {
        path: 'configuracion',
        component: () =>
          import(
            /* webpackChunkName: "IndexSettings" */ '../views/my/settings/Index.vue'
          ),
        children: [
          {
            path: '',
            name: 'Settings',
            component: () =>
              import(
                /* webpackChunkName: "Settings" */ '../views/my/settings/Settings.vue'
              ),
          },
          {
            path: 'comunas',
            name: 'Communes',
            component: () =>
              import(
                /* webpackChunkName: "Communes" */ '../views/my/settings/Commune.vue'
              ),
          },
          {
            path: 'regiones',
            name: 'Regions',
            component: () =>
              import(
                /* webpackChunkName: "Regions" */ '../views/my/settings/Region.vue'
              ),
          },
          {
            path: 'resultado-comite',
            name: 'CommitteeResult',
            component: () =>
              import(
                /* webpackChunkName: "CommitteeResultModel" */ '../views/my/settings/Committee-result.vue'
              ),
          },
          {
            path: 'vias-parto',
            name: 'DeliveryRoute',
            component: () =>
              import(
                /* webpackChunkName: "DeliveryRouteModel" */ '../views/my/settings/Delivery-route.vue'
              ),
          },
          {
            path: 'decision-paciente',
            name: 'PatientDecision',
            component: () =>
              import(
                /* webpackChunkName: "PatientDecisionModel" */ '../views/my/settings/Patient-decision.vue'
              ),
          },
          {
            path: 'establecimiento',
            name: 'Organization',
            component: () =>
              import(
                /* webpackChunkName: "Organization" */ '../views/my/settings/Organization.vue'
              ),
          },
          {
            path: 'estado-casos',
            name: 'StatusCase',
            component: () =>
              import(
                /* webpackChunkName: "StatusCase" */ '../views/my/settings/Status-case.vue'
              ),
          },
          {
            path: 'sistema',
            name: 'System',
            component: () =>
              import(
                /* webpackChunkName: "System" */ '../views/my/settings/System.vue'
              ),
          },
          {
            path: 'usuarios',
            name: 'Users',
            component: () =>
              import(
                /* webpackChunkName: "Users" */ '../views/my/settings/Users.vue'
              ),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('access_token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  }
  console.log(to);
  next();
});

export default router;
