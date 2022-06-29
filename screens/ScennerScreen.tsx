import { BarCodeScanner } from 'expo-barcode-scanner';
import { Box, Button, Image, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types';
// @ts-ignore
import scannerPlaceholder from '../assets/images/scanner-placeholder.png';

export default function ScannerScreen({
  navigation,
}: RootStackScreenProps<'Scanner'>) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: number;
    data: string;
  }) => {
    navigation.replace('Root', { qr: data });
  };

  if (hasPermission === null) {
    return <Text color={'white'}>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text color={'white'}>No access to camera</Text>;
  }

  return (
    <Box flex={1} flexDirection={'column'} justifyContent={'center'}>
      <BarCodeScanner
        // @ts-ignore
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Box
        flex={1}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image width={200} height={200} source={scannerPlaceholder}></Image>
      </Box>
    </Box>
  );
}
