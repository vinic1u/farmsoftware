import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Textarea, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";

const FormularioCadastro = () => {

    const toast = useToast();

    const [nome,setNome] = useState();
    const [descricao,setDescricao] = useState();
    const [tipo,setTipo] = useState();
    const [quantidade,setQuantidade] = useState();
    const [data,setData] = useState();

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

    useEffect(()=>{
        setData({
            "name":nome,
            "description":descricao,
            "quantity" : quantidade,
            "type" : tipo
        })
    },[nome,descricao,quantidade,tipo])



    const cadastrarProduto = async () => {
        try{
            const response = await axios.post("http://localhost:8080/item",data);
            if(response.status !== 201){
                return toast({
                    title: 'Falha ao Cadastrar',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                  })
            }
            toast({
                title: 'Produto Cadastrado',
                status: 'success',
                duration: 2500,
                isClosable: true,
              })
        }catch(error){
            toast({
                title: 'Falha ao Cadastrar',
                status: 'error',
                duration: 2500,
                isClosable: true,
              })
        }
        
    }


    const LimparCampos = () => {
        setNome("");
        setDescricao("");
        setQuantidade(1);
        setTipo("");
    }

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
                    <Button type="submit" width={"50%"} backgroundColor={"green.400"} onClick={cadastrarProduto} >Cadastrar</Button>
                    <Button width={"50%"} backgroundColor={"red.400"} onClick={LimparCampos}>Cancelar</Button>
                </Flex>
            </Flex>
        </div>
    )
}
export default FormularioCadastro;