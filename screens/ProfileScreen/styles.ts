import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 8,
    },
    avatarText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },
    name: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
    },
    label: {
        fontSize: 12,
        color: '#9B9B9B',
        marginBottom: 4,
        marginTop: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: '#222',
        backgroundColor: '#fafafa',
    },
    saveBtn: {
        marginTop: 28,
        backgroundColor: '#2563EB',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});
