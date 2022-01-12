let botonImc = document.getElementById("formu")
let result = document.getElementById("result")
let condicion = document.getElementById("condicion")
let masa = document.getElementById("masa")
let datos = []
let url = "http://localhost:4000/personas"
let fragment = document.createDocumentFragment()
let template = document.getElementById("template").content


document.addEventListener('DOMContentLoaded', () => {
    mostrar(url)
})

const mostrar = async(url) => {
    const rest = await fetch(url)
    const data = await rest.json()
    console.log(data)

    data.forEach(element => {
        const {Genero,Edad,Peso,Estatura,MasaCorporal,Estado} = element 
      
        template.getElementById('t1').textContent = Genero;
        template.getElementById('t2').textContent = Edad;
        template.getElementById('t3').textContent = Peso;
        template.getElementById('t4').textContent = Estatura;
        template.getElementById('t5').textContent = MasaCorporal;
        template.getElementById('t6').textContent = Estado;

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        
    });
    tabla.appendChild(fragment)
}

botonImc.addEventListener("submit", e => {
    e.preventDefault
    let sexM = document.getElementById("sexM").checked
    let sexF = document.getElementById("sexF").checked
    let edad = document.getElementById("edad").value
    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value

    
        let sexo = [];
        if (sexM) {
            sexo = "Masculino"
        } 
        if (sexF) {
            sexo = "Femenino"
        }
    

    console.log(sexo,edad,peso,altura)

        let imc = Number((peso/Math.pow(altura / 100, 2)).toFixed(1));
        let estado = 0;
        
        if (imc < 18.5) {
            result.innerHTML = `<h3 style="color: #0083DE">Su Masa Corporal es ${imc}</h3>`
            condicion.innerHTML = `<h4 style="color: #0083DE">Por debajo de peso</h4>`
            masa.setAttribute('value', imc)
            estado= 1;
        } else if (imc >= 18.5 && imc <= 24.9){
            result.innerHTML = `<h3 style="color: #006400">Su Masa Corporal es ${imc}</h3>`
            condicion.innerHTML = `<h4 style="color: #006400">Saludable</h4>`
            masa.setAttribute('value', imc)
            estado= 2;
        } else if (imc >= 25 && imc <= 29.9){
            result.innerHTML = `<h3 style="color: #FADA01">Su Masa Corporal es ${imc}</h3>`
            condicion.innerHTML = `<h4 style="color: #FADA01">Sobre peso</h4>`
            masa.setAttribute('value', imc)
            estado= 3;
        } else if (imc >= 30 && imc <= 39.9){
            result.innerHTML = `<h3 style="color: #ffa500">Su Masa Corporal es ${imc}</h3>`
            condicion.innerHTML = `<h4 style="color: #ffa500">Obeso</h4>`
            masa.setAttribute('value', imc)
            estado= 4;
        } else {
            result.innerHTML = `<h3 style="color: #ff1107">Su Masa Corporal es ${imc}</h3>`
            condicion.innerHTML = `<h4 style="color: #ff1107">Obesidad Extrema o de Alto Riesgo</h4>`
            masa.setAttribute('value', imc)
            estado= 5;
        }
        let registro = {
            Genero: sexo,
            Edad: edad,
            Peso: peso,
            Estatura: altura,
            "Masa Corporal": imc,
        }
        datos.push(registro)
        console.log(datos)
        guardarDatos()
        alert(`su masa corporal es ${imc}`)
        
})


const guardarDatos = () =>{
    localStorage.setItem("usuario", JSON.stringify (datos))
    
}



