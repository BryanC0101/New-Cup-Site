const nav = document.querySelector("nav");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
});


const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

async function carregarNoticia() {
    try {

        const resposta = await fetch("/newsPage/noticias.json");
        const noticias = await resposta.json();

        const noticia = noticias.find(noticia => noticia.id === id);

        if (!noticia) {

            document.querySelector("main").innerHTML = `
                <h1>Notícia não encontrada</h1>
                <p>A notícia solicitada não existe.</p>
            `;

            return;
        }

        const imagem = document.getElementById("imageMainNews");

        imagem.src = noticia.imagem;
        imagem.alt = noticia.titulo;

        document.getElementById("titulo").textContent =
            noticia.titulo;



        document.getElementById("subtitulo").textContent =
            noticia.subtitulo;

        document.getElementById("data").textContent =
            noticia.data;

        const containerParagrafos =
            document.getElementById("paragrafos");

        containerParagrafos.innerHTML = "";

        noticia.paragrafos.forEach(texto => {

            if (texto.trim() === "") {
                return;
            }

            const p = document.createElement("p");

            p.textContent = texto;

            containerParagrafos.appendChild(p);

        });

        document.title = noticia.titulo;


    } catch (erro) {

        console.error("Erro ao carregar notícias:", erro);

    }

}

carregarNoticia();