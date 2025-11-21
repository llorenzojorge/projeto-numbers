// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const numbers = document.getElementById("numbers")
const min = document.getElementById("min")
const max = document.getElementById("max")
const toggle = document.getElementById("toggle")

// Função reutilizável para remover caracteres dos inputs. 
function removeCharacter(input) {
    // Substitui caracteres não númericos por uma string vazia.
    let value = input.value.replace(/\D/g, "")
    // Garante que não retorne NaN quando o input estiver vazio.
    input.value = value ? parseInt(value, 10) : ""
}

// Aplica função removeCharacter() para os 3 inputs principais.
[numbers, min, max].forEach(input => {
    input.addEventListener("input", () => removeCharacter(input))
})

// Captura o evento de submit do form para obter os valores.
form.onsubmit = (event) => {
    event.preventDefault()

    // Cria objeto com os valores dos input's.
    const newDraw = {
        numbers: numbers.value,
        min: min.value,
        max: max.value,
        toggle: toggle.checked,
    }

    formClear()
}

// Limpa os dados do formulário.
function formClear() {
    // Limpa os input's
    numbers.value = ""
    min.value = ""
    max.value = ""
    toggle.checked = false

    numbers.focus()
}