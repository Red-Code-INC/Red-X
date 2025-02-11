import React, { useRef } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SwipeableView = ({ children }) => {
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <FlatList
      ref={flatListRef}
      data={children}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <View style={styles.page}>{item}</View>}
      onMomentumScrollEnd={handleScroll}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    width: SCREEN_WIDTH,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default SwipeableView;