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

## Pendências

- Trocar `assets/video/switch-hero.mp4` pelo vídeo real da modelagem 3D (o arquivo atual é só um placeholder)
- Preencher a ficha de equipe na seção "Projeto" com os nomes do grupo
