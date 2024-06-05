import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"


export default function JournalDetailPage() {
    const [content, setContent] = useState("");
    const [calendarDate, setCalendarDate] = useState("");

    async function getJournal(){ 
        const response = await axios.get(API + "/journal/detail", {
            params : {id: 1, date: "2024-06-06"} // change the id and date to not hard coded later
        })
        const data = response.data;
        setContent(data.content);
    }

    async function deleteJournal(){
        await axios.delete(API + "/journal/delete", {
            params : {id: 1, date: "2024-06-01"} // change the id and date to not hard coded later
        })
    }

    useEffect(() => {
        getJournal();
    }, []);

    return (
        <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{content}</Card.Text>
                {/* <Card.Link href={`/update/${id}`}>Edit</Card.Link> */}
                <Card.Link
                  onClick={() => {deleteJournal()}}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )

}