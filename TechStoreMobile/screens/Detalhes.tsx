import {View, Text, StyleSheet} from 'react-native';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import Header from '../components/Header';


export default function Detalhes({route}:any){ 
    //const id=route.params.id;
    const product = products.find((item) => item.id === route.params.id);

    const[quantidade, setQuantidade] = useState(0);
    
    function adicionarCarrinho(){
        setQuantidade(quantidade + 1);
    }

    return(
        <View style={styles.container}>

            <Header />

           {product && <ProductCard
                nome={product.nome}
                imagem={product.imagem}
                detalhes={product.detalhes}
                preco={product.preco}
                adicionarCarrinho={adicionarCarrinho}
            />}

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
});