import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TypewriterProps {
  text: string;
  delay: number;
}

export default function Typewriter({ text, delay }: TypewriterProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(1, {
      duration: delay,
      easing: Easing.linear,
    });
  }, [text]);

  return (
    <Animated.View>
      <Animated.Text
        className="text-primary text-3xl font-black"
        style={{ width: width.value * text.length }}
      >
        {text}
      </Animated.Text>
    </Animated.View>
  );
}
