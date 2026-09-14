import {View, Text, StyleSheet} from 'react-native';

export default function Category(props:any){
    return(
        <View style={styles.container}>
            <Text style={styles.icon}>
                {props.icone}
            </Text>
            <Text style={styles.name}>
                {props.nome}
            </Text>
        </View>
    );
}
const styles =StyleSheet.create({
    container:{
        padding: 10,
    },
    icon:{
        fontSize: 24,
    },
    name:{
        fontSize: 16,
    }
})