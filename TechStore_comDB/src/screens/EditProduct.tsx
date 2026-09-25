import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { globalStyles } from '../themes/globalStyles';

import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

type Product = {
    id_product: number;
    name: string;
    price: number;
};

export default function EditProduct(props: any) {
    const db = useSQLiteContext();

    //id recebido como parâmetro da tela Products, que é passado para a tela EditProduct
    const id_product = props.route.params.id_product;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const normalizedPrice = price.trim().replace(',', '.');

    // Estado para controlar o carregamento dos dados do produto
    const [loading, setLoading] = useState(true);

    // Estado para controlar se o produto foi atualizado com sucesso
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    // Função para buscar os dados do produto no banco de dados
    async function getProduct() {

        try{
            const result = await db.getAllAsync(`
                SELECT * 
                FROM products 
                WHERE id_product = ?
                `,
                id_product) as Product[];
            

            if (!result || result.length === 0) {
                if (Platform.OS === 'web') {
                    window.alert("Produto não encontrado.");
                } else {
                    Alert.alert(
                        "Atenção",
                        "Produto não encontrado.");
                }
                props.navigation.goBack();
            } else {
                setName(result[0].name);
                setPrice(result[0].price.toString());
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            if (Platform.OS === 'web') {
                window.alert("Erro ao buscar o produto.");
            } else {
                Alert.alert(
                    "Atenção",
                    "Erro ao buscar o produto."
                );
            }
            props.navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    async function updateProduct() {

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
                window.alert("O preço do produto não pode estar vazio.");
                return;
            }

            Alert.alert(
                "Atenção",
                "O preço do produto não pode estar vazio."
            );
            return;
        }

        try {
            await db.runAsync(`
                UPDATE products 
                SET name = ?, price = ?
                WHERE id_product = ?
            `,
                name.trim(),
                Number(normalizedPrice),
                id_product
            );

            if (Platform.OS === 'web') {
                window.alert("Produto atualizado com sucesso!");
                setSuccess(true);
                props.navigation.goBack();
                return;
            }

            Alert.alert("Sucesso", 
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
                    "Atenção",
                    "Erro ao atualizar o produto."
                );
            }
        } finally {
            setSuccess(false);
        }
    }

    if (loading) {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator 
                size="large" 
                color="#0000ff" 
                />

                <Text style={globalStyles.title}>
                    Carregando produto...
                </Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style= {globalStyles.container}
            behavior={
                Platform.OS === 'ios' 
                    ? 'padding' 
                    : undefined
                }
            >

            <ScrollView
                contentContainerStyle={globalStyles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={globalStyles.centeredContainer}>
                    <Text style={globalStyles.title}>
                        Editar produto
                    </Text>

                    <Text style={[globalStyles.subtitle,
                        { marginBottom: 20, textAlign: 'center' }
                    ]}>
                        Altere as informações do produto e clique em "Atualizar" para salvar as mudanças.
                    </Text>
                </View>

                {/* Formulário de edição do produto */}
                <Text style={globalStyles.label}>
                    Nome do produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite o nome do produto"
                    value={name}
                    onChangeText={setName}
                    editable={!success} // Desabilita a edição se o produto foi atualizado com sucesso
                />
                <Text style={globalStyles.label}>
                    Preço do produto:
                </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite o preço do produto"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    editable={!success} // Desabilita a edição se o produto foi atualizado com sucesso
                />

                <Pressable
                    style={[globalStyles.button,
                      success && globalStyles.buttonDisabled,
                    ]}
                    onPress={updateProduct}
                    disabled={success}
                >
                    { success ? (
                        <ActivityIndicator
                            size="small"
                            color="#ffffff"
                        />
                    ) : (
                        <Text style={globalStyles.buttonText}>
                            Atualizar
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    style={globalStyles.buttonCancel}
                    onPress={() => props.navigation.goBack()                        
                    }
                    disabled={success}
                >
                    <Text style={globalStyles.buttonText}>
                        Cancelar
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}