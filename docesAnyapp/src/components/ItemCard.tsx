import { 
    View,
    Text,
    Pressable } from 'react-native';

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
    return (
        <View style={globalStyles.card}>
            <Text style={globalStyles.cardName}>
                {product.name}
            </Text>
            <Text style={globalStyles.cardPrice}>
                R$ {Number(product.price).toFixed(2).replace('.', ',').
                replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <Pressable
                onPress={() =>
                    onDelete(product.id_product)
                }
            >
                <MaterialCommunityIcons name="delete" size={24} color="red" />
                <Text style={globalStyles.cardActions}>
                    Excluir
                </Text>
            </Pressable>
            <Pressable
                onPress={() =>
                    onEdit(product.id_product)
                }
            >
                <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                <Text style={globalStyles.cardActions}>
                    Editar
                </Text>
            </Pressable>
        </View>
    
    );
}