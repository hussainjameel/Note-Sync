import React, { useState, useContext, useEffect, useRef } from "react";
import { NoteContext } from "../context/notes/NoteState"; // named imports in curly braces
import NoteCard from "./NoteCard";
import AddNote from "./AddNote";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  let navigate = useNavigate(); // used for redirecting

  const context = useContext(NoteContext); //3: Using Context
  const { notes, getNotes, editNote } = context; // extracting props (notes array) from context

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // using ref, hadleClick function will close model using useRef
  const refClose = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Note updated");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note Updated Successfully", "success");
    // refClose.current.click();
    document.getElementById("my_modal_4").close(); // Close the modal
  };

  // using ref, updateNote function in edit button in NoteCard.js will open model using useRef
  const refOpen = useRef(null);
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    refOpen.current.click();
  };

  const onChange = (e) => {
    // ...note (using spread operator) we specify that all values of note remain same exept the values that are we specifying next to note change them only
    // e.g note id, user, date will not change only title,desc,tag will
    setNote({ ...note, [e.target.name]: e.target.value });
    e.preventDefault();
    console.log();
  };

  return (
    <>
      <div className="bg-yellow-900 bg-opacity-60 text-center py-20">
        <h1 className="text-3xl lg:text-5xl text-white text-opacity-70 font-extralight mb-5">
          Capture what's on your mind.
        </h1>
        <div className="flex items-center mt-10">
          <button
            className="w-56 px-4 py-2 mx-auto text-white rounded-lg bg-white bg-opacity-25 hover:bg-amber-900 focus:outline-none focus:bg-amber-900"
            onClick={() => {
              navigate("/addnote");
            }}
          >
            <i class="fa-solid fa-plus mr-4"></i>Add a New Note
          </button>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal()
      method */}
      <button
        ref={refOpen}
        className="btn hidden"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}

          <p className="py-4">Press ESC to close</p>
          <div className="modal-action flex flex-col">
            <h1 className="text-xl text-amber-950 font-semibold">
              <i className="fa-solid fa-file-pen mr-4"></i>Edit a Note
            </h1>
            <form className="form flex flex-col my-6" onSubmit={handleClick}>
              {/* Close button */}
              {/* <button
                ref={refClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button> */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  placeholder="Title here"
                  className="input input-bordered"
                  onChange={onChange}
                />

                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  className="textarea textarea-bordered h-24"
                  placeholder="Description here"
                  onChange={onChange}
                ></textarea>
                <label className="label">
                  <span className="label-text">Tag</span>
                </label>
                <input
                  type="text"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  placeholder="Tag here"
                  className="input input-bordered"
                  onChange={onChange}
                />
              </div>
              <div className="navbar-end my-6">
                <button
                  onClick={handleClick}
                  className="btn rounded-full bg-amber-900 bg-opacity-60"
                >
                  Edit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <div className="container mx-auto mb-20 px-4 ">
        <h1 className="text-3xl text-center text-amber-950 font-semibold my-20">
          {" "}
          <i class="fa-regular fa-note-sticky mr-4"></i> Saved Notes
        </h1>
        <h1 className=" text-center text-2xl font-thin ml-auto">
          {notes.length === 0 && "Oopsy! No notes to display!!!"}
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {notes.map((singlenote) => {
            return (
              <NoteCard
                key={singlenote._id}
                singlenote={singlenote}
                updateNote={updateNote}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notes;
