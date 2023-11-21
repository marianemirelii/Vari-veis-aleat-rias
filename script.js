function binomialCoefficient(n, k) {
    if (k === 0 || k === n) {
        return 1;
    }
    return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
}

function pmf(N, K, n, k) {
    return (binomialCoefficient(K, k) * binomialCoefficient(N - K, n - k)) / binomialCoefficient(N, n);
}

function cdf(N, K, n, x) {
    let sum = 0;
    for (let i = 0; i <= x; i++) {
        sum += pmf(N, K, n, i);
    }
    return sum;
}

function atualizarGraficos() {
    const N = parseInt(document.getElementById('N').value);
    const K = parseInt(document.getElementById('K').value);
    const n = parseInt(document.getElementById('n').value);

    const dataPoints = [];
    const pmfValues = [];
    const cdfValues = [];

    for (let x = 0; x <= n; x++) {
        dataPoints.push(x);
        pmfValues.push(pmf(N, K, n, x));
        cdfValues.push(cdf(N, K, n, x));
    }

    // Atualizar dados dos gráficos
    pmfChart.data.labels = dataPoints;
    pmfChart.data.datasets[0].data = pmfValues;
    pmfChart.update();

    cdfChart.data.labels = dataPoints;
    cdfChart.data.datasets[0].data = cdfValues;
    cdfChart.update();
}

const pmfChart = new Chart(document.getElementById('pmfChart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Função de massa de probabilidade',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

const cdfChart = new Chart(document.getElementById('cdfChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Função de distribuição cumulativa',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true,
                max: 1
            }
        }
    }
});

// Inicializar gráficos com parâmetros iniciais
atualizarGraficos();