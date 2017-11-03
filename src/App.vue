<template>
  <div id="app">
    <router-view/>
    <div class="wrapper">
      <router-view name="header"/>
      <router-view name="form"/>
      <router-view name="chart"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* */
h1, h2 {
  font-weight: normal;
  text-align: center;
}
a {
  color: #42b983;
}
/* */
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
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
.footer {
  grid-column: 1 / 5;
  grid-row: 4;
}

</style>
