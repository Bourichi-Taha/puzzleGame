import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import metaData from "../db.json";
import { images } from "../utils/index";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const cardWidth = width - 25;

const BookDetailScreen: React.FC = () => {
  const route = useRoute();
  const { category, selectedImage } = route.params as {
    category: { id: number; images: string[]; category: string; image: string };
    selectedImage: string;
  };
  const navigation = useNavigation();

  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showAudioOptions, setShowAudioOptions] = useState<boolean>(false);
  const [showVideoOptions, setShowVideoOptions] = useState<boolean>(false);

  const handleAudioCallPress = () => {
    setShowAudioOptions(true);
    setActiveCard("AudioCall");
  };

  const handleVideoCallPress = () => {
    /* setShowVideoOptions(true);
    setActiveCard("VideoCall"); */
    navigation.navigate("VideoCall");
  };

  const handleCardPress = (card: string) => {
    setActiveCard(card);
    setShowAudioOptions(false);
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["rgba(129,129,129,.1)", "rgba(129,129,129,.1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cancelButton}
            >
              <Image
                source={require("../assets/images/icons/icons8-cancel-100.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "black",
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Image source={selectedImage} style={styles.icon} />
          </View>
          <View>
            <Text style={[styles.nameTextAppName, { color: "black" }]}>
              {category.category}
            </Text>
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <TouchableOpacity
              style={[
                styles.card,
                activeCard === "AudioCall" && styles.activeCard,
              ]}
              onPress={handleAudioCallPress}
            >
              <View
                style={[
                  styles.cardImageContainer,
                  activeCard === "AudioCall" && styles.activeCardImageContainer,
                ]}
              >
                <Image
                  source={require("../assets/images/icons/icons8-call-100.png")}
                  style={[
                    styles.cardImage,
                    activeCard === "AudioCall" && styles.activeCardImage,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.cardTitle,
                  activeCard === "AudioCall" && styles.activeCardTitle,
                ]}
              >
                Audio Call
              </Text>
              <Image
                source={require("../assets/images/icons/icons8-arrow-100.png")}
                style={[
                  styles.nextImage,
                  activeCard === "AudioCall" && styles.activeNextImage,
                ]}
              />
            </TouchableOpacity>

            {showAudioOptions && (
              <View style={styles.audioOptionsContainer}>
                {category.images.map((image, index) => (
                  <TouchableOpacity
                    key={`${category.category}_${index}`}
                    style={styles.optionCard}
                    onPress={() =>
                      navigation.navigate("AudioCall", {
                        category: {
                          images: [images[image]],
                          image: image,
                          id: index,
                          category: category.category,
                        },
                        selectedImage: images[image],
                      })
                    }
                  >
                    <View style={styles.cardOptionImageContainer}>
                      <Image
                        source={require("../assets/images/icons/icons8-time-100.png")}
                        style={styles.cardOptionImage}
                      />
                    </View>
                    <Text style={styles.cardOptionTitle}>
                      Make Audio Call now
                    </Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={styles.optionCard}
                  onPress={() => navigation.navigate("AudioCall")}
                >
                  <View style={styles.cardOptionImageContainer}>
                    <Image
                      source={require("../assets/images/icons/icons8-replay-5-100.png")}
                      style={styles.cardOptionImage}
                    />
                  </View>
                  <Text style={styles.cardOptionTitle}>After 5 Sec</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionCard}
                  onPress={() => navigation.navigate("AudioCall")}
                >
                  <View style={styles.cardOptionImageContainer}>
                    <Image
                      source={require("../assets/images/icons/icons8-replay-30-100.png")}
                      style={styles.cardOptionImage}
                    />
                  </View>
                  <Text style={styles.cardOptionTitle}>After 30 Sec</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionCard}
                  onPress={() => navigation.navigate("AudioCall")}
                >
                  <View style={styles.cardOptionImageContainer}>
                    <Image
                      source={require("../assets/images/icons/icons8-60-seconds-100.png")}
                      style={styles.cardOptionImage}
                    />
                  </View>
                  <Text style={styles.cardOptionTitle}>After 60 Sec</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.card,
                activeCard === "VideoCall" && styles.activeCard,
              ]}
              onPress={handleVideoCallPress}
            >
              <View
                style={[
                  styles.cardImageContainer,
                  activeCard === "VideoCall" && styles.activeCardImageContainer,
                ]}
              >
                <Image
                  source={require("../assets/images/icons/icons8-video-call-100.png")}
                  style={[
                    styles.cardImage,
                    activeCard === "VideoCall" && styles.activeCardImage,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.cardTitle,
                  activeCard === "VideoCall" && styles.activeCardTitle,
                ]}
              >
                Video Call
              </Text>
              <Image
                source={require("../assets/images/icons/icons8-arrow-100.png")}
                style={[
                  styles.nextImage,
                  activeCard === "VideoCall" && styles.activeNextImage,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginTop: 30,
    marginLeft: 20,
    position: "absolute",
    zIndex: 10,
  },
  icon: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  nameTextAppName: {
    fontSize: 22,
    fontFamily: "MuseoBold",
    paddingBottom: 30,
  },
  titleContainer: {
    marginLeft: 0,
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  blurContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  goBackButton: {
    top: 10,
    width: 45,
    height: 45,
    tintColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view: {
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 40,
  },
  wallpaperImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  backButton: {
    borderRadius: 50,
    width: 70,
    height: 70,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
  },
  optionButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Beiruti",
    marginHorizontal: -20,
  },
  card: {
    borderRadius: 50,
    backgroundColor: "rgba(129,129,129,.1)",
    width: cardWidth,
    height: 90,
    flexDirection: "row",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  activeCard: {
    backgroundColor: "rgb(134, 119, 246)",
  },
  optionCard: {
    borderRadius: 50,
    backgroundColor: "rgba(129,129,129,.1)",
    width: cardWidth,
    height: 70,
    flexDirection: "row",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  cardImage: {
    borderRadius: 70,
    width: 45,
    height: 45,
    alignSelf: "center",
  },
  activeCardImage: {
    tintColor: "white",
  },
  nextImage: {
    borderRadius: 70,
    width: 20,
    height: 20,
    left: 160,
  },
  activeNextImage: {
    tintColor: "white",
  },
  cardOptionImage: {
    borderRadius: 70,
    width: 35,
    height: 35,
    alignSelf: "center",
  },
  cardOptionImageContainer: {
    borderRadius: 100,
    width: 80,
    height: 55,
    backgroundColor: "rgba(129,129,129,.1)",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardImageContainer: {
    borderRadius: 100,
    width: 75,
    height: 75,
    backgroundColor: "rgba(129,129,129,.1)",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  activeCardImageContainer: {
    backgroundColor: "rgba(255,255,255,.2)",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    tintColor: "white",
  },
  likeButtonImage: {
    width: 35,
    height: 35,
    tintColor: "white",
  },
  cardTitle: {
    color: "black",
    fontSize: 20,
    fontFamily: "MuseoBold",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  activeCardTitle: {
    color: "white",
  },
  cardOptionTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "MuseoBold",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  audioOptionsContainer: {
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  profile: {
    marginLeft: 380,
    marginTop: 60,
    width: 40,
    height: 40,
  },
});

export default BookDetailScreen;
