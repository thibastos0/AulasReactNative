import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
//import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useState } from 'react';


export default function Produtos({navigation}: any) {

    // Estado para armazenar a quantidade de cada produto
    const [produtos, setProdutos] = useState(products);

    function adicionarCarrinho(productId: number) {
        setProdutos((produtosAtuais) =>
            produtosAtuais.map((produto) => {
                if (produto.id === productId) {
                    return {
                        ...produto,
                        qtd: produto.qtd + 1,
                        total: (produto.qtd + 1) * parseFloat(produto.preco.
                                                                replace('.', '').
                                                                replace(',', '.')),
                    };
                }

                return produto;
            })
        );
    }

    // Filtrar produtos por categoria com a mesma variável produtos criada acima, para não perder a quantidade de cada produto
    const[categoria, setCategoria] = useState('Todos');    
    const produtosFiltrados =
    categoria === 'Todos' 
    ? produtos : 
    produtos.filter(
        product => product.categoria === categoria
    );

  return (
    <View style={styles.container}>
        <Header />

        <View style={styles.banner}>
            <Text style={styles.subtitle}>
                Produtos
            </Text>
            <Text style={styles.description}>
                Encontre os melhores produtos para sua vida digital.
            </Text>
        </View>

        <View style={styles.containerMenu}>
            <Pressable style={styles.textMenu}
            onPress={() => setCategoria('Todos')}
            >
                <Text> Todos </Text>
            </Pressable>

            <Pressable style={styles.textMenu}
            onPress={() => setCategoria('Notebooks')}
            >
                <Text> Notebooks </Text>
            </Pressable>

            <Pressable style={styles.textMenu}
            onPress={() => setCategoria('Celulares')}
            >
                <Text> Celulares </Text>
            </Pressable>

            <Pressable style={styles.textMenu}
            onPress={() => setCategoria('Acessórios')}
            >
                <Text> Acessórios </Text>
            </Pressable>
        </View>

        <Text style={styles.text}>
            Lista de produtos da TechStore, categoria: {categoria}
        </Text>

        <ScrollView>
            {
            produtosFiltrados.map((p) => (
                
                <ProductCard
                    key={p.id}
                    nome={p.nome}
                    categoria={p.categoria}
                    preco={p.preco}
                    adicionarCarrinho={() => adicionarCarrinho(p.id)}
                    qtd={p.qtd}
                    valorTotal={p.total}
                    onPressDetails={() => navigation.navigate('Detalhes', {id: p.id, qtd: p.qtd})}
                    verDetalhes="Ver Detalhes"
                    />
            ))}
        </ScrollView>
        <Text style={styles.text}>
                Quantidade no carrinho: {produtos.reduce((total, product) => total + product.qtd, 0)}
        </Text>
        <Pressable
            onPress={() => navigation.navigate('Carrinho', {produtos: produtos})}
        >
            <Text style={styles.link}>
                Ir para o carrinho
            </Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    containerMenu:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#e2e2e2',
        borderRadius: 5,
    },
    textMenu:{
        fontSize: 16,
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    banner:{
        padding: 20,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    link: {
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
    },
});