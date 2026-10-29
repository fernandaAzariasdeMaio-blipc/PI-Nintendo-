# Nintendo Switch — Vitrine Digital

Projeto Integrador da disciplina de Multimídia: uma vitrine digital do Nintendo Switch, unindo modelagem 3D (feita pelo grupo) e desenvolvimento web (HTML, CSS e JavaScript puro, sem frameworks).

## Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — layout (Grid/Flexbox), variáveis de cor, responsividade
- **JavaScript** (vanilla) — menu mobile, scroll reveal, carrossel do hero, lightbox da galeria

## Estrutura de pastas

```
index.html                   → página única do site
assets/
  css/style.css               → todo o estilo
  js/script.js                → toda a interatividade
  img/
    pattern-switch.svg         → padrão de fundo (ícones)
    jogos/                      → capas dos jogos em destaque
  video/
    switch-hero.mp4             → vídeo de fundo do hero (PLACEHOLDER — trocar pelo render real da modelagem 3D)
```

## Seções do site

1. **Hero** — vídeo de fundo + chamada principal
2. **Overview** — resumo do projeto
3. **Showcase** — vídeo em destaque + frase de efeito
4. **Produto** — especificações do console
5. **Jogos** — jogos em destaque + vantagens do ecossistema
6. **Modelagem 3D** — galeria com o que foi modelado
7. **Como Funciona** — os três modos de uso (TV, mesa, portátil)
8. **Processo** — etapas do projeto (modelagem → renderização → dev web → publicação)
9. **Projeto** — ficha do PI (disciplina, entrega, equipe)

## Como ver o site localmente

Não precisa instalar nada. Só abrir o `index.html` direto no navegador, ou, se quiser rodar num servidor local:

```
python -m http.server 8000
```

e acessar `http://localhost:8000`.

## Publicação

O site vai ser publicado na **Vercel**, com o código versionado no **Git/GitHub**.

## Como trocar os vídeos (sem precisar de ajuda)

O vídeo que está em `assets/video/switch-hero.mp4` é **placeholder** — precisa ser trocado pelo vídeo real da modelagem 3D. Duas formas, escolha a que for mais fácil na hora:

**Opção 1 — mais simples, zero código:** salve o vídeo final com o nome exato `switch-hero.mp4` e coloque dentro da pasta `assets/video/`, substituindo o arquivo que já está lá. Pronto, não precisa editar nada.

**Opção 2 — usar outro nome de arquivo ou um vídeo diferente em cada seção:** abra `assets/js/script.js`, logo no topo tem duas linhas assim:

```js
const VIDEO_HERO = "assets/video/switch-hero.mp4";
const VIDEO_SHOWCASE = "assets/video/switch-hero.mp4";
```

Troque o texto entre aspas pelo caminho do novo arquivo (ex: `"assets/video/novo-video.mp4"`) ou por um link direto de vídeo (ex: `"https://.../video.mp4"`). Salva o arquivo e é só isso.

⚠️ **Não funciona:** link do YouTube, nem link de "compartilhar" do Google Drive/Dropbox — esses abrem uma página, não o arquivo de vídeo em si. Se o vídeo vier de um desses lugares, baixa o `.mp4` no computador e usa a Opção 1 ou 2 com o arquivo local.

## Como colocar os renders da galeria (mesma ideia)

A seção "Modelagem 3D" ainda está com ícones no lugar das imagens. Pra trocar, abre `assets/js/script.js` e procura estas três linhas, perto do topo:

```js
const RENDER_CONSOLE_DOCK = "";
const RENDER_JOYCON = "";
const RENDER_MODO_PORTATIL = "";
```

Coloque a imagem dentro de `assets/img/` e escreva o caminho entre aspas (ex: `"assets/img/console-dock.jpg"`), ou um link direto de imagem. Deixando `""` (vazio), continua aparecendo o ícone. Vale o mesmo aviso de antes: link de "compartilhar" do Google Drive/Fotos não funciona — baixa a imagem e usa o caminho local.

## Pendências

- Trocar o vídeo placeholder pelo vídeo real da modelagem 3D (ver seção acima)
- Colocar os renders nos 3 cards da galeria (ver seção acima)
- Preencher a ficha de equipe na seção "Projeto" com os nomes do grupo
