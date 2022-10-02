import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Dimensions, FlatList, ScrollView } from "react-native";
import { Image } from "react-native";
import { Text, View } from "../components/Themed";
import { PostList } from "../types";
import axios from "axios";

export default function TabFourScreen() {
  const [data, setData] = React.useState([]);
  const win = Dimensions.get("window");

  function getPosts() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_page=1&_limit=18")
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 60, height: 60, borderRadius: 60, marginRight: 20 }}
          />
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  10
                </Text>
                <Text>Publicações</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  100
                </Text>
                <Text>Seguidores</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  89
                </Text>
                <Text>Seguindo</Text>
              </View>
            </View>
            <Text
              style={{
                width: "100%",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "700",
                textAlign: "center",
                padding: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              Seguir
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontWeight: "700", fontSize: 15 }}>edu_luiz</Text>
          <Text>Desenvolvedor Mobile</Text>
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item: PostList) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View key={item?.id} style={{}}>
                  <Image
                    source={{ uri: item?.url }}
                    style={{
                      width: (win.width - 40) / 3,
                      height: (win.width - 40) / 3,
                    }}
                  />
                </View>
              );
            }}
            numColumns={3}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
    alignSelf: "center",
  },
});
