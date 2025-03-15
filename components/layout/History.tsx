import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { AlignJustify } from "~/lib/icons/AlignJustify";

export default function History() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Pressable
      onPress={() => openDrawer()}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      <AlignJustify className="text-foreground opacity-80" size={24} strokeWidth={2} />
    </Pressable>
  );
}
