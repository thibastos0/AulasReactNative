import { View, Text } from 'react-native';

import { globalStyles } from '../themes/globalStyles';

export default function ItemDetailsCard({ item }: any) {
    return (
        <View style={globalStyles.cardContainer}>
            <Text style={globalStyles.cardName}>
                {item.name}
            </Text>
            <Text style={globalStyles.cardCategory}>
                {item.category}
            </Text>
            <Text style={globalStyles.cardDescription}>
                {item.description}
            </Text>
            <Text style={globalStyles.cardPrice}>
                R$ {item.price.toFixed(2)}
            </Text>
        </View>
    );
}