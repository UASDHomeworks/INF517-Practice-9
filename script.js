document.getElementById('datosForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturar datos
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const categoria = document.getElementById('categoria').value;
  const puntuacion = parseInt(document.getElementById('puntuacion').value);

  // Mostrar resultados
  document.getElementById('verNombre').textContent = nombre;
  document.getElementById('verEdad').textContent = edad;
  document.getElementById('verCategoria').textContent = categoria;
  document.getElementById('verPuntuacion').textContent = puntuacion;

  document.getElementById('resultados').classList.remove('hidden');

  // Datos simulados para los gráficos
  const categorias = ['A', 'B', 'C', 'D'];
  const puntuaciones = [
    Math.floor(Math.random() * 6) + 5,
    Math.floor(Math.random() * 6) + 5,
    Math.floor(Math.random() * 6) + 5,
    Math.floor(Math.random() * 6) + 5
  ];
  puntuaciones[categorias.indexOf(categoria)] = puntuacion; // Real puntuacion
  // basicamente la grafica se adapta a el valor de puntuacion que ponga
  // Gráfico de Barras
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: categorias,
      datasets: [{
        label: 'Puntuación por Categoría',
        data: puntuaciones,
        backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
      }]
    },
    options: { plugins: { title: { display: true, text: 'Barras - Comparativa' } } }
  });

  // Gráfico Circular
  new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: {
      labels: categorias,
      datasets: [{
        data: puntuaciones,
        backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
      }]
    },
    options: { plugins: { title: { display: true, text: 'Distribución por Categoría' } } }
  });

  // Gráfico de Líneas (evolución simulada)
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Tu progreso',
        data: [4, 5, 6, 7, 8, puntuacion],
        borderColor: '#667eea',
        tension: 0.4,
        fill: false
      }]
    },
    options: { plugins: { title: { display: true, text: 'Evolución en el Tiempo' } } }
  });

  // 4. Gráfico Radar
  new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: ['Velocidad', 'Precisión', 'Creatividad', 'Consistencia', 'Esfuerzo'],
      datasets: [{
        label: 'Tu Perfil',
        data: [puntuacion, puntuacion-1, puntuacion+1, puntuacion, puntuacion+2].map(v => Math.max(1, Math.min(10, v))),
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: '#667eea'
      }]
    },
    options: { plugins: { title: { display: true, text: 'Perfil de Habilidades' } } }
  });

  // Scroll suave hacia los gráficos
  document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
});
