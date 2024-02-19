import { Controller } from "@hotwired/stimulus"
const { Chart, registerables } = await import('chart.js');

Chart.register(...registerables)

// Connects to data-controller="dashboard"
export default class extends Controller {
  initialize() {
    const data = [10,40,20,30,90,3,70];
    const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

    const ctx = document.getElementById("revenueChart")

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ravenue $',
          data: data,
          borderWidth: 3,
          fill: true
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            border: {
              dash: [5,5]
            },
            grid: {
              color: '#d4f3ef'
            },
            beginAtZero: true
          }
        }
      }
    })
  }
}
