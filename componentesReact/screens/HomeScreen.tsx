import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet}  from 'react-native';
import Botao from '../componentes/Botao';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo à tela inicial!</Text>

        <Botao
            titulo="Ir para o perfil de Thiago"
            onClick={() =>
            navigation.navigate('Profile', {name: 'Thiago'})
            }
        />
       <Botao
        titulo="Ir para o App antigo"
        onClick={() =>
          navigation.navigate('App_antigo')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});