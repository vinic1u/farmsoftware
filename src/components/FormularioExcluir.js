import { Button, Flex, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { createStandaloneToast, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";

const FormularioExcluir = () => {

    const toast = useToast();
    const [produtoId,setProdutoId] = useState();
    const [data,setData] = useState();

    const handleProdutoInput = (event) => {
        setProdutoId(event.target.value);
    }

    const excluirProduto =  async () => {
        try{
            const response = await axios.delete("http://localhost:8080/item/"+produtoId);
            console.log(response);
            if(response.data.status !== 200) {
                return toast({
                    title: 'Falha ao Deletar',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                  })
            }
            return  toast({
                title: 'Produto Deletado',
                status: 'success',
                duration: 2500,
                isClosable: true,
              })
        }catch(error){
            return toast({
                title: 'Falha ao Deletar',
                status: 'error',
                duration: 2500,
                isClosable: true,
              })
        }
    }

    const renderizarDados = () => {
        return (
            <div>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Produtos em Estoque</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Nome</Th>
                                <Th>Tipo</Th>
                                <Th>Descricao</Th>
                                <Th>Quantidade Em Estoque</Th>
                            </Tr>
                        </Thead>
                        <Tbody> 
                            
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        )};

    return (
        <div>
            <Flex gap={4} >
                
                <NumberInput value={produtoId}>
                        <NumberInputField value={produtoId}
                        onChange={handleProdutoInput}
                        placeholder="Id do Produto">
                        </NumberInputField>
                </NumberInput>
                <Button onClick={excluirProduto}>Excluir Produto</Button>
            </Flex>
            {data ? renderizarDados() : <div></div>}
        </div>
    )
}
export default FormularioExcluir;