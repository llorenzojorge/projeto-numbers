// Seleciona os elementos do formulário de sorteio.
const formDraw = document.querySelector("form")
const quantityInput = document.getElementById("numbers")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")
const toggle = document.getElementById("toggle")

// Seleciona as seções de sorteio + resultado
const contentForm = document.getElementById("content-form")
const result = document.getElementById("result")

// Seleciona mensagem de erro/aviso
const error = document.getElementById("error")
const messageError = document.getElementById("messageError")

// Função reutilizável para remover caracteres dos inputs. 
function removeCharacter(input) {
    // Substitui caracteres não númericos por uma string vazia.
    let value = input.value.replace(/\D/g, "")
    // Garante que não retorne NaN quando o input estiver vazio.
    input.value = value ? parseInt(value, 10) : ""
}

// Função para validar valores aceitáveis
function validationForm(newDraw) {
    // Verifica se o valor mínimo é maior ou igual ao valor máximo.
    if (newDraw.minInput >= newDraw.maxInput) {
        error.classList.remove("hidden")
        error.classList.add("show-flex")
        messageError.textContent("O valor mínimo não pode ser maior ou igual que o valor máximo.")
    }

    // Verifica se a quantidade de números sorteados é possível de ser gerada.
    else if (newDraw.toggle === true) {
        const range = parseInt(newDraw.maxInput - newDraw.minInput + 1)

        if (newDraw.quantityInput > range) {
            error.classList.remove("hidden")
            error.classList.add("show-flex")
            messageError.textContent("Não é possível sortear essa quantidade sem repetir números.")
        }
    }

    // Se não existir erro, retornará null.
    return null
}

// Aplica função removeCharacter() para os 3 inputs principais.
[quantityInput, minInput, maxInput].forEach(input => {
    input.addEventListener("input", () => removeCharacter(input))
})

// Captura o evento de submit do form para obter os valores.
formDraw.onsubmit = (event) => {
    event.preventDefault()

    // Cria objeto com os valores dos input's.
    const newDraw = {
        quantityInput: Number(quantityInput.value),
        minInput: Number(minInput.value),
        maxInput: Number(maxInput.value),
        toggle: toggle.checked,
    }

    // Chama a função que valida os valores.
    // validationForm(newDraw)
    if (validationForm(newDraw) === null) {
        alert("deu certo")
    } else {
        alert("Informe os números novamente.")
        formClear()
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

    error.classList.add("hidden")
    error.classList.remove("show-flex")

    quantityInput.focus()
}