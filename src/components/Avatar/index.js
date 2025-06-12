import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../../colors";
import { pickAndUploadImage } from "react-native-cloudlink";

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
        source={{
          uri:
            user.image ||
            `https://ui-avatars.com/api/?name=${user.name}&color=fff&background=random&rounded=true&length=2`,
        }}
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
