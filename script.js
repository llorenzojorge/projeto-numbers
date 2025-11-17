// Seleciona os elementos do formulário
const form = document.querySelector("form")
const numbers = document.getElementById("numbers")
const min = document.getElementById("min")
const max = document.getElementById("max")
const toggle = document.getElementById("toggle")

// Captura o evento de submit do form para obter os valores
form.onsubmit = (event) => {
    event.preventDefault()

    const newDraw = {
        numbers: numbers.value,
        min: min.value,
        max: max.value,
        toggle: toggle.checked,
    }
}