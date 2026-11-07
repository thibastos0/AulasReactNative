import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

import { useRef, useState } from 'react';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { Asset, requestPermissionsAsync } from 'expo-media-library';

export default function CameraScreen() {
  const camera = useRef(null);
  const [permCamera, pedirCamera] = useCameraPermissions();
  const [lado, setLado] = useState('back');
  const [flash, setFlash] = useState('off');
  const [foto, setFoto] = useState(null);

  if (!permCamera) return <View />; // ainda carregando
  if (!permCamera.granted) {
    return (
      <View style={s.centro}>
        <Text style={s.texto}>Precisamos da câmera para tirar fotos.</Text>
        <Button title="Permitir câmera" onPress={pedirCamera} />
      </View>
    );
  }

  async function tirarFoto() {
    const f = await camera.current?.takePictureAsync({ quality: 0.8 });
    if (f) setFoto(f);
  }

  async function salvar() {

    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        console.error('Sem permissão para acessar a galeria.');
        return Alert.alert(
          'Sem permissão', 
          'Autorize o acesso à galeria para salvar.');
      }
      
      const asset = await Asset.create(foto.uri);

      if (asset) {
        Alert.alert('Foto salva!', 'Ela já está na galeria do aparelho.');
        setFoto(null);
      }

    } catch (error) {
      console.error('Erro ao salvar a foto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a foto.');
    } 
    
  }

  if (foto) {
    return (
      <View style={s.tudo}>
        <Image source={{ uri: foto.uri }} style={s.tudo} resizeMode="contain" />
        <View style={s.linha}>
          <Button title="Descartar" color="#c0392b" onPress={() => setFoto(null)} />
          <Button title="Salvar na galeria" onPress={salvar} />
        </View>
      </View>
    );
  }

  return (
    <View style={s.tudo}>
      <CameraView ref={camera} style={s.tudo} facing={lado} flash={flash} />
      <View style={s.linha}>
        <Button title="Virar" onPress={() => setLado((l) => (l === 'back' ? 'front' : 'back'))} />
        <Button title={`Flash: ${flash}`} onPress={() => setFlash((f) => (f === 'off' ? 'on' : 'off'))} />
        <Button title="📸 Foto" onPress={tirarFoto} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tudo: { 
    flex: 1,
    width: '100%', 
    backgroundColor: '#000' 
  },
  linha: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 12, 
    backgroundColor: '#fff' 
  },
  centro: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 12, 
    padding: 24 
  },
  texto: { 
    fontSize: 16, 
    textAlign: 'center' 
  },
});