import { Button, Flex, Input, NumberInput, NumberInputField, Textarea, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";

const FormularioEditar = () => {

    const toast = useToast();

    const [data,setData] = useState();
    const [produtoId,setProdutoId] = useState();
    const [produto,setProduto] = useState();
    const [nome,setNome] = useState();
    const [descricao,setDescricao] = useState();
    const [tipo,setTipo] = useState();
    const [quantidade,setQuantidade] = useState();

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    }
    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    }
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    }
    const handleQuantidadeChange = (event) => {
        setQuantidade(Number(event.target.value));
    }
    
    const handleProdutoInput = (event) => {
        setProdutoId(event.target.value);
    }
 
    const LimparCampos = () => {
        setProdutoId("");
        setNome("");
        setDescricao("");
        setQuantidade(1);
        setTipo("");
    }
 


    const buscarProduto = async () => {
        try{
            const produto = await axios.get("http://localhost:8080/item/"+produtoId);
            const response = await axios.get("http://localhost:8080/item/"+produtoId);
           
            if(!produto.data.name) {
                return toast({
                    title: 'Produto nao Encontrado',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                  })
            }
            
            if(response.data.name ){
                 setProduto(response.data);
            }
        }catch(error){
            
        }
    }

    useEffect(()=>{
        setData({
            "name":nome,
            "description":descricao,
            "quantity" : quantidade,
            "type" : tipo
        })
    },[nome,descricao,quantidade,tipo])


    const atualizarProduto = async () => {
        try{
            const response = await axios.put("http://localhost:8080/item/"+produtoId,data);
            if(response.data.status !== 200){
                return toast({
                    title: 'Falha ao Editar',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                  })
            }
            return toast({
                title: 'Produto Atualizado',
                status: 'success',
                duration: 2500,
                isClosable: true,
              })
        }catch(error){
            return toast({
                title: 'Erro Inesperado',
                status: 'error',
                duration: 2500,
                isClosable: true,
              })
        }
    }


    const renderizarFormulario = () => {
        
        return (
        <div>
            <Flex flexDirection={"column"} gap={4} width={418}>

                    <Input className="cad_input" 
                    flexWrap={"wrap"}
                    value={nome}
                    onChange={handleNomeChange} 
                    placeholder='Nome do Produto'/>

                    <Textarea className="cad_input" 
                    value={descricao}
                    onChange={handleDescricaoChange} 
                    placeholder='Descrição' />

                    <Input maxLength={100}
                    className="cad_input"
                    value={tipo} 
                    onChange={handleTipoChange} 
                    placeholder='Tipo'/>

                    <Input type="number" 
                    className="cad_input"
                    value={quantidade} 
                    onChange={handleQuantidadeChange} 
                    placeholder='Quantidade'/>

                    <Flex gap={4} >
                        <Button width={"50%"} backgroundColor={"green.400"} onClick={atualizarProduto}>Editar</Button>
                        <Button width={"50%"} backgroundColor={"red.400"} onClick={LimparCampos}>Cancelar</Button>
                    </Flex>
            </Flex>
        </div>
        )
    }


    return (
        <div>
            <Flex flexDirection={"column"} gap={4} width={418} >
                <Flex gap={4}>
                    <NumberInput value={produtoId}>
                            <NumberInputField value={produtoId}
                            onChange={handleProdutoInput}
                            placeholder="Id do Produto">
                            </NumberInputField>
                    </NumberInput>
                    <Button onClick={buscarProduto} width={"60%"}>Buscar Produto</Button>
                </Flex>
                {produto ? renderizarFormulario() : <div></div>}
            </Flex>
            
        </div>
    )
}
export default FormularioEditar;