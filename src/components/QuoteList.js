import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { DeleteModal } from "./Delete";

const Quote = (props) => (
  <tr>
    <td className="tooltip1">
      {props.quote.content}{" "}
      <div className="tooltiptext1">
        <ul style={{ textAlign: "left", listStyleType: "none" }}>
          <li>Category : {props.quote.category}</li>
          <li>Author: {props.quote.title}</li>
          <li>Source: {props.quote.source}</li>
        </ul>
      </div>
    </td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.quote._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteQuote(props.quote._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteQuoteId, setDeleteQuoteId] = useState("");
  const history = useHistory();
  // This method fetches the quotes from the database.
  useEffect(() => {
    async function getQuotes() {
      const response = await fetch(`http://localhost:5000/quote`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const quotes = await response.json();
      setQuotes(quotes);
    }

    getQuotes();

    return;
  }, [quotes.length]);

  const reset = () => {
    const newQuotes = quotes.filter((el) => el._id !== deleteQuoteId);
    setQuotes(newQuotes);
    setOpenDeleteModal(false);
    setDeleteQuoteId("");
  };
  // This method will delete a quote
  function deleteQuote(id) {
    setOpenDeleteModal(true);
    setDeleteQuoteId(id);
  }

  // This method will map out the quotes on the table
  function quoteList() {
    return quotes.map((quote) => {
      return (
        <Quote
          quote={quote}
          deleteQuote={() => deleteQuote(quote._id)}
          key={quote._id}
        />
      );
    });
  }

  // This following section will display the table with the quotes of individuals.
  return (
    <div>
      <div>
        <Button
          id="qsLoginBtn"
          color="primary"
          className="btn-margin"
          onClick={() => history.push("/create")}
        >
          Create Your Quote
        </Button>
      </div>
      <br />
      {openDeleteModal && (
        <DeleteModal
          id={deleteQuoteId}
          onClose={() => reset()}
          isOpen={openDeleteModal}
        />
      )}
      <h3>Quote List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Quote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{quoteList()}</tbody>
      </table>
    </div>
  );
}
