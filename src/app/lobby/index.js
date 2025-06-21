import {
  View,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
  Vibration,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { showMessage } from "react-native-flash-message";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { color } from "../../colors";
import { router } from "expo-router";
import { Image } from "expo-image";

export default function Lobby() {
  const [room, setRoom] = useState({});

  useEffect(() => {
    socket.on("room:newPlayer", (title, message) => {
      Vibration.vibrate([0, 200, 100, 200]);
      showMessage({
        type: "info",
        message: title,
        description: message,
        icon: "auto",
        duration: 5000,
      });

      AccessibilityInfo.announceForAccessibility(message);
    });

    socket.on("room:showInfo", (data) => setRoom(data));

    socket.on("room:closed", (title, message) => {
      Vibration.vibrate([0, 200, 100, 200]);
      showMessage({
        type: "warning",
        message: title,
        description: message,
        duration: 4000,
        icon: "auto",
      });

      AccessibilityInfo.announceForAccessibility(message);

      router.replace("/connection");
    });

    socket.on("room:started", (title, message) => {
      Vibration.vibrate([0, 200, 100, 200]);
      showMessage({
        type: "success",
        message: title,
        description: message,
        duration: 3000,
        icon: "auto",
      });

      AccessibilityInfo.announceForAccessibility(message);

      router.replace("/game");
    });

    return () => {
      socket.off("room:newPlayer");
      socket.off("room:showInfo");
      socket.off("room:closed");
      socket.off("room:started");
    };
  }, []);

  const closeRoom = () => {
    socket.emit("room:close", room?.code);
    router.replace("/connection"); // ou router.back() se preferir voltar
  };

  const startGame = () => {
    if (room?.players.length > 1) {
      socket.emit("room:start", room?.code);
    }
  };

  const isReady = room?.players?.length > 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.6}
          onPress={() => closeRoom()}
          accessibilityLabel="Sair da sala"
          accessibilityRole="button"
        >
          <AntDesign name="back" size={24} color={color.foreground} />
        </TouchableOpacity>

        <Text style={styles.code} selectable>
          Código: {room?.code}
        </Text>
      </View>

      <Text style={styles.statusText} selectable>
        {room?.status}
      </Text>

      <View style={styles.players}>
        <FlatList
          style={styles.list}
          data={room?.players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.player}>
              <Image
                style={styles.avatar}
                source={[
                  item.image,
                  require("./../../../assets/images/anonimo.png"),
                ]}
              />
              <Text style={styles.playerName}>{item.name}</Text>
              {item.isHost && (
                <MaterialIcons
                  name="admin-panel-settings"
                  size={20}
                  color={color.green}
                />
              )}
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.startButton,
          isReady ? styles.startButtonEnabled : styles.startButtonDisabled,
        ]}
        onPress={() => startGame()}
        disabled={!isReady}
        accessibilityRole="button"
        activeOpacity={0.6}
      >
        <Entypo name="controller-play" size={20} color={color.foreground} />
        <Text style={styles.startButtonText}> Iniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}
