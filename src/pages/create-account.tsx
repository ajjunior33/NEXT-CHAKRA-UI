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
  CircularProgress,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateAccount() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreateAccount = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false)

      toast({
        title: 'Conta Criada com sucesso.',
        description: "Sua conta foi criada, com sucesso.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          router.push("/admin/dashboard")
        }
      })

    },3000)
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
          <Heading fontSize={'4xl'}>Criar uma conta</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input type="text" id="name" placeholder="Seu nome" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" id="email" placeholder="seumelhor@email.com" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="***********" />
            </FormControl>
            <Stack spacing={10}>

              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleCreateAccount}
                _hover={{
                  bg: 'blue.500',
                }}
                disabled={loading}
              >
               {loading === true ? ( 
               <>
               <CircularProgress isIndeterminate size={15} mr={3} color='green.300' />
               Carregando...
               </> ) : "Criar conta"}                
              </Button>
            </Stack>
            <Stack spacing={5}>
              <Text>Já tem uma conta? <Link color="blue.400" href="/">Acessar agora mesmo.</Link></Text>
            </Stack>
          </Stack>

        </Box>
      </Stack>
    </Flex>
  );
}