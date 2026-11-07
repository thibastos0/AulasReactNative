# Câmera com Expo e React Native

Tutorial de um recurso de câmera para Android e iOS usando Expo SDK 58. O exemplo abre a câmera do
aparelho, alterna entre as câmeras frontal e traseira, liga/desliga o flash, captura uma foto, mostra
uma prévia e permite salvar a imagem na galeria.

> **Importante:** este recurso não funciona na Web. `expo-camera` e `expo-media-library` dependem de
APIs nativas do Android e do iOS. Execute o projeto em um aparelho físico ou em um emulador/simulador
com suporte ao recurso. O navegador pode abrir a aplicação, mas não deve ser usado para validar esta
tela.

## Pré-requisitos

- Node.js LTS e npm;
- VS Code (opcional);
- Expo Go compatível com o SDK do projeto para um teste rápido;
- um aparelho Android ou iPhone para testar a câmera e a galeria.

No iOS, a permissão da câmera e a permissão para salvar fotos são solicitadas na primeira utilização.
No Android, o sistema também pode solicitar essas permissões. Recuse uma permissão e a aplicação não
conseguirá executar a operação correspondente.

## Opção 1: clonar este projeto

```bash
git clone https://github.com/thibastos0/AulasReactNative.git
cd AulasReactNative/app-recursos-camera
npm install
npx expo start
```

Leia o QR Code com o Expo Go, ou use um dos comandos abaixo:

```bash
npx expo start --android
npx expo start --ios
```

O projeto já contém as dependências, o componente da câmera e os plugins de configuração necessários.

## Opção 2: criar um projeto do zero

Crie um projeto TypeScript em branco. O nome `app-recursos-camera` pode ser substituído:

```bash
npx create-expo-app@latest app-recursos-camera --template blank-typescript
cd app-recursos-camera
npx expo install expo-camera expo-media-library
```

Se a sua versão do `create-expo-app` oferecer outro nome para o template em branco, escolha o
template **Blank (TypeScript)**. Para reproduzir exatamente este exemplo, use uma versão do Expo
compatível com o SDK 58 e deixe o `expo install` escolher as versões compatíveis:

```bash
npx expo install expo@~58.0.19 expo-camera expo-media-library
```

> Use sempre `npx expo install`, e não `npm install`, para módulos Expo. O comando seleciona a versão
compatível com o SDK instalado e evita combinações incompatíveis de pacotes nativos.

## Dependências

As dependências principais deste exemplo são:

| Pacote | Função |
| --- | --- |
| `expo-camera` | Exibe a câmera e captura a foto com `CameraView`. |
| `expo-media-library` | Solicita acesso à galeria e salva o arquivo da foto. |
| `expo` | Fornece o runtime e o sistema de módulos/configuração do Expo. |
| `react-native` | Fornece `View`, `Image`, `Button`, estilos e ciclo da tela. |

Confira as versões instaladas com:

```bash
npx expo install --check
npx expo doctor
```

## Configuração dos plugins no `app.json`

Instalar um pacote nativo não é suficiente. Os plugins abaixo inserem as descrições das permissões
no aplicativo nativo durante a configuração/build:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Permitir que o aplicativo acesse sua câmera para tirar fotos e gravar vídeos."
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "Permitir que o aplicativo acesse suas fotos.",
          "savePhotosPermission": "Permitir que o aplicativo salve fotos na sua galeria.",
          "writeOnlyPhotosPermission": "Permitir que o aplicativo salve fotos na sua galeria."
        }
      ]
    ]
  }
}
```

### O que os plugins fazem?

- `expo-camera` configura a mensagem nativa de acesso à câmera.
- `expo-media-library` configura as mensagens nativas de acesso à biblioteca de mídia.
- Os plugins são executados pelo Expo Config Plugin quando a configuração nativa é gerada; não são
  componentes React e não substituem o pedido de permissão em tempo de execução.
- Depois de alterar `app.json`, reinicie o bundler limpando o cache:

```bash
npx expo start -c
```

Em um development build, gere novamente o aplicativo nativo depois de mudar plugins. O Expo Go não
incorpora configurações nativas personalizadas de todo projeto.

## Compatibilidade `legacy` do Media Library

Neste projeto, o import é intencionalmente:

```js
import * as MediaLibrary from 'expo-media-library/legacy';
```

O sufixo `/legacy` mantém a API usada pelo tutorial, especialmente `usePermissions` e
`saveToLibraryAsync`. Não misture imports:

```js
// Correto para este exemplo
import * as MediaLibrary from 'expo-media-library/legacy';

