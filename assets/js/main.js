/*ChatBot*/
const ChatBot = document.querySelector(".ChatBot")
const conversa = document.querySelector(".area-conversa")
const floatingWindow = document.getElementById('floatingWindow');
const dragHeader = document.getElementById('dragHeader');
const X = document.querySelector(".fa-xmark")
const comments = document.querySelector(".fa-comments")

let conversaVisivel = false
let isDragging = false;
let offsetX = 0;
let offsetY = 0; 

dragHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const boundingRect = floatingWindow.getBoundingClientRect();
    offsetX = e.clientX - boundingRect.left;
    offsetY = e.clientY - boundingRect.top;
    dragHeader.style.cursor = 'grabbing';
    floatingWindow.style.transition = 'none'; // Desativa temporariamente a transição para movimento suave
    floatingWindow.style.userSelect = 'none'; // Desativa seleção de texto na janela flutuante
});


document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const floatingWindowRect = floatingWindow.getBoundingClientRect();

        // Limitações para não ultrapassar as bordas do site
        if (newX < 0) {
            floatingWindow.style.left = '0px';
        } else if (newX + floatingWindowRect.width > windowWidth) {
            floatingWindow.style.left = `${windowWidth - floatingWindowRect.width}px`;
        } else {
            floatingWindow.style.left = `${newX}px`;
        }

        if (newY < 0) {
            floatingWindow.style.top = '0px';
        } else if (newY + floatingWindowRect.height > windowHeight) {
            floatingWindow.style.top = `${windowHeight - floatingWindowRect.height}px`;
        } else {
            floatingWindow.style.top = `${newY}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        dragHeader.style.cursor = 'grab';
        floatingWindow.style.transition = ''; // Reativa a transição para movimento suave
        floatingWindow.style.userSelect = ''; // Restaura a seleção de texto na janela flutuante
    }
});

ChatBot.addEventListener("click", () => {
    if (conversaVisivel) {
        conversa.style.opacity = '0'
        conversa.style.pointerEvents = 'none'
        conversa.style.bottom = '50px'
        comments.style.opacity = '1'
        X.style.opacity = '0'

    } else {
        conversa.style.opacity = '1'
        conversa.style.pointerEvents = 'all'
        conversa.style.bottom = '65px'
        X.style.opacity = '1'
        comments.style.opacity = '0'
    }

    conversaVisivel = !conversaVisivel
})

/*interação ChatBOT */
const option1 = document.querySelector(".bot-msg-option1")
const option2 = document.querySelector(".bot-msg-option2")
const mainMensage = document.querySelector(".main-mensage")

let optionSelecionada = 0

/*Cria a box para as outras opções */
let boxOption1 = document.createElement("div")
boxOption1.classList.add("box-bot-msg-option")

/*Cria as opções dentro da Box */
let boxOption1_option1 = document.createElement("div")
let boxOption1_option2 = document.createElement("div")
boxOption1_option1.classList.add("bot-msg-option1")
boxOption1_option2.classList.add("bot-msg-option2")


function createDiv(optionSel) {
    let NewDiv = document.createElement("div")
    NewDiv.classList.add("user-msg")

    let answerDiv = document.createElement("div")
    answerDiv.classList.add("bot-msg")

    switch (optionSel) {
        case 1:
            NewDiv.innerHTML = "Sou novo."
            mainMensage.appendChild(NewDiv)

            answerDiv.innerHTML = "Como gostaria de prosseguir?"
            mainMensage.appendChild(answerDiv)

            mainMensage.appendChild(boxOption1)
            boxOption1_option1.innerHTML = "Antendimento de urgência"
            boxOption1.appendChild(boxOption1_option1)

            boxOption1_option2.innerHTML = "Outros"
            boxOption1.appendChild(boxOption1_option2)

            break
        case 2:
            NewDiv.innerHTML = "Sou Psicólogo."
            mainMensage.appendChild(NewDiv)

            answerDiv.innerHTML = "Como gostaria de prosseguir?"
            mainMensage.appendChild(answerDiv)

            mainMensage.appendChild(boxOption1)
            boxOption1_option1.innerHTML = "Gostaria de entrar para nossa equipe?"
            boxOption1.appendChild(boxOption1_option1)

            boxOption1_option2.innerHTML = "Outros"
            boxOption1.appendChild(boxOption1_option2)
            break
    }


    mainMensage.scrollTop = mainMensage.scrollHeight
}

function answer_boxOption1(optionSel) {
    let NewDiv = document.createElement("div")
    NewDiv.classList.add("user-msg")

    let answerDiv = document.createElement("div")
    answerDiv.classList.add("bot-msg")

    let send_mensage = document.querySelector(".send-mensage")

    switch (optionSel) {
        case 1:
            NewDiv.innerHTML = "Antendimento de urgência"
            mainMensage.appendChild(NewDiv)

            answerDiv.innerHTML = "Por favor, entre em contato no nosso WhatsApp para podermos dar prosseguimento ao seu atendimento. "
            answerDiv.insertAdjacentHTML('beforeend', '<a href="https://api.whatsapp.com/send/?phone=5561998366514&text&type=phone_number&app_absent=0" target="_blank">WhatsApp</a>') // adiciona uma tag no html
            mainMensage.appendChild(answerDiv)
            break
        case 2:
            NewDiv.innerHTML = "Outros"
            mainMensage.appendChild(NewDiv)
            answerDiv.innerHTML = "Por favor, digite o que gostaria de saber."
            mainMensage.appendChild(answerDiv)
            send_mensage.style.color = "#00c5c2"
            send_mensage.addEventListener('click', () => {
                var textArea = document.querySelector("#text-area")
                let NewDiv = document.createElement("div")
                NewDiv.classList.add("user-msg")
                NewDiv.innerHTML = textArea.value
                mainMensage.appendChild(NewDiv)
                textArea.value = ''

                let answerDiv = document.createElement("div")
                answerDiv.classList.add("bot-msg")
                answerDiv.innerHTML = "Aguarde, estamos redirecionando sua conversa para um dos nossos Psicólogos."
                mainMensage.appendChild(answerDiv)
                mainMensage.scrollTop = mainMensage.scrollHeight
            })


            break
    }

    mainMensage.scrollTop = mainMensage.scrollHeight
}

function boxOption1_option1_Click() {
    optionSelecionada = 1
    answer_boxOption1(optionSelecionada)
    boxOption1_option1.style.backgroundColor = "#00c5c2"
    boxOption1_option1.removeEventListener("click", boxOption1_option1_Click) // Remove o eventListener da option2
    boxOption1_option2.removeEventListener("click", boxOption1_option2_Click) // Remove o eventListener da option1
}


function boxOption1_option2_Click() {
    optionSelecionada = 2
    answer_boxOption1(optionSelecionada)
    boxOption1_option2.style.backgroundColor = "#00c5c2"
    boxOption1_option1.removeEventListener("click", boxOption1_option1_Click) // Remove o eventListener da option2
    boxOption1_option2.removeEventListener("click", boxOption1_option2_Click) // Remove o eventListener da option1
}

function handleOption1Click() {
    optionSelecionada = 1
    option1.style.backgroundColor = "#00c5c2"
    createDiv(optionSelecionada)
    option1.removeEventListener("click", handleOption1Click) // Remove o eventListener da option1
    option2.removeEventListener("click", handleOption2Click) // Remove o eventListener da option2
}

function handleOption2Click() {
    optionSelecionada = 2;
    option2.style.backgroundColor = "#00c5c2"
    createDiv(optionSelecionada)
    option1.removeEventListener("click", handleOption1Click) // Remove o eventListener da option1
    option2.removeEventListener("click", handleOption2Click) // Remove o eventListener da option2
}

// Adicionando os eventListeners
option1.addEventListener("click", handleOption1Click)
option2.addEventListener("click", handleOption2Click)

boxOption1_option1.addEventListener("click", boxOption1_option1_Click)
boxOption1_option2.addEventListener("click", boxOption1_option2_Click)

/*Slider */
let count = 1
document.getElementById('radio1').checked = true;

setInterval(function () {
    nextImage()
}, 6000)

function nextImage() {
    count++
    if (count > 2) {
        count = 1
    }
    document.getElementById(`radio${count}`).checked = true
}

/*btn go to top */

const goTop = document.querySelector(".go-to-top")
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
        goTop.classList.add('active')
    } else {
        goTop.classList.remove("active")
    }
})

/*Mudar cor dos infomativos*/
const informativoBox = document.querySelectorAll(".informativo-box")
const infoButton = document.querySelectorAll(".info-button")
MudarCor(informativoBox, infoButton)

function MudarCor(informativoBox, infoButton) {
    for (let i = 0; i < informativoBox.length; i++) {
        informativoBox[i].addEventListener('mouseover', () => {
            infoButton[i].style.color = "#00c5c2"
        })

        informativoBox[i].addEventListener('mouseout', () => {
            infoButton[i].style.color = ""
        })
    }
}


/*AJUDA*/


