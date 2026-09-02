import { useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Pressable, Text, View, StyleSheet } from "react-native";
import Saudacao from "../componentes/Saudacao";
import Botao from "../componentes/Botao";
import Card from "../componentes/Card";

export default function App() {

  const [contador, setContador] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
          <Saudacao />

          <Botao titulo="Salvar"
          onClick={() => console.log("Salvou")} />
          <Botao titulo="Excluir" 
          onClick={() => console.log("Excluiu")} />
          <Botao titulo="Editar" 
          onClick={() => console.log("Editou")} />

          <Text>{contador}</Text>
            <Botao titulo="Incrementar"
            onClick={() => setContador(contador + 1)} />
          

          <Card
          style={styles.patternImage}
            titulo="Card de Exemplo"
            descricao="Card site imagem aleatória para testar o componente"
            imagem="https://picsum.photos/200/300"
          />

          <Card
          style={styles.patternImage}
            titulo="Card de Exemplo 2"
            descricao="Card imagem jpg para testar o componente"
            imagem="https://ichef.bbci.co.uk/ace/ws/800/amz/worldservice/live/assets/images/2012/06/01/120601094707_paisagens_2_976x549_carlosrobertomacedonio_nocredit.jpg"
          />

          <Card
            style={styles.tinyLogo}
            titulo="Card de Exemplo 3"
            descricao="Card imagem png para testar o componente"
            imagem="https://www.kindpng.com/picc/m/765-7652239_react-native-svg-logo-hd-png-download.png"
          /> 

      </SafeAreaView>
    </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    patternImage: {
        width: 200,
        height: 200,
    },
});