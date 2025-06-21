import { StyleSheet } from "react-native";
import { color } from "../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.comment,
    borderRadius: 10,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  code: {
    fontSize: 16,
    color: color.foreground,
    fontWeight: "bold",
  },
  players: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    width: 1,
    height: 30,
    backgroundColor: "#000",
  },
  host: {
    fontSize: 16,
    color: color.green,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});