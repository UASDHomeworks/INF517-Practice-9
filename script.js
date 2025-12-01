
const ventasPorAnio = {
  2023: [120000, 135000, 110000, 150000, 170000, 160000, 180000, 195000, 175000, 165000, 155000, 200000],
  2024: [145000, 158000, 172000, 168000, 185000, 195000, 210000, 225000, 205000, 195000, 215000, 240000],
  2025: [160000, 175000, 190000, 195000, 210000, 220000, 235000, 250000, 230000, 225000, 245000, 280000]
};

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

let chartInstance = null;

function generarGrafico() {
  const year = document.getElementById('year').value;
  const type = document.getElementById('chartType').value;
  const data = ventasPorAnio[year];

  // Calcular total y mejor mes
  const total = data.reduce((a, b) => a + b, 0);
  const maxVenta = Math.max(...data);
  const mejorMes = meses[data.indexOf(maxVenta)];

  document.getElementById('totalSales').textContent = `$${total.toLocaleString()}`;
  document.getElementById('bestMonth').textContent = `${mejorMes} ($${maxVenta.toLocaleString()})`;

  // Destruir gráfico anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = document.getElementById('salesChart').getContext('2d');
  
  chartInstance = new Chart(ctx, {
    type: type,
    data: {
      labels: meses,
      datasets: [{
        label: `Ventas ${year}`,
        data: data,
        backgroundColor: type === 'line' 
          ? 'rgba(99, 102, 241, 0.1)' 
          : 'rgba(99, 102, 241, 0.6)',
        borderColor: '#6366f1',
        borderWidth: 3,
        pointBackgroundColor: '#6366f1',
        tension: 0.4,
        fill: type === 'line'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Ventas Mensuales - Año ${year}`,
          font: { size: 20 }
        },
        legend: { position: 'bottom' }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: { callback: value => '$' + value.toLocaleString() }
        }
      }
    }
  });
}

// inicializar al cargar la página
document.addEventListener('DOMContentLoaded', generarGrafico);

// actualizar al hacer clic
document.getElementById('updateBtn').addEventListener('click', generarGrafico);

// actualiza al cambiar año o tipo
document.getElementById('year').addEventListener('change', generarGrafico);
document.getElementById('chartType').addEventListener('change', generarGrafico);
