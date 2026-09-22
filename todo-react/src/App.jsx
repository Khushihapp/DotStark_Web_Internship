
import Home from "./Pages/Home";
import ToDoList from "./Pages/ToDoList";
import ToDoDetails from "./Pages/ToDoDetails";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/todos">Todo List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<ToDoList />} />
        <Route path="/todos/:id" element={<ToDoDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;