import { useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface TypewriterProps {
  arrayText: string[];
  delay: number;
}

export default function Typewriter({ arrayText, delay }: TypewriterProps) {
  const [text, setText] = useState(arrayText[0]);

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withRepeat(
      withTiming(text.length * 15, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true,
      () => nextText(),
    );
  }, []);

  const nextText = () => {
    const textIndex = arrayText.findIndex((texts) => texts === text);

    setText(arrayText[textIndex + 1]);
  };

  return (
    <Animated.View className="flex flex-row items-center gap-[1px]">
      <Animated.Text
        style={{ width: width }}
        className="text-primary text-3xl font-black"
      >
        {text}
      </Animated.Text>

      <CursorBlinker />
    </Animated.View>
  );
}

function CursorBlinker() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(withSpring(1), -1, true);
  });

  const cursorStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  return <Animated.View style={cursorStyle} className="w-1 h-6 bg-primary" />;
}
