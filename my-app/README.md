# my-app

Aplicação introdutória desenvolvida para a disciplina de **Mobile II**, do curso de **Desenvolvimento de Software Multiplataforma (DSM)** da **FATEC Indaiatuba**.

Este projeto marca os primeiros passos com React Native e Expo. A aplicação apresenta uma tela simples de boas-vindas, reunindo componentes visuais, estilos e uma interação básica com o usuário.

## Conteúdo introduzido

O exemplo demonstra:

- criação de uma aplicação React Native com TypeScript;
- uso do componente `View` como estrutura de layout;
- exibição de textos com `Text`;
- carregamento de uma imagem remota com `Image`;
- criação de um botão com `Pressable`;
- alteração visual do botão durante o pressionamento;
- resposta a uma ação do usuário com `alert`;
- organização dos estilos com `StyleSheet`;
- configuração da barra de status com `expo-status-bar`.

## Estrutura da tela

A tela principal é renderizada pelo arquivo `App.tsx` e contém:

1. Um título sobre aplicativos mobile.
2. Um texto apresentando o aprendizado de React Native.
3. Uma imagem carregada a partir de uma URL.
4. Um botão que exibe uma mensagem quando pressionado.

O layout utiliza `flex: 1`, alinhamento central e orientação vertical para organizar o conteúdo no centro da tela.

## Tecnologias

- React Native `0.81`
- Expo `54`
- React `19`
- TypeScript `5`
- React Native Web

## Como executar

Na raiz deste projeto, instale as dependências e inicie o Expo:

```bash
npm install
npx expo start
```

Depois, abra a aplicação usando o QR code no Expo Go ou selecione uma plataforma disponível no terminal:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Experimentação

Com o aplicativo em execução, pressione o botão **Clique Aqui** para observar a mudança de estado visual e a mensagem de interação.

Este projeto serve como base para os próximos exercícios do repositório, que irão introduzir novos componentes, telas, navegação e funcionalidades mobile.
