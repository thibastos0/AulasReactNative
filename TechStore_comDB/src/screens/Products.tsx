import { 
    Alert, Platform,
    FlatList, 
    View, 
    Text, 
    Pressable } from 'react-native';
import ProductCard from '../components/ProductCard';
import { globalStyles } from '../themes/globalStyles';

import { useSQLiteContext } from 'expo-sqlite';
//isFocused é um hook que verifica se a tela está em foco ou não, para atualizar a lista de produtos quando a tela for exibida
import { useIsFocused } from '@react-navigation/native';
import { 
    useEffect, 
    useState 
} from 'react';

type Product = {
    id_product: number;
    name: string;
    price: number;
};

export default function Products(props: any) {

    const db = useSQLiteContext();
    const [products, setProducts] = useState<Product[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getProducts();
        }
    }, [isFocused]);

    async function getProducts() {

        const result = await db.getAllAsync(`
            SELECT * 
            FROM products
            ORDER BY id_product DESC
        `) as Product[];

        setProducts(result);
    }

    async function deleteProduct(id_product: number) {

        if (Platform.OS === 'web') {
            const confirm = window.confirm(
                "Deseja realmente excluir este produto?"
            );

            if (confirm) {
                await db.runAsync(`
                    DELETE FROM products 
                    WHERE id_product = ?
                `, id_product);

                getProducts();
            }

            return;
        }

        Alert.alert(
            "Atenção",
            "Deseja realmente excluir este produto?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        await db.runAsync(`
                            DELETE FROM products 
                            WHERE id_product = ?
                        `, id_product);

                        getProducts();
                    }
                }
            ]
        );
    }

    return (
        <View style={globalStyles.container}>
            
            <Text style={globalStyles.title}>
                Produtos
            </Text>

            <Text style={globalStyles.subtitle}>
                Lista de produtos cadastrados:
            </Text>

            <FlatList
                data={products}
                keyExtractor={(item) => 
                    item.id_product.toString()
                }
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onDelete={deleteProduct}
                    />
                )}
            />

            <Pressable
                    style={globalStyles.button}
                    onPress={() => 
                        props.navigation.navigate('RegisterProduct')
                    }
                >
                    <Text style={globalStyles.buttonText}>
                        Cadastrar Produto
                    </Text>

            </Pressable>


        </View>
    );
}