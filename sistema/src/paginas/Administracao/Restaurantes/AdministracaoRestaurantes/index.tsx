import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import http from "http/axios";
import IRestaurante from "interfaces/IRestaurante";
import { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function AdministracaoRestaurantes(){
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const excluir = (restauranteParaExcluir: IRestaurante) => {
        http.delete(`restaurantes/${restauranteParaExcluir.id}/`)
        .then(() => {
            alert("Restaurante excluido com sucesso");
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id);
            setRestaurantes([...listaRestaurantes]);
        })
    }

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
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