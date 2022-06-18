import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import clientHttp from "http/axios";
import IRestaurante from "interfaces/IRestaurante";
import { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function AdministracaoRestaurantes(){
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const excluir = (restauranteParaExcluir: IRestaurante) => {
        clientHttp.delete(`restaurantes/${restauranteParaExcluir.id}/`)
        .then(() => {
            alert("Restaurante excluido com sucesso");
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id);
            setRestaurantes([...listaRestaurantes]);
        })
    }

    useEffect(() => {
        clientHttp.get<IRestaurante[]>("restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))
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
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        restaurantes.map(restaurante =>
                            <TableRow key={restaurante.id}>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        component={RouterLink}
                                        to={`/admin/restaurantes/${restaurante.id}`}
                                        variant="outlined"
                                        color="info">
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => excluir(restaurante)}>
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