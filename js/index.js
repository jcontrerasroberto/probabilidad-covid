const lambda = document.getElementById("tasaIncidencia") //tasa de incidencia
const i = document.getElementById("numeroClases") //número de clases a lo largo del semestre
const n = document.getElementById("numeroAlumnos") //numero de estudiantes en el aula
const sigma1 = 0.01
let sigma2 = 0.1
const ventilacion1 = document.getElementById("ventilacion1")
const desinfeccion1 = document.getElementById("desinfeccion1")
const oxigenacion = document.getElementById('rangeval')
const edad = document.getElementById("edad")
const diabetes1 = document.getElementById("diabetes1")
const hipertension1 = document.getElementById("hipertension1")
const fuma1 = document.getElementById("fuma1")
const form = document.getElementById("sol")
let v = 10
let p = 0
let sigman = 0
let bandera

const getProb = (alumnos, clases) => {
    const ox = rangeval.value / 100
    const age = edad.value
    sigma2 += (1 - ox) * 0.1
    if (age >= 0 && age <= 17) sigma2 += 0
    if (age >= 18 && age <= 26) sigma2 += 0.01
    if (age >= 27 && age <= 35) sigma2 += 0.02
    if (age >= 36 && age <= 50) sigma2 += 0.03
    if (age >= 51 && age <= 64) sigma2 += 0.04
    if (age >= 65) sigma2 += 0.05

    if (diabetes1.checked) sigma2 += 0.05

    if (hipertension1.checked) sigma2 += 0.05

    if (fuma1.checked) sigma2 += 0.05

    if (ventilacion1.checked)
        v += 3

    if (desinfeccion1.checked)
        v += 2

    sigman = sigma1 + (sigma2 - sigma1) * (1 - Math.exp(-(n.value - 1) / v))

    if (alumnos === undefined) alumnos = n.value;
    if (clases === undefined) clases = i.value;

    p = sigman * (1 - Math.exp((-lambda.value / 100000) * alumnos * clases))

    sigma2 = 0.1
    v = 10
}




form.addEventListener("submit", (e) => {
    e.preventDefault()
    bandera = 0
    if (edad.value === '') {
        alert("Ingresa tu edad")
        return
    }
    if (lambda.value === '') {
        alert("Ingresa la tasa de incidencia")
        return
    }
    if (i.value === '') {
        alert("Ingresa la cantidad de clases")
        return
    }
    if (n.value === '') {
        alert("Ingresa el número de estudiantes")
        return
    }
    getProb()
    if (bandera === 0) {
        Swal.fire({
            icon: "success",
            title: "Resultados",
            html: `<p>La probabilidad de contagio: ${(p * 100).toFixed(2)}%</p>
                <div id="chart_div"></div>
                <div id="chart2_div"></div>`,
        });
    }
    graficarAlumnos()
    graficarClases()
})

function graficarAlumnos() {
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Probabilidad');

        for (var x = 5; x < 36; x++) {
            getProb(x, undefined);
            data.addRow([x, Math.round(p * 100)]);
            console.log("Insertando data: " + p);
        }

        // Set chart options
        var options = {
            'title': 'Probabilidad por cantidad de alumnos',
            'width': 800,
            'height': 800,
            hAxis: {
                title: 'Alumnos'
            },
            vAxis: {
                title: 'Probabilidad',

            }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

function graficarClases() {
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {
            'title': 'How Much Pizza I Ate Last Night',
            'width': 400,
            'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart2_div'));
        chart.draw(data, options);
    }
}