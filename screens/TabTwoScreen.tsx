import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { Searchbar } from "react-native-paper";

export default function TabTwoScreen() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  function getUsers() {
    axios.get("https://randomuser.me/api/?results=20").then((response) => {
      setData(response.data.results);
    });
  }

  function searchFilter(text: any) {
    if (text) {
      const newData = data.filter((item: any) => {
        const itemData = item.name.first
          ? item.name.first.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUsers();
    }, [])
  );

  return (
    <View>
      <ScrollView>
        <Searchbar
          placeholder="Buscar"
          onChangeText={(event) => searchFilter(event)}
          value={search}
          style={{
            borderColor: "transparent",
            borderWidth: 0,
            margin: 10,
          }}
        />
        {filteredData.map((item: any, index) => {
          return (
            <View key={index} style={styles.container}>
              <Image
                source={{ uri: item?.picture?.large }}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
              <View>
                <Text style={styles.textName}>
                  {item?.name?.first} {item?.name?.last}
                </Text>
                <Text style={styles.textEmail}>{item?.login?.username}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  textFriends: {
    fontSize: 20,
    textAlign: "left",
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "700",
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
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
