# DocesAnyApp

Aplicativo mobile desenvolvido com Expo, React Native e TypeScript para gerenciar um cardápio digital de doces. Os itens são armazenados localmente em SQLite e podem ser cadastrados, visualizados, editados e excluídos.

## 🚀 Visão geral

O projeto oferece:

- tela inicial com acesso ao cardápio;
- listagem dos itens cadastrados;
- cadastro de itens com nome, preço, categoria, imagem e descrição;
- edição e exclusão de itens;
- tela de detalhes do item selecionado;
- persistência local com SQLite.

## 🧩 Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation Native Stack
- Expo SQLite
- Estilização com componentes e temas locais

## 📁 Estrutura do projeto

```bash
docesAnyapp/
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── tsconfig.json
├── assets/
├── src/
│   ├── components/
│   ├── database/
│   ├── screens/
│   └── themes/
└── README.md
```

### Telas

- `Home` — tela inicial do aplicativo.
- `Menu` — lista do cardápio e ações de editar/excluir.
- `AddMenuItem` — formulário de cadastro.
- `EditMenuItem` — formulário de edição.
- `Details` — visualização dos dados de um item.

### Banco de dados

O banco local `docesAnyapp.db` é inicializado na abertura do aplicativo. A tabela `menu_products` armazena:

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id_product` | `INTEGER` | Identificador gerado automaticamente |
| `name` | `TEXT` | Nome do produto |
| `image` | `TEXT` | URL da imagem |
| `category` | `TEXT` | Categoria do produto |
| `description` | `TEXT` | Descrição do produto |
| `price` | `REAL` | Preço do produto |

## ✅ Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm
- Expo Go no celular ou emulador configurado

## 🔧 Instalação

No diretório do projeto, execute:

```bash
npm install
```

## ▶️ Como executar

Inicie o servidor do Expo:

```bash
npm start
```

Em seguida, escolha uma opção:

```bash
npm run android
npm run ios
npm run web
```

## 🧪 Scripts disponíveis

No arquivo `package.json`, os scripts configurados são:

- `npm start` — inicia o projeto Expo
- `npm run android` — abre no Android
- `npm run ios` — abre no iOS
- `npm run web` — executa em navegador

## 📌 Status do projeto

Projeto funcional para demonstração de um CRUD de cardápio com banco de dados local. A interface também pode ser executada na web com o Expo, usando os diálogos do navegador para confirmações e mensagens.

## 🛠️ Próximos passos possíveis

- implementar busca e filtros;
- adicionar carrinho de compras;
- criar autenticação ou cadastro de usuários.

## 👤 Autor

Projeto desenvolvido como exemplo de aplicação React Native com Expo.
