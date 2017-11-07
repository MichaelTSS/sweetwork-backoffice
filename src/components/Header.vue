<template>
  <div class="header">
    <h1>{{ msg }}</h1>
    <div class="wrapper">
      <div class="col">
        <a v-for="link in links" :href="link">{{ humanizeURL(link) }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      msg: 'Sweetwork BackOffice',
      links: [
        'http://sagalbot.github.io/vue-select/',
        'https://github.com/websmurf/vue-progress-button',
        'https://vuejs.org/',
        'https://github.com/vuejs/awesome-vue',
        'https://api.highcharts.com/highcharts/',
      ],
    };
  },
  methods: {
    humanizeURL(url) {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    },
  },
};
</script>
<style scoped lang="scss">
  a {
    display: block;
  }
  .wrapper .col {
    grid-column: 2 / 3;
    grid-row: 1;
  }
</style>
