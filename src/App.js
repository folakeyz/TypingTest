import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Result, Test } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/test" exact element={<Test />} />
        <Route path="/result" exact element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