// Evite misturar com o import acima na mesma tela
import * as MediaLibrary from 'expo-media-library';
```

Se você optar pela API não legada em outro projeto, siga a documentação da mesma versão do Expo e
adapte o fluxo de permissões e salvamento por completo. A dependência instalada e o import precisam
permanecer alinhados.

## Implementação da tela

Crie `src/components/CameraScreen.js` (ou `.tsx`, caso prefira TypeScript) e use este exemplo:

```jsx
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library/legacy';

export default function CameraScreen() {
  const camera = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions({ writeOnly: true });
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photo, setPhoto] = useState(null);

  if (!cameraPermission) return <View style={styles.center} />;

  if (!cameraPermission.granted) {
    return (
      <View style={styles.center}>
        <Text>Precisamos da permissão da câmera para tirar fotos.</Text>
        <Button title="Permitir câmera" onPress={requestCameraPermission} />
      </View>
    );
  }

  async function takePhoto() {
    const result = await camera.current?.takePictureAsync({ quality: 0.8 });
    if (result) setPhoto(result);
  }

  async function savePhoto() {
    if (!photo) return;

    if (!mediaPermission?.granted) {
      const result = await requestMediaPermission();
      if (!result.granted) {
        Alert.alert('Permissão negada', 'Autorize o acesso à galeria para salvar a foto.');
        return;
      }
    }

    await MediaLibrary.saveToLibraryAsync(photo.uri);
    Alert.alert('Foto salva', 'A imagem foi salva na galeria do aparelho.');
    setPhoto(null);
  }

  if (photo) {
    return (
      <View style={styles.screen}>
        <Image source={{ uri: photo.uri }} style={styles.preview} resizeMode="contain" />
        <View style={styles.actions}>
          <Button title="Descartar" onPress={() => setPhoto(null)} />
          <Button title="Salvar na galeria" onPress={savePhoto} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CameraView ref={camera} style={styles.camera} facing={facing} flash={flash} />
      <View style={styles.actions}>
        <Button
          title="Virar"
          onPress={() => setFacing((current) => (current === 'back' ? 'front' : 'back'))}
        />
        <Button
          title={`Flash: ${flash}`}
          onPress={() => setFlash((current) => (current === 'off' ? 'on' : 'off'))}
        />
        <Button title="Tirar foto" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: '100%', backgroundColor: '#000' },
  camera: { flex: 1 },
  preview: { flex: 1, width: '100%' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
  },
});
```

### Como o código funciona

1. `useCameraPermissions()` informa se a câmera está carregando, autorizada ou bloqueada.
2. `CameraView` mostra a imagem da câmera e recebe `facing` e `flash`.
3. A referência criada com `useRef` permite chamar `takePictureAsync`.
4. A foto capturada é guardada no estado e exibida com `Image`.
5. `MediaLibrary.usePermissions({ writeOnly: true })` pede somente a permissão necessária para
   gravar na galeria.
6. `saveToLibraryAsync(photo.uri)` salva o arquivo local retornado pela câmera.

## Renderizar a tela no `App.js` ou `App.tsx`

```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CameraScreen from './src/components/CameraScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

Se o projeto usar alias `@/components/CameraScreen`, mantenha o import já configurado no seu
`tsconfig.json`. Caso contrário, use o caminho relativo mostrado acima.

## Opção extra: usar `CamScreen.js` sem `legacy`

Também existe uma implementação alternativa em `src/components/CamScreen.js`. Ela usa a API atual de
`expo-media-library`, sem o caminho compatível `expo-media-library/legacy`. Para escolhê-la, altere o
`App.tsx`:

```tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CamScreen from '@/components/CamScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CamScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

Remova o import e o uso de `CameraScreen` ao fazer essa troca. Não renderize as duas telas ao mesmo
tempo: ambas acessam a câmera, mas usam fluxos diferentes para salvar a foto.

### O que muda no salvamento?

Na implementação principal, o import é:

```js
import * as MediaLibrary from 'expo-media-library/legacy';
```

e o arquivo local retornado por `takePictureAsync()` é salvo diretamente com:

```js
await MediaLibrary.saveToLibraryAsync(foto.uri);
```

No `CamScreen.js`, o import não legado é explícito:

```js
import { Asset, requestPermissionsAsync } from 'expo-media-library';
```

Depois que a permissão é concedida, o arquivo da câmera é transformado em um item da biblioteca:

```js
const asset = await Asset.create(foto.uri);
```

`Asset` é a nova classe/representação de um item real da galeria. Ela não é a mesma coisa que
`Image` do React Native nem que o pacote `expo-asset`: o `foto.uri` é o caminho temporário/local do
arquivo capturado, enquanto o objeto retornado por `Asset.create()` representa o registro criado na
biblioteca de mídia. Esse objeto fornece informações como `id` e pode ser usado posteriormente em
operações da biblioteca, como adicionar a um álbum.

Por isso, neste fluxo não se chama `saveToLibraryAsync()`: a própria criação do `Asset` registra o
arquivo na galeria. O resultado deve ser tratado como uma promessa e, em caso de sucesso, a tela pode
limpar a prévia:

```js
const { granted } = await requestPermissionsAsync();

if (!granted) {
  Alert.alert('Sem permissão', 'Autorize o acesso à galeria para salvar.');
  return;
}

const asset = await Asset.create(foto.uri);
Alert.alert('Foto salva!', `Identificador: ${asset.id}`);
setFoto(null);
```

A permissão continua sendo obrigatória. `requestPermissionsAsync()` retorna uma resposta com `granted`
e `status`; não confunda essa permissão com a permissão da câmera, que continua sendo obtida por
`useCameraPermissions()`. O `try/catch` de `CamScreen.js` também é importante para informar falhas de
permissão, caminho inválido ou criação do item.

Use uma única estratégia por tela. Se o projeto exigir somente o salvamento simples por URI, mantenha
`CameraScreen.js` e o import `/legacy`. Se quiser trabalhar com objetos da biblioteca, álbuns ou
metadados do item criado, use `CamScreen.js` e o import moderno. Em ambos os casos, mantenha
`expo-media-library` na mesma versão compatível com o Expo SDK do projeto e regenere o development
build após alterações no `app.json`.

## Teste no aparelho

```bash
npx expo start
```

Valide nesta ordem:

1. a câmera traseira aparece;
2. o botão **Virar** alterna para a câmera frontal;
3. o botão **Flash** alterna o estado do flash;
4. **Tirar foto** exibe a prévia;
5. **Descartar** retorna à câmera sem salvar;
6. **Salvar na galeria** solicita a permissão e salva a foto;
7. a imagem aparece no aplicativo Fotos/Galeria do aparelho.

## Problemas comuns

- **A tela fica sem câmera:** verifique a permissão do sistema e teste em aparelho físico; confirme
  também que `expo-camera` pertence ao mesmo SDK do `expo`.
- **A foto não salva:** autorize a galeria/fotos e confirme o plugin `expo-media-library` no
  `app.json`.
- **Alterei o `app.json` e nada mudou:** pare o servidor, rode `npx expo start -c` e, para um
  development build, gere o binário novamente.
- **Tentei abrir no navegador:** este tutorial não oferece suporte à Web. Use Android ou iOS.
- **Expo Go incompatível:** atualize o Expo Go ou use um development build com a versão correta do
  SDK.

## Scripts disponíveis

```bash
npm start
npm run android
npm run ios
npm run web # não valida este recurso de câmera
```
