import { ReactNode } from "react";
// TODO: Change the KeyboardAvoidingView component to the react-native-keyboard-controller on dev builds
import { KeyboardAvoidingView, Pressable, View } from "react-native";
import { Settings } from "~/lib/icons/ui/Settings";
import History from "./History";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUp } from "~/lib/icons/ui/ArrowUp";
import Animated, { 
  useAnimatedKeyboard, 
  useAnimatedStyle, 
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppContainer({ children }: { children: ReactNode }) {

  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ 
        translateY: -keyboard.height.value
      }],
    };
  });

  return (
    <SafeAreaView className="flex-1">
    <ScrollView 
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} 
      className="flex-1"
      scrollEnabled={false}
    >
      <Animated.View style={translateStyle}>
        <View className="max-w-screen flex-1 flex justify-between items-center bg-background px-5 py-5">
          <View className="flex flex-row items-center w-full justify-between">
            <History />

            <Pressable>
              <Settings className="text-foreground opacity-80" size={24} strokeWidth={2} />
            </Pressable>
          </View>

          <View className="flex-1">{children}</View>

          <View className="w-full h-12 flex items-center flex-row gap-4 -mb-3">
            <Input placeholder="Preguntame lo que sea..." className="flex-1" />

            <Button onPress={() => {}} className="w-12 h-12 rounded-2xl bg-primary">
              <ArrowUp className="text-background" size={24} strokeWidth={2} />
            </Button>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
</SafeAreaView>
  );
}
