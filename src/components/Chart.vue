<template>
  <div class="chart">
    <h1>{{ msg }}</h1>
    <!-- <p>{{ $parent.metrics }}</p> -->
    <highcharts :options="options" ref="highcharts"></highcharts>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Chart',
  props: ['metrics'],
  data() {
    return {
      msg: 'What a great chart',
      options: {
        chart: {
          backgroundColor: '#FAFAFA',
          type: 'line',
          zoomType: 'x',
        },
        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        tooltip: {
          formatter() {
            /* eslint-disable */
            let s = `<b>${moment(this.x).format("dddd, MMM Do, HH:mm")}</b><br/>`;
            const sortByPointY = (a, b) => (a.y > b.y) ? -1 : ((b.y > a.y) ? 1 : 0);
            this.points.sort(sortByPointY).forEach(point => {
              s += `<br/><span style="color: ${point.color};">${point.series.name.split('-')[1]}: ${point.y}</span>`;
            });
            return s;
          },
          shared: true,
        },
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
          plotBands: [],
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: '# of posts',
          },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [],
      },
    };
  },
  methods: {
    updateSeries() {
      if (!this.$refs.highcharts) return;
      const chart = this.$refs.highcharts.chart;
      const c = Object.assign(this.options,
        { series: this.$parent.metrics.series },
        { xAxis: { plotBands: [], type: 'datetime' }},
      );
      //
      this.$parent.metrics.plotBands.forEach(x => {
        const color = (x.status === 'error') ? '#F1AB8C' : '#FCFFC5';
        c.xAxis.plotBands.push({ from: x.from, to: x.to, color });
      });
      chart.update(c);
    },
  },
  created() {
    this.$parent.$on('update-chart', () => this.updateSeries());
  },
};
</script>
