import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert, Platform
} from "react-native";

import { globalStyles } from "../themes/globalStyles";
import { useSQLiteContext } from "expo-sqlite";

import { useState } from "react";

export default function RegisterProduct(props: any) {

    const db = useSQLiteContext();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
        //inserir dados
    async function registerProduct() {

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

        if (!price || Number(price) <= 0 || isNaN(Number(price))) {
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

        await db.runAsync(`
            INSERT INTO products 
            (name, price) VALUES (?, ?)
            `, 
                name.trim(),
                Number(price)
        );

        if (Platform.OS === 'web') {
            const confirm = window.confirm(
                "Produto cadastrado com sucesso! Deseja cadastrar outro produto?"
            );

            if (confirm) {
                setName('');
                setPrice('');
            } else {
                props.navigation.goBack();
            }

            return;
        }   

        Alert.alert("Sucesso", "Produto cadastrado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setName('');
                            setPrice('');
                            props.navigation.goBack();
                        }
                    }
                ]
            );

    }

    return (
        <View style={globalStyles.container}>
            
            <Text style={globalStyles.title}>
                Cadastrar novo produto
            </Text>

            <Text style={globalStyles.label}>
                Nome do produto:
            </Text>
            
            <TextInput
                style={globalStyles.input}
                placeholder="Digite o nome do produto"
                value={name}
                onChangeText={setName}
            />

            <Text style={globalStyles.label}>
                Preço do produto:
            </Text>

            <TextInput
                style={globalStyles.input}
                placeholder="Digite o preço do produto"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
            />

            <Pressable
                style={globalStyles.button}
                onPress={() => registerProduct()}
            >
                <Text style={globalStyles.buttonText}>
                    Cadastrar
                </Text>
            </Pressable>

        </View>
    );
}
