import { Alert, AlertIcon, Button, CircularProgress, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import { getApplicationClient } from "../../../services/axios";
import PaymentsInclude from "../../customers/_includes/PaymentsInclude";

interface Props {
  isOpen: boolean;
  id: string;
  closeModal: () => void
}

function StatusInvoiceInclude({ isOpen, id, closeModal }: Props) {
  const { onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveUpdateStatus = () => {

    console.log(id, status);
    getApplicationClient().put(`/api/payments/${id}`, {
      status
    })
      .then(response => {
        console.log(response);
        closeModal();
        toast({
          title: 'Uhu!!!',
          description: "O status do pagamento foi alterado com sucesso.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

      }).catch(err => {
        toast({
          title:"Opss...",
          description: "Houve um erro ao tentar alterar o status do pagamento",
          status: "error",
          duration: 9000,
          isClosable: true
        })
      })
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as='h4' size='md'>
              Alterar status
            </Heading>
          </ModalHeader>
          <ModalCloseButton onClick={closeModal}/>
          <ModalBody>
            {status === "pago" && (
              <Alert status='warning' mb={10}>
                <AlertIcon />
                <Text><Text fontWeight={"bold"}>Atenção: </Text> Ao marcar o pagamento como pago o processo é irreversível.</Text>
              </Alert>
            )}
            <Select placeholder='Selecione uma opção' value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='pendente'>Pendente</option>
              <option value='pago'>Pago</option>
              <option value='cancelado'>Cancelar</option>
            </Select>

          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between" alignItems="center">
            <Button colorScheme='red' mr={3} onClick={closeModal} disabled={loading}>
              Fechar
            </Button>
            <Button
              colorScheme='whatsapp'
              onClick={handleSaveUpdateStatus}
              disabled={loading}
            >
              {loading === true ? (
                <>
                  <CircularProgress isIndeterminate size={15} mr={3} color='green.300' />
                  <Text>Carregando...</Text>
                </>
              ) : (
                <>
                  <FiSave style={{ marginRight: 5 }} />
                  <Text>Salvar</Text>
                </>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default StatusInvoiceInclude;