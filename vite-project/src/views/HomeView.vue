<template>
  <button @click="reloadChart('Brooklyn')">Brooklyn</button>
  <button @click="reloadChart('Manhattan')">Manhattan</button>
  <button @click="reloadChart('Staten Island')">Staten Island</button>
  <button @click="reloadChart('Bronx')">Bronx</button>
  <button @click="reloadChart('Queens')">Queens</button>
  <button @click="reloadChart('')">All</button>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" v-if="loaded" />
  </div>

</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'vue-chartjs'
import callApi from './api2';


async function reloadChart(borough) {
  this.borough = borough;
  this.loaded = false
  try {
    const apiData = await callApi(this.borough)
    this.chartData = {
      labels: Object.keys(apiData),
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#000000"],
          data: Object.values(apiData),
        },
      ],
    }

    this.loaded = true
  } catch (e) {
    console.error(e)
  }
}
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
  data: () => ({
    loaded: false,
    chartData: null,
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
    borough: null
  }),
  async created() {
    this.loaded = false
    try {
      const apiData = await callApi(this.borough)
      this.chartData = {
        labels: Object.keys(apiData),
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#000000"],
            data: Object.values(apiData),
          },
        ],
      }

      console.log(this.chartData)

      this.loaded = true
    } catch (e) {
      alert("Failed to load chart")
      console.error(e)
    }
  },
  methods: { reloadChart }

}

</script>

<style scoped></style>