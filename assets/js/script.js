/* =========================================================
   NINTENDO SWITCH 3D — script compartilhado
   Usa só: querySelector/All, addEventListener, classList,
   createElement/appendChild/removeChild, scroll, getBoundingClientRect
   ========================================================= */

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

