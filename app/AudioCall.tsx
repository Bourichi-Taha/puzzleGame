import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
/* import WallPaperManager from "react-native-set-wallpaper";
 */ /* import WallPaperManager from "react-native-wallpaper-manager";*/
/* import {
  RewardedAd,
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads"; */

const windowHeight = Dimensions.get("window").height;
const HEADER_HEIGHT = 300;

const AudioCall: React.FC = () => {
  const route = useRoute();
  const { category, selectedImage, key } = route.params as {
    category: { id: number; images: string[]; category: string; image: string };
    selectedImage: string;
    key: string;
  };
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const themedBgColor = "white";

  if (!category || !category.images) {
    return (
      <View style={styles.container}>
        <Text>Error: Invalid category or images</Text>
      </View>
    );
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  /*   const rewarded = RewardedAd.createForAdRequest(TestIds.GAM_REWARDED, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  }); */

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={{ backgroundColor: themedBgColor }}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image
            source={{
              uri: "https://www.gamewallpapers.com/img_script/mobile_dir/img.php?src=wallpaper_raving_rabbids_travel_in_time_01.jpg&width=253&height=450&crop-to-fit&sharpen",
            }}
            style={styles.wallpaperImage}
          />
        </Animated.View>
      </Animated.ScrollView>
      <View style={styles.imageContainer}>
        <BlurView
          tint="systemUltraThinMaterial"
          intensity={100}
          experimentalBlurMethod="dimezisBlurView"
          style={{
            flex: 1,
            width: "100%",
            height: windowHeight,
            zIndex: 1,
          }}
        >
          <View style={styles.headerCall}>
            <View style={styles.icon}>
              <Image
                source={{
                  uri: "https://www.gamewallpapers.com/img_script/mobile_dir/img.php?src=wallpaper_raving_rabbids_travel_in_time_01.jpg&width=253&height=450&crop-to-fit&sharpen",
                }}
                style={styles.icon}
              />
            </View>
            <View>
              <Text style={[styles.nameTextAppName, { color: "white" }]}>
                {category.category}
              </Text>
              <Text style={[styles.callingText, { color: "lightgrey" }]}>
                is Calling...
              </Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.optionButton}>
              <LinearGradient
                colors={["red", "red"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.optionButton}
              >
                <Image
                  source={require("../assets/images/icons/icons8-downloading-updates-100.png")}
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: "white",
                    marginBottom: 5,
                  }}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <LinearGradient
                colors={["#6DE560", "#6DE560"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.optionButton}
              >
                <Image
                  source={require("../assets/images/icons/icons8-call-100.png")}
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: "white",
                    marginBottom: 5,
                  }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </View>
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
  headerCall: {
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 100,
    top: 150,
  },
  icon: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  nameTextAppName: {
    fontSize: 28,
    fontFamily: "MuseoBold",
    textAlign: "center",
  },
  callingText: {
    fontSize: 15,
    fontFamily: "MuseoBold",
    textAlign: "center",
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
    backgroundColor: "blue",
  },
  header: {
    height: windowHeight,
    overflow: "hidden",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        justifyContent: "center",
      },
      android: {
        justifyContent: "space-around",
      },
    }),
    height: 100,
    top: 550,
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
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Beiruti",
    marginHorizontal: -20,
  },
});

export default AudioCall;
