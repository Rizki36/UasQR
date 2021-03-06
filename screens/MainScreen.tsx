import {
  Box,
  Button,
  Input,
  KeyboardAvoidingView,
  Text,
  useToast,
} from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';
import QRCode from 'react-native-qrcode-generator';
import { RootStackScreenProps } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainScreen({
  navigation,
  route,
}: RootStackScreenProps<'Root'>) {
  const toast = useToast();
  const [text, setText] = useState(route.params?.qr ?? '');
  const [qrCode, setQrCode] = useState(route.params?.qr ?? '');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      bg={'#00298A'}
      alignItems={'center'}
      py={10}
    >
      <Text color={'white'} fontSize={20}>
        QR Generator
      </Text>
      <Box minHeight={300} flex={1} justifyContent={'center'}>
        {!!qrCode ? (
          <Box
            width={200}
            height={200}
            justifyContent={'center'}
            alignItems={'center'}
            bg={'white'}
            rounded={'xl'}
          >
            <QRCode value={qrCode} size={180} bgColor="white" fgColor="black" />
          </Box>
        ) : (
          <Box
            rounded={'xl'}
            justifyContent={'center'}
            alignItems={'center'}
            size={200}
            borderWidth={'4'}
            borderColor={'white'}
            borderStyle={'dotted'}
          >
            <Text color={'white'} fontSize={'lg'}>
              No QR
            </Text>
          </Box>
        )}
      </Box>
      <Box>
        <Box w={'full'} mb={10}>
          <Input
            color={'white'}
            borderWidth={'0'}
            bg={'#1139A0'}
            placeholder=""
            w="75%"
            maxWidth="300px"
            onChangeText={(v) => setText(v)}
            value={text}
            py={4}
            px={3}
            rounded={'lg'}
          />
        </Box>
        <Box
          mb={5}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Button
            size={50}
            width={32}
            bgColor={'#3DBCFA'}
            rounded={'full'}
            mr={'5'}
            onPress={() => setQrCode(text)}
          >
            Convert
          </Button>
          <Button
            size={50}
            width={'32'}
            bgColor={'#FF9B04'}
            rounded={'full'}
            onPress={() =>
              toast.show({
                description: 'Fitur belum selesai',
              })
            }
          >
            Share
          </Button>
        </Box>
        <Box justifyContent={'center'} alignItems={'center'} mb={5}>
          <Button
            size={20}
            width={20}
            bgColor={'#FFF'}
            color={'#00298A'}
            rounded={'full'}
            onPress={() => navigation.navigate('Scanner')}
          >
            <MaterialCommunityIcons
              style={{ fontSize: 40 }}
              name="qrcode-scan"
              size={24}
              color="black"
            />
          </Button>
        </Box>
        <Text alignSelf={'center'} color={'white'}>
          Created with ???? by nak unhasy
        </Text>
      </Box>
    </KeyboardAvoidingView>
  );
}
