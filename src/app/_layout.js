import { Stack } from "expo-router";
import { color } from "../colors";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="conection/index"
        options={{
          title: "Entrar ou criar sala",
          headerTitleAlign: "center",
          headerTintColor: color.foreground,
          headerStyle: {
            backgroundColor: color.bg,
          },
        }}
      />
    </Stack>
  );
}
