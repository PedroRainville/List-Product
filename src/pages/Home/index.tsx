/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { StyledPaper, StyledFormControl, StyledTableContainer, StyledTable } from "./styles";
import { getProducts, getCategories } from "../../actions/list.ts";
import {
  TableHead,
  TableBody,
  TableRow,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TableCell,
  Tooltip,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoria, setCategoria] = useState<string | number>("todos");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function get() {
      const responseProducts = await getProducts();
      const responseCategories = await getCategories();

      const productsData = responseProducts.data.Products;
      const categoriesData = responseCategories.data.Categories;

      const categoryMap = new Map(categoriesData.map((cat: any) => [cat.Category.id, cat.Category.name]));

      const enrichedProducts = productsData.map((product: any) => ({
        ...product,
        Product: {
          ...product.Product,
          category_name: categoryMap.get(product.Product.category_id) || "Sem Categoria",
        },
      }));

      setProducts(enrichedProducts);
      setCategories(categoriesData);
    }
    get();
  }, []);

  const handleChange = (categoryId: string | number) => {
    setCategoria(categoryId);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedProducts =
    categoria === "todos"
      ? products
      : products.filter((product) => product.Product.category_id === categoria);

  const paginatedProducts = displayedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledPaper>
      <StyledFormControl fullWidth>
        <InputLabel id="category-select-label">Categoria</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoria}
          label="Categoria"
          onChange={(event) => handleChange(event.target.value)}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.Category.id} value={category.Category.id}>
              {category.Category.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Nome da Categoria</TableCell>
              <TableCell>Categoria ID</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.Product.id}>
                  <TableCell>{product.Product.id}</TableCell>
                  <TableCell>{product.Product.name}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {product.Product.ProductImage && product.Product.ProductImage.length > 0 ? (
                        <img
                          src={product.Product.ProductImage[0].https}
                          alt={product.Product.name}
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      ) : (
                        <img
                          src="https://lojadetestescarol.commercesuite.com.br/admin/assets/img/no-image.bdd35868.svg"
                          alt="Imagem Padrão"
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{`R$ ${Number(product.Product.price).toFixed(2)}`}</TableCell>
                  <TableCell>{product.Product.category_name}</TableCell>
                  <TableCell>{product.Product.category_id}</TableCell>
                  <TableCell>
                    <Tooltip title={`Ver ${product.Product.name} na loja`} arrow>
                      <a
                        href={`https://lojadetestescarol.commercesuite.com.br/loja/produto.php?loja=1156825&IdProd=${product.Product.id}&iniSession=1&hash=511436566`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        <SearchIcon style={{ fontSize: 20 }} />
                      </a>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {categoria === "todos"
                    ? "Nenhum produto registrado"
                    : "Nenhum registro encontrado para esta categoria"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={displayedProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '20px', 
          backgroundColor: 'white',
          padding: '8px 16px', 
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', 
          borderRadius: '4px',
          width: 'auto' 
        }}
      />
    </StyledPaper>
  );
}
