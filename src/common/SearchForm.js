import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SearchForm.css";

function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    search(searchTerm || undefined);
    setSearchTerm(searchTerm);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  }

  return (
    <div className="SearchBar">
      <form className="my-5" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            style={{ borderRadius: "30px 0px 0px 30px" }}
            placeholder="Search Movie"
            aria-label="Search Movie"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button style={{ borderRadius: "0px 30px 30px 0px" }} type="submit">
            Search Movie
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}

export default SearchForm;
