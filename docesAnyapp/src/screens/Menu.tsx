import { 
    Alert, Platform,
    FlatList,
    View, 
    Text } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { globalStyles } from '../themes/globalStyles';

import { useSQLiteContext } from 'expo-sqlite';
//isFocused é um hook que verifica se a tela está em foco ou não, para atualizar a lista de produtos quando a tela for exibida
import { useIsFocused } from '@react-navigation/native';
import { 
    useEffect, 
    useState 
} from 'react';

type MenuItem = {
    id_product: number;
    category: string;
    image: string;
    name: string;
    description: string;
    price: number;
};

export default function Menu(props: any) {

    const db = useSQLiteContext();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getMenuItems();
        }
    }, [isFocused]);

    async function deleteMenuItem(id_product: number) {
        
        if (Platform.OS === 'web') {
            const confirm = window.confirm(
                "Deseja realmente excluir este item do cardápio?"
            );

            if (confirm) {
                await db.runAsync(`
                    DELETE FROM menu_products 
                    WHERE id_product = ?
                `, id_product);
                getMenuItems();
            }
            return;
        }
        Alert.alert(
            "Excluir item do cardápio",
            "Deseja realmente excluir este item do cardápio?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await db.runAsync(`
                            DELETE FROM menu_products 
                            WHERE id_product = ?
                        `, id_product);
                        getMenuItems();
                    }
                }
            ]
        );
    }

    function editMenuItem(id_product: number) {
        props.navigation.navigate('EditMenuItem', { 
            id_product }
        );
    }

    async function getMenuItems() {

        const result = await db.getAllAsync(`
            SELECT * 
            FROM menu_products
            ORDER BY id_product DESC
        `) as MenuItem[];

        setMenuItems(result);
    }
    
    return (
        <View style={globalStyles.container}>
            <Header />
            <Text style={globalStyles.subtitle}>
                Aqui está o cardápio digital no modo de edição para teste do SQLite.
            </Text>

            <FlatList
                data={menuItems}
                keyExtractor={(item) => 
                    item.id_product.toString()
                }
                renderItem={({ item }) => (
                    <ItemCard
                        product={item}
                        onEdit={editMenuItem}
                        onDelete={deleteMenuItem}
                    />
                )}
            />

            <Footer />
        </View>
    );
}