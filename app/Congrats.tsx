import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const Congrats = () => {
  const route = useRoute();
  const { puzzleImages, currentIndex, number } = route.params;
  const confettiRef = useRef<LottieView>(null);
  const [animationFinished, setAnimationFinished] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    confettiRef.current?.play(0);
  }, []);

  useEffect(() => {
    confettiRef.current?.play(0);
  }, []);

  const handleAnimationFinish = () => {
    setAnimationFinished(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.messageText}>You solved the puzzle!</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Level", {
                number: number,
                puzzleImages: puzzleImages,
              })
            }
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              const nextIndex = currentIndex + 1;
              if (nextIndex < puzzleImages.length) {
                navigation.navigate("Puzzle", {
                  image: puzzleImages[nextIndex],
                  puzzleImages: puzzleImages,
                  currentIndex: nextIndex,
                  number: number,
                });
              } else {
                Alert.alert(
                  "No more puzzles",
                  "You have completed all puzzles."
                );
              }
            }}
          >
            <Text style={styles.nextButtonText}>Next Puzzle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LottieView
        ref={confettiRef}
        source={require("../assets/lottie/EDG4SVgppm.json")}
        autoPlay={false}
        loop={false}
        style={[styles.lottie, animationFinished && styles.lottieFinished]}
        resizeMode="cover"
        speed={0.75}
        onAnimationFinish={handleAnimationFinish}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFCFC",
  },
  congratulationsText: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "MuseoBold",
  },
  messageText: {
    fontSize: 18,
    marginBottom: 40,
    fontFamily: "MuseoBold",
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#2ECC71",
    padding: 20,
    borderRadius: 30,
    left: 20,
  },
  button: {
    backgroundColor: "#F0EEEE",
    padding: 20,
    borderRadius: 30,
    right: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "MuseoBold",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "MuseoBold",
  },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
  lottieFinished: {
    zIndex: -1,
  },
});

export default Congrats;
