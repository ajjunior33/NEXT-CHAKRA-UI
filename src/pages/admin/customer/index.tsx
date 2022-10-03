import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, CircularProgress, FormControl, FormLabel, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import LayoutDefault from "../../../layout/LayoutDefault";
import { getApplicationClient } from "../../../services/axios";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [nullHide, setNullHide] = useState(true);
  const [listCustomers, setListCustomers] = useState([]);
  const [cpf, setCpf] = useState("179.807.817-16");
  const router = useRouter();

  const handlePushInvoicesCustomer = (id: string) => {
    return router.push(`/admin/customer/${id}`)  
  }
  const handleCustomersList = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true)
    getApplicationClient().get(`/api/ixc/customers?documento=${cpf}`)
      .then(response => {
        console.log(response.data);
        if (response.data.registros > 0) {
          setListCustomers(response.data.data)
          setNullHide(true);
        } else {
          setListCustomers([]);
          setNullHide(false)
        }
        setLoading(false);
      })
  }
  return (
    <>
      <LayoutDefault>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/dashboard'>Página Inicial</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/customer'>Clientes</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={5}>
          <form onSubmit={handleCustomersList}>
            <Box display={"flex"} alignItems="center" justifyContent={"center"} flexDirection="row">
              <FormControl id="name" mt={4} mr={3}>
                <FormLabel>Documento</FormLabel>
                <Input type="text" placeholder="123.456.789-10" value={cpf} onChange={e => setCpf(e.target.value)} />
              </FormControl>
              <FormControl id="name" w={"12%"} mt={4}>
                <FormLabel style={{ visibility: "hidden" }}> Label</FormLabel>
                <Button
                  type="submit"
                  color="white"
                  background="blue.300"
                  _hover={{
                    background: "blue.500"
                  }}
                  alignItems="center"
                  disabled={loading}
                  mr={8}
                >
                  {loading === true ? (
                    <>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <FiSearch style={{ marginRight: 5 }} />
                      Buscar
                    </>
                  )}
                </Button>
              </FormControl>
            </Box>
          </form>

          {loading === true && (
            <Box display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" my={10}>
              <CircularProgress isIndeterminate size={42} mr={3} color='green.300' />
              Carregando...
            </Box>
          )}
          {nullHide === false && listCustomers.length === 0 && loading === false && (
            <Box mt={10} display={"flex"} alignItems={"center"} justifyContent="center">
              <Text fontSize={20}>Não encontramos nenhum cliente com esse CPF</Text>
            </Box>
          )}
          {listCustomers.length > 0 && loading === false && (
            <TableContainer mt={10}>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Cliente</Th>
                    <Th ></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listCustomers.map((customer: any) => (
                    <>
                      <Tr key={customer.id}>
                        <Td>{customer.id}</Td>
                        <Td>{customer.razao}</Td>
                        <Td isNumeric color="green.400">
                          <Button
                            bg={"blue.400"}
                            _hover={{ background: "blue.600" }}
                            color={"white"}
                            size={"sm"}
                            onClick={() => handlePushInvoicesCustomer(customer.id)}
                          >
                            <FiEye />
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ))}

                </Tbody>

              </Table>
            </TableContainer>
          )}
        </Box>
      </LayoutDefault>
    </>
  )
}

export default Customers;