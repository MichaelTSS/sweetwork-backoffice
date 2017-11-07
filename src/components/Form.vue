<template>
  <div class="form">
    <h1>{{ msg }}</h1>
    <v-select label="name"
    :class="{ loading: isFetchingProjects }"
    :on-change="setProject"
    :options.sync="metricsOptions.projects"
    placeholder="Select a project..."></v-select>
    <!-- <br/>
    <v-select label="name" multiple :close-on-select="false"
    :class="{ loading: isFetchingTopics }"
    :options.sync="metricsOptions.topics"
    v-model="metricsParams.topics"
    placeholder="Select topics..."></v-select> -->
    <br/>
    <v-select
    :options="metricsOptions.intervals"
    v-model="metricsParams.interval"
    placeholder="Select an interval..."></v-select>
    <br/>
    <v-select
    :options="metricsOptions.dateRanges"
    v-model="metricsParams.dateRange"
    placeholder="Select a date range..."></v-select>
    <br/>
    <v-select multiple :close-on-select="false"
    :options="metricsOptions.sources"
    v-model="metricsParams.sources"
    placeholder="Select sources..."></v-select>
    <br/>
    <progress-button name="fillColor" @click="fireEvent" :duration="200"
    class="btn btn-primary mr-1 mb-1">Submit</progress-button>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import progressButton from 'vue-progress-button';
import API from '@/resources/scheduler';

export default {
  name: 'Form',
  components: {
    vSelect,
    progressButton,
  },
  data() {
    return {
      msg: 'Make your selection',
      isFetchingProjects: false,
      isFetchingTopics: false,
      metricsParams: {
        project: null,
        topics: null,
        interval: { id: 'hour', label: 'Hour' },
        dateRange: { id: '1', label: 'Yesterday' },
        sources: [{ id: 'twitter', label: 'Twitter' },
        { id: 'instagram', label: 'Instagram' }],
      },
      metricsOptions: {
        projects: [],
        topics: [],
        intervals: [
          { id: 'year', label: 'Year' },
          { id: 'month', label: 'Month' },
          { id: 'week', label: 'Week' },
          { id: 'day', label: 'Day' },
          { id: 'hour', label: 'Hour' },
        ],
        dateRanges: [
          { id: '30', label: 'Last 30 days' },
          { id: '7', label: 'Last 7 days' },
          { id: '1', label: 'Yesterday' },
          { id: '-1', label: 'All time' },
        ],
        sources: [
          { id: 'twitter', label: 'Twitter' },
          { id: 'instagram', label: 'Instagram' },
          { id: 'facebook', label: 'Facebook' },
          { id: 'googlenews', label: 'Googlenews' },
          { id: 'rss', label: 'RSS' },
        ],
      },
    };
  },
  methods: {
    fireEvent() {
      this.$parent.$emit('get-metrics', this.metricsParams);
    },
    setProject(project) {
      this.metricsParams.project = project;
      this.getTopics(project.id);
      this.metricsParams.topics = null;
    },
    getProjects() {
      this.isFetchingProjects = true;
      API.get('/projects').then((data) => {
        this.isFetchingProjects = false;
        this.metricsOptions.projects = data.projects;
      });
    },
    getTopics(clientId) {
      this.isFetchingTopics = true;
      API.query('/topics', { client_id: clientId }).then((data) => {
        this.isFetchingTopics = false;
        this.metricsOptions.topics = data.topics;
        if (this.metricsOptions.topics.length === 1) {
          this.metricsParams.topics = [this.metricsOptions.topics[0]];
        }
      });
    },
  },
  created() {
    this.getProjects();
  },
};
</script>

<style lang="scss">
  @import '../assets/variables';

  .v-select {
    .dropdown-menu > .highlight > a {
      background-color: $emerald;
    }
    .spinner {
      display: block !important;
    }
  }
  .__progress-button {
    position: relative;
    display: block;
    padding: 0 60px;
    outline: none;
    border: none;
    // background: hsl(145, 68%, 35%);
    background: $emerald;
    color: $white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1em;
    line-height: 4;
    margin: 0 auto;
  }
</style>
