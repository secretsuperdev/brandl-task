import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import "./index.css";


const ProductContainer = styled.div `
  padding: 20px 10px;
  display:flex;
  flex-direction:column;  
`;

const SearchInput = styled.input `
  height:28px;
  border:2px solid #9e50b9;  
`

const ProductList = styled.div `
  margin-top:20px;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  column-gap:10px;
  row-gap:10px;  
  @media(max-width:1028px){
    grid-template-columns: 1fr 1fr; 
  }
  @media(max-width:768px){
    grid-template-columns: 1fr; 
  }  
`

const Product = styled.div `
  display:flex;
  flex-direction:column;  
  background:#43294c;
  border:1px solid #c883f5;  
  border-radius:5px;
  position:relative  
`
const ProductImage = styled.img `
 width:100%;
 background:#eae3ed;
 border-top-left-radius:5px;
 border-top-right-radius:5px;


`
const ProductTitle = styled.div `
  font-family:rajdhani, sans-serif;
  font-weight: 600;
  font-size: 24px;  
  top:10px;
  left:10px;
  background:#43294c;
  padding:6px 10px;
  color:#fff;  
`
const ProductDescription = styled.div `
  font-family:rajdhani, sans-serif;
  font-weight: 300;
  font-size: 15px;  
  top:10px;
  left:10px;
  background:#43294c;
  padding:6px 10px;
  color:#fff;  
`
const ProductBadge = styled.div `
  font-family:rajdhani, sans-serif;
  font-weight: 600;
  font-size: 20px;
  position:absolute;
  top:10px;
  left:10px;
  background: #58207491;
  padding: 10px 20px;
  border-radius: 5px;
  color:#fff;
`

const IndexPage = ({ data: { products } }) => {

    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSearchedProducts(products.nodes);
    }, [products])

    useEffect(() => {

        let temp = [...products.nodes];
        temp = temp.filter((v) => v.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedProducts(temp);

    }, [searchText]);

    return ( < ProductContainer >
        <
        SearchInput type = "text"
        value = { searchText }
        onChange = {
            (e) => setSearchText(e.target.value)
        }
        />        <
        ProductList > {
            searchedProducts.map((product, index) => ( <
                Product key = { `product-${index}` } >
                <
                ProductImage src = { product.image.publicURL }
                />  <
                ProductTitle key = { product.name } > { product.name } < /ProductTitle>  <
                ProductDescription > { product.description } < /ProductDescription>  <
                ProductBadge > { `$${product.price}` } < /ProductBadge>  <
                /Product >
            ))
        } <
        /ProductList>  <
        /ProductContainer>

    )
}

export const query = graphql `
  query {
    products: allProductsJson {
      nodes {
      name
      description
      price
      image {    
        publicURL
      }
    }
    }
  }
`

export default IndexPage