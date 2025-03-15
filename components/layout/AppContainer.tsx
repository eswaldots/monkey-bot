import { ReactNode } from "react";
// TODO: Change the KeyboardAvoidingView component to the react-native-keyboard-controller on dev builds
import { KeyboardAvoidingView, Pressable, View } from "react-native";
import { Settings } from "~/lib/icons/Settings";
import History from "./History";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUp } from "~/lib/icons/ArrowUp";

export default function AppContainer({ children }: { children: ReactNode }) {

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <View className="transition-all flex-1 flex justify-between items-center bg-background px-5 py-10">
        <View className="flex flex-row items-center w-full justify-between">
          <History />

          <Pressable>
            <Settings className="text-foreground opacity-80" size={24} strokeWidth={2} />
          </Pressable>
        </View>

        <View className="flex-1">{children}</View>

        <View className="w-full h-12 flex items-center flex-row gap-4 -mb-3">
          <Input className="flex-1" />

          <Button className="w-12 h-12 rounded-2xl bg-primary">
            <ArrowUp className="text-background" size={24} strokeWidth={2} />
          </Button>

        </View>

      </View>

    </ KeyboardAvoidingView>
  );
}
