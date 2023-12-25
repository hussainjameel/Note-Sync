import React, { useState, useContext } from "react";
import Footer from "./Footer";
import { NoteContext } from "../context/notes/NoteState";
import { useNavigate } from "react-router-dom";

const AddNote = (props) => {
  let navigate = useNavigate(); // used for redirecting
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = {};

    if (!note.title || note.title.length <= 2) {
      newErrors.title = "Title is required and must be min 3 characters long.";
      formValid = false;
    }

    if (!note.description || note.description.length <= 7) {
      newErrors.description =
        "Description is required and must be min 8 characters long.";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      navigate("/notes");
      props.showAlert("Note Added Successfully", "success");
      console.log("Note added");
    } else {
      props.showAlert("Please fill the form correctly", "error");
      console.log("Form validation failed");
    }

    // props.showAlert("Note Added Successfully", "success");
  };

  return (
    <>
      <div className="container mx-auto my-20 px-4 ">
        <h1 className="text-3xl text-center text-amber-950 font-semibold">
          <i className="fa-solid fa-file-pen mr-4"></i>Add Note
        </h1>
        <form className="form my-6">
          <div className="form-control max-w-7xl ">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title here"
              className={`input input-bordered ${
                errors.title ? "border-red-600" : ""
              }`}
              onChange={onChange}
              value={note.title}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mb-3">{errors.title}</p>
            )}

            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`textarea textarea-bordered h-24 ${
                errors.description ? "border-red-600 " : ""
              }`}
              placeholder="Description here"
              onChange={onChange}
              value={note.description}
            ></textarea>
            {errors.description && (
              <p className="text-red-600 text-sm mb-3">{errors.description}</p>
            )}

            <label className="label">
              <span className="label-text">Tag</span>
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              placeholder="Tag here"
              className="input input-bordered"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <div className="navbar-end my-6">
            <button
              className="btn rounded-full bg-amber-900 bg-opacity-60"
              onClick={handleSubmit}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddNote;
