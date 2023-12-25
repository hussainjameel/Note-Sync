// import React, { useState, useContext, useRef } from "react";
// import { NoteContext } from "../context/notes/NoteState"; // named imports in curly braces

// const EditNote = () => {
//   const context = useContext(NoteContext); // 3: Using Context
//   const { notes, addNote } = context; // extracting props from context

//   const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

//   const onChange = (e) => {
//     // ...note (using spread operator) we specify that all values of note remain same exept the values that are we specifying next to note change them only
//     // e.g note id, user, date will not change only title,desc,tag will
//     setNote({ ...note, [e.target.name]: e.target.value });
//     console.log();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNote(note.title, note.description, note.tag);
//     console.log("Note added");
//   };

//   // calling updateNote function in edit button will open model using useRef
//   const ref = useRef(null);
//   const updateNote = (currentNote) => {
//     ref.current.click();
//     setNote({
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.etag,
//     });
//   };

//   return (
//     <>
//       {/* You can open the modal using document.getElementById('ID').showModal()
//       method */}
//       <button
//         ref={ref}
//         className="btn"
//         onClick={() => document.getElementById("my_modal_4").showModal()}
//       >
//         open modal
//       </button>
//       <dialog id="my_modal_4" className="modal">
//         <div className="modal-box w-11/12 max-w-5xl">
//           <h3 className="font-bold text-lg">Hello!</h3>
//           <p className="py-4">Press ESC to close</p>
//           <div className="modal-action flex flex-col">
//             <h1 className="text-xl text-amber-950 font-semibold">
//               <i className="fa-solid fa-file-pen mr-4"></i>Add a New Note
//             </h1>
//             <form className="form flex flex-col my-6">
//               <div className="form-control flex flex-col">
//                 <label className="label">
//                   <span className="label-text">Title</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="etitle"
//                   name="etitle"
//                   value={note.etitle}
//                   placeholder="Title here"
//                   className="input input-bordered"
//                   // onChange={onChange}
//                   // value={note.title}
//                 />

//                 <label className="label">
//                   <span className="label-text">Description</span>
//                 </label>
//                 <textarea
//                   id="edescription"
//                   name="edescription"
//                   value={note.edescription}
//                   className="textarea textarea-bordered h-24"
//                   placeholder="Description here"
//                   // onChange={onChange}
//                   // value={note.description}
//                 ></textarea>
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="etag"
//                   name="etag"
//                   value={note.etag}
//                   placeholder="Tag here"
//                   className="input input-bordered"
//                   // onChange={onChange}
//                   // value={note.tag}
//                 />
//               </div>
//               <div className="navbar-end my-6">
//                 <button
//                   className="btn rounded-full bg-amber-900 bg-opacity-60"
//                   // onClick={handleSubmit}
//                 >
//                   Add Note
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </>
//   );
// };

// export default EditNote;
