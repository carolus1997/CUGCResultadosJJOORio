document.addEventListener("DOMContentLoaded", function () {
    let selectedAnswersByForm = {};

    // Mapa de respuestas correctas para cada formulario
    const correctAnswers = {
        'examForm1': ["Centro Regional de Comando y Control Integrado (CICCR) en Río de Janeiro"],
        'examForm2': ["Reivindicaciones en redes sociales de grupos de activistas medioambientales", "Patrullas de policía militar que acuden a los lugares de los atentados", "Se recaba información de los medios de comunicación social"],
        'examForm3': ["Envío de unidades de gestión de masas a la Central Nuclear de Angra", " Envío de unidades del BOPE y TEDAX-NRBQ al lugar de las explosiones", "Puesta en ejecución del plan ante atentados terroristas"],
        'examForm4': ["Portavoz Policial llama a la calma y colaboración ciudadana", "Se informa sobre explosiones y puesta en marcha de plan antiterrorista,", "Portavoz indica punto de contacto para información sobre posibles víctimas"]
    };

    // Nombres de las secciones/formularios
    const formSectionNames = {
        'examForm1': 'Mando y Control',
        'examForm2': 'Situación',
        'examForm3': 'Decisión',
        'examForm4': 'Comunicación'
    };

    // Función que guarda las respuestas seleccionadas
    function saveSelectedAnswers(formId, selectedAnswers) {
        selectedAnswersByForm[formId] = selectedAnswers;
    }

    // Función principal para mostrar los resultados
    function showResults() {
        const selectedAnswersContainer = document.getElementById('selectedAnswersContentDisplay');
        const correctAnswersContainers = {
            'examForm1': document.getElementById('answerMando'),
            'examForm2': document.getElementById('answerSituacion'),
            'examForm3': document.getElementById('answerDecision'),
            'examForm4': document.getElementById('answerComunicacion')
        };

        // Limpiar contenedores antes de agregar nuevos elementos
        selectedAnswersContainer.innerHTML = '';
        Object.values(correctAnswersContainers).forEach(container => {
            container.innerHTML = '';
        });

        // Iterar a través de las formas y agregar las respuestas correspondientes
        Object.keys(selectedAnswersByForm).forEach(formId => {
            const sectionName = formSectionNames[formId]; // Obtener el nombre de la sección
            const selectedAnswers = selectedAnswersByForm[formId];
            const correctAnswersList = correctAnswers[formId];

            // Añadir el nombre de la sección como título en la columna de respuestas seleccionadas
            const selectedSectionTitle = document.createElement('h5');
            selectedSectionTitle.textContent = sectionName;
            selectedSectionTitle.style.color = 'black';  // Asegurar que el título sea visible
            selectedAnswersContainer.appendChild(selectedSectionTitle);

            // Mostrar las respuestas seleccionadas en color negro
            selectedAnswers.forEach(answer => {
                const answerItem = document.createElement('p');
                answerItem.textContent = answer;
                answerItem.style.color = 'black';  // Forzar color negro
                selectedAnswersContainer.appendChild(answerItem);
            });

            // Mostrar las respuestas correctas en color verde
            correctAnswersList.forEach(answer => {
                const correctItem = document.createElement('p');
                correctItem.textContent = answer;
                correctItem.className = 'text-success';  // Aplicar clase de éxito para el color verde
                correctAnswersContainers[formId].appendChild(correctItem);
            });
        });

        // Remover cualquier restricción de altura para asegurar que todo se muestra
        selectedAnswersContainer.style.maxHeight = 'none';
        selectedAnswersContainer.style.overflow = 'visible';

        // Calcular y mostrar el porcentaje de idoneidad
        const totalCorrect = Object.keys(correctAnswers).reduce((sum, formId) => {
            const selected = selectedAnswersByForm[formId] || [];
            const correct = correctAnswers[formId];
            return sum + selected.filter(answer => correct.includes(answer)).length;
        }, 0);
        const totalPossible = Object.values(correctAnswers).reduce((sum, answers) => sum + answers.length, 0);
        const percentage = ((totalCorrect / totalPossible) * 100).toFixed(2);
        document.getElementById('averagePercentage').textContent = `${percentage}%`;

        // Mostrar la sección de resultados
        document.getElementById('resultsSection').style.display = 'block';
    }

    // Manejar el envío de los formularios y guardar las respuestas seleccionadas
    document.querySelectorAll("form[id^='examForm']").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formId = event.target.id;
            const selectedAnswers = Array.from(event.target.querySelectorAll('input:checked')).map(input => input.value);
            saveSelectedAnswers(formId, selectedAnswers);
        });
    });

    // Función para validar la contraseña y mostrar los resultados
    function validatePassword() {
        const password = prompt("Ingrese la contraseña para ver los resultados:");
        if (password === "cugc") {
            showResults();  // Mostrar respuestas seleccionadas y correctas
        } else {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
    }

    // Asignar la función validatePassword al botón de corrección
    document.getElementById('consolidateButton').addEventListener('click', validatePassword);
});
