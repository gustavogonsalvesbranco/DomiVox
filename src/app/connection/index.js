import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Vibration,
  AccessibilityInfo,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { color } from "../../colors";
import socket from "../../utils/socket";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Rooms from "./../../components/Rooms";

export default function Connection() {
  const [code, setCode] = useState("");
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

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

    socket.emit("rooms:fetchList");

    socket.on("rooms:list", (rooms) => {
      setRooms(rooms);
    });

    socket.on("room:notFound", (title, error) => {
      Vibration.vibrate([0, 200, 100, 200]);

      showMessage({
        type: "danger",
        message: title,
        description: error,
        icon: "auto",
        duration: 5000,
      });

      AccessibilityInfo.announceForAccessibility(error);
    });

    return () => {
      socket.off("rooms:list");
      socket.off("room:notFound");
    };
  }, []);

  const createCode = () =>
    Math.random().toString(36).substring(2, 12).toUpperCase();

  const join = () => {
    if (!code.trim()) {
      Vibration.vibrate([0, 200, 100, 200]);

      showMessage({
        type: "danger",
        message: "Código vazio",
        description: "O campo não pode estar vazio",
        icon: "auto",
        duration: 5000,
      });

      AccessibilityInfo.announceForAccessibility(
        "O campo não pode estar vazio"
      );
      return;
    }

    const data = {
      ...user,
      isHost: false,
    };

    socket.emit("join", code.trim().toUpperCase(), data);

    socket.once("joined", () => {
      Vibration.vibrate(100);
      router.replace("/lobby");
    });
  };

  const create = () => {
    const data = {
      ...user,
      isHost: true,
    };

    const code = createCode();

    socket.emit("create", code, data);

    Vibration.vibrate(100);
    router.replace("/lobby");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />

      <View style={styles.rooms}>
        <FlatList
        accessibilityRole="list"
          style={styles.list}
          contentContainerStyle={{ flexGrow: 1 }}
          data={rooms}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => <Rooms room={item} user />}
          ListEmptyComponent={() => (
            <View style={styles.noRooms}>
              <FontAwesome6
              accessibilityLabel="Ícone de porta fechada"
                accessibilityRole="image"
                name="door-closed"
                size={50}
                color={color.foreground}
              />
            <Text style={styles.message}>
              Nenhuma sala disponível no momento
            </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.containerConect}>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Digite o código da sala"
          placeholderTextColor="#eee"
          onChangeText={setCode}
          autoCapitalize="none"
          maxLength={10}
        />

        <TouchableOpacity
          style={styles.conect}
          activeOpacity={0.6}
          accessibilityLabel="Entrar"
          accessibilityRole="button"
          accessibilityHint="Toque duas vezes para ir para o lobby"
          onPress={() => join()}
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
        onPress={() => create()}
      >
        <Text style={styles.buttonText}>Criar uma sala</Text>
      </TouchableOpacity>
    </View>
  );
}
