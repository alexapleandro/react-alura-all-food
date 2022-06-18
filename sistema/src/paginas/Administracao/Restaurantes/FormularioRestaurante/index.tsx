import { Button, TextField, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from "@mui/material";
import clientHttp from "http/axios";
import IRestaurante from "interfaces/IRestaurante";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";


export default function FormularioRestaurante(){

    const parametros = useParams();

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    useEffect(() => {
        if(parametros.id){
            clientHttp.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta =>{
                    setNomeRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if(parametros.id){
            clientHttp.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(() => {
                alert("Restaurante atualizado com sucesso")
            })
        } else {
            clientHttp.post("restaurantes/", {
                nome: nomeRestaurante
            }).then(() => {
                alert("Restaurante salvo com sucesso")
            })
        }
    }
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administracão
                        </Typography>
                        <Box sx={{display:'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{my:2, color:'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{my:2, color:'white'}}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
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
        </>
    )
}