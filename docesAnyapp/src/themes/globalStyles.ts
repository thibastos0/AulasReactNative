import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    
    // Logo
    logoIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3E1EC',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        // Sombra leve para destacar o ícone
        ...Platform.select({
            ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
            android: { elevation: 3 },
            web: { boxShadow: '0px 2px 8px rgba(92, 36, 76, 0.12)' }
        }),
    },
    logoIcon: {
        color: colors.logo,
    },
    // Tipografia
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: colors.secondary,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: 6,
    },

    // Cards de Produtos
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 2 },
            web: { boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)' }
        }),
    },
    cardInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.accent,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Formulários
    input: {
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text,
        marginBottom: 16,
    },

    // Botões Principais
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 10,
        ...Platform.select({
            ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
            android: { elevation: 3 },
            web: { boxShadow: '0px 2px 6px rgba(92, 36, 76, 0.2)' }
        }),
    },
    buttonDisabled: {
        backgroundColor: colors.disabled,
    },
    buttonCancel: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: colors.textLight,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonCancelText: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '600',
    },
    // Rodapé
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.footerBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },
    footerText: {
        color: colors.footerText,
        fontSize: 14,
        textAlign: 'center',
    },
    footerIconsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 8,
    },
    footerSocialLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});