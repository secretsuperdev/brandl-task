import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const ProductTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
`

const IndexPage = ({ data: { products } }) => {
  return (
    <div>
      {products.nodes.map(product => (
        <ProductTitle key={product.name}>{product.name}</ProductTitle>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    products: allProductsJson {
      nodes {
        name
      }
    }
  }
`

export default IndexPage
