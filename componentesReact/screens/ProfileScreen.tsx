import {Text, View} from 'react-native';

export default function ProfileScreen({route}) {
  return (
    <View>
      <Text>Este é o perfil de {route.params.name}</Text>
    </View>
  );
}