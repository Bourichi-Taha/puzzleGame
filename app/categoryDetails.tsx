import React, { useState, useCallback, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  Alert,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CharacterCard from "@/components/CharacterCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import metaData from "../db.json";
import { images } from "../utils/index";
import { useFavorites } from "@/components/favouritesContext";
/* import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads"; */

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [favouriteWallpapers, setFavouriteWallpapers] = useState([]);
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { category } = route.params as {
    category: { category: string; images: string[]; icon: string };
  };
  const gradientColors = [
    "rgba(255,255,255,1)",
    "rgba(255,255,255,1)",
    "rgba(255,255,255,0)",
  ];

  const [categoriesData, setCategoriesData] = useState<
    { category: string; icon: string; images: string[] }[]
  >([]);
  const navigation = useNavigation();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  useEffect(() => {
    const extractedData = metaData.categories.map((category) => ({
      category: category.category,
      icon: category.icon,
      images: category.images,
    }));
    setCategoriesData(extractedData);
  }, []);

  /*   const handleAddToFavourites = async (category: {
    category: string;
    images: string[];
  }) => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      let favouritesArray = favourites ? JSON.parse(favourites) : [];
      const newFavourite = {
        category: category.category,
        images: category.images,
      };

      const index = favouritesArray.findIndex(
        (fav: { category: string }) => fav.category === category.category
      );
      if (index === -1) {
        favouritesArray.push(newFavourite);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        Alert.alert("Success", "Added to favourites");
      } else {
        favouritesArray.splice(index, 1);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        Alert.alert("Success", "Removed from favourites");
      }
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  };

  const fetchFavourites = useCallback(async () => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      const parsedFavourites = favourites ? JSON.parse(favourites) : [];
      setFavouriteWallpapers(parsedFavourites);
    } catch (error) {
      console.error("Error retrieving favourites:", error);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavourites().then(() => setRefreshing(false));
  }, [fetchFavourites]); */

  const handleFavoriteToggle = (category: {
    id: number;
    images: string[];
    category: string;
    image: string;
  }) => {
    if (isFavorite(category)) {
      removeFromFavorites(category);
    } else {
      addToFavorites(category);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  /*   const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  }); */

  return (
    <View style={[styles.container]}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: "light" }]}
      >
        <ScrollView
          style={{
            ...Platform.select({
              ios: {
                paddingTop: insets.top + 150,
              },
              android: {
                paddingTop: insets.top + 200,
              },
            }),
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={[
              styles.cardContainer,
              { paddingBottom: insets.bottom + 200 },
            ]}
          >
            {category.images.map((image, index) => (
              <CharacterCard
                key={`${category.category}_${index}`}
                index={index}
                title={category.category}
                images={[images[image]]}
                image={image}
                isFavorite={isFavorite({
                  images: [images[image]],
                  image: image,
                  id: index,
                  category: category.category,
                })}
                style={styles.card}
                onPress={() => {
                  /* interstitial.load();
                  setTimeout(() => {
                    interstitial.show();
                  }, 20000); */
                  navigation.navigate("wallpaperDetails", {
                    category: {
                      images: [images[image]],
                      image: image,
                      id: index,
                      category: category.category,
                    },
                    selectedImage: images[image],
                  });
                }}
                onPressHeart={() => {
                  if (
                    !isFavorite({
                      images: [images[image]],
                      image: image,
                      id: index,
                      category: category.category,
                    })
                  ) {
                    addToFavorites({
                      images: [images[image]],
                      image: image,
                      id: index,
                      category: category.category,
                    });
                  } else {
                    {
                      removeFromFavorites({
                        images: [images[image]],
                        image: image,
                        id: index,
                        category: category.category,
                      });
                    }
                  }
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
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <View style={styles.cardImageContainer}>
              <ImageBackground
                source={images[category.icon]}
                style={styles.cardImage}
                resizeMode="cover"
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    position: "absolute",
                    backgroundColor: "transparent",
                    alignSelf: "center",
                    marginBottom: 10,
                    height: 250,
                    width: "100%",
                    marginVertical: 80,
                  }}
                >
                  <Text style={styles.cardTitle}>{category.category}</Text>
                  <Text style={styles.cardDescription}>
                    Fancomic Rayman Nightmarish
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingBottom: -50,
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
    alignItems: "stretch",
    backgroundColor: "transparent",
  },
  name: {
    flex: 1,
    backgroundColor: "transparent",
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 60,
    alignSelf: "center",
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
    fontFamily: "Beiruti",
  },
  titleContainer: {
    marginLeft: 0,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  cardSlider: {
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "transparent",
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
    marginBottom: 15,
  },
  containerHeader: {
    backgroundColor: "transparent",
  },
  mainContent: {},
  cardImageContainer: {
    height: 230,
    width: "100%",
    overflow: "hidden",
    shadowColor: "rgb(47, 64, 85)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    flex: 1,
    overflow: "hidden",
  },
  cardTitle: {
    color: "rgba(255,255,255,.5)",
    fontSize: 20,
    fontFamily: "MuseoBold",
    zIndex: 1,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 18,
    fontFamily: "MuseoBold",
    color: "white",
    paddingHorizontal: 10,
    zIndex: 1,
    textAlign: "center",
  },
});

export default HomeScreen;
