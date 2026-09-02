import { Pressable, Text, StyleSheet } from "react-native";

interface BotaoProps {
    titulo: string;
}

export default function Botao( {titulo , onClick} ) {
    return (
        <Pressable style={styles.botao} onPress={onClick}>
            {/*<title> Salvar </title>*/}
            <Text style={styles.textoBotao}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 5,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});