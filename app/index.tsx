import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing
} from 'react-native-reanimated';
import AppContainer from '~/components/layout/AppContainer';
import Logo from '~/components/Logo';
import { Text } from '~/components/ui/text';
import { Deepseek } from '~/lib/icons/providers/Deepseek';
import { useSettingsStore } from '~/lib/use-settings';

export default function Screen() {
  const { settings } = useSettingsStore();
  const [currentActionIndex, setCurrentActionIndex] = React.useState(0);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const actions = [
    "hacer",
    "construir",
    "resolver",
    "programar"
  ];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });

  React.useEffect(() => {
    const duration = 800;


    const changeToNextAction = () => {
      setCurrentActionIndex((prev) => (prev + 1) % actions.length);
    };

    // Configurar la animación que se repite
    const startAnimation = () => {
      // Primero desvanecemos y movemos hacia arriba
      opacity.value = withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.ease)
      });
      translateY.value = withTiming(-20, {
        duration: duration,
        easing: Easing.inOut(Easing.ease)
      }, () => {
        // Cambiamos la palabra
        runOnJS(changeToNextAction)();

        // Reposicionamos abajo (fuera de vista)
        translateY.value = 20;

        // Mostramos y movemos a posición original
        opacity.value = withTiming(1, {
          duration: duration,
          easing: Easing.inOut(Easing.ease)
        });
        translateY.value = withTiming(0, {
          duration: duration,
          easing: Easing.inOut(Easing.ease)
        });
      });
    };

    // Iniciar la animación
    startAnimation();

    // Configurar un intervalo para repetir la animación
    const intervalId = setInterval(() => {
      startAnimation();
    }, duration * 3);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppContainer>
      <View className='flex-1 flex flex-col justify-center items-center'>
        <Logo />
        <View className='justify-center items-center flex flex-row p-6 bg-background'>
          <Text className="text-foreground text-3xl font-black">Que quieres</Text>
          <View className='mx-2 h-10 justify-center overflow-hidden'>
            <Animated.Text style={animatedStyle} className="text-primary text-3xl font-black">
              {actions[currentActionIndex]}
            </Animated.Text>
          </View>
          <Text className='text-foreground text-3xl font-black'>hoy?</Text>
        </View>
      </View>
    </AppContainer>
  );
}
