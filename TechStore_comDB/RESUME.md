## TechStore_comDB

Aplicativo React Native com Expo e SQLite para cadastrar, listar e excluir produtos.

### Estado atual

- `App.tsx` envolve a navegação com `SQLiteProvider`.
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
	- confirma a exclusão com `Alert` e remove pelo `id_product`.
- `src/components/ProductCard.tsx`:
	- recebe um produto por `product`;
	- mostra nome e preço;
	- recebe `onDelete` para disparar a exclusão.

### Pontos importantes

- A coluna correta da chave primária é `id_product`, não `id`.
- A lista deve permanecer em `Products.tsx`; `ProductCard` representa apenas um item.
- O banco é obtido com `useSQLiteContext()` dentro dos componentes, e não em funções comuns de serviço.
- O cadastro e a exclusão já atualizam a lista quando a tela de produtos volta a ficar em foco.

### Próximo passo

Executar e testar o fluxo completo no Expo: cadastrar produto, retornar à lista, excluir produto e confirmar que a lista é atualizada em cada etapa.
