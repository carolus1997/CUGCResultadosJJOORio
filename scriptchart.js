document.addEventListener('DOMContentLoaded', function () {
    const initialData = [0, 0, 0, 0];
    const labels = ["Comunicación", "Situación", "Decisión", "Mando y Control"];
    drawRadarChart(initialData, labels);
});

function drawRadarChart(data, labels) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    window.myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: '% de idoneidad',
                data: data,
                fill: true,
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                pointBackgroundColor: "rgba(151,187,205,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(151,187,205,1)"
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    angleLines: { display: false },
                    ticks: { beginAtZero: true, maxTicksLimit: 5 }
                }
            },
            elements: { line: { borderWidth: 3 } }
        }
    });
}


function showChart() {
    document.getElementById('resultsSection');
    const data = [65, 59, 80, 81]; // Datos de ejemplo
    const labels = ['Mando y Control', 'Situación', 'Decisión', 'Comunicación'];
    drawRadarChart(data, labels);
}



function updateChartWithRealData() {
    // Datos reales para el gráfico de radar
    const realData = [
        calculateScore("Comunicacion"),
        calculateScore("Situacion"),
        calculateScore("Decision"),
        calculateScore("Mando")
    ];
    window.myRadarChart.data.datasets[0].data = realData;
    window.myRadarChart.update();
}

function calculateScore(category) {
    const correctAnswers = {
        "Mando": ["Centro Regional de Comando y Control Integrado (CICCR) en Río de Janeiro"],
        "Situacion": ["Reivindicaciones en redes sociales de grupos de activistas medioambientales", "Patrullas de policía militar que acuden a los lugares de los atentados", "Se recaba información de los medios de comunicación social"],
        "Decision": ["Envío de unidades de gestión de masas a la Central Nuclear de Angra", "Envío de unidades del BOPE y TEDAX-NRBQ al lugar de las explosiones", "Puesta en ejecución del plan ante atentados terroristas"],
        "Comunicacion": ["Portavoz Policial llama a la calma y colaboración ciudadana", "Se informa sobre explosiones y puesta en marcha de plan antiterrorista,", "Portavoz indica punto de contacto para información sobre posibles víctimas"]
    };

    const selectedAnswers = selectedAnswersByCategory[category] || [];
    const correctCount = selectedAnswers.filter(answer => correctAnswers[category].includes(answer)).length;
    return (correctCount / correctAnswers[category].length) * 100;
}

function calculateTotalSuitability() {
    const categories = ["Mando", "Situacion", "Decision", "Comunicacion"];
    let totalScore = 0;

    categories.forEach(category => {
        totalScore += calculateScore(category);
    });

    return totalScore / categories.length;
}

let selectedAnswersByCategory = {};

function updateChart(formId, selectedAnswers) {
    const correctAnswers = {
        'examForm1': ["Centro Regional de Comando y Control Integrado (CICCR) en Río de Janeiro"],
        'examForm2': ["Reivindicaciones en redes sociales de grupos de activistas medioambientales", "Patrullas de policía militar que acuden a los lugares de los atentados", "Se recaba información de los medios de comunicación social"],
        'examForm3': ["Envío de unidades de gestión de masas a la Central Nuclear de Angra", " Envío de unidades del BOPE y TEDAX-NRBQ al lugar de las explosiones", "Puesta en ejecución del plan ante atentados terroristas"],
        'examForm4': ["Portavoz Policial llama a la calma y colaboración ciudadana", "Se informa sobre explosiones y puesta en marcha de plan antiterrorista,", "Portavoz indica punto de contacto para información sobre posibles víctimas"]
    };

    const categoryMap = {
        "examForm1": "Mando",
        "examForm2": "Situacion",
        "examForm3": "Decision",
        "examForm4": "Comunicacion"
    };
    const categoryIndex = {
        "examForm1": 3,
        "examForm2": 1,
        "examForm3": 2,
        "examForm4": 0
    };

    const correctCount = selectedAnswers.filter(answer => correctAnswers[formId].includes(answer)).length;
    const score = (correctCount / correctAnswers[formId].length) * 100;

    const index = categoryIndex[formId];
    window.myRadarChart.data.datasets[0].data[index] = score;
    window.myRadarChart.update();

    const category = categoryMap[formId];
    selectedAnswersByCategory[category] = selectedAnswers;

    document.getElementById(`score${category}`).textContent = `${score.toFixed(2)}%`;

    const totalScore = window.myRadarChart.data.datasets[0].data.reduce((a, b) => a + b);
    const percentageSuitability = (totalScore / 4).toFixed(2);  // Ajustado para 4 categorías
    document.getElementById('averagePercentage').textContent = `${percentageSuitability}%`;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formId = event.target.id;
    const selectedAnswers = Array.from(event.target.querySelectorAll('input:checked')).map(input => input.value);
    
    // Guardar las respuestas seleccionadas
    saveSelectedAnswers(formId, selectedAnswers);
    
    // Mover al siguiente ítem del carrusel
    const carousel = bootstrap.Carousel.getInstance(document.querySelector('#formCarousel'));
    carousel.next();
}


document.getElementById('examForm1').addEventListener('submit', handleFormSubmit);
document.getElementById('examForm2').addEventListener('submit', handleFormSubmit);
document.getElementById('examForm3').addEventListener('submit', handleFormSubmit);
document.getElementById('examForm4').addEventListener('submit', handleFormSubmit);

let selectedAnswersByForm = {};

function saveSelectedAnswers(formId, selectedAnswers) {
    selectedAnswersByForm[formId] = selectedAnswers;
}



