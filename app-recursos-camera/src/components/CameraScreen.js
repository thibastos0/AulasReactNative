import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

import { useRef, useState } from 'react';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { Asset } from 'expo-media-library';

export default function CameraScreen() {
  const camera = useRef(null);
  const [permCamera, pedirCamera] = useCameraPermissions();
  const [permGaleria, pedirGaleria] = MediaLibrary.usePermissions({ writeOnly: true });
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
    if (!permGaleria?.granted) {
      const r = await pedirGaleria();
      if (!r.granted) return Alert.alert('Sem permissão', 'Autorize o acesso à galeria para salvar.');
    }
    //await MediaLibrary.saveToLibraryAsync(foto.uri);

    const asset = await Asset.fromURI(foto.uri);
    asset.AssetLibrary.saveToLibraryAsync();
    

    Alert.alert('Foto salva!', 'Ela já está na galeria do aparelho.');
    setFoto(null);
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
  tudo: { flex: 1, backgroundColor: '#000' },
  linha: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#fff' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
  texto: { fontSize: 16, textAlign: 'center' },
});