import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { API } from "../../../../config/api";
import { JobsContext } from "../../../../context/JobsContext";

export const SearchForm = () => {
  const { setJobs } = useContext(JobsContext);
  const defaultValues = {
    description: "",
    location: "",
    full_time: "",
  };
  const [values, setValues] = useState(defaultValues);

  const changeValues = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const clearValue = () => {
    setValues(defaultValues);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const selectedParams = Object.keys(values).filter((v) => (values[v] !== "" ? values[v] : false));
      let searchParam = new URLSearchParams();

      selectedParams.forEach((selected) => {
        searchParam.set(selected, values[selected]);
      });

      searchParam = searchParam.toString();

      const response = await API.get(`/jobs?${searchParam}`);

      if (response.data?.data) {
        setJobs(response.data.data.jobs);
      } else {
        setJobs(null);
      }
      clearValue();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSearch(e)} className="my-5">
        <Row className="align-items-top">
          <Form.Group md={3} as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={values.description}
              name="description"
              placeholder="'java' or 'python'"
              onChange={(e) => changeValues(e)}
            />
          </Form.Group>
          <Form.Group md={3} as={Col}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={values.location}
              name="location"
              placeholder="Berlin"
              onChange={(e) => changeValues(e)}
            />
          </Form.Group>
          <Form.Group md={3} as={Col}>
            <Form.Label>Full Time</Form.Label>
            <Form.Check
              type="checkbox"
              value={values.full_time}
              name="full_time"
              // label="Full-Time"
              onChange={(e) => changeValues(e)}
            />
          </Form.Group>
          <Form.Group md={3} as={Col} className="align-self-center">
            <Button type="submit">Searching</Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};
