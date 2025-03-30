import * as React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import AppContainer from "~/components/layout/AppContainer";
import Logo from "~/components/Logo";
import Typewriter from "~/components/Typewriter";
import { Text } from "~/components/ui/text";
import { Deepseek } from "~/lib/icons/providers/Deepseek";
import { useSettingsStore } from "~/lib/use-settings";

export default function Screen() {
  const { settings } = useSettingsStore();

  const actions = [
    "hacer",
    "crear",
    "aprender",
    "leer",
    "escribir",
    "pensar",
    "revisar",
  ];

  return (
    <AppContainer>
      <View className="flex-1 flex flex-col justify-center items-center">
        <Logo />
        <View className="justify-center items-center flex flex-row p-6 bg-background">
          <Text className="text-foreground text-3xl font-black">
            Que quieres
          </Text>
          <View className="mx-2 h-10 justify-center overflow-hidden">
            <Typewriter text="hacer" delay={200} />
          </View>
          <Text className="text-foreground text-3xl font-black">hoy?</Text>
        </View>
      </View>
    </AppContainer>
  );
}
