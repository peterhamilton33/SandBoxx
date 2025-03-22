import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContractorList from "./ContractorList";
import ContractorDetails from "./ContractorDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContractorList />} />
        <Route path="/contractor/:id" element={<ContractorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
