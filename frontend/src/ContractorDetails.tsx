import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { Contractor } from "../src/types/types"; // Ensure correct path

const ContractorDetails: React.FC = () => {
    const { id } = useParams(); // Get the contractor ID from the URL
    const [contractor, setContractor] = useState<Contractor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get<Contractor>(`http://localhost:5134/contractors/${id}`)
            .then((response) => {
                setContractor(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching contractor details:", error);
                setError("Failed to load contractor details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Container className="text-center mt-5"><h3>Loading...</h3></Container>;
    if (error) return <Container className="text-center mt-5"><h3>{error}</h3></Container>;

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
                <Card.Img variant="top" src={contractor?.contractorCoverPhoto || "https://via.placeholder.com/600"} />
                <Card.Body>
                    <Card.Title className="fw-bold">{contractor?.contractorName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{contractor?.contractorIndustry} - {contractor?.contractorLocation}</Card.Subtitle>
                    <Card.Text>
                        <strong>Rating:</strong> {contractor?.contractorReview} ⭐ <br />
                        <strong>Phone:</strong> {contractor?.contractorPhoneNumber}
                    </Card.Text>
                    <Button variant="primary" href={`tel:${contractor?.contractorPhoneNumber}`} className="w-100">
                        Call Now
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ContractorDetails;
