import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { images } from "@/utils";
import metaData from "../db.json";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");
const cardWidth = width - 30;

const VideoCall = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.videoCall}> Video Call</Text>
        <View style={styles.cancel}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["rgba(129,129,129,.1)", "rgba(129,129,129,.1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}
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
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <ImageBackground
            style={styles.cardImage}
            source={images[metaData.icon_url]}
          >
            <View style={styles.callerContainer}>
              <Image
                source={images[metaData.icon_url]}
                style={styles.callerCardImage}
              />
              <Text style={styles.callerText}>Raving Rabbids</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.card}>
          <ImageBackground
            style={styles.cardImage}
            source={images[metaData.icon_url]}
          >
            <View style={styles.callingContainer}>
              <Text style={styles.callerText}>Matilda</Text>
              <Image
                source={images[metaData.icon_url]}
                style={styles.callerCardImage}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginTop: 40,
  },
  videoCall: {
    marginLeft: 10,
    fontFamily: "MuseoBold",
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
  cancel: {
    width: 30,
    height: 30,
    marginLeft: 300,
  },
  optionButton: {
    borderRadius: 30,
    height: 30,
    width: 30,
  },
  card: {
    height: 335,
    borderRadius: 20,
    width: cardWidth,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  callerContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 10,
  },
  callingContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 290,
  },
  callerText: {
    fontFamily: "MuseoBold",
    fontSize: 18,
    color: "white",
    marginTop: 5,
    marginLeft: 5,
  },
  callerCardImage: {
    borderRadius: 70,
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  callingText: {
    fontFamily: "MuseoBold",
    fontSize: 18,
    color: "white",
    marginTop: 5,
  },
  callingCardImage: {
    borderRadius: 70,
    width: 40,
    height: 40,
  },
});

export default VideoCall;
