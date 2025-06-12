import { Stack } from "expo-router";
import { color } from "../colors";
import socket from "../utils/socket";
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";

export default function _layout() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="connection/index"
          options={{
            title: "Entrar ou criar sala",
            headerTitleAlign: "center",
            headerTintColor: color.foreground,
            headerStyle: {
              backgroundColor: color.bg,
            },
          }}
        />
        <Stack.Screen name="lobby/index" options={{ headerShown: false }} />
        <Stack.Screen name="game/index" options={{ headerShown: false }} />
      </Stack>
      <FlashMessage position="top" />
    </>
  );
}
