import {
    View, 
    Text, 
    Pressable } from 'react-native';

import { globalStyles } from '../themes/globalStyles';
import { colors } from '../themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
    return (
        <View style={globalStyles.footerContainer}>
            <View style={globalStyles.footerIconsContainer}>
                <Pressable
                    style={globalStyles.footerSocialLink}
                    onPress={() => window.open('https://www.instagram.com/docesdaany/', '_blank')}>
                    <MaterialCommunityIcons
                        name="instagram"
                        size={24} 
                        color={colors.instagram}
                     />
                    <Text style={globalStyles.footerText}>
                        @docesdaany
                    </Text>
                </Pressable>
            </View>
            <Text style={globalStyles.footerText}>
                © 2026 Doces da Any App. Todos os direitos reservados.
            </Text>
        </View>
    );
}