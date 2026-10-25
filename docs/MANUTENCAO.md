# Manutenção e publicação

## Instalação reproduzível

Use Node.js 24 e npm. Na pasta do projeto:

```bash
npm ci
npm run dev
```

`npm ci` instala as versões do `package-lock.json`. Não é necessário configurar variáveis de ambiente para a versão atual.

## Validação

```bash
npm run typecheck
npm run build
```

O projeto não inclui uma suíte de testes automatizados. A validação funcional foi feita no navegador em desktop e em larguras móveis de 390 e 320 px.

Após alterações de interface, conferir:

1. Menu móvel, fechamento por Escape e links âncora.
2. Navegação lateral, indicação da seção ativa e ausência de rolagem lateral da página.
3. Abas de tecnologia e pronta resposta, incluindo navegação por teclado.
4. Filtros da galeria, botões de rolagem, ampliação e fechamento do diálogo.
5. Links comerciais com o plano correto na mensagem de WhatsApp.
6. FAQ, foco visível e preferência de movimento reduzido.

## Onde editar

| Conteúdo | Arquivo |
| --- | --- |
| WhatsApp, Instagram, área do cliente e URLs | `lib/site.ts` |
| Nomes, valores e recursos dos planos | `lib/site.ts` |
| Promoção e data de vencimento | `components/PricingSection.tsx` e `components/PricingCard.tsx` |
| Respostas do FAQ, incluindo promoção | `components/FAQ.tsx` |
| Textos e fotos da pronta resposta | `components/RecoverySection.tsx` |
| Título, descrição e favicon | `app/layout.tsx` |
| Cores, tipografia e layout | `app/globals.css` |
| Efeitos e navegação lateral | `components/ScrollEffects.tsx` e `components/ui.tsx` |

O contato comercial foi preservado conforme o briefing. A promoção atual do COMBAT vence em **31/10/2026**. Como a página é pré-renderizada, publique um novo build após a expiração ou alteração da oferta e atualize também o FAQ.

## Atualizar as fotos

Adicione a imagem em `public/images/recuperados/`, preferencialmente em WebP. Atualize a lista `photos` em `RecoverySection.tsx`, com categoria e texto alternativo. O caminho atual é formado por `registro-{id}.webp`. Registre a origem em `ASSETS.md`.

As fotos são apresentadas como acervo institucional. Não há atribuição de datas, locais ou tempos de recuperação que não constem no material.

## Publicação com servidor Node.js

Em um serviço compatível com Next.js:

```bash
npm ci
npm run build
npm start
```

O servidor usa a porta 3000 por padrão. A hospedagem pode fornecer `PORT` no ambiente. Os scripts utilizam Webpack devido à falha de inicialização de processos do Turbopack observada neste ambiente Windows.

O repositório não inclui o build, as dependências, credenciais de hospedagem nem arquivos temporários. Faça a instalação e o build no ambiente de publicação. A versão atual não foi configurada como exportação estática para GitHub Pages.

## Atualizar dependências

O projeto preserva React 18 com tipos da mesma versão e TypeScript 5.9. O Next.js instalado emite aviso de descontinuação futura do React 18. Ao atualizar React, Next.js ou Framer Motion, valide as tipagens e as interações em conjunto, antes de publicar.

Mantenha `package-lock.json` versionado. O comando antigo `next lint` foi substituído por `npm run typecheck`, pois não há configuração de lint no projeto.
