import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function Carrinho({route}: any) {
    
    const produtos = route.params.produtos;
    const produtosNoCarrinho = produtos.filter((p: any) => p.qtd > 0);

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.subtitle}>Meu Carrinho 🛒</Text>
            {produtosNoCarrinho.length === 0 ? (
                <Text style={styles.title}>Seu carrinho está vazio.</Text>
            ) : (
                <ScrollView>
                        {produtosNoCarrinho.map((p: any) => (
                                
                                <ProductCard
                                    key={p.id}
                                    nome={p.nome}
                                    preco={p.preco}
                                    qtd={p.qtd}
                                    valorTotal={p.total}
                                />

                                ))}
                </ScrollView>
            )}
            <Text style={styles.title}>
                Total: R$ 
                {produtosNoCarrinho.reduce((total: number, product: any) => total + product.total, 0).
                    toFixed(2).replace('.', ',').
                    replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <Text style={styles.subtitle}>
                Finalizar compra.
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        alignItems:'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card:{
        padding:20,
        margin:10,
        borderRadius:10,
        backgroundColor:'#fff',
    },
    subtitle:{
        fontSize:18,
        fontWeight:'bold',
    },
});