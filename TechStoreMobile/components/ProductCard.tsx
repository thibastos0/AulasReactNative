import{View, Text, StyleSheet, Pressable} from 'react-native';

//function adicionarCarrinho(){
 //   console.log('Produto adicionado');
//}

type ProductCardProps = {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    adicionarCarrinho: () => void;
    onPressDetails: any;
};

export default function ProductCard(props:any){
    return(
        <View style={styles.card}>
            <Text style={styles.nome}>
                {props.nome}
            </Text>
            <Text>
                {props.categoria}
            </Text>
            <Text>
                {props.detalhes}
            </Text>

            <Text>
                {props.imagem}
            </Text>
            <Text style={styles.preco}>
                R$ {props.preco}
            </Text>
            <Pressable
                onPress={props.adicionarCarrinho}
            >
                <Text>
                    Adicionar ao carrinho.
                </Text>
            </Pressable>
            <Pressable
                onPress={props.onPressDetails}
            >
                <Text>{props.verDetalhes}</Text>
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
    preco:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:10,
    },

});