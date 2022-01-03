import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailJob } from "./section/DetailJob";
import { Home } from "./section/Home";
import { JobsContextProvider } from "./context/JobsContext";

function App() {
  return (
    <JobsContextProvider>
      <Container fluid className="p-0" style={{ overflow: "hidden" }}>
        <Row>
          <Col md={12}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs/:id" element={<DetailJob />} />
              </Routes>
            </BrowserRouter>
            ,
          </Col>
        </Row>
      </Container>
    </JobsContextProvider>
  );
}

export default App;
