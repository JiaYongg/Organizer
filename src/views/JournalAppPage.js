import React, {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"
import AppNavBar from "../components/AppNavBar";

export default function JournalApp() {
    const [content, setContent] = useState("");
    const [calendarDate, setCalendarDate] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    // async function postJournal(){
    //     await axios.post(API + "/journal/add", {
    //         content: content,
    //         id : sessionStorage.getItem("uid"),
    //         date: calendarDate
    //     })
    // }

    async function getJournal(){
        const response = await axios.get(API + "/journal/canvas", {
            params : {id: id, calendarDate: calendarDate}
        })
        const data = response.data;
        setContent(data.content);
        setCalendarDate(data.calendar_date);
        console.log(data);
    }

    async function editJournal(){
        await axios.put(API + "/journal/edit", {
            content: content,
            id: id
        })
    }

    async function deleteJournal(){
        await axios.delete(API + "/journal/delete", {
            params : {id: id} // change the id and date to not hard coded later
        })
        navigate("/journal");
    }
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        // if (sessionStorage.getItem("uid") === null){
        //     return navigate("/login");
        // }
        getJournal();
    }, []);


    return (
        <main  styles={{display: "flex", height: "100vh"}}>
        <AppNavBar/>
        <Container>
            <h1 className="my-3">{formatDate(calendarDate)}'s Journal</h1>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                </Form.Group>
                <Button variant="primary" onClick={async (e) => {
                    editJournal();
                }}>
                Edit
                </Button>
                <Button variant="primary" onClick={async (e) => {
                    deleteJournal();
                }}>
                Delete
                </Button>
            </Form>
            <p></p>
        </Container>
        </main>
        )
}