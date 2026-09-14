import {View, Text, StyleSheet} from 'react-native';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';


export default function Detalhes({route}:any){ 
    const id=route.params.id;
    const product = products.find((item) => item.id === id);

    const[quantidade, setQuantidade] = useState(0);
    
    function adicionarCarrinho(){
        setQuantidade(quantidade + 1);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{product?.nome}</Text>

           {product && <ProductCard
                nome={product.nome}
                detalhes={product.detalhes}
                imagem={product.imagem}
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});