import { View, Text, Pressable } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../themes/globalStyles';

export default function Home(props: any) {
    return (
        <View style={globalStyles.container}>
            <Header />
                <Text style={globalStyles.subtitle}>
                    Bem vindo a nossa loja!
                </Text>
                <Pressable
                style={globalStyles.button}
                onPress={()=> props.navigation.navigate('Produtos')}
                >
                    <Text style={globalStyles.buttonText}>
                        Ver produtos
                    </Text>
                </Pressable>
        </View>
    );
}