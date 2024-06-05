import React, {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"

export default function JournalApp() {
    const [content, setContent] = useState("");
    const [calendarDate, setCalendarDate] = useState("");
    const params = useParams();
    const id = params.id;

    async function postJournal(){
        await axios.post(API + "/journal/add", {
            content: content,
            id : 1, // need to change the id later to a dynamic one when user logs in
            date: calendarDate
        })
    }

    async function getJournal(){
        const response = await axios.get(API + "/journal/canvas", {
            params : {id: id}
        })
        const data = response.data;
        console.log(data);
    }

    useEffect(() => {
        getJournal();
    }, []);


    return (
        <Container>
            <h1 className="my-3">My Journal</h1>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Content"
                    onChange={(e) => setContent(e.target.value)}
                />
                </Form.Group>
    
                <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="date"
                    onChange={(e) => setCalendarDate(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" onClick={async (e) => {
                    postJournal();
                }}>
                Post Journal
                </Button>
            </Form>
            <p></p>
        </Container>
        )
}