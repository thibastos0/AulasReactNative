import { 
    View,
    Text,
    Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import  { MaterialCommunityIcons } from '@expo/vector-icons';

import { globalStyles } from '../themes/globalStyles';

type MenuProduct = {
    id_product: number;
    category: string;
    image: string;
    name: string;
    description: string;
    price: number;
};

type ItemCardProps = {
    product: MenuProduct;
    onEdit: (id_product: number) => void;
    onDelete: (id_product: number) => void;
};

export default function ItemCard({ product, onEdit, onDelete }: ItemCardProps) {
    const navigation = useNavigation<any>();

    return (
        <View style={globalStyles.card}>

            <Pressable
                onPress={() =>
                    navigation.navigate('Details', 
                        { item: product })
                }
            >
                <Text style={globalStyles.cardName}>
                    {product.name}
                </Text>

                <Text style={globalStyles.cardPrice}>
                    R$ {Number(product.price).toFixed(2).replace('.', ',').
                    replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
            </Pressable>

            <Pressable
                onPress={() =>
                    onDelete(product.id_product)
                }
            >
                <MaterialCommunityIcons name="delete" style={globalStyles.iconButton} size={24} color="red" />
            </Pressable>

            <Pressable
                onPress={() =>
                    onEdit(product.id_product)
                }
            >
                <MaterialCommunityIcons name="pencil" style={globalStyles.iconButton} size={24} color="blue" />
            </Pressable>

        </View>
    
    );
}