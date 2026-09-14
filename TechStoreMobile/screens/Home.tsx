import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

export default function Home({navigation}: any) {
    return (
        <View style={styles.container}>
            <Header />
                <Text style={styles.description}>
                    Bem vindo a nossa loja!
                </Text>
                <Pressable
                style={styles.button}
                onPress={()=> navigation.navigate('Produtos')}
                >
                    <Text style={styles.buttonText}>
                        Ver produtos
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

    description: {
        fontSize: 18,
        marginBottom: 30,
    },

    button:{
        backgroundColor: '#222',
        paddingVertical:15,
        paddingHorizontal:30,
        borderRadius:8,
    },

    buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});