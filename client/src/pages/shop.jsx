
// import '../../style.css';
import { Container, Card, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import {prods} from '../components/data'

function ProductList() {
  return (
    
    

    <Container className="content">
      <h2 className="my-4">prods</h2>
      <Container className="d-flex flex-wrap flex-direction-column mt-5">
        {prods.map((prods) => (

          <Card className="cards" key={prods.id}>
            <Card.Body className="card-content">
              <Row>
                <Col>
                  <p  className="cardTitle">
                    {prods.productName}
                  </p>
                  <h4> category: {prods.category}</h4>
                </Col>
              </Row>
              <Card.Text >
                <p className="desc">
                  <h4>Price: {prods.price}</h4>
                  
                </p>
              </Card.Text>
            </Card.Body>
          </Card>


        ))}
      </Container>
    </Container>
  );
}

export default ProductList;
