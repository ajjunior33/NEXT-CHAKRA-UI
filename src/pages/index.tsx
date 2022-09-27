import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const handleSubmit = () => {
    router.push("/admin/dashboard")
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Image src={"/logo.svg"} width={45} height={45} alt={"Logo"} />
          <Heading fontSize={'4xl'}>Acesse sua conta</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="seumelhor@email.com" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="************"/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <div></div>
                <Link color={'blue.400'} href="/forgout-password">Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleSubmit}
                _hover={{
                  bg: 'blue.500',
                }}>
                Entrar
              </Button>
            </Stack>
            <Stack spacing={5}>
              <Text>Ainda não tem uma conta? <Link color="blue.400" href="/create-account">Crie agora mesmo.</Link></Text>
            </Stack>
          </Stack>

        </Box>
      </Stack>
    </Flex>
  );
}