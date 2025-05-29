import { StyleSheet } from 'react-native';
import { color } from '../../colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bg,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        width: "100%",
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.bg,
        gap: 15,
        padding: 10,
    },
    code: {
        fontSize: 18,
        color: color.foreground,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    back: {
        width: 40,
        height: 40,
        backgroundColor: color.comment,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    }
});