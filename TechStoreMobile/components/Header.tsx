import {View, Text, StyleSheet} from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                TechStore
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,

    },
    logo: {
        fontSize:24,
        fontWeight: 'bold',
    },
});