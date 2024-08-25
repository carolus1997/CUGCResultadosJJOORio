function printAnswers() {
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Informe de Respuestas Seleccionadas</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('h4 { margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 5px; }');
    printWindow.document.write('p { margin-left: 20px; }');
    printWindow.document.write('.text-success { color: green; }');
    printWindow.document.write('.text-danger { color: red; }');
    printWindow.document.write('.annotationBox { width: 95%; height: 50px; border: 1px solid #ccc; background-color: #f0f0f0; margin: 10px auto 20px; padding: 10px; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');

    printWindow.document.write('<h1>Informe de Respuestas Seleccionadas</h1>');

    const sections = ['Mando y Control', 'Situación', 'Decisión', 'Comunicación'];

    Object.keys(selectedAnswersByForm).forEach((formId, index) => {
        printWindow.document.write(`<h4>${sections[index]}</h4>`);

        // Respuestas seleccionadas
        printWindow.document.write('<h5>Respuestas Seleccionadas:</h5>');
        selectedAnswersByForm[formId].forEach(answer => {
            printWindow.document.write(`<p>- ${answer}</p>`);
            // Añadir recuadro para anotaciones a mano
            printWindow.document.write('<div class="annotationBox"></div>');
        });
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}




function printReport() {
    // Actualiza el gráfico con los datos reales antes de generar el informe
    updateChartWithRealData();

    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Informe de Evaluación</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('h4 { margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 5px; }');
    printWindow.document.write('p { margin-left: 20px; }');
    printWindow.document.write('.annotationBox { width: 95%; height: 50px; border: 1px solid #ccc; background-color: #f0f0f0; margin: 10px auto 20px; padding: 10px; }');
    printWindow.document.write('.selectedAnswer { color: blue; }');
    printWindow.document.write('.correctAnswer { color: green; }');
    printWindow.document.write('.incorrectAnswer { color: red; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');

    printWindow.document.write('<h1>Informe de Evaluación Equipo 2</h1>');
    printWindow.document.write('<h2>Resultados de la práctica</h2>');

    // Obtener la imagen del gráfico de radar
    const canvas = document.getElementById("radarChart");
    const imgData = canvas.toDataURL("image/png");
    printWindow.document.write('<div><img src="' + imgData + '" width="400" height="400"/></div>');

    // Añadir preguntas, respuestas seleccionadas y correctas
    const correctAnswers = {
        "Mando": ["Centro Regional de Comando y Control Integrado (CICCR) en Río de Janeiro"],
        "Situacion": ["Reivindicaciones en redes sociales de grupos de activistas medioambientales", "Patrullas de policía militar que acuden a los lugares de los atentados", "Se recaba información de los medios de comunicación social"],
        "Decision": ["Envío de unidades de gestión de masas a la Central Nuclear de Angra", "Envío de unidades del BOPE y TEDAX-NRBQ al lugar de las explosiones", "Puesta en ejecución del plan ante atentados terroristas"],
        "Comunicacion": ["Portavoz Policial llama a la calma y colaboración ciudadana", "Se informa sobre explosiones y puesta en marcha de plan antiterrorista,", "Portavoz indica punto de contacto para información sobre posibles víctimas"]
    };

    const selectedAnswers = {
        "Mando": selectedAnswersByCategory["Mando"] || [],
        "Situacion": selectedAnswersByCategory["Situacion"] || [],
        "Decision": selectedAnswersByCategory["Decision"] || [],
        "Comunicacion": selectedAnswersByCategory["Comunicacion"] || []
    };

    const sections = ['Mando', 'Situacion', 'Decision', 'Comunicacion'];
    sections.forEach(section => {
        printWindow.document.write('<h4>' + section + '</h4>');

        printWindow.document.write('<h5>Respuestas Seleccionadas</h5>');
        selectedAnswers[section].forEach(answer => {
            const isCorrect = correctAnswers[section].includes(answer);
            const answerClass = isCorrect ? 'correctAnswer' : 'incorrectAnswer';
            printWindow.document.write('<p class="' + answerClass + '">- ' + answer + '</p>');
        });

        printWindow.document.write('<h5>Respuestas Correctas</h5>');
        correctAnswers[section].forEach(answer => {
            printWindow.document.write('<p class="correctAnswer">- ' + answer + '</p>');
        });

        const correctCount = selectedAnswers[section].filter(answer => correctAnswers[section].includes(answer)).length;
        const score = (correctCount / correctAnswers[section].length) * 100;
        printWindow.document.write('<p><b>Porcentaje de Idoneidad: ' + score.toFixed(2) + '%</b></p>');
    });

    const totalSuitability = calculateTotalSuitability();
    printWindow.document.write('<h3><b>Idoneidad Total: ' + totalSuitability.toFixed(2) + '%</b></h3>');

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}