# Arquitetura

## Visão geral

A aplicação é uma landing page em português para a GTBLOCK. Utiliza Next.js App Router, React, TypeScript, Tailwind CSS 4 e Framer Motion. Não há banco de dados, autenticação própria, formulários nem API de envio de mensagens.

O conteúdo principal é pré-renderizado. Componentes de cliente acrescentam navegação, animações, abas e galeria. Os botões comerciais abrem o WhatsApp com uma mensagem preparada para o usuário enviar.

## Organização

```text
app/
  layout.tsx               Idioma, metadados, favicon e CSS global
  page.tsx                 Composição da landing page
  globals.css              Design, responsividade e animações
components/
  Header.tsx               Navegação e menu móvel
  Hero.tsx                 Abertura e chamadas para ação
  FeatureGrid.tsx          Empresa e diferenciais
  TechTabs.tsx              Abas sobre rastreamento, bloqueio e conexão
  TrackingMap.tsx           Mapa ilustrativo com rota animada
  ScrollEffects.tsx         Navegação lateral e paralaxe
  RecoverySection.tsx       Pronta resposta e galeria de recuperados
  PricingSection.tsx        Oferta e composição dos planos
  PricingCard.tsx           Card individual de plano
  FAQ.tsx                   Perguntas frequentes
  Footer.tsx                Contato, redes sociais e WhatsApp flutuante
  ui.tsx                    Reveal, adaptação de movimento e ícone
lib/
  site.ts                   Contatos, URLs, planos e mensagens de WhatsApp
public/
  brand/                    Identidade visual oficial
  images/                   Abertura e fotos de recuperados
docs/
  images/                   Prévias para documentação no GitHub
```

## Estilos e fontes

O Tailwind é processado por `@tailwindcss/postcss`, configurado em `postcss.config.mjs`. O CSS importa o Tailwind 4 e carrega `tailwind.config.js` explicitamente com `@config`.

A composição visual usa classes próprias em `app/globals.css` e variáveis CSS. Os títulos usam Space Grotesk como alternativa geométrica à Neue Machina; o corpo usa Montserrat. As fontes vêm do Google Fonts, com fallback de sistema.

## Estado e interações

- O menu móvel mantém estado local e fecha ao selecionar uma seção ou pressionar Escape.
- As abas de tecnologia e pronta resposta aceitam clique, setas, Home e End.
- A galeria filtra o acervo local por carros e motos. A rolagem horizontal é nativa, com scroll snap e controles por botão.
- A ampliação usa `<dialog>` nativo. O foco fica no diálogo; Escape fecha, e as setas navegam entre fotos. A rolagem da página é restaurada ao fechar.
- A navegação lateral observa as seções com `IntersectionObserver`. A linha de progresso usa os valores de rolagem do Framer Motion.
- Os efeitos de entrada rodam uma vez. Em telas de até 600 px, usam menor deslocamento e atraso; a paralaxe é desativada. A preferência `prefers-reduced-motion` é respeitada.
- O FAQ usa `<details>` e `<summary>` nativos.

## Integrações e limites

O mapa é ilustrativo e não consulta dados de veículos. O site não executa bloqueio remoto nem oferece um painel operacional. A área do cliente aponta para o sistema externo de rastreamento da GTBLOCK.

As fotos de recuperados estão copiadas no projeto e otimizadas em WebP; a galeria não depende de uma chamada ao site antigo para carregar. A documentação de origem está em [ASSETS.md](../ASSETS.md).
