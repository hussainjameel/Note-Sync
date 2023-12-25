import React, { state, useState } from "react";
import { createContext } from "react";
import axios from "axios";

// 1: Creating Context
export const NoteContext = createContext();

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // fetch all notes
  // const getNotes = async () => {
  //   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //        localStorage.getItem("token"),
  //     },
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   setNotes(json);
  // };

  const getNotes = async () => {
    // API CALL
    await axios
      .get(`${host}/api/notes/fetchallnotes`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const json = response.data;
        console.log(json);
        setNotes(json);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  // // add a note
  // const addNote = async (title, description, tag) => {
  //   //API CALL
  //   const response = await fetch(`${host}/api/notes/addnote`, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //        localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });

  //   // Logic to add a new note
  //    const note = await response.json();
  //   setNotes(notes.concat(note)); // concat returns an array whereas push update existing array
  // };

  const addNote = async (title, description, tag) => {
    try {
      // API CALL using axios
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      // Logic to add a new note
      const newNote = {
        _id: response.data._id, // assuming the ID is directly available in the response
        user: response.data.user,
        title: title,
        description: description,
        tag: tag,
        date: response.data.date,
        __v: response.data.__v,
      };

      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // // delete a note
  // const deleteNote = async (id) => {
  //   //API CALL
  //   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  //     method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //        localStorage.getItem("token"),
  //     },
  //   });
  //   const json = response.json();
  //   console.log(json);
  //   // Logic to delete note
  //   console.log("Delete note with id " + id);
  //   const newNotes = notes.filter((note) => {
  //     return note._id !== id;
  //   });
  //   setNotes(newNotes);
  // };

  const deleteNote = async (id) => {
    try {
      // API CALL
      await axios.delete(`${host}/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      // Logic to delete note
      console.log("Delete note with id " + id);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error.message);
      // Handle error as needed
    }
  };

  // // edit a note
  // const editNote = async (id, title, description, tag) => {
  //   //API CALL
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "PUT", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //        localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });
  //   const json = response.json();
  //   //Logic to edit
  //   for (let index = 0; index < notes.length; index++) {
  //     const element = notes[index];
  //     if (element._id === id) {
  //       notes[index].title = title;
  //       notes[index].description = description;
  //       notes[index].tag = tag;
  //     }
  //     break;
  //   }
  //   setNotes(notes);
  // };

  const editNote = async (id, title, description, tag) => {
    try {
      // API CALL
      const response = await axios.put(
        `${host}/api/notes/updatenote/${id}`,
        {
          title,
          description,
          tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // Replace with your actual auth token
          },
        }
      );

      // Logic to edit
      const updatedNotes = notes.map((element) => {
        if (element._id === id) {
          return {
            ...element,
            title,
            description,
            tag,
          };
        }
        return element;
      });

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error.message);
      // Handle error as needed
    }
  };

  return (
    // 2: Provinding Context
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
