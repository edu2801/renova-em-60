import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, PostList } from "../types";
import { ScrollView, Image, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [data, setData] = React.useState([]);
  const win = Dimensions.get("window");

  function getPosts() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10")
      .then((response) => {
        setData(response.data);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      getPosts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item: PostList) => {
          const ratio = win.width / 600; /* image widht */
          return (
            <View key={item?.id} style={{ marginBottom: 25 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Image
                  source={{ uri: item?.thumbnailUrl }}
                  style={{ height: 40, width: 40, borderRadius: 40 }}
                />
                <Text
                  style={{ fontWeight: "700", fontSize: 15, marginLeft: 10 }}
                >
                  edu_luiz
                </Text>
              </View>
              <Image
                resizeMode={"stretch"}
                style={{
                  width: win.width,
                  height: 600 /*actual image height*/ * ratio,
                }}
                source={{ uri: item?.url }}
              />
              <View
                style={{ display: "flex", flexDirection: "row", padding: 5 }}
              >
                <FontAwesome
                  name="heart"
                  size={24}
                  color="#555"
                  style={{ marginRight: 10 }}
                />
                <FontAwesome name="comment" size={24} color="#555" />
              </View>
              <View style={{ padding: 5 }}>
                <Text style={{ fontSize: 12 }}>
                  Curtido por edu_luiz e outras pessoas
                </Text>
              </View>
              <View style={{ padding: 5 }}>
                <Text>
                  <Text style={{ fontWeight: "700" }}>edu_luiz </Text>
                  {item?.title}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 5 }}>
                <Text>
                  Ver todos os {Math.floor(Math.random() * 100)} comentários
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
