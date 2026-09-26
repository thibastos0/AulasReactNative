import {View, Text } from 'react-native';
import { globalStyles } from '../themes/globalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style={globalStyles.contentContainer /* ou globalStyles.centeredContainer - verificar o melhor */}> 
            <View style={globalStyles.logoIconContainer}>
                <MaterialCommunityIcons
                    style={globalStyles.logoIcon}
                    name="candy"
                    size={50}
                />
            </View>
            <Text style={globalStyles.title}>
                Doces da Any
            </Text>
        </View>
    );
}