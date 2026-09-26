import {View, Text } from 'react-native';
import { globalStyles } from '../themes/globalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style={globalStyles.centeredContainer}> 
            <View style={globalStyles.logoIconContainer}>
                <MaterialCommunityIcons
                    style={globalStyles.logoIcon}
                    name="cupcake"
                    size={50}
                />
            </View>
            <Text style={globalStyles.title}>
                Doces da Any
            </Text>
        </View>
    );
}