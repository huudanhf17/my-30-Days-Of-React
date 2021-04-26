import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Image from "next/image";

function Characters({ characters }) {
  return (
    <Row>
      {characters.map((char) => (
        <Col lg={4} key={char.id}>
          <Card className="my-3 shadow">
            <Image src={char.image} width={300} height={300}></Image>
            <Card.Body>
              <Card.Title>{char.name}</Card.Title>
              <Card.Text>
                Origin: {char.origin.name}
                <br></br>
                Location: {char.location.name}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Characters;
