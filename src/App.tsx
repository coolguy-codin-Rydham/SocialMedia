import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main  from "./pages/main/Main";
import Login  from "./pages/Login";
import Navbar  from "./components/Navbar";
import PostCreate from "./pages/create-post/PostCreate";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<PostCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;