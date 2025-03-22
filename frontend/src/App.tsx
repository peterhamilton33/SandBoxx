import React from "react";
import ContractorList from "./ContractorList";
import "bootstrap/dist/css/bootstrap.min.css";


const App: React.FC = () => {
    return (
        <div>
            <h1 className="text-center mt-4">Find a Contractor</h1>
            <ContractorList />
        </div>
    );
};

export default App;
