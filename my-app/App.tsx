import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativos Mobile.</Text>
      <Text style={styles.text}>Aprendendo React Native!</Text>

      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style={{ width: 300, height: 200, marginTop: 20, borderRadius: 10 }}
      />

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]} 
        onPress={() => alert('Botão pressionado!')}>
        <Text style={styles.buttonText}>Clique Aqui</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
});
