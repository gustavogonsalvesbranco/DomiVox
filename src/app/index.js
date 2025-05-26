import { StatusBar } from "expo-status-bar";
import { Image, Text, TextInput, TouchableOpacity, Vibration, View } from "react-native";
import { styles } from "./styles";
import Avatar from "../components/Avatar";
import { useState } from "react";
import { router } from "expo-router";

export default function App() {
  const [userName, setUserName] = useState("Player");

  const play = () => {
    const data = {
      id: Date.now().toString(),
      userName,
    };

    Vibration.vibrate(100);

    router.push("/conection");
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
        placeholder="Digite seu nome de usuário"
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
