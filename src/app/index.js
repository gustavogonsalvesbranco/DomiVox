import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { styles } from "./styles";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../utils/socket";
import { Image } from "expo-image";

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");

        if (userStorage) {
          const parsed = JSON.parse(userStorage);
          setUser({ ...parsed, id: socket.id });
        } else {
          const data = {
            id: socket.id,
            name: "Anônimo",
          };
          setUser(data);
          await AsyncStorage.setItem("user", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Erro ao carregar user:", error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Erro ao salvar nome:", error);
      }
    };

    saveUser();
  }, [user]);

  const play = () => {
    Vibration.vibrate(100);
    router.push("/connection");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} />

      <Image
        style={styles.title}
        source={require("./../../assets/images/title.png")}
        importantForAccessibility="yes"
        accessibilityLabel="DomiVox"
        accessibilityRole="header"
      />

      <Avatar user={user} setUser={setUser} />

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#eee"
        value={user?.name}
        onChangeText={(name) => setUser({ ...user, name })}
        autoCapitalize="words"
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityHint="Toque duas vezes para ir para tela de salas criadas"
          onPress={() => play()}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>v2.0.0</Text>
    </View>
  );
}
