import { Button, Flex, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const FormularioExcluir = () => {

    const toast = useToast();
    const [produtoId,setProdutoId] = useState();

    const handleProdutoInput = (event) => {
        setProdutoId(event.target.value);
    }

    const excluirProduto =  async () => {
        try{
            const produto = await axios.get("http://localhost:8080/item/"+produtoId);
            const response = await axios.delete("http://localhost:8080/item/"+produtoId);
            
            if(!produto.data.name) {
                return toast({
                    title: 'Produto nao Encontrado',
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

        </div>
    )
}
export default FormularioExcluir;