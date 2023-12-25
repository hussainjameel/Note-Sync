import React, { useState, useEffect, useContext } from "react";
import { NoteContext } from "../context/notes/NoteState"; // named imports in curly braces

const NoteCard = (props) => {
  const context = useContext(NoteContext); //3: Using Context
  const { deleteNote } = context; // extracting props (notes array) from context

  const { singlenote, updateNote } = props; // extracting singlenote and updateNote from props passed from Parent Notes.js

  const [randomImage, setRandomImage] = useState("");
  useEffect(() => {
    const generateRandomImage = () => {
      return `https://random.imagecdn.app/500/150?${Math.random()}`;
    };
    // Fetch a new random image on component mount
    setRandomImage(generateRandomImage());
  }, []);

  return (
    <>
      <div className="card min-w-lg m-4 bg-base-100 shadow-xl image-full">
        <figure>
          <img src={randomImage} alt="RandomIMG" />
        </figure>
        <div className="card-body lg:max-h-80 overflow-y-auto">
          <div>
            <h2 className="card-title text-white ">{singlenote.title} </h2>
          </div>
          <p className="font-thin">{singlenote.description}</p>

          <div className="card-actions justify-end">
            <p className="font-semibold">Tag: {singlenote.tag}</p>
            <i
              className="fa-regular fa-pen-to-square justify-end mx-4 cursor-pointer text-xl text-white"
              onClick={() => {
                updateNote(singlenote);
              }}
            ></i>{" "}
            <i
              className="fa-solid fa-trash justify-end cursor-pointer text-xl text-white"
              onClick={() => {
                deleteNote(singlenote._id);
                props.showAlert("Note Deleted Successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
