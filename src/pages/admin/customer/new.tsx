import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, CircularProgress, FormControl, FormLabel, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";
import LayoutDefault from "../../../layout/LayoutDefault";

function Products() {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false)

      toast({
        title: 'Uhuu!',
        description: "Produto criado com sucesso.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          router.push("/admin/products")
        }
      })

    }, 3000)

  }

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <LayoutDefault>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/dashboard'>Página Inicial</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/customer'>Cliente</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/customer/new'>Novo</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={5}>
          <Link href="/admin/customer">Voltar</Link>
        </Box>
        <Box mt={10}>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mt={4}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" size={"sm"} placeholder="João da Silva" />
            </FormControl>

            <FormControl id="value_buy" mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" size={"sm"} placeholder="seumelhor@email.com" />
            </FormControl>

            <FormControl id="value_sale" mt={4}>
              <FormLabel>Telefone</FormLabel>
              <Input type="phone" size={"sm"} placeholder="5527988864790" />
            </FormControl>

        

            <Button
              bg={"green.400"}
              color={"white"}
              _hover={{ background: "green.600" }}
              my={3}
              type={"submit"}
              disabled={loading}
            >
              {loading === true ? (
                <>
                  <CircularProgress isIndeterminate size={15} mr={3} color='green.300' />
                  Carregando...
                </>) : (
                <>
                  <FiSave />
                  <Text ml={2}>Salvar</Text>
                </>
              )}


            </Button>
          </form>
        </Box>
      </LayoutDefault>
    </>
  )
}

export default Products;