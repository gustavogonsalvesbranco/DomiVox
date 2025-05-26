import { StyleSheet } from "react-native";
import { color } from "./../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    width: "100%",
    height: 50,
  },
  input: {
    backgroundColor: color.currentLine,
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderColor: color.comment,
    borderRadius: 10,
    padding: 10,
    color: color.foreground,
    fontSize: 22,
  },
  buttons: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: color.comment,
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderColor: color.comment,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: color.foreground,
    fontSize: 22,
    fontWeight: "bold",
  },
  version: {
    color: color.foreground,
    fontSize: 20,
    fontWeight: "bold",
  }
});
