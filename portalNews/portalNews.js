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



async function carregarNoticias() {

    const container = document.getElementById("newsList");

    try {

        const resposta = await fetch("/newsPage/noticias.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o JSON.");
        }

        const noticias = await resposta.json();

        noticias.forEach(noticia => {

            const card = document.createElement("a");
            card.href = `/newsPage/newsPage.html?id=${noticia.id}`;

            card.classList.add("cardNews");

            card.innerHTML = `

                <img
                    src="${noticia.imagem}"
                    alt="${noticia.titulo}"
                >

                <div class="cardInfo">

                    <div class="data">
                        ${noticia.data}
                    </div>

                    <h2>
                        ${noticia.titulo}
                    </h2>

                    <p>
                        ${noticia.resumo || noticia.subtitulo}
                    </p>

                </div>

            `;

            container.appendChild(card);

        });

    } catch (erro) {

        console.error(erro);

        container.innerHTML = `
            <p>
                Erro ao carregar as notícias.
            </p>
        `;

    }

}

carregarNoticias();