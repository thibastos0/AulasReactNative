## TechStore_comDB

Aplicativo React Native com Expo e SQLite para cadastrar, listar, editar e excluir produtos.

### Estado atual

- `App.tsx` envolve a navegação com `SQLiteProvider`.
- A navegação usa um stack com as telas `Products`, `RegisterProduct` e `EditProduct`.
- `src/database/database.ts` cria a tabela `products` com as colunas:
	- `id_product`
	- `name`
	- `price`
- `src/screens/RegisterProduct.tsx`:
	- valida nome e preço;
	- insere o produto no SQLite;
	- exibe alertas de validação e sucesso;
	- limpa os campos e retorna para a lista após confirmar o sucesso.
- `src/screens/Products.tsx`:
	- consulta os produtos diretamente no SQLite;
	- ordena por `id_product DESC`;
	- usa `useIsFocused` para recarregar a lista ao voltar da tela de cadastro;
- confirma a exclusão com `Alert` no nativo ou `window.confirm` na web;
	- remove pelo `id_product`;
	- navega para a edição passando o `id_product`.
- `src/screens/EditProduct.tsx`:
	- carrega o produto pelo `id_product` recebido pela navegação;
	- valida nome e preço antes de atualizar o SQLite;
	- exibe estado de carregamento, mensagens de sucesso/erro e permite cancelar;
	- funciona com alertas nativos e diálogos da web.
- `src/components/ProductCard.tsx`:
	- recebe um produto por `product`;
	- mostra nome e preço;
	- recebe `onEdit` e `onDelete` para disparar as ações do item.

### Pontos importantes

- A coluna correta da chave primária é `id_product`, não `id`.
- A lista deve permanecer em `Products.tsx`; `ProductCard` representa apenas um item.
- O banco é obtido com `useSQLiteContext()` dentro dos componentes, e não em funções comuns de serviço.
- O cadastro e a exclusão já atualizam a lista quando a tela de produtos volta a ficar em foco.
- A edição também atualiza a lista ao retornar para `Products`.
- Os preços aceitam vírgula ou ponto como separador decimal e são exibidos no formato brasileiro.
- O projeto usa Expo SDK 57, React Native 0.86 e `expo-sqlite` 57.

### Próximo passo

Executar `npx expo lint` e `npx tsc --noEmit`; depois testar no Expo o fluxo de cadastrar, editar e excluir produtos, incluindo a atualização da lista após cada retorno.
