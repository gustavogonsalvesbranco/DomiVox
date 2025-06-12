import { StyleSheet } from "react-native";
import { color } from "../../colors";

export const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: color.comment,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: "90%",
        height: "90%",	
        resizeMode: 'contain',
        borderRadius: 100,
    },
    camera: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: color.comment,
    },
});