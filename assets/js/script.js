/* =========================================================
   NINTENDO SWITCH 3D — script compartilhado
   Usa só: querySelector/All, addEventListener, classList,
   createElement/appendChild/removeChild, scroll, getBoundingClientRect
   ========================================================= */

/* =========================================================
   VÍDEOS — TROQUE SÓ AQUI quando tiver os vídeos de verdade
   =========================================================
   Duas formas de funcionar, escolha uma:

   1) MAIS FÁCIL — nem precisa mexer em código:
      salve o vídeo final com o MESMO NOME do arquivo que já
      está na pasta (assets/video/switch-hero.mp4), substituindo
      o antigo. Pronto, não precisa tocar nessas linhas abaixo.

   2) Quer usar outro nome de arquivo, ou um vídeo diferente
      pra cada seção? Troque o texto entre aspas aqui embaixo:
      - arquivo local: "assets/video/nome-do-arquivo.mp4"
        (o arquivo precisa estar dentro da pasta assets/video/)
      - link direto de vídeo: "https://.../video.mp4"

   NÃO FUNCIONA: link do YouTube, ou link de "compartilhar" do
   Google Drive/Dropbox — esses são páginas, não o arquivo de
   vídeo em si. Se o vídeo vier de um desses, baixe o arquivo
   .mp4 e use a opção 1 (arquivo local) em vez de colar o link.
   ========================================================= */

const VIDEO_HERO = "assets/video/switch-hero.mp4"; // vídeo de fundo do topo da página
const VIDEO_SHOWCASE = "assets/video/VIDEO_SHOWCASE.mp4"; // vídeo em destaque (seção logo abaixo)

function trocarVideo(video, link) {
  if (!video || !link) return;

  const source = video.querySelector("source");
  if (!source) return;

  source.src = link;
  video.load();
}

trocarVideo(document.querySelector("#hero-video"), VIDEO_HERO);
trocarVideo(document.querySelector(".split-video"), VIDEO_SHOWCASE);

/* =========================================================
   RENDERS DA GALERIA — TROQUE SÓ AQUI quando tiver as imagens
   =========================================================
   Mesma ideia dos vídeos: escreva entre aspas o caminho do
   arquivo (ex: "assets/img/galeria/console.jpg", depois de
   colocar a imagem dentro de assets/img/) ou um link direto de
   imagem. Deixe "" (vazio) pra manter o ícone de espaço reservado.

   NÃO FUNCIONA: link de "compartilhar" do Google Drive/Fotos —
   baixe a imagem e use o caminho local.
   ========================================================= */

const RENDER_CONSOLE_DOCK = "assets/img/icons/CONSOLE_DOCK.png"; // 1º card: Console + Dock
const RENDER_JOYCON = "assets/img/icons/JOYCON.png"; // 2º card: Joy-Con
const RENDER_CARREGADOR = "assets/img/icons/CARREGADOR.png"; // 3º card: Modo Portátil

function trocarImagemGaleria(item, link) {
  if (!item || !link) return;

  const placeholder = item.querySelector(".placeholder-icon");
  if (!placeholder) return;

  const img = document.createElement("img");
  img.src = link;
  img.alt = item.getAttribute("data-titulo") || "";

  item.insertBefore(img, placeholder);
  placeholder.style.display = "none";
}

const itensGaleria = document.querySelectorAll(".gallery-item");
const rendersGaleria = [RENDER_CONSOLE_DOCK, RENDER_JOYCON, RENDER_CARREGADOR];

itensGaleria.forEach(function (item, i) {
  trocarImagemGaleria(item, rendersGaleria[i]);
});

/* ---------- 1. Menu mobile ---------- */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("is-open");
  });
}

/* ---------- 2. Revelar seções ao rolar a página ---------- */

const revealEls = document.querySelectorAll(".reveal");

function checkReveal() {
  const alturaTela = window.innerHeight;

  revealEls.forEach(function (el) {
    const posicao = el.getBoundingClientRect().top;

    if (posicao < alturaTela - 100) {
      el.classList.add("is-visible");
    }
  });
}

window.addEventListener("scroll", checkReveal);
window.addEventListener("load", checkReveal);

/* ---------- 3. Vídeo da Hero + carrossel de legendas ---------- */
/* O vídeo roda sozinho em loop, com um zoom lento e contínuo feito
   só em CSS (Ken Burns) — não depende do scroll, então não trava.
   O texto por cima troca sozinho a cada alguns segundos, como um
   slide, com bolinhas pra navegar manualmente. */

const heroVideo = document.querySelector("#hero-video");
const heroVideoBg = document.querySelector(".hero-video-bg");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroCounterAtual = document.querySelector(".hero-counter-current");

let slideAtual = 0;
let heroTimer = null;

function mostrarSlideHero(indice) {
  heroSlides.forEach(function (slide, i) {
    slide.classList.toggle("is-active", i === indice);
  });

  heroDots.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === indice);
  });

  if (heroCounterAtual) {
    const numero = indice + 1;
    heroCounterAtual.textContent = numero < 10 ? "0" + numero : String(numero);
  }

  slideAtual = indice;
}

function proximoSlideHero() {
  mostrarSlideHero((slideAtual + 1) % heroSlides.length);
}

if (heroSlides.length > 0) {
  mostrarSlideHero(0);
}

if (heroSlides.length > 1) {
  heroTimer = window.setInterval(proximoSlideHero, 4500);
}

heroDots.forEach(function (dot, i) {
  dot.addEventListener("click", function () {
    mostrarSlideHero(i);

    if (heroTimer) {
      window.clearInterval(heroTimer);
      heroTimer = window.setInterval(proximoSlideHero, 4500);
    }
  });
});

if (heroVideo) {
  // some com o aviso de "vídeo não adicionado" assim que o vídeo carrega de verdade
  heroVideo.addEventListener("canplay", function () {
    if (heroVideoBg) {
      heroVideoBg.classList.add("has-video");
    }
    heroVideo.play().catch(function () {
      // autoplay bloqueado pelo navegador — sem problema, segue com o overlay
    });
  });

  heroVideo.addEventListener("error", function () {
    if (heroVideoBg) {
      heroVideoBg.classList.remove("has-video");
    }
  });
}

/* ---------- 4. Galeria com lightbox criado via JS ---------- */
/* Usa createElement / appendChild / removeChild (aula 25) */

const botoesGaleria = document.querySelectorAll(".gallery-item");

botoesGaleria.forEach(function (item) {
  item.addEventListener("click", function () {
    const titulo = item.getAttribute("data-titulo") || "Detalhe";
    const descricao = item.getAttribute("data-desc") || "";

    abrirLightbox(titulo, descricao);
  });
});

function abrirLightbox(titulo, descricao) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";

  const box = document.createElement("div");
  box.className = "lightbox-box";

  const botaoFechar = document.createElement("button");
  botaoFechar.className = "lightbox-close";
  botaoFechar.setAttribute("aria-label", "Fechar");
  botaoFechar.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

  const h3 = document.createElement("h3");
  h3.className = "title-lg";
  h3.style.fontSize = "28px";
  h3.textContent = titulo;

  const p = document.createElement("p");
  p.className = "muted";
  p.style.marginTop = "12px";
  p.textContent = descricao;

  box.appendChild(botaoFechar);
  box.appendChild(h3);
  box.appendChild(p);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function fechar() {
    document.body.removeChild(overlay);
  }

  botaoFechar.addEventListener("click", fechar);
  overlay.addEventListener("click", function (evento) {
    if (evento.target === overlay) {
      fechar();
    }
  });
}

