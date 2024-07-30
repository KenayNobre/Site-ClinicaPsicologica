const goTop = document.querySelector(".go-to-top")
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
        goTop.classList.add('active')
    } else {
        goTop.classList.remove("active")
    }
})

document.addEventListener("DOMContentLoaded", function() {
    var perguntas = document.querySelectorAll('.pergunta');

    perguntas.forEach(function(pergunta) {
        pergunta.addEventListener('click', function() {
            var resposta = this.nextElementSibling;
            var icon = this.querySelector('.fa-circle-chevron-right');

            if (resposta.style.display === "block") {
                resposta.style.display = "none";
                icon.classList.remove('rotate');
            } else {
                resposta.style.display = "block";
                icon.classList.add('rotate');
            }
        });
    });
});
