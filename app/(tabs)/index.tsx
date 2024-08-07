import React, { useState, useCallback } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  RefreshControl,
  View,
  Text,
} from "react-native";
import LevelCard from "@/components/LevelCard";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../utils/index";
import metaData from "../../db.json";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const color = "light";
  const nameText = "rgba(0, 0, 0, 1)";
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <View style={[styles.container]}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Image source={images[metaData.icon_url]} style={styles.icon} />
            <Text style={[styles.nameTextAppName, { color: nameText }]}>
              Puzzle Levels
            </Text>
          </View>
          <View style={styles.cardContainer}>
            {metaData.levels.map((level, levelIndex) => (
              <LevelCard
                key={`${levelIndex}`}
                number={levelIndex + 1}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Level", {
                    number: levelIndex + 1,
                    puzzleImages: level.images.map((img) => images[img]),
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCFC",
    height: "100%",
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFCFC",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingBottom: -100,
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFCFC",
    width: "100%",
    height: 100,
    ...Platform.select({
      ios: {
        /* 
        paddingTop: 55, */
        paddingLeft: 20,
      },
      android: {
        /* 
        paddingTop: 30, */
        paddingLeft: 19,
      },
    }),
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 100,
    marginRight: 10,
  },
  nameTextAppName: {
    fontSize: 20,
    fontFamily: "MuseoBold",
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    gap: 10,
    borderRadius: 20,
  },
  card: {
    marginTop: 20,
  },
});

export default HomeScreen;
