import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../../colors";
import { pickAndUploadImage } from "react-native-cloudlink";
import { Image } from "expo-image";

export default function Avatar({ user, setUser }) {
  const loadImage = async () => {
    const url = await pickAndUploadImage();

    setUser((prevUser) => ({
      ...prevUser,
      image: url,
    }));
  };

  return (
    <View style={styles.container}>
      <Image
        source={[user.image, require("./../../../assets/images/anonimo.png")]}
        style={styles.avatar}
        accessibilityLabel="Seu avatar"
        accessibilityRole="image"
      />

      <TouchableOpacity
        style={styles.camera}
        onPress={() => loadImage()}
        activeOpacity={0.6}
        accessibilityLabel="Selecionar uma foto da galeria"
        accessibilityRole="button"
      >
        <AntDesign name="camera" size={24} color={color.cyan} />
      </TouchableOpacity>
    </View>
  );
}
