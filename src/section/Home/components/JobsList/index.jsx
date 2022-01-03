import React, { useEffect, useContext, useState } from "react";
import { formatDistance } from "date-fns";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../../../config/api";
import { JobsContext } from "../../../../context/JobsContext";

export const JobsList = () => {
  const { jobs, setJobs } = useContext(JobsContext);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [btnPreviousPageDisable, setBtnPreviousPageDisable] = useState(true);
  const [btnNextPageDisable, setBtnNextPageDisable] = useState(false);

  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        console.log(page);
        const { data } = await API.get(`/jobs?page=${page}`);
        console.log(data.data.jobs);

        setJobs(data.data.jobs);
        setCount(data.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobsList();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setBtnPreviousPageDisable(true);
      setBtnNextPageDisable(false);
    }
  };

  const handleNextPage = () => {
    if (page < Math.round(count / 10)) {
      setPage(page + 1);
    } else {
      setBtnNextPageDisable(true);
      setBtnPreviousPageDisable(false);
    }
  };

  const listItemElements =
    jobs.length > 0 ? (
      jobs.map((job) => {
        if (job) {
          return (
            <ListGroup.Item key={job.id}>
              <Row className="justify-content-end">
                <Col md={6}>
                  <Link to={`/jobs/${job.id}`}>
                    <div className="text-primary">
                      <h6>
                        <strong>{job.title}</strong>
                      </h6>
                    </div>
                  </Link>
                  <span className="text-secondary">{job.company} - </span>
                  <span className="text-success">
                    <strong>{job.type}</strong>
                  </span>
                </Col>
                <Col md={6} className="text-end">
                  <div className="ms-auto">{job.location}</div>
                  <span className="text-secondary">{formatDistance(new Date(job.created_at), Date.now())} ago</span>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        }
        return false;
      })
    ) : (
      <ListGroup.Item>
        <p className="text-center">No Data cannot be found, please try again with different option</p>
      </ListGroup.Item>
    );

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h3>Job Lists</h3>
        </Card.Header>
        <ListGroup variant="flush">{listItemElements}</ListGroup>
        <Card.Footer>
          <Row>
            <Col>
              <Button onClick={handlePreviousPage} disabled={btnPreviousPageDisable}>
                Previous Page
              </Button>
            </Col>
            <Col className="text-end">
              <Button onClick={handleNextPage} disabled={btnNextPageDisable}>
                Next Page
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};
