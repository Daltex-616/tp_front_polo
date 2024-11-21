import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";

const App = () => {
  // Mock Data
  const mockData = [
    { id: 1, nombre: "Auriculares Inalámbricos", precio: 120, categoria: "Electrónica" },
    { id: 2, nombre: "Silla de Escritorio", precio: 300, categoria: "Muebles" },
    { id: 3, nombre: "Cafetera Espresso", precio: 250, categoria: "Electrodomésticos" },
    { id: 4, nombre: "Juego de Mesa - Monopoly", precio: 50, categoria: "Juguetes" },
    { id: 5, nombre: "Libro de Programación en JavaScript", precio: 35, categoria: "Libros" },
  ];

  // Estados
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
  });

  // Simula la carga inicial de datos con timeout
  useEffect(() => {
    setTimeout(() => {
      setProductos(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Manejo del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleAddProduct = () => {
    if (nuevoProducto.nombre && nuevoProducto.precio && nuevoProducto.categoria) {
      setProductos([
        ...productos,
        {
          id: productos.length + 1,
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio),
          categoria: nuevoProducto.categoria,
        },
      ]);
      setNuevoProducto({ nombre: "", precio: "", categoria: "" });
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      {/* Spinner de carga */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Tabla de productos */}
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Categoría</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell>{producto.id}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>${producto.precio}</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Formulario de carga */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleInputChange}
              size="small"
            />
            <TextField
              label="Precio"
              name="precio"
              value={nuevoProducto.precio}
              onChange={handleInputChange}
              size="small"
              type="number"
            />
            <TextField
              label="Categoría"
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={handleInputChange}
              size="small"
            />
            <Button variant="contained" onClick={handleAddProduct}>
              Agregar Producto
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default App;
