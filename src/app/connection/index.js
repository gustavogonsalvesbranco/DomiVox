import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Vibration,
} from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { color } from "../../colors";
import socket from "../../utils/socket";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Connection() {
  const [code, setCode] = useState("");
  const [user, setUser] = useState({
    id: socket.id,
    name: "Anônimo",
    image: "",
  });

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

  const createCode = () =>
    Math.random().toString(36).substring(2, 12).toUpperCase();

  const connect = () => {
    if (!code.trim()) {
      Vibration.vibrate([0, 200, 100, 200]);
      showMessage({
        type: "danger",
        message: "Código vazio",
        description: "O campo não pode estar vazio",
        icon: "auto",
        duration: 5000,
      });
      return;
    }

    const data = {
      ...user,
      isHost: false,
    };

    socket.emit("joinRoom", code.trim().toUpperCase(), data);

    socket.on("roomJoined", () => {
      Vibration.vibrate(100);
      router.push("/lobby");
    });

    socket.on("roomNotFound", () => {
      Vibration.vibrate([0, 200, 100, 200]);
      showMessage({
        type: "danger",
        message: "Código inválido",
        description: "Não foi possível encontrar a sala",
        icon: "auto",
        duration: 5000,
      });
      return;
    });
  };

  const createRoom = () => {
    const data = {
      ...user,
      isHost: true,
    };

    const code = createCode();

    socket.emit("createRoom", code, data);
    
    Vibration.vibrate(100);
    router.replace("/lobby");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <View style={styles.containerConect}>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Digite o código da sala"
          placeholderTextColor="#eee"
          onChangeText={setCode}
          autoCapitalize="words"
        />

        <TouchableOpacity
          style={styles.conect}
          activeOpacity={0.6}
          accessibilityLabel="Entrar"
          accessibilityRole="button"
          accessibilityHint="Toque duas vezes para ir para o lobby"
          onPress={connect}
        >
          {code.trim() ? (
            <FontAwesome6 name="door-open" size={30} color={color.foreground} />
          ) : (
            <FontAwesome6
              name="door-closed"
              size={30}
              color={color.foreground}
            />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.create}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityHint="Toque duas vezes para ir para o lobby da sua sala"
        onPress={createRoom}
      >
        <Text style={styles.buttonText}>Criar uma sala</Text>
      </TouchableOpacity>
    </View>
  );
}
