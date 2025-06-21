import { StyleSheet } from "react-native";
import { color } from "../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    backgroundColor: color.currentLine,
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderColor: color.comment,
    borderRadius: 10,
    padding: 10,
    color: color.foreground,
    fontSize: 22,
  },
  containerConect: {
    flexDirection: 'row',
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  conect: {
    backgroundColor: color.comment,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: color.comment,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  create: {
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
  rooms: {
    width: "90%",
    height: "60%",
    borderWidth: 2,
    borderColor: color.comment,
    borderRadius: 10,
    backgroundColor: color.currentLine,
    padding: 10,
  },
  list: {
    width: "100%",
  },
  noRooms: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    color: color.foreground,
    fontFamily: "monospace",
    fontWeight: 'bold',
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
});
