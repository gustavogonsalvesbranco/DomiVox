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
    }
});