import { StatusBar } from "expo-status-bar";
import { Image, Text, TextInput, TouchableOpacity, Vibration, View } from "react-native";
import { styles } from "./styles";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) setUserName(name);
      } catch (error) {
        console.error("Erro ao carregar nome:", error);
      }
    };

    loadUserName();
  }, []);

  useEffect(() => {
    const saveUserName = async () => {
      try {
        await AsyncStorage.setItem("userName", userName);
      } catch (error) {
        console.error("Erro ao salvar nome:", error);
      }
    };

    saveUserName();
  }, [userName]);

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

      <Avatar userName={userName} />

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#eee"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityHint="Toque duas vezes para ir para tela de salas criadas"
          onPress={play}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}