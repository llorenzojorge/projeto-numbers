// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const quantityInput = document.getElementById("numbers")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")
const toggle = document.getElementById("toggle")

// Função reutilizável para remover caracteres dos inputs. 
function removeCharacter(input) {
    // Substitui caracteres não númericos por uma string vazia.
    let value = input.value.replace(/\D/g, "")
    // Garante que não retorne NaN quando o input estiver vazio.
    input.value = value ? parseInt(value, 10) : ""
}

// Aplica função removeCharacter() para os 3 inputs principais.
[quantityInput, minInput, maxInput].forEach(input => {
    input.addEventListener("input", () => removeCharacter(input))
})

// Captura o evento de submit do form para obter os valores.
form.onsubmit = (event) => {
    event.preventDefault()

    // Cria objeto com os valores dos input's.
    const newDraw = {
        quantityInput: Number(quantityInput.value),
        minInput: Number(minInput.value),
        maxInput: Number(maxInput.value),
        toggle: toggle.checked,
    }

    // Chama a função que cria o sorteio.
    draw(newDraw)
    formClear()
}

// Sorteador de números.
function draw(newDraw) {
    // Cria uma lista para armazenar os números já sorteados.
    let drawNumbers = []
    let minValue = newDraw.minInput
    let maxValue = newDraw.maxInput

    // Cria um looping para gerar a quantidade de números escolhida pelo usuário.
    for(let i = 0; i < newDraw.quantityInput; i++) {
        let drawNumber = randomBetween(minValue, maxValue)
        
        // Verifica se o usuário não quer que os números se repitam, em seguida verifica se o número sorteado já existe dentro da lista.
        if (newDraw.toggle === true) {
            while (drawNumbers.includes(drawNumber)) {
                drawNumber = randomBetween(minValue, maxValue)
            }
        }

        // Adiciona o número da lista.
        drawNumbers.push(drawNumber)
    }
}

// Gera um número aleatório entre min e max.
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Limpa os dados do formulário.
function formClear() {
    // Limpa os input's
    quantityInput.value = ""
    minInput.value = ""
    maxInput.value = ""
    toggle.checked = false

    quantityInput.focus()
}