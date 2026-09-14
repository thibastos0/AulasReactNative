import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useState } from 'react';


export default function Produtos({navigation}: any) {

    const[quantidade, setQuantidade] = useState(0);
    const[categoria, setCategoria] = useState('Todos');
    const produtosFiltrados =
    categoria === 'Todos' 
    ? products : 
    products.filter(
        product => product.categoria === categoria
    );

    function adicionarCarrinho(){
        setQuantidade(quantidade + 1);
    }

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
            {produtosFiltrados.map((product) => (
                <ProductCard
                    key={product.id}
                    nome={product.nome}
                    categoria={product.categoria}
                    preco={product.preco}
                    adicionarCarrinho={adicionarCarrinho}
                    onPressDetails={() => navigation.navigate('Detalhes', {id: product.id})}
                    verDetalhes="Ver Detalhes"
                    />
            ))}
        </ScrollView>
        <Text style={styles.text}>
                Quantidade no carrinho: {quantidade}
        </Text>

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
});