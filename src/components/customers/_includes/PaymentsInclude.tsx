import { FormEvent, useState } from "react";
import {
  Button,
  CircularProgress,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { FiSend } from "react-icons/fi";
import { getApplicationClient } from "../../../services/axios";

interface Props {
  isOpen: boolean;
  id: string;
  closeModal: () => void
}

function PaymentsInclude({ isOpen, id, closeModal }: Props) {
  const [loading, setLoading] = useState(false);
  const [typePayment, setTypePayment] = useState("");
  const { onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const handleSaveUpdateStatus = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true)
    if (typePayment === "picpay") {
      getApplicationClient().post("/api/payment/picpay", {
        invoiceId: id
      })
        .then(response => {
          setLoading(false)
          toast({
            title: "Uhuu",
            description: "Pagamento picpay gerado com sucesso.",
            status: 'success',
            duration: 4000,
            isClosable: true
          })
          closeModal()
        }).catch(err => {
          setLoading(false)
          const message =
            err.response.data.error ?
              err.response.data.error : "Não foi possível gerar o pagamento para esse cliente, entre em contato com suporte."
          toast({
            title: "Opss",
            description: message,
            status: "error",
            duration: 6000,
            isClosable: true
          })
          closeModal()
        })
    } else if (typePayment === "pix") {

      getApplicationClient().post("/api/payment/pix", {
        invoiceId: id
      })
        .then(response => {
          setLoading(false)
          toast({
            title: "Uhuu",
            description: "Pagamento pix gerado com sucesso.",
            status: 'success',
            duration: 4000,
            isClosable: true
          })
          closeModal()
        }).catch(err => {
          const message =
            err.response.data.error ?
              err.response.data.error : "Não foi possível gerar o pagamento para esse cliente, entre em contato com suporte." 
          setLoading(false)
          toast({
            title: "Opss",
            description: message,
            status: "error",
            duration: 6000,
            isClosable: true
          })
          closeModal()
        })
    } else {
      alert("Método de pagamento não disponível.");
      setLoading(false);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as='h4' size='md'>
            Enviar fatura
          </Heading>
        </ModalHeader>
        <ModalCloseButton  onClick={closeModal}/>
        <ModalBody>

          <Select
            placeholder='Selecione uma opção'
            value={typePayment}
            onChange={(e) => setTypePayment(e.target.value)}>
            <option value='picpay'>Picpay</option>
            <option value='pix'>Pix</option>
            <option value='getPay' disabled>GetPay</option>
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
                <FiSend style={{ marginRight: 5 }} />
                <Text>Gerar pagamento</Text>
              </>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default PaymentsInclude