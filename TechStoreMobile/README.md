# TechStoreMobile

Aplicativo mobile de uma loja de produtos de tecnologia, desenvolvido com Expo, React Native e TypeScript.

## Tecnologias

- Expo SDK 57
- React Native 0.86
- React 19
- TypeScript
- React Navigation com Native Stack
- React Native Web

## Como executar

Instale as dependências e inicie o projeto:

```bash
npm install
npm start
```

Depois, escolha o ambiente de execução no terminal do Expo ou use um dos comandos abaixo:

```bash
npm run android
npm run ios
npm run web
```

## Estrutura atual

```text
TechStoreMobile/
├── App.tsx                 # Configuração da navegação principal
├── index.ts                # Ponto de entrada do aplicativo
├── app.json                # Configurações do Expo
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configuração do TypeScript
├── assets/                 # Ícones e recursos visuais locais
├── components/             # Componentes reutilizáveis da interface
│   ├── Category.tsx        # Exibição de uma categoria com ícone e nome
│   ├── Header.tsx          # Cabeçalho com a marca TechStore
│   └── ProductCard.tsx     # Card de produto, preço e ações
├── data/
│   └── products.ts         # Catálogo local de produtos
└── screens/                # Telas acessadas pela navegação
	├── Home.tsx            # Tela inicial
	├── Produtos.tsx        # Catálogo, filtros e inclusão no carrinho
	├── Detalhes.tsx        # Detalhes de um produto
	└── Carrinho.tsx        # Produtos selecionados e total da compra
```

## Navegação e fluxo

As rotas são configuradas em `App.tsx` usando `createNativeStackNavigator`:

1. **Home** apresenta a loja e direciona para a lista de produtos.
2. **Produtos** exibe o catálogo e permite filtrar por `Todos`, `Notebooks`, `Celulares` e `Acessórios`.
3. Cada produto pode ser adicionado ao carrinho ou aberto na tela de detalhes.
4. **Detalhes** mostra informações, imagem, preço e quantidade do produto selecionado.
5. **Carrinho** lista os produtos com quantidade maior que zero e calcula o total da compra.

O estado de quantidade dos produtos é mantido na tela `Produtos` e enviado para `Carrinho` por parâmetros de navegação.

## Catálogo atual

O arquivo `data/products.ts` contém três produtos locais:

- Notebook Pro, da categoria `Notebooks`;
- Smartphone X, da categoria `Celulares`;
- Headphone Pro, da categoria `Acessórios`.

Cada produto possui nome, categoria, descrição, imagem, preço, quantidade e total calculado.

## Observações

- Os dados ainda são estáticos e não vêm de uma API ou banco de dados.
- O componente `Category.tsx` está disponível para uso, mas a tela `Produtos` atualmente utiliza filtros com botões diretamente na própria tela.
- A finalização da compra aparece como texto informativo e ainda não possui uma ação de pagamento implementada.
