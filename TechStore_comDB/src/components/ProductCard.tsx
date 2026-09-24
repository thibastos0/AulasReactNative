import {
    View,
    Text,
    Pressable,
} from 'react-native';

import { globalStyles } from '../themes/globalStyles';

type Product = {
    id_product: number;
    name: string;
    price: number;
};

type ProductCardProps = {
    product: Product;
    onDelete: (id_product: number) => void;
};

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    
        return (
            <View style={globalStyles.card}>
                <Text style={globalStyles.cardName}>
                    {product.name}
                </Text>
                <Text style={globalStyles.cardPrice}>
                    R$ {Number(product.price).toFixed(2)}
                </Text>
                <Pressable
                    onPress={() =>
                        onDelete(product.id_product)
                    }
                >
                    <Text style={globalStyles.cardDelete}>
                        Excluir
                    </Text>
                </Pressable>
            </View>
        );
                   
}
