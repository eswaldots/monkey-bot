import * as React from 'react';
import { View } from 'react-native';
import AppContainer from '~/components/layout/AppContainer';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <AppContainer>
      <View className='flex-1 justify-center items-center gap-5 p-6 bg-background'>
        <Text className="text-foreground text-2xl font-bold">En que puedo ayudarte hoy?</Text>
      </View>
    </AppContainer>
  );
}
