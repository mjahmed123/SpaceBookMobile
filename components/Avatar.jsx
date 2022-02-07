import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { getUserPhotoById } from "../services/User";
export default function Avatar ({style, userId, size}) {
  const [photo, setPhoto] = useState(null);

  useEffect(async () => {
    if (!userId) return;
    const photo = await getUserPhotoById(userId);
    setPhoto(photo);
  }, [userId]);

  return (
    <View style={[styles.container, {height: size, width: size}, style]}>
      <Image style={styles.image} source={{uri: "data:image/png;base64," + photo}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    borderRadius: "50%",
    height: "100%",
    width: "100%"
  }
})