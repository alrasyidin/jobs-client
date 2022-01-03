import React, { useEffect, useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { JobsContext } from "../../context/JobsContext";
import { NavBar } from "../../lib/components";

export const DetailJob = () => {
  const { selectedJob, setSelectedJob } = useContext(JobsContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const { data } = await API.get(`/jobs/${id}`);
        setSelectedJob(data.data.job);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobsList();
  }, []);

  const companyElement = selectedJob && (
    <Card>
      <Card.Header>
        <h6>{selectedJob.company}</h6>
      </Card.Header>
      {selectedJob.company_logo ? <Card.Img variant="top" src={selectedJob.company_logo} /> : null}
      <Card.Footer>
        <a href={`${selectedJob.company_url}`}>{selectedJob.company_url}</a>
      </Card.Footer>
    </Card>
  );

  const howToApplyElement = selectedJob && (
    <Card className="mt-4">
      <Card.Header>
        <h6>How to apply?</h6>
      </Card.Header>
      <Card.Body>
        <div dangerouslySetInnerHTML={{ __html: selectedJob.how_to_apply }} />
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <Row>
          <strong>
            <Link to="/" className="text-primary">
              Back
            </Link>
          </strong>
        </Row>
        <Card>
          <Card.Header>
            <div>
              <span>{selectedJob.type}</span> / <span>{selectedJob.location}</span>
            </div>
            <h4>{selectedJob.title}</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} md={8}>
                <p dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
              </Col>
              <Col xs={12} md={4}>
                <div className="row">
                  {companyElement}
                  {howToApplyElement}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
