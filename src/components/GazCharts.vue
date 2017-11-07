<template>
  <div class="gaz-charts">
    <h1>{{ msg }}</h1>
    <p>{{ $parent.gazMetrics }}</p>
    <!-- <highcharts :options="optionsFB" ref="highcharts"></highcharts> -->
    <!-- <highcharts :options="optionsIG" ref="highcharts"></highcharts> -->
    <div class="wrapper">
      <div class="col-1-3">
        <highcharts :options="optionsFB" ref="facebook"></highcharts>
      </div>
      <div class="col-2-3">
        <highcharts :options="optionsTW" ref="twitter"></highcharts>
      </div>
      <div class="col-3-3">
        <highcharts :options="optionsIG" ref="instagram"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/resources/utils';

const facebookColor = '#3b5998';
const twitterColor = '#00b6f1';
const instagramColor = '#c32aa3';

export default {
  name: 'GazCharts',
  props: ['gazMetrics'],
  data() {
    return {
      msg: 'Many little charts',
      optionsFB: {
        chart: {
          backgroundColor: '#FAFAFA',
          type: 'line',
          zoomType: 'x',
        },
        colors: [facebookColor],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
              symbol: 'circle',
            },
          },
        },
        title: { text: null },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: '# of requests',
          },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [],
      },
      optionsTW: {
        chart: {
          backgroundColor: '#FAFAFA',
          type: 'line',
          zoomType: 'x',
        },
        colors: [twitterColor],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
              symbol: 'circle',
            },
          },
        },
        title: { text: null },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: '# of requests',
          },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [],
      },
      optionsIG: {
        chart: {
          backgroundColor: '#FAFAFA',
          type: 'line',
          zoomType: 'x',
        },
        colors: [instagramColor],
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
              symbol: 'circle',
            },
          },
        },
        title: { text: null },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: '# of requests',
          },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [],
      },
    };
  },
  methods: {
    helperUpdateChart(params, source, optionLabel) {
      const chart = this.$refs[source].chart;
      const c = Object.assign(this[optionLabel], {
        series: this.$parent.gazMetrics.series.filter(x => x.source === source),
      });
      c.xAxis.min = utils.computeMinDateRange(params);
      chart.update(c);
    },
    updateSeries(params) {
      if (!this.$refs.facebook || !this.$refs.twitter || !this.$refs.instagram) return;
      //
      this.helperUpdateChart(params, 'facebook', 'optionsFB');
      this.helperUpdateChart(params, 'twitter', 'optionsTW');
      this.helperUpdateChart(params, 'instagram', 'optionsIG');
    },
  },
  created() {
    this.$parent.$on('update-gaz-charts', params => this.updateSeries(params));
  },
};
</script>
