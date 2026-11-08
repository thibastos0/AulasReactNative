import { useState } from 'react';

import { 
    View, 
    Text, 
    Button, 
    ScrollView, 
    StyleSheet, 
    Alert } from 'react-native';

import {
  useAudioRecorder, 
  useAudioRecorderState, 
  useAudioPlayer,
  RecordingPresets, 
  AudioModule, 
  setAudioModeAsync,
} from 'expo-audio';

import * as Sharing from 'expo-sharing';

const fmt = (ms = 0) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export default function AudioScreen() {
    
  const gravador = useAudioRecorder({ ...RecordingPresets.HIGH_QUALITY, directory: 'document' });
  const estado = useAudioRecorderState(gravador);
  const player = useAudioPlayer(null);
  const [gravacoes, setGravacoes] = useState([]);

  async function iniciar() {

    player.pause();

    const p = await AudioModule.requestRecordingPermissionsAsync();
    if (!p.granted) {
        return Alert.alert(
            'Sem permissão', 
            'Autorize o microfone nas configurações.');
    }
    await setAudioModeAsync({ 
        allowsRecording: true, 
        playsInSilentMode: true });
    await gravador.prepareToRecordAsync();
    gravador.record();
  }

  async function parar() {
    const duracao = estado.durationMillis;

    await gravador.stop();
    await setAudioModeAsync({ allowsRecording: false });
    setGravacoes((lista) => [{ id: Date.now(), uri: gravador.uri, duracao }, ...lista]);
  }

  async function tocar(uri) {
    player.pause();
    player.replace(uri); // troca o arquivo do player para a gravação selecionada
    await setAudioModeAsync({ 
        allowsRecording: false, 
        playsInSilentMode: true });
    player.play();
  }

  async function exportar(uri) {

    if (!(await Sharing.isAvailableAsync())) {
        return Alert.alert(
            'Indisponível', 
            'Compartilhamento não suportado aqui.');
        }
    await Sharing.shareAsync(uri, { dialogTitle: 'Salvar gravação' });
  }

  return (
    <ScrollView contentContainerStyle={s.pagina}>
      <Text style={s.titulo}>Gravador de áudio</Text>
      {estado.isRecording ? (
        <>
          <Text style={s.tempo}>● {fmt(estado.durationMillis)}</Text>
          <Button title="⏹ Parar e salvar" color="#c0392b" onPress={parar} />
        </>
      ) : (
        <Button title="⏺ Gravar" onPress={iniciar} />
      )}
      {gravacoes.length === 0 && <Text style={s.mudo}>Nenhuma gravação ainda.</Text>}
      {gravacoes.map((g, i) => (
        <View key={g.id} style={s.item}>
          <Text style={s.nome}>Gravação {gravacoes.length - i} · {fmt(g.duracao)}</Text>
          <View style={s.acoes}>
            <Button title="▶ Ouvir" onPress={() => tocar(g.uri)} />
            <Button title="Exportar" onPress={() => exportar(g.uri)} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pagina: {
    paddingTop: 40, 
    padding: 20, 
    gap: 12 
},
  titulo: { 
    fontSize: 22, 
    fontWeight: '700' 
},
  tempo: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#c0392b', 
    textAlign: 'center' 
},
  mudo: { 
    color: '#5b6573' 
},
  item: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 12, 
    gap: 8 },
  nome: { 
    fontWeight: '600' 
},
  acoes: { 
    flexDirection: 'row', 
    gap: 16 },
});