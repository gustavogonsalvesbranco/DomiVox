import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { showMessage } from "react-native-flash-message";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { color } from "../../colors";
import { router } from "expo-router";

export default function Lobby() {
  const [code, setCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("newPlayer", (player) => {
      showMessage({
        type: "info",
        message: "Novo Jogador",
        description: `${player.name} entrou na sala`,
        icon: "auto",
        duration: 5000,
      });
    });

    socket.on("showInfoRoom", (data) => {
      setCode(data.code);
      setPlayers(data.players);
      setStatus(data.status);
    });

    socket.on("roomClosed", () => {
      showMessage({
        type: "warning",
        message: "Sala encerrada",
        description: "Todos os jogadores saíram da sala.",
        duration: 4000,
        icon: "auto",
      });
      router.replace("/");
    });

    socket.on("started", () => {
      showMessage({
        type: "success",
        message: "Jogo iniciado",
        description: "A partida começou!",
        duration: 3000,
        icon: "auto",
      });
      router.replace("/game");
    }
    );

    return () => {
      socket.off("newPlayer");
      socket.off("showInfoRoom");
      socket.off("roomClosed");
      socket.off("started");
    };
  }, []);

  const closeRoom = () => {
    socket.emit("closeRoom", code);
    router.replace("/"); // ou router.back() se preferir voltar
  };

  const startGame = () => {
    if (players.length > 1) {
      socket.emit("startGame", code);
    }
  };

  const isReady = players.length > 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.6}
          onPress={closeRoom}
          accessibilityLabel="Sair da sala"
          accessibilityRole="button"
        >
          <AntDesign name="back" size={24} color={color.foreground} />
        </TouchableOpacity>

        <Text style={styles.code} selectable>Código: {code}</Text>
      </View>

      <Text style={styles.statusText} selectable>{status}</Text>

      <View style={styles.players}>
        {players.map((player) => (
          <View key={player.id} style={styles.player}>
            <Image
              style={styles.avatar}
              source={{
                uri: player.image,
              }}
            />
            <Text style={styles.playerName}>{player.name}</Text>
            {player.isHost && (
              <MaterialIcons
                name="admin-panel-settings"
                size={20}
                color={color.green}
              />
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.startButton,
          isReady ? styles.startButtonEnabled : styles.startButtonDisabled,
        ]}
        onPress={startGame}
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