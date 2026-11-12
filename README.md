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

### `TechStoreMobile`

Aplicativo de loja de produtos de tecnologia com catálogo local e carrinho de compras. Explora:

- navegação entre início, catálogo, detalhes e carrinho;
- filtros por categoria;
- inclusão de produtos no carrinho e cálculo do total;
- componentes reutilizáveis para cabeçalho, categorias e cards de produtos;
- React Native Web para execução no navegador.

### `TechStore_comDB`

Aplicativo de cadastro de produtos com persistência local em SQLite. Permite:

- listar produtos cadastrados;
- cadastrar novos produtos com validação de nome e preço;
- editar produtos existentes;
- excluir produtos com confirmação;
- atualizar a lista automaticamente ao retornar para a tela principal;
- executar os diálogos de confirmação tanto no nativo quanto na web.

### `docesAnyapp`

Aplicativo de cardápio digital de doces, desenvolvido com Expo, TypeScript e SQLite. Oferece:

- cadastro, edição, visualização e exclusão de produtos;
- informações de nome, preço, categoria, imagem e descrição;
- tela de detalhes dos itens;
- persistência local no banco `docesAnyapp.db`;
- navegação com React Navigation Native Stack.

### `app-recursos-camera`

Aplicativo didático para explorar os recursos de câmera do Expo. Permite:

- alternar entre as câmeras frontal e traseira;
- ativar ou desativar o flash;
- capturar fotos;
- visualizar a prévia da imagem;
- salvar fotos na galeria usando `expo-media-library`.

O recurso depende de APIs nativas e deve ser testado em um aparelho ou emulador Android/iOS, não na Web.

### `app-recursos-audio`

Aplicativo focado em gravação, reprodução e compartilhamento de áudio. Inclui:

- solicitação de acesso ao microfone;
- gravação em alta qualidade;
- exibição da duração da gravação;
- listagem das gravações durante a execução do app;
- reprodução e compartilhamento dos arquivos;
- uso de `expo-audio` e `expo-sharing`.

### `app-iot`

Painel IoT que integra React Native, MQTT e um ESP32 simulado no Wokwi. Permite:

- monitorar temperatura e umidade de um sensor DHT22 em tempo real;
- controlar remotamente um LED conectado ao ESP32;
- publicar e receber mensagens por MQTT através do broker HiveMQ;
- confirmar na interface o estado real do LED por telemetria.

O projeto contém também o circuito e o firmware de exemplo em `wokiwi_example/`.

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Web
- Expo SQLite
- Expo Camera
- Expo Media Library
- Expo Audio
- Expo Sharing
- MQTT e ESP32

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

```bash
cd componentesReact
npm install
npx expo start
```

```bash
cd TechStoreMobile
npm install
npx expo start
```

```bash
cd TechStore_comDB
npm install
npx expo start
```

```bash
cd docesAnyapp
npm install
npx expo start
```

```bash
cd app-recursos-camera
npm install
npx expo start
```

```bash
cd app-recursos-audio
npm install
npx expo start
```

```bash
cd app-iot
npm install
npx expo start
```

Os projetos de câmera e áudio devem ser executados em dispositivo ou emulador compatível com os recursos nativos. Com o servidor iniciado, use o QR code no Expo Go ou escolha uma das opções disponíveis no terminal, como Android, iOS ou web.

## Organização do repositório

```text
.
├── componentesReact/       # Componentes reutilizáveis e navegação entre telas
├── my-app/                 # Projeto introdutório de React Native
├── TechStoreMobile/        # Catálogo local e carrinho de compras
├── TechStore_comDB/        # Cadastro de produtos com SQLite
├── docesAnyapp/            # Cardápio de doces com SQLite
├── app-recursos-camera/    # Câmera, captura e salvamento de fotos
├── app-recursos-audio/    # Gravação, reprodução e compartilhamento de áudio
├── app-iot/                # Painel IoT com ESP32 e MQTT
├── comandos&ref.txt        # Anotações e comandos utilizados nas aulas
└── README.md               # Visão geral e instruções do repositório
```

## Próximos conteúdos

Este repositório está em construção. Novos projetos devem explorar, entre outros temas:

- componentes e propriedades;
- estado e eventos;
- formulários e listas;
- consumo de APIs;
- persistência de dados;
- navegação e organização de aplicações mobile;
- integração entre telas, banco local, hardware e componentes reutilizáveis.

Cada pasta representa uma etapa prática do aprendizado e pode ter suas próprias instruções de execução e dependências.

## Objetivo

Registrar a evolução prática na disciplina de Mobile II e servir como material de consulta para os estudos de desenvolvimento multiplataforma com React Native.
