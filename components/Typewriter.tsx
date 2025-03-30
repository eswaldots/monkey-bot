import { useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

interface TypewriterProps {
  arrayText: string[];
  delay: number;
}

export default function Typewriter({ arrayText, delay }: TypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const currentText = arrayText[currentIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentLength = 0;
    let isTyping = true;

    const animate = () => {
      if (isTyping) {
        if (currentLength <= currentText.length) {
          setDisplayText(currentText.slice(0, currentLength));
          currentLength++;
          timeout = setTimeout(animate, 50); // Velocidad de escritura
        } else {
          isTyping = false;
          timeout = setTimeout(animate, 2000); // Pausa antes de borrar
        }
      } else {
        if (currentLength >= 0) {
          setDisplayText(currentText.slice(0, currentLength));
          currentLength--;
          timeout = setTimeout(animate, 50); // Velocidad de borrado
        } else {
          isTyping = true;
          currentLength = 0;
          setCurrentIndex((prev) => (prev + 1) % arrayText.length);
        }
      }
    };

    animate();

    return () => clearTimeout(timeout);
  }, [currentText]);

  return (
    <Animated.View className="flex flex-row items-center gap-[3px]">
      <Animated.Text className="text-primary text-3xl font-black">
        {displayText}
      </Animated.Text>
      <CursorBlinker />
    </Animated.View>
  );
}

function CursorBlinker() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, []);

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={cursorStyle} className="w-1 h-6 bg-primary" />;
}
