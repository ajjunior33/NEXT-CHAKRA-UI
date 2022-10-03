import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, CircularProgress, FormControl, FormLabel, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { format } from 'date-fns';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { FormEvent, useState } from "react";
import { FiDollarSign, FiEdit2, FiEye, FiSearch } from "react-icons/fi";
import PaymentsInclude from "../../../components/customers/_includes/PaymentsInclude";
import LayoutDefault from "../../../layout/LayoutDefault";
import { getApplicationClient } from "../../../services/axios";

interface Props {
  invoices: [any];
}

function CustomerDetails({ invoices }: Props) {
  const [loading, setLoading] = useState(false);
  const [nullHide, setNullHide] = useState(true);
  const [listCustomers, setListCustomers] = useState([]);


  const [idPayment, setIdPayment] = useState<string>("0");
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const [cpf, setCpf] = useState("179.807.817-16");
  const router = useRouter();

  const handleGeneratePayment = (id: string) => {
    setIdPayment(id);
    setModalUpdateOpen(true);
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
          <PaymentsInclude
            id={idPayment}
            isOpen={modalUpdateOpen}
            closeModal={() => setModalUpdateOpen(false)}
          />

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
          {invoices.length > 0 && loading === false && (
            <TableContainer mt={10}>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Valor</Th>
                    <Th>Vencimento</Th>
                    <Th ></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoices.map((invoice: any) => (
                    <>
                      <Tr key={invoice.id}>
                        <Td>{invoice.id}</Td>
                        <Td>{parseFloat(invoice.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Td>
                        <Td>{format(new Date(invoice.data_vencimento), 'dd/MM/yyyy')}</Td>
                        <Td isNumeric color="green.400">
                          <Button
                            bg={"blue.400"}
                            _hover={{ background: "blue.600" }}
                            color={"white"}
                            size={"sm"}
                            onClick={() => handleGeneratePayment(invoice.id)}
                          >
                            <FiDollarSign />
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

export default CustomerDetails;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const id = ctx.params?.id;
  console.log(id);
  // const apiClient = getAPIClient(ctx);
  // const { ['nextauth.token']: token } = parseCookies(ctx);

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false
  //     }
  //   }
  // }
  const invoices = await getApplicationClient().get(`/api/ixc/invoices?clientId=${id}`)
    .then(response => response.data.data)

  return {
    props: {
      invoices
    }
  }
}
