import {
    Text, Pressable } from 'react-native';

import { globalStyles } from '../themes/globalStyles';

export default function MainButton(props: any) {
    return (
        <Pressable
            style={globalStyles.button}
            onPress={()=> {props.navigateTo(props.target)}}
        >
            <Text style={globalStyles.buttonText}>
                {props.title}
            </Text>
        </Pressable>
    );
}