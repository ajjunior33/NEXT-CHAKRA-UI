import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import LayoutDefault from "../../layout/LayoutDefault";

export default function Dashboard() {
  return (
    <>
      <LayoutDefault>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box mt={5}>
          <StatGroup>
            <Stat>
              <StatLabel>Entrada</StatLabel>
              <StatNumber>R$ 100.000,00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Saída</StatLabel>
              <StatNumber>R$ 50.000,00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Box mt={5}>
          <TableContainer>
            <Table variant='striped'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Cliente/Fornecedor</Th>
                  <Th>Produto</Th>
                  <Th isNumeric>Valor</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Usuário 01</Td>
                  <Td>Produto 01</Td>
                  <Td isNumeric color="green.400">R$ 30.000,00</Td>
                </Tr>
                <Tr>
                  <Td>Usuário 02</Td>
                  <Td>Produto 01</Td>
                  <Td isNumeric color="green.400">R$ 30.000,00</Td>
                </Tr>
                <Tr>
                  <Td>Fornecedor 01</Td>
                  <Td>Produto 02</Td>
                  <Td isNumeric color="red.400"> - R$ 40.000,00</Td>
                </Tr>
                <Tr>
                  <Td>Usuário 01</Td>
                  <Td>Produto 02</Td>
                  <Td isNumeric color="green.400">R$ 30.000,00</Td>
                </Tr>
                <Tr>
                  <Td>Usuário 03</Td>
                  <Td>Produto 03</Td>
                  <Td isNumeric color="green.400">R$ 10.000,00</Td>
                </Tr>
                <Tr>
                  <Td>Fornecedor 02</Td>
                  <Td>Produto 05</Td>
                  <Td isNumeric color="red.400"> - R$ 10.000,00</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Cliente/Fornecedor</Th>
                  <Th>Produto</Th>
                  <Th isNumeric>Valor</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>

      </LayoutDefault>
    </>
  )
}