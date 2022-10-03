import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, CircularProgress, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { FiEdit2, FiFilter } from "react-icons/fi";
import StatusInvoiceInclude from "../../../components/invoices/_includes/StatusInvoiceInclude";
import LayoutDefault from "../../../layout/LayoutDefault"
import { getApplicationClient } from "../../../services/axios";

function Invoices() {
  const [loading, setLoading] = useState(true);
  const [listInvoices, setListInvoices] = useState([]);
  const [status, setStatus] = useState("pendente")
  const [idUpdate, setIdUpdate] = useState<string>("0");
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const loadPayments = () => {
    getApplicationClient().get(`/api/payments?status=${status}`)
      .then(response => {
        console.log(response.data.data)
        setListInvoices(response.data.data);
        setLoading(false)
      })
  }
  useEffect(() => {
    setLoading(true);
    loadPayments()
  }, [status])

  const handleUpdateStatus = (id: string) => {
    console.log(id);
    setModalUpdateOpen(true);
    setIdUpdate(id);
  }

  useEffect( () => {
    if(modalUpdateOpen === false){
      loadPayments()
    }
  },[modalUpdateOpen])
  return (
    <>
      <LayoutDefault>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/dashboard'>Página Inicial</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/invoices'>Boletos</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={5}>
          <Menu>
            <MenuButton>
              <Button><FiFilter style={{ marginRight: 10 }} /> Status</Button>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={e => setStatus("pendente")}>Pendente</MenuItem>
              <MenuItem onClick={e => setStatus("pago")}>Pago</MenuItem>
              <MenuItem onClick={e => setStatus("cancelado")}>Cancelado</MenuItem>

            </MenuList>
          </Menu>

        </Box>
        <Box mt={8}>
          <StatusInvoiceInclude id={idUpdate} isOpen={modalUpdateOpen} closeModal={() => setModalUpdateOpen(false)}/>
            {loading === true && (
              <Box display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" my={10}>
                <CircularProgress isIndeterminate size={42} mr={3} color='green.300' />
                Carregando...
              </Box>
            )}

            {loading === false && listInvoices.length === 0 && (
              <Box display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" my={10}>
                <Text>Não há boletos com status {status}</Text>
              </Box>
            )}
            {loading === false && listInvoices.length > 0 && (
              <>
                <TableContainer mt={10}>
                  <Table variant='striped'>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Cliente</Th>
                        <Th>Valor</Th>
                        <Th>Opções</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listInvoices.map((invoice: any) => (
                        <>
                          <Tr key={invoice.referenceId}>
                            <Td>{invoice.id}</Td>
                            <Td>{invoice.clientName}</Td>
                            <Td color="green.400">
                              {parseFloat(invoice.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Td>
                            <Td>
                              <Button
                                onClick={() => handleUpdateStatus(invoice.referenceId)}
                                background="blue.500"
                                color="white"
                                _hover={{
                                  background: "blue.700"
                                }}>
                                <FiEdit2 />
                              </Button>
                            </Td>
                          </Tr>
                        </>
                      ))}

                    </Tbody>

                  </Table>
                </TableContainer>

              </>
            )}
        </Box>
      </LayoutDefault>
    </>
  )
}
export default Invoices;


export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

  return {
    props: {
    }
  }
}