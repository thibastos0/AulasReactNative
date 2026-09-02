# Aulas de React Native

Repositório de aprendizado e experimentação com **React Native**, desenvolvido ao longo da matéria de **Mobile II** do curso de **Desenvolvimento de Software Multiplataforma (DSM)** da **FATEC Indaiatuba**.

Aqui ficam reunidos exemplos, exercícios e pequenos projetos construídos durante as aulas. O conteúdo evolui junto com a disciplina: novas pastas e aplicações serão adicionadas conforme os conceitos forem apresentados.

## Projetos atuais

### `my-app`

Projeto inicial criado com Expo e TypeScript. Apresenta os primeiros conceitos da plataforma, incluindo:

- estrutura básica de uma aplicação React Native;
- componentes `View`, `Text`, `Image` e `Pressable`;
- estilos com `StyleSheet`;
- interação com o usuário e barra de status.

### `componentesReact`

Projeto voltado à composição de interfaces e navegação entre telas. Contém:

- componentes reutilizáveis, como `Botao` e `Card`;
- telas de início, perfil e uma anterior de um aplicativo criado para treinar componentes;
- navegação em pilha com React Navigation;
- exemplos de passagem de parâmetros entre telas.

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Web

## Como executar

Pré-requisitos:

- Node.js e npm instalados;
- Expo CLI disponível pelo projeto;
- Expo Go no dispositivo móvel ou um emulador configurado.

Escolha um dos projetos e execute os comandos na pasta correspondente:

```bash
cd my-app
npm install
npx expo start
```

Para executar o outro projeto:

```bash
cd componentesReact
npm install
npx expo start
```

Com o servidor iniciado, use o QR code no Expo Go ou escolha uma das opções disponíveis no terminal, como Android, iOS ou web.

## Organização do repositório

```text
.
├── componentesReact/   # Componentes reutilizáveis e navegação entre telas
├── my-app/             # Projeto introdutório de React Native
└── README.md           # Visão geral e instruções do repositório
```

## Próximos conteúdos

Este repositório está em construção. Novos projetos devem explorar, entre outros temas:

- componentes e propriedades;
- estado e eventos;
- formulários e listas;
- consumo de APIs;
- persistência de dados;
- navegação e organização de aplicações mobile.

Cada pasta representa uma etapa prática do aprendizado e pode ter suas próprias instruções de execução e dependências.

## Objetivo

Registrar a evolução prática na disciplina de Mobile II e servir como material de consulta para os estudos de desenvolvimento multiplataforma com React Native.
