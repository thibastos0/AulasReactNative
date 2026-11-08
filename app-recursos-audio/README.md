# Aplicativo de recursos de áudio

Este projeto foi desenvolvido a partir do tutorial [React Native: foto, áudio, QR Code e rotas](./React%20Native_%20foto,%20áudio,%20QR%20Code%20e%20rotas.html), fornecido em HTML. O tutorial apresenta um aplicativo maior, com quatro recursos, enquanto este repositório foi adaptado para trabalhar exclusivamente com gravação, reprodução e compartilhamento de áudio.

## Objetivo do projeto

O aplicativo permite:

- solicitar acesso ao microfone;
- gravar um áudio em alta qualidade;
- exibir a duração da gravação;
- salvar cada gravação na lista da tela;
- reproduzir uma gravação escolhida;
- compartilhar/exportar o arquivo de áudio.

As gravações são mantidas em memória enquanto o aplicativo está aberto. Os arquivos são armazenados no diretório de documentos do aplicativo, mas a lista exibida não é persistida depois que o app é encerrado.

## 1. Criação do projeto

O projeto foi criado com o Expo usando o template `Blank (TypeScript)`:

```bash
npx create-expo-app@latest app-recursos --template blank
```

Durante a criação, foi escolhido o template `Blank (TypeScript)`. Embora o arquivo principal seja [`App.tsx`](./App.tsx), o componente específico do recurso de áudio foi implementado em JavaScript, no arquivo [`components/AudioScreen.js`](./components/AudioScreen.js). O React Native permite essa combinação de arquivos, desde que o componente JavaScript seja importado normalmente.

Depois, o projeto foi acessado:

```bash
cd app-recursos
```

O diretório foi renomeado para `app-recursos-audio` para identificar melhor a finalidade deste projeto.

## 2. Adaptação das dependências

O tutorial instala todos os pacotes necessários para áudio:

```bash
npx expo install expo-camera expo-media-library expo-audio expo-sharing \
  expo-location react-native-maps @react-native-async-storage/async-storage
```

Como a proposta deste projeto era utilizar apenas o recurso de áudio, não foram instalados os pacotes relacionados à câmera, galeria, QR Code, localização, mapas e armazenamento do histórico. Foram mantidas somente as dependências diretamente relacionadas ao objetivo:

```bash
npx expo install expo-audio expo-sharing
```

- `expo-audio`: gravação e reprodução;
- `expo-sharing`: compartilhamento do arquivo gravado.

As versões instaladas foram mantidas compatíveis com o Expo SDK 58. O arquivo [`package.json`](./package.json) registra as dependências usadas pelo projeto.

## 3. Configuração do `app.json`

O tutorial orienta configurar os plugins do Expo para declarar as permissões nativas. Neste projeto foi mantido somente o plugin do `expo-audio`, em [`app.json`](./app.json):

```json
[
  "expo-audio",
  {
    "microphonePermission": "Permitir ${expo.name} acessar seu microfone para gravar áudio."
  }
]
```

Essa configuração define a mensagem apresentada ao usuário quando o aplicativo solicita acesso ao microfone. Os plugins de câmera, galeria e localização do tutorial foram removidos porque não são utilizados nesta versão.

## 4. Integração no `App.tsx`

O tutorial apresenta um `App` com abas para cada recurso. Como este projeto possui somente a tela de áudio, a navegação por abas foi retirada.

O [`App.tsx`](./App.tsx) importa o componente:

```tsx
import AudioScreen from './components/AudioScreen';
```

Em seguida, renderiza `<AudioScreen />` dentro da tela principal. Essa foi a principal adaptação estrutural: em vez de montar quatro telas e alternar entre elas, o aplicativo carrega diretamente o recurso de áudio.

## 5. Implementação da tela de áudio

### 5.1 Preparação do gravador

O componente usa os hooks do `expo-audio`:

```js
const gravador = useAudioRecorder({
  ...RecordingPresets.HIGH_QUALITY,
  directory: 'document',
});
const estado = useAudioRecorderState(gravador);
```

O preset `HIGH_QUALITY` configura uma gravação com qualidade adequada. A opção `directory: 'document'` foi adicionada para que o arquivo seja salvo no diretório de documentos do aplicativo, em vez de depender do cache, que pode ser removido pelo sistema.

O estado do gravador é usado para:

- identificar se existe uma gravação em andamento;
- atualizar o contador de tempo;
- alternar entre os botões **Gravar** e **Parar e salvar**.

### 5.2 Solicitação de permissão e início da gravação

Ao tocar em **Gravar**, a função `iniciar()`:

1. pausa o player, caso algum áudio esteja tocando;
2. solicita a permissão de gravação;
3. exibe um alerta se a permissão for negada;
4. configura o modo de áudio para permitir gravação;
5. prepara o gravador;
6. inicia a gravação.

O fluxo usado é:

```js
await gravador.prepareToRecordAsync();
gravador.record();
```

Antes disso, o modo de áudio é configurado com:

```js
await setAudioModeAsync({
  allowsRecording: true,
  playsInSilentMode: true,
});
```

