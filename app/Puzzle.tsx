import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { PicturePuzzle, PuzzlePieces } from "react-native-picture-puzzle";
import { useNavigation } from "expo-router";

const height = Dimensions.get("window").height;

const Puzzle = () => {
  const route = useRoute();
  const { image, puzzleImages, currentIndex, number } = route.params;
  const [hidden, setHidden] = React.useState<number | null>(0);
  const [stepCount, setStepCount] = React.useState<number>(0);
  const { width } = Dimensions.get("window");

  const numPieces = 9;
  const piecesArray = Array.from(Array(numPieces).keys());

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [pieces, setPieces] = React.useState<PuzzlePieces>(
    shuffleArray([...piecesArray])
  );

  const navigation = useNavigation();

  useEffect(() => {
    setPieces(shuffleArray([...piecesArray]));
    setHidden(0);
    setStepCount(0);
  }, [route.params]);

  let windowWidth = Math.floor((width - 50) / 4);
  windowWidth = Math.max(1, windowWidth);

  const onChange = React.useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      setPieces(nextPieces);
      setHidden(nextHidden);
      setStepCount((prevCount) => prevCount + 1);

      if (nextPieces.every((value, index) => value === index)) {
        navigation.navigate("Congrats", {
          puzzleImages: puzzleImages,
          currentIndex: currentIndex,
          number: number,
        });
      }
    },
    [setPieces, setHidden, setStepCount, navigation]
  );

  /* const onChange = React.useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      setPieces(piecesArray);
      setHidden(null);
      setStepCount((prevCount) => prevCount + 1);

      navigation.navigate("Congrats", {
        puzzleImages: puzzleImages,
        currentIndex: currentIndex,
        number: number,
      });
    },
    [piecesArray, navigation]
  ); */

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.07)",
          borderRadius: 50,
          width: 30,
          height: 30,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          ...Platform.select({ ios: { left: 345 }, android: { left: 390 } }),
          top: 35,
        }}
      >
        <Image
          source={require("../assets/images/icons/icons8-cancel-100.png")}
          style={{
            width: 16,
            height: 16,
            tintColor: "black",
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={image} style={styles.characterImage} />
        <Text style={styles.stepText}>Solve the puzzle</Text>
      </View>
      <View style={styles.canvaView}>
        <PicturePuzzle
          size={windowWidth * 4}
          pieces={pieces}
          hidden={hidden}
          onChange={onChange}
          source={image}
          style={styles.drawingCanvas}
        />
        <Text style={styles.totalStepsText}>Total Moves: {stepCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FEFCFC",
    paddingTop: 15,
  },
  header: {
    flexDirection: "column",
    marginTop: 40,
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  characterImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 20,
    color: "black",
    fontFamily: "MuseoBold",
    textAlign: "center",
  },
  nameText: {
    fontSize: 18,
    color: "black",
    fontFamily: "MuseoBold",
  },
  canvaView: {
    ...Platform.select({
      ios: {
        height: height * 0.44,
      },
      android: {
        height: height * 0.54,
      },
    }),
    ...Platform.select({
      ios: {
        width: "87%",
      },
      android: {
        width: "90%",
      },
    }),
    backgroundColor: "#F0EEEE",
    alignSelf: "center",
    borderRadius: 20,
    paddingTop: 4,
  },
  drawingCanvas: {
    height: 550,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
  },
  totalStepsText: {
    fontSize: 14,
    color: "black",
    fontFamily: "MuseoBold",
    textAlign: "center",
    paddingTop: 5,
  },
  canvaPreview: {
    width: "98%",
    height: "98%",
    backgroundColor: "#F0EEEE",
    alignSelf: "center",
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    borderRadius: 40,
    backgroundColor: "#F0EEEE",
    height: 30,
    width: 30,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  prevIcon: {
    height: 15,
    width: 15,
  },
  nextIcon: {
    height: 15,
    width: 15,
  },
});

export default Puzzle;
