import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { showMessage } from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../../colors";
import { router } from "expo-router";

export default function Lobby() {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("newPlayer", (data) => {
      showMessage({
        type: "info",
        message: "Novo jogador",
        description: `${data.name} entrou na partida`,
        icon: "auto",
        duration: 5000,
      });
    });

    socket.on("showCode", (code) => {
      setCode(code);
    });

    return () => {
      socket.off("newPlayer");
      socket.off("showCode");
    };
  }, []);

  const closeRoom = () => {
    socket.emit("closeRoom", code);
    router.push("/connection")
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.6}
          onPress={closeRoom}
        >
          <AntDesign name="back" size={30} color={color.foreground} />
        </TouchableOpacity>

        <Text style={styles.code}>Código: {code}</Text>
      </View>
    </View>
  );
}
