import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { DeleteModal } from "./Delete";
const Create = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    source: ""
  });
  // const navigate = useNavigate();
  const history = useHistory();
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/quote/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPerson)
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ title: "", content: "", category: "", source: "" });
    //navigate("/");
    history.push("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Quote</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Author</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input
            type="text"
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
            required={true}
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
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Source</label>
          <input
            type="text"
            className="form-control"
            id="source"
            value={form.source}
            onChange={(e) => updateForm({ source: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Quote"
            className="btn btn-primary"
          />
        </div>
        <DeleteModal />
      </form>
    </div>
  );
};

export default Create;
