import { TouchableOpacity, Text, View, Vibration } from "react-native";
import { styles } from "./styles";
import { Pontos } from "react-native-gustavino-dominino";
import { color } from "../../colors";
import { router } from "expo-router";
import socket from "./../../utils/socket";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Rooms({ room }) {
  const [user, setUser] = useState({});

useEffect(() => {
    const loadUser = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");

        if (userStorage) {
          const parsed = JSON.parse(userStorage);
          setUser({ ...parsed, id: socket.id });
        }
      } catch (error) {
        console.error("Erro ao carregar user:", error);
      }
    };

    loadUser();
  }, []);

  const join = () => {
    const data = {
      ...user,
      isHost: false,
    };

    alert(JSON.stringify(data));
    
    socket.emit("join", room.code, data);

    socket.on("joined", () => {
      Vibration.vibrate(100);
      router.replace("/lobby");
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => join()}
      accessibilityRole="button"
    >
      <View style={styles.containerInfo}>
        
    <Text style={styles.host}>
      {room.players[0].name}
    </Text>
      <Text style={styles.code}>Código: {room.code}</Text>
      </View>
      <View style={styles.players}>
        <Pontos
          numero={room.players.length}
          cor={room.players.length < 2 && color.red}
        />
        <View style={styles.bar}></View>
        <Pontos numero={2} />
      </View>
    </TouchableOpacity>
  );
}
