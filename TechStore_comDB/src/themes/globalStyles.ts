import { colors } from './colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        padding: 20,
    },
    card: {
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    cardPrice: {
        fontSize: 16,
        color: colors.primary,
    },
    cardDelete: {
        fontSize: 14,
        color: colors.danger,
        marginTop: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    text: {
        color: colors.primary,
        fontSize: 16,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.light,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: colors.primary,
        fontSize: 16,
    },
});