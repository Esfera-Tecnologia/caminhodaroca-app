import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CarouselItem = {
  id: string | number;
  render: () => React.ReactNode; // dynamic render function
};

type Props = {
  data: CarouselItem[];
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showIndicators?: boolean;
  initialIndex?: number;
};

export default function Carousel({
  data,
  height = 200,
  autoPlay = true,
  autoPlayInterval = 4000,
  loop = true,
  showIndicators = true,
  initialIndex = 0,
}: Props) {
  const flatListRef = useRef<Animated.FlatList<CarouselItem> | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const currentIndexRef = useRef(initialIndex);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      if (!flatListRef.current) return;
      const safeIndex = Math.max(0, Math.min(index, data.length - 1));
      flatListRef.current.scrollToOffset({
        offset: safeIndex * containerWidth,
        animated: true,
      });
      setCurrentIndex(safeIndex);
    },
    [data.length, containerWidth]
  );

  // autoplay
  useEffect(() => {
    if (!autoPlay || data.length <= 1) return;

    const start = () => {
      stop();
      timerRef.current = setInterval(() => {
        const next = currentIndexRef.current + 1;
        if (next >= data.length) {
          if (loop) goToIndex(0);
          else stop();
        } else {
          goToIndex(next);
        }
      }, autoPlayInterval) as unknown as number;
    };

    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    start();
    return stop;
  }, [autoPlay, autoPlayInterval, data.length, loop, goToIndex]);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setCurrentIndex(idx);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const indicators = () => (
    <View style={styles.indicatorWrapper} pointerEvents="none">
      {data.map((_, i) => {
        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return <Animated.View key={String(i)} style={[styles.dot, { opacity }]} />;
      })}
    </View>
  );

  return (
    <View
      style={{ width: '100%' }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      <Animated.FlatList<CarouselItem>
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { height, width: containerWidth || 0 }]}>
            {item.render()}
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(_, index) => ({
          length: containerWidth,
          offset: containerWidth * index,
          index,
        })}
      />

      {showIndicators && indicators()}

      <View style={styles.controlsContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={[styles.controlButton, { left: 10 }]}
          onPress={() => {
            const prev = currentIndex - 1;
            if (prev < 0) {
              if (loop) goToIndex(data.length - 1);
            } else goToIndex(prev);
          }}
        >
          <Text style={styles.controlText}>{"‹"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { right: 10 }]}
          onPress={() => {
            const next = currentIndex + 1;
            if (next >= data.length) {
              if (loop) goToIndex(0);
            } else goToIndex(next);
          }}
        >
          <Text style={styles.controlText}>{"›"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: "#eee",
  },
  indicatorWrapper: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  controlsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  controlButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.35)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  controlText: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 24,
  },
});