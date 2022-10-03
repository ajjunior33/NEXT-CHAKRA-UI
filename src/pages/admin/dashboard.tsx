import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import LayoutDefault from "../../layout/LayoutDefault";

export default function Dashboard() {
  return (
    <>
      <LayoutDefault>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Pagina Inicial</BreadcrumbLink>
          </BreadcrumbItem>

        </Breadcrumb>


      </LayoutDefault>
    </>
  )
}