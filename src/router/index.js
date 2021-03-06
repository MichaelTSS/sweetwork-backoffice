import Vue from 'vue';
import Router from 'vue-router';
import VueHighcharts from 'vue-highcharts';

import HelloWorld from '@/components/HelloWorld';
import Form from '@/components/Form';
import GazCharts from '@/components/GazCharts';
import Chart from '@/components/Chart';
import Header from '@/components/Header';

Vue.use(VueHighcharts);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'BackOffice',
      components: {
        form: Form,
        chart: Chart,
        header: Header,
        gazCharts: GazCharts,
      },
    },
  ],
});
