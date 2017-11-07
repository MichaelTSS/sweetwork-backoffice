<template>
  <div id="app">
    <router-view/>
    <div class="wrapper">
      <router-view name="header"/>
      <router-view name="form"/>
      <router-view name="chart"/>
      <router-view name="gazCharts"/>
    </div>
  </div>
</template>

<script>
import schedulerAPI from '@/resources/scheduler';
import controllerAPI from '@/resources/controller';

export default {
  name: 'app',
  data() {
    return {
      metrics: {},
    };
  },
  methods: {
    getSchedulerMetrics(p) {
      const params = {
        sources: p.sources.map(x => x.id).join(','),
        dateRange: p.dateRange.id,
        interval: p.interval.id,
        client_ids: p.project.id,
        entities: ['result', 'author'].join(','),
      };
      schedulerAPI.query('/metrics', params).then((data) => {
        this.metrics = data.metrics;
        this.$emit('update-chart', params);
      });
    },
    getControllerMetrics(p) {
      const params = {
        sources: p.sources.map(x => x.id).join(','),
        dateRange: p.dateRange.id,
        interval: p.interval.id,
        client_ids: p.project.id,
      };
      controllerAPI.query('/metrics', params).then((data) => {
        this.gazMetrics = data.metrics;
        this.$emit('update-gaz-charts', params);
      });
    },
  },
  created() {
    this.$on('get-metrics', (params) => {
      this.getSchedulerMetrics(params);
      this.getControllerMetrics(params);
    });
  },
};
</script>

<style lang="scss">
  @import './assets/variables';

  body {
    background-color: $white;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // color: #2c3e50;
    color: $haze;
  }
  /* */
  h1, h2 {
    font-weight: normal;
    text-align: center;
    color: $emerald;
  }
  a {
    // color: #42b983;
    color: $sky;
  }
  /* */
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    .header {
      grid-column: 1 / 5;
      grid-row: 1;
    }
    .form {
      grid-column: 1;
      grid-row: 2 / 4;
    }
    .chart {
      grid-column: 2 / 5;
      grid-row: 2 / 4;
    }
    .gaz-charts {
      grid-column: 1 / 5;
      grid-row: 4;
    }
    .col-1-3 {
      grid-column: 1;
      grid-row: 1;
    }
    .col-2-3 {
      grid-column: 2;
      grid-row: 1;
    }
    .col-3-3 {
      grid-column: 3;
      grid-row: 1;
    }
  }
</style>
