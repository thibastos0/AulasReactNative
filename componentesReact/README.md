# componentesReact

Projeto desenvolvido para a disciplina de **Mobile II**, do curso de **Desenvolvimento de Software Multiplataforma (DSM)** da **FATEC Indaiatuba**.

O objetivo desta etapa é aprender como organizar uma aplicação React Native em componentes reutilizáveis e como realizar a transição entre diferentes telas.

## Evolução do projeto

O desenvolvimento começou com uma primeira versão do aplicativo, registrada em `screens/App_antigo.tsx`. Essa versão reúne os exemplos iniciais de componentes, botões, contador e cards.

Depois, o projeto foi reorganizado para que `App.tsx` passasse a ser o ponto de entrada da navegação. A versão anterior foi mantida como uma tela chamada **App antigo**, permitindo acessá-la a partir da tela inicial e comparar a evolução da aplicação.

Para possibilitar essa transição entre telas, foram instaladas e configuradas as dependências do React Navigation, incluindo o navegador nativo em pilha.

## Conteúdo introduzido

### Componentes reutilizáveis

Na pasta `componentes/` foram criados:

- `Saudacao`: exibe uma mensagem de boas-vindas;
- `Botao`: recebe um título e uma função de ação para criar botões reaproveitáveis;
- `Card`: exibe uma imagem, um título e uma descrição.

### Estado e interação

A tela `App_antigo` apresenta um contador criado com `useState`. O valor é atualizado ao pressionar o botão **Incrementar**.

Também há botões para simular ações de salvar, excluir e editar, além de cards com imagens carregadas a partir de URLs externas.

### Navegação entre telas

O arquivo `App.tsx` configura uma navegação nativa em pilha com as seguintes telas:

- `Home`: tela inicial do projeto;
- `App_antigo`: primeira versão do aplicativo, preservada como uma tela;
- `Profile`: tela de perfil que recebe um nome por parâmetro.

Na tela inicial, os botões permitem navegar para o perfil de Thiago ou para a versão antiga do aplicativo. A tela de perfil demonstra a passagem de parâmetros durante a navegação.

## Tecnologias e dependências

- React Native
- Expo
- TypeScript
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `react-native-safe-area-context`
- `react-native-screens`
- React Native Web

## Como executar

Na pasta deste projeto, instale as dependências e inicie o servidor Expo:

```bash
npm install
npx expo start
```

Também é possível iniciar diretamente em uma plataforma específica:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

Abra o QR code no Expo Go ou utilize um emulador configurado. Durante o desenvolvimento, `npx expo start -c` pode ser usado para iniciar o projeto limpando o cache do Metro.

## Organização

```text
.
├── componentes/
│   ├── Botao.tsx
│   ├── Card.tsx
│   └── Saudacao.tsx
├── screens/
│   ├── App_antigo.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── index.ts
├── App.tsx
└── package.json
```

Este projeto continua em construção e servirá de base para novos exemplos de componentes, navegação e funcionalidades mobile.
