import {
    View,
    Text,
    Pressable,
} from 'react-native';

import { globalStyles } from '../themes/globalStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemDetailsCard from '../components/ItemDetailsCard';

export default function Details(props: any) {
    const { item } = props.route.params;

    return (
        <View style={globalStyles.container}>
            <Header />

            <ItemDetailsCard item={item} />
            <Pressable
                style={globalStyles.button}
                onPress={() => props.navigation.goBack()}
            >
                <Text style={globalStyles.buttonText}>
                    Voltar
                </Text>
            </Pressable>

            <Footer />

        </View>
    );
}