import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"
import AppNavBar from "../components/AppNavBar";

export default function JournalPage() {
    const [content, setContent] = useState("");
    const [calendarDate, setCalendarDate] = useState("");
    const [journalList, setJournalList] = useState([]);
    const navigate = useNavigate();

    async function getAllJournal(){ // add this function to useeffect later, also change the params id to take the id of the user that logged in
        const response = await axios.get(API + "/journal", {
            params : {id: sessionStorage.getItem("uid")}
        })
        const data = response.data;
        setJournalList(data);
        console.log(data);
    }

    async function postJournal(){
        await axios.post(API + "/journal/add", {
            content: content,
            id : sessionStorage.getItem("uid"), // need to change the id later to a dynamic one when user logs in
            date: calendarDate
        })
    }

    async function deleteJournal(id){
        await axios.delete(API + "/journal/delete", {
            params : {id: id} // change the id and date to not hard coded later
        })
        getAllJournal();
    }

    useEffect(() => {
        // if (sessionStorage.getItem("uid") === null){
        //     return navigate("/login");
        // }
        getAllJournal();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // en-CA format is YYYY-MM-DD
    };

    return (
    <>
    <AppNavBar/>
    <Container>
        <h1 className="my-3">My Journal</h1>
        <Container>
        {     journalList.map((journal) => {
                return (
                
                    <div> 
                        <a href={`/journal/canvas/${journal.journal_id}`}> <li>Journal Number: {journal.journal_id} - {formatDate(journal.calendar_date)}</li></a>
                        <Button variant="primary" onClick={async (e) => {
                    deleteJournal(journal.journal_id);
                }}>
                Delete
                </Button>
                    </div> 
                
        )})}

        </Container>
    </Container>
    </>
    )

}