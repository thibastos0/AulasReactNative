import {
    View,
    Text,
    Pressable,
    TextInput,
    Alert, Platform,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { globalStyles } from '../themes/globalStyles';

import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';


type MenuItem = {
    id_product: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
};

export default function EditMenuItem(props: any) {
    const db = useSQLiteContext();

    //id recebido como parâmetro da tela Menu, que é passado para a tela EditMenuItem
    const id_product = props.route.params.id_product;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const normalizedPrice = price.trim().replace(',', '.');

    // Estado para controlar o carregamento dos dados do produto
    const [loading, setLoading] = useState(true);

    // Estado para controlar se o produto foi atualizado com sucesso
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getMenuItem();
    }, []);

    // Função para buscar os dados do produto no banco de dados
    async function getMenuItem() {

        try{
            const result = await db.getAllAsync(`
                SELECT * 
                FROM menu_products 
                WHERE id_product = ?
                `,
                id_product) as MenuItem[];
            

            if (!result || result.length === 0) {
                if (Platform.OS === 'web') {
                    window.alert("Produto não encontrado.");
                } else {
                    Alert.alert(
                        "Erro",
                        "Produto não encontrado."
                    );
                }
                props.navigation.goBack();
            } else {
                setName(result[0].name);
                setPrice(result[0].price.toString());
                setCategory(result[0].category);
                setImage(result[0].image);
                setDescription(result[0].description);
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            if (Platform.OS === 'web') {
                window.alert("Erro ao buscar o produto.");
            } else {
                Alert.alert(
                    "Erro",
                    "Erro ao buscar o produto."
                );
            }
            props.navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    async function updateMenuItem() {

        if (!name.trim()) {
            if (Platform.OS === 'web') {
                window.alert("O nome do produto não pode estar vazio.");
                return;
            }

            Alert.alert(
                "Atenção",
                "O nome do produto não pode estar vazio."            
            )
            return;
        }

        if (!normalizedPrice || Number(normalizedPrice) <= 0 || isNaN(Number(normalizedPrice))) {
            if (Platform.OS === 'web') {
                window.alert("O preço do produto não pode estar vazio ou valor inválido.");
                return;
            }

            Alert.alert(
                "Atenção",
                "O preço do produto não pode estar vazio ou valor inválido."
            );
            return;
        }

        try {
            await db.runAsync(`
                UPDATE menu_products 
                SET name = ?, price = ?, category = ?, image = ?, description = ?
                WHERE id_product = ?
            `, 
                name.trim(),
                Number(normalizedPrice),
                category.trim(),
                image.trim(),
                description.trim(),
                id_product
            );

            if (Platform.OS === 'web') {
                window.alert("Produto atualizado com sucesso!");
                setSuccess(true);
                props.navigation.goBack();
                return;
            }

            Alert.alert(
                "Sucesso",
                "Produto atualizado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setSuccess(true);
                            props.navigation.goBack();
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            if (Platform.OS === 'web') {
                window.alert("Erro ao atualizar o produto.");
            } else {
                Alert.alert(
                    "Erro",
                    "Erro ao atualizar o produto."
                );
            }
        } finally {
            setSuccess(false);
        }
    }

    if (loading) {
        return (
            <View style={globalStyles.centeredContainer}>
                <ActivityIndicator 
                size="large" 
                color="#0000ff" 
                />
                <Text style={globalStyles.title}>
                    Carregando...
                    </Text>
            </View>
        );
    }

    return (

        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={
                Platform.OS === 'ios' 
                    ? 'padding' 
                    : undefined
            }
        >
            <Header />

            <ScrollView 
                contentContainerStyle={[globalStyles.contentContainer, { paddingBottom: 140 }]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={globalStyles.centeredContainer}>

                    <Text style={[globalStyles.subtitle,
                        { marginTop: 20, textAlign: 'center' }
                    ]}>
                        Altere os campos abaixo e clique em "Atualizar Item" para salvar as alterações.
                    </Text>
                </View>

                {/* Formulário para editar o item do cardápio */}
                <Text style={globalStyles.label}>
                    Nome do Produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite o nome do produto"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    editable={!success}
                />
                <Text style={globalStyles.label}>
                    Preço do Produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite o preço do produto"
                    placeholderTextColor="#999"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    editable={!success}
                />
                <Text style={globalStyles.label}>
                    Categoria do Produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite a categoria do produto"
                    placeholderTextColor="#999"
                    value={category}
                    onChangeText={setCategory}
                    editable={!success}
                />
                <Text style={globalStyles.label}>
                    URL da Imagem do Produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite a URL da imagem do produto"
                    placeholderTextColor="#999"
                    value={image}
                    onChangeText={setImage}
                    editable={!success}
                />
                <Text style={globalStyles.label}>
                    Descrição do Produto:
                </Text>
                <TextInput
                    style={[globalStyles.input, { height: 100 }]}
                    placeholder="Digite a descrição do produto"
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    editable={!success}
                />

                <Pressable
                    style={[globalStyles.button, success && globalStyles.buttonDisabled]}
                    onPress={updateMenuItem}
                    disabled={success}
                >
                    { success ? (
                        <ActivityIndicator
                            size="small"
                            color="#ffffff"
                        />
                    ) : (
                        <Text style={globalStyles.buttonText}>
                            Atualizar Item
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    style={globalStyles.buttonCancel}
                    onPress={() => props.navigation.goBack()}
                    disabled={success}
                >
                    <Text style={globalStyles.buttonCancelText}>
                        Cancelar
                    </Text>
                </Pressable>
            </ScrollView>

            <Footer />

        </KeyboardAvoidingView>
    );
}