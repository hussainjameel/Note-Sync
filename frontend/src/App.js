import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route
              path="/notes"
              element={<Notes showAlert={showAlert} />}
            ></Route>
            <Route
              path="/addnote"
              element={<AddNote showAlert={showAlert} />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
