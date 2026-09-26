import { View, Text } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../themes/globalStyles';
import MainButton from '../components/MainButton';
import Footer from '../components/Footer';

export default function Home(props: any) {
    return (
        <View style={globalStyles.container}>
            <Header />
            <Text style={globalStyles.subtitle}>
                Bem-vindo ao nosso cardápio digital.
            </Text>
            <MainButton
                title="Ver Cardápio"
                navigateTo={props.navigation.navigate} 
                target="Menu"
            />
            <Footer />
        </View>
    );
}