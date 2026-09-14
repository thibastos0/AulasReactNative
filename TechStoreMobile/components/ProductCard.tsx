import{View, Text, Image, StyleSheet, Pressable} from 'react-native';

//function adicionarCarrinho(){
 //   console.log('Produto adicionado');
//}

export default function ProductCard(props:any){
    return(
        <View style={styles.card}>

            <Text style={styles.nome}>
                {props.nome}
            </Text>

            <Text>
                {props.categoria}
            </Text>

            {props.imagem && (
                <Image
                    defaultSource={require('../assets/icon.png')}
                    style={styles.imagem}
                    source={{ uri: props.imagem }}
                    accessible={true}
                    accessibilityLabel={props.nome}
                    accessibilityHint={props.detalhes}
                    accessibilityRole="image" />
            )}

            <Text>
                {props.detalhes}
            </Text>

            <Text style={styles.preco}>
                R$ {props.preco}
            </Text>

            {props.valorTotal > 0.0 && (
                <Text>
                    Total: R$ {props.valorTotal.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
            )}

            <Pressable
                onPress={props.adicionarCarrinho}
            >
                <Text style={styles.textoCarrinho}>
                    Adicionar ao carrinho. ({props.qtd})
                </Text>
            </Pressable>

            <Pressable
                onPress={props.onPressDetails}
            >
                <Text style={styles.textoDetalhes}>
                    {props.verDetalhes}
                </Text>
            </Pressable>
           
        </View>
    );
}
const styles = StyleSheet.create({
    card:{
        padding:20,
        margin:10,
        borderRadius:10,
        backgroundColor:'#fff',
    },
    nome:{
        fontSize:18,
        fontWeight:'bold',
    },
    imagem:{
        width:200,
        height:200,
        marginTop:10,
    },
    preco:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:10,
    },
    textoCarrinho:{
        color:'blue',
        marginTop:10,
    },
    textoDetalhes:{
        color:'green',
        marginTop:10,
    },

});