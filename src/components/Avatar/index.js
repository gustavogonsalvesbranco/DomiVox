import { Image, View } from "react-native";
import { styles } from "./styles";

export default function Avatar({ userName }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${userName}&color=fff&background=random&rounded=true&size=100&length=3`,
        }}
        style={styles.avatar}
        accessibilityLabel="Seu avatar"
        accessibilityHint="O avatar contém suas iniciais e uma cor de fundo aleatória com base no seu nome"
        accessibilityRole="image"
      />
    </View>
  );
}
