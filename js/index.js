const λ = document.getElementById("tasaIncidencia") //tasa de incidencia
const i = document.getElementById("numeroClases") //número de clases a lo largo del semestre
const n = document.getElementById("numeroAlumnos") //numero de estudiantes en el aula
const 𝜎1 = 0.01
let 𝜎2 = 0.1 
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
let 𝜎n = 0
let bandera

const getProb = () => {
    const ox = rangeval.value / 100
    const age = edad.value
    𝜎2 += ( 1 - ox ) * 0.1
    if(age >= 0 && age <= 17)
        𝜎2 += 0
    if(age >= 18 && age <= 26)
        𝜎2 += 0.01
    if(age >= 27 && age <= 35)
        𝜎2 += 0.02
    if(age >= 36 && age <= 50)
        𝜎2 += 0.03
    if(age >= 51 && age <= 64)
        𝜎2 += 0.04
    if(age >= 65)
        𝜎2 += 0.05

    if(diabetes1.checked)
        𝜎2 += 0.05

    if(hipertension1.checked)
        𝜎2 += 0.05
    
    if(fuma1.checked)
        𝜎2 += 0.05

    if(ventilacion1.checked)
        v += 3
    
    if(desinfeccion1.checked)
        v += 2
    
    𝜎n = 𝜎1 + (𝜎2 - 𝜎1) * (1 - Math.exp(-(n.value - 1) / v ))

    p = 𝜎n * (1 - Math.exp(-λ.value*n.value*i.value))

    𝜎2 = 0.1 
    v = 10
}




form.addEventListener("submit",(e) => {
    e.preventDefault()
    bandera = 0
    if(edad.value === ''){
        alert("Ingresa tu edad")
        return
    }
    if(λ.value === ''){
        alert("Ingresa la tasa de incidencia")
        return
    }
    if(i.value === ''){
        alert("Ingresa la cantidad de clases")
        return
    }
    if(n.value === ''){
        alert("Ingresa el número de estudiantes")
        return
    }
    getProb()
    if (bandera === 0) {
        Swal.fire({
          icon: "success",
          title: "Resultados",
          html: `<p>La probabilidad de contagio: ${p} = ${p*100}%</p>`,
        });
      }
})