`allowsRecording: true` permite o uso do microfone, enquanto `playsInSilentMode: true` mantém o comportamento de áudio habilitado mesmo quando o aparelho está no modo silencioso.

### 5.3 Parada e armazenamento da gravação

Ao tocar em **Parar e salvar**, a função `parar()`:

1. captura a duração atual antes de parar;
2. chama `gravador.stop()`;
3. desativa o modo de gravação;
4. adiciona a URI retornada pelo gravador à lista de gravações.

A duração é lida antes de `stop()` porque o estado do gravador pode ser resetado depois da finalização:

```js
const duracao = estado.durationMillis;
await gravador.stop();
```

Depois da parada, a URI do arquivo fica disponível em `gravador.uri` e é adicionada à lista junto com um identificador e a duração.

### 5.4 Reprodução da URI

Para reproduzir os arquivos, o componente cria um único player:

```js
const player = useAudioPlayer(null);
```

Quando o usuário toca em **Ouvir**, a função `tocar(uri)`:

1. pausa qualquer reprodução anterior;
2. substitui a fonte atual do player pela URI selecionada;
3. desativa o modo de gravação;
4. inicia a reprodução.

A sequência de pausa e configuração do modo de áudio foi uma adaptação necessária ao comportamento observado durante os testes:

```js
player.pause();
player.replace(uri);

await setAudioModeAsync({
  allowsRecording: false,
  playsInSilentMode: true,
});

player.play();
```

Sem `player.pause()`, uma reprodução anterior podia continuar pendente. Além disso, deixar `allowsRecording` ativo durante a reprodução causava uma disputa entre a sessão de gravação e a sessão de áudio. Quando o usuário tentava gravar novamente, o áudio da URI anterior podia tocar antes do início da nova gravação.

### 5.5 Compartilhamento

O botão **Exportar** usa `expo-sharing`. Antes de compartilhar, o aplicativo verifica se o recurso está disponível no dispositivo:

```js
if (!(await Sharing.isAvailableAsync())) {
  Alert.alert('Indisponível', 'Compartilhamento não suportado aqui.');
  return;
}

await Sharing.shareAsync(uri, {
  dialogTitle: 'Salvar gravação',
});
```

Essa verificação evita apresentar uma ação que não pode ser executada em determinados ambientes, como algumas plataformas ou configurações de desenvolvimento.

## 6. Execução

Para iniciar o projeto:

```bash
npx expo start
```

Depois, o aplicativo pode ser aberto no Expo Go ou em um development build compatível. Como o projeto usa acesso ao microfone, é necessário aceitar a permissão quando ela for solicitada.

O teste manual recomendado é:

1. tocar em **Gravar**;
2. aceitar a permissão do microfone;
3. falar durante alguns segundos;
4. tocar em **Parar e salvar**;
5. tocar em **Ouvir**;
6. tocar novamente em **Gravar** para confirmar que a reprodução anterior foi interrompida;
7. tocar em **Exportar** para compartilhar o arquivo.

## 7. Diferenças em relação ao tutorial

As principais mudanças realizadas foram:

| Tutorial original | Adaptação neste projeto |
|---|---|
| Cria um aplicativo com câmera, áudio, QR Code e rotas | Mantém somente a funcionalidade de áudio |
| Instala todos os pacotes dos quatro recursos | Instala apenas `expo-audio` e `expo-sharing` |
| Usa uma navegação por abas | Renderiza diretamente `AudioScreen` |
| Apresenta componentes para foto, QR Code e mapa | Mantém somente `components/AudioScreen.js` |

Também foi necessário adaptar os imports e os caminhos dos arquivos ao projeto criado, além de registrar a permissão do microfone no `app.json`.

## Parecer sobre o tutorial

O tutorial é adequado como guia introdutório porque apresenta uma visão prática dos principais recursos nativos do React Native/Expo e mostra os comandos, as permissões e os exemplos de código necessários para começar. A divisão por funcionalidades facilita a consulta e permite aproveitar apenas a parte desejada.

Entretanto, o tutorial não deve ser tratado como uma receita totalmente independente de ajustes. Ele considera um aplicativo completo, enquanto projetos menores precisam remover dependências, telas, permissões e navegação que não serão utilizados. Além disso, APIs do Expo podem mudar entre versões do SDK; por isso, é importante conferir a documentação oficial correspondente à versão instalada.

No recurso de áudio, os testes mostraram uma questão prática que merece atenção: a sessão usada para gravar precisa ser diferenciada da sessão usada para reproduzir. Pausar o player antes de iniciar uma nova gravação e definir `allowsRecording: false` antes da reprodução foram adaptações importantes para evitar que um áudio anterior tocasse no momento errado.

**Conclusão:** o tutorial foi útil e permitiu implementar o recurso sem grandes dificuldades, mas exigiu adaptações de escopo, dependências, estrutura e gerenciamento da sessão de áudio. Portanto, o parecer final é positivo: o tutorial é uma boa base didática, desde que seja complementado pela documentação oficial do Expo e por testes no dispositivo ou ambiente de execução escolhido.
