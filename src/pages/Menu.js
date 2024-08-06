import {Button,Flex, Text } from "@chakra-ui/react"
import FormularioCadastro from "../components/FormularioCadastro"
import { useState } from "react"
import VisualizarProdutos from "../components/VisualizarProdutos"
import FormularioEditar from "../components/FormularioEditar"
import FormularioExcluir from "../components/FormularioExcluir"

const Menu = () => {

    const renderizarCard = (opcao) => {
       if(opcao === "menu"){
        return <FormularioCadastro></FormularioCadastro>
       }
       if(opcao === "visualizar"){
        return <VisualizarProdutos></VisualizarProdutos>
       }
       if(opcao === "editar"){
        return <FormularioEditar></FormularioEditar>
       }
       if(opcao === "excluir"){
        return <FormularioExcluir></FormularioExcluir>
       }
    } 
    const [opcaoSelecionada,setOpcaoSelecionada] = useState();

    return (
        <div>
            <Flex display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            margin={16}
            gap={8}
            >
                <Text fontSize={24}>FarmSoftware</Text>
                <Flex gap={4} 
                flexWrap={"wrap"}
                justifyContent={"center"} 
                backgroundColor={"green.400"}
                padding={12} 
                borderRadius={8} >
                    <Button onClick={() => setOpcaoSelecionada("menu")}>Cadastrar Produto</Button>
                    <Button onClick={() => setOpcaoSelecionada("visualizar")}>Visualizar Estoque</Button>
                    <Button onClick={() => setOpcaoSelecionada("excluir")}>Excluir Produto</Button>
                    <Button onClick={() => setOpcaoSelecionada("editar")}>Editar Produto</Button>
                </Flex>

                <Flex >
                {
                    renderizarCard(opcaoSelecionada)
                }
                
                </Flex>
            </Flex>
           
        </div>
    )
}
export default Menu