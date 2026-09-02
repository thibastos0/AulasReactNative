import {Image, Text, View} from 'react-native';

export default function Card({titulo, descricao, imagem, style}:any) {
    return (
        <View>
            <Image
                defaultSource={require('../assets/icon.png')}
                style={style}
                source={{ uri: imagem }}
                accessible={true}
                accessibilityLabel={titulo}
                accessibilityHint={descricao}
                accessibilityRole="image" />
            <Text>{titulo}</Text>
            <Text>{descricao}</Text>
        </View>
    );
}


