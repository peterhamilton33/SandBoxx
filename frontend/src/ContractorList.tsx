import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { Contractor } from "../src/types/types";
import "./FilterBar.css";
import { FaBug, FaHammer, FaTimes } from "react-icons/fa";
import { GiGrass } from "react-icons/gi";

const categories = [
    { name: "Landscaping", icon: <GiGrass />, key: "landscaping" },
    { name: "Pest Control", icon: <FaBug />, key: "pest" },
    { name: "General Contractor", icon: <FaHammer />, key: "contractor" },
];

const ContractorList: React.FC = () => {
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;

    useEffect(() => {
        axios.get<Contractor[]>("http://localhost:5134/contractors")
            .then(response => setContractors(response.data))
            .catch(error => console.error("Error fetching contractors:", error));
    }, []);

    // 🔍 Filter contractors based on search & category
    const filteredContractors = contractors.filter(contractor =>
        (contractor.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.contractorIndustry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.contractorLocation.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filter === "" || contractor.contractorIndustry.toLowerCase().includes(filter.toLowerCase()))
    );

    // 🔢 Calculate Pagination
    const totalPages = Math.ceil(filteredContractors.length / cardsPerPage);
    const currentContractors = filteredContractors.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    // ⏩ Handle Page Change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Container className="mt-4 d-flex flex-column align-items-center flex-grow-1">
                {/* 🔍 Search Bar */}
                <Form.Control 
                    type="text" 
                    placeholder="Search contractors..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="mx-auto mb-3 search-bar"
                />

                {/* 🎯 Filter Bar */}
                <div className="filter-bar">
                    {categories.map((category) => (
                        <div
                            key={category.key}
                            className={`filter-item ${filter === category.key ? "active" : ""}`}
                            onClick={() => {
                                setFilter(filter === category.key ? "" : category.key);
                                setCurrentPage(1);
                            }}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                        </div>
                    ))}
                    {filter && (
                        <div className="filter-item clear-filter" onClick={() => setFilter("")}>
                            <FaTimes />
                            <span>Clear Filter</span>
                        </div>
                    )}
                </div>

                {/* 🎯 Contractor Cards */}
                <Row className="justify-content-center w-100">
                    {currentContractors.length > 0 ? (
                        currentContractors.map((contractor) => (
                            <Col key={contractor.contractorId} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                                <Card className="mb-4 shadow-sm d-flex flex-column contractor-card">
                                    <Card.Img 
                                        variant="top" 
                                        src={contractor.contractorCoverPhoto} 
                                        alt={contractor.contractorName} 
                                        onError={(e) => e.currentTarget.src = "https://via.placeholder.com/280"} 
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold">{contractor.contractorName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {contractor.contractorIndustry} - {contractor.contractorLocation}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Rating:</strong> {contractor.contractorReview} ⭐ <br />
                                            <strong>Phone:</strong> {contractor.contractorPhoneNumber}
                                        </Card.Text>
                                        <Button variant="primary" href={`tel:${contractor.contractorPhoneNumber}`} className="w-100 mt-auto">
                                            Call Now
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className="text-center mt-5">
                            <h4>No contractors found.</h4>
                        </Col>
                    )}
                </Row>
            </Container>

            {/* 📌 Pagination (Always Visible) */}
            <Container className="pagination-container">
                <Pagination className="justify-content-center">
                    {/* ⬅️ Previous Button */}
                    <Pagination.Prev 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1} 
                    />

                    {/* 🔢 Page Numbers (Always Shows at Least 1 Page) */}
                    {[...Array(Math.max(totalPages, 1))].map((_, index) => (
                        <Pagination.Item 
                            key={index + 1} 
                            active={index + 1 === currentPage} 
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    {/* ➡️ Next Button */}
                    <Pagination.Next 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages || totalPages === 0} 
                    />
                </Pagination>
            </Container>
        </div>
    );
};

export default ContractorList;
