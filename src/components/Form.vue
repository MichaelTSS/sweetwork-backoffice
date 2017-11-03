<template>
  <div class="form">
    <h1>{{ msg }}</h1>
    <v-select label="name"
    :class="{ loading: isFetchingProjects }"
    :on-change="setProjectId"
    v-model="metricsParams.project"
    :options.sync="metricsOptions.projects"
    placeholder="Select a project..."></v-select>
    <br/>
    <v-select label="name" multiple
    :class="{ loading: isFetchingTopics }"
    :options.sync="metricsOptions.topics"
    v-model="metricsParams.topics"
    placeholder="Select topics..."></v-select>
    <br/>
    <v-select
    :options="metricsOptions.intervals"
    v-model="metricsParams.interval"
    placeholder="Select interval..."></v-select>
    <br/>
    <v-select
    :options="metricsOptions.dateRanges"
    v-model="metricsParams.dateRange"
    placeholder="Select date range..."></v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import API from '@/resources/scheduler';

export default {
  name: 'Form',
  components: {
    vSelect,
  },
  data() {
    return {
      msg: 'Make your selection',
      isFetchingProjects: false,
      isFetchingTopics: false,
      metricsParams: {
        project: null,
        topics: null,
        interval: null,
        dateRanges: null,
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
          { id: '30', label: 'Last 7 days' },
          { id: '30', label: 'Yesterday' },
          { id: '-1', label: 'All time' },
        ],
      },
    };
  },
  methods: {
    setProjectId(project) {
      this.metricsParams.project = project;
      this.getTopics(this.metricsParams.project.id);
      this.metricsParams.topics = null;
    },
    // setTopicId(topic) {
      // this.metricsParams.topicId = topic.id;
    // },
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
      });
    },
  },
  created() {
    this.getProjects();
  },
};
</script>

<style>
  /*.v-select input[type=search],
  .v-select input[type=search]:focus {
    width: 20px !important;
  }*/
  .v-select .spinner {
    display: block !important;
  }
</style>
