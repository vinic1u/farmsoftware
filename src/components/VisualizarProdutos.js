import { createStandaloneToast, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const VisualizarProdutos = () => {
    
    const [data,setData] = useState();
    const { toast } = createStandaloneToast();
    


    const buscarData = async () => {
        try{
            const response = await axios.get("http://localhost:8080/items");
            setData(response.data);
        }catch(error){
            console.log(error);
            toast({
                title: 'Erro ao buscar dados', 
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }
    
    useEffect(()=>{
        buscarData()
    },[])



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
                            {data.map(produto => (
                                <Tr>
                                    <Td>{produto.id}</Td>
                                    <Td>{produto.name}</Td>
                                    <Td>{produto.description}</Td>
                                    <Td>{produto.type}</Td>
                                    <Td>{produto.quantity}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        )};

    return (
        <div>
            {data ? renderizarDados() : "Carregando..."}
        </div>
    )
}
export default VisualizarProdutos;