import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    quotes: []
  });
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/quote/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Quote with id ${id} not found`);
        history.push("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      title: form.title,
      content: form.content,
      category: form.category
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json"
      }
    });

    history.push("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Quote</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content: </label>
          <input
            type="text"
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={form.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Quote"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
