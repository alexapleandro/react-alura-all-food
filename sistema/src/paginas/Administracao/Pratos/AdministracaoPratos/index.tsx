import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import http from "http/axios";
import IPrato from "interfaces/IPrato";
import { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function AdministracaoPratos(){
    const [pratos, setPratos] = useState<IPrato[]>([]);

    const excluir = (pratoParaExcluir: IPrato) => {
        http.delete(`pratos/${pratoParaExcluir.id}/`)
        .then(() => {
            alert("Prato excluido com sucesso");
            const listaPratos = pratos.filter(prato => prato.id !== pratoParaExcluir.id);
            setPratos([...listaPratos]);
        })
    }

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(resposta => setPratos(resposta.data))
            .catch(erro => console.log(erro))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pratos.map(prato =>
                            <TableRow key={prato.id}>
                                <TableCell>
                                    {prato.nome}
                                </TableCell>
                                <TableCell>
                                    {prato.tag}
                                </TableCell>
                                <TableCell>
                                    <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        component={RouterLink}
                                        to={`/admin/pratos/${prato.id}`}
                                        variant="outlined"
                                        color="info">
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => excluir(prato)}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}