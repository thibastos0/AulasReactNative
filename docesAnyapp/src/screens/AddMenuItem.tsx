import {
    View,
    Text,
    TextInput,
    Alert, Platform, 
    Pressable} from 'react-native';

import { globalStyles } from '../themes/globalStyles';
import { useSQLiteContext } from 'expo-sqlite';

import { useState } from 'react';

export default function AddMenuItem(props: any) {

    const db = useSQLiteContext();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    
    //inserir dados
    async function registerMenuItem() {
        const normalizedPrice = price.trim().replace(',', '.');

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

        await db.runAsync(`
            INSERT INTO menu_products 
            (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)
            `, 
                name.trim(),
                Number(normalizedPrice),
                category.trim(),
                image.trim(),
                description.trim()
        );

        if (Platform.OS === 'web') {
            const confirm = window.confirm(
                "Item do cardápio cadastrado com sucesso! Deseja cadastrar outro item?"
            );

            if (!confirm) {
                props.navigation.navigate('Menu');
            } else {
                setName('');
                setPrice('');
                setCategory('');
                setImage('');
                setDescription('');
            }
            return;
        }

        Alert.alert(
            "Sucesso",
            "Item do cardápio cadastrado com sucesso!",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setName('');
                        setPrice('');
                        setCategory('');
                        setImage('');
                        setDescription('');
                    }
                }
            ]
        );

    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>
                Adicionar Item ao Cardápio
            </Text>

            <TextInput
                style={globalStyles.input}
                placeholder="Nome do Produto"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Preço do Produto"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Categoria do Produto"
                value={category}
                onChangeText={setCategory}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="URL da Imagem do Produto"
                value={image}
                onChangeText={setImage}
            />

            <TextInput
                style={[globalStyles.input, { height: 100 }]}
                placeholder="Descrição do Produto"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Pressable
                style={globalStyles.button}
                onPress={() => registerMenuItem()}
            >
                <Text style={globalStyles.buttonText}>
                    Adicionar Item
                </Text>
            </Pressable>
        </View>
    );
}