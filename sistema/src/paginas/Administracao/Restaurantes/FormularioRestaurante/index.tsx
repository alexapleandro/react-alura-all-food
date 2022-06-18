import { Button, TextField, Typography, Box, Container, Paper } from "@mui/material";
import http from "http/axios";
import IRestaurante from "interfaces/IRestaurante";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function FormularioRestaurante(){

    const parametros = useParams();

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    useEffect(() => {
        if(parametros.id){
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta =>{
                    setNomeRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if(parametros.id){
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(() => {
                alert("Restaurante atualizado com sucesso")
            })
        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            }).then(() => {
                alert("Restaurante salvo com sucesso")
            })
        }
    }
    return (
        <Box>
            <Container maxWidth="lg" sx={{mt:1}}>
                <Paper sx={{p:2}}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", flexGrow: 1}}>
                        <Box component="form" sx={{width:"100%"}} onSubmit={aoSubmeterForm}>
                            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />
                            <Button
                                sx={{marginTop: 1}}
                                type="submit"
                                variant="outlined"
                                fullWidth
                            >Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}