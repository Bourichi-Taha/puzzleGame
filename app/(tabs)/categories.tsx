import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CategoryCard from "@/components/CategoryCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { images } from "../../utils/index";
import metaData from "../../db.json";
import { useState, useEffect } from "react";
/* import InlineAd from "@/components/InlineAd"; */

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const color = "light";
  const gradientColors = [
    "rgba(255,255,255,1)",
    "rgba(255,255,255,1)",
    "rgba(255,255,255,0)",
  ];
  const text = "rgba(0, 0, 0, .35)";
  const nameText = "rgba(0, 0, 0, 1)";

  const [categoriesData, setCategoriesData] = useState<
    { title: string; image: string; wallpapers: string[] }[]
  >([]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView
          style={{
            ...Platform.select({
              ios: {
                paddingTop: insets.top + 100,
              },
              android: {
                paddingTop: insets.top + 150,
              },
            }),
            flex: 1,
          }}
        >
          <View
            style={[
              styles.cardContainer,
              {
                ...Platform.select({
                  ios: {
                    paddingBottom: insets.bottom + 170,
                  },
                  android: {
                    paddingBottom: insets.bottom + 250,
                  },
                }),
              },
            ]}
          >
            {metaData.categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.category}
                image={images[category.icon]}
                wallpapers={category.images.map((img) => images[img])}
                style={styles.card}
                onPress={() => {
                  navigation.navigate("categoryDetails", { category });
                }}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7, 1]}
        style={styles.overlayContainer}
      >
        {/* <InlineAd /> */}
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <View style={styles.name}>
              <Text style={[styles.nameText, { color: text }]}>
                Hi 👋, this is your guide for
              </Text>
              <Text style={[styles.nameTextAppName, { color: nameText }]}>
                {metaData.app_name}
              </Text>
            </View>
            <View style={styles.icon}>
              <Image source={images[metaData.icon_url]} style={styles.icon} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chapters</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  overlayContainer: {
    width: "100%",
    height: 230,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 40,
  },
  name: {
    flex: 1,
    backgroundColor: "transparent",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 5,
  },
  nameText: {
    textAlign: "left",
    paddingVertical: 0,
    fontSize: 20,
    marginLeft: 0,
    fontFamily: "Beiruti",
  },
  nameTextAppName: {
    textAlign: "left",
    paddingVertical: 0,
    fontSize: 21,
    fontFamily: "MuseoBold",
  },
  titleContainer: {
    marginLeft: 0,
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 15,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  card: {
    marginBottom: 15,
  },
  containerHeader: {
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  mainContent: {
    paddingTop: 220,
  },
  title: {
    fontSize: 20,
    lineHeight: 32,
    fontFamily: "MuseoBold",
  },
});
