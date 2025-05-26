import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, TextInput, Vibration } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { color } from "../../colors";

export default function Conection() {
  const [code, setCode] = useState("");

  const createCode = () =>
    Math.random().toString(36).substring(2, 12).toUpperCase();

  const conect = () => {
    if (!code.trim()) {
      Vibration.vibrate([0, 200, 100, 200]);
      return;
    }
    
    Vibration.vibrate(100);
  };

  const createRoom = () => {
    const data = {
      code: createCode(),
    };

    alert("Código da sala: " + data.code);

    Vibration.vibrate(100);
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
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.conect}
          activeOpacity={0.6}
          accessibilityLabel="Entrar"
          accessibilityRole="button"
          accessibilityHint="Toque duas vezes para ir para o loby"
          onPress={conect}
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
        accessibilityHint="Toque duas vezes para ir para o loby da sua sala "
        onPress={createRoom}
      >
        <Text style={styles.buttonText}>Criar uma sala</Text>
      </TouchableOpacity>
    </View>
  );
}
