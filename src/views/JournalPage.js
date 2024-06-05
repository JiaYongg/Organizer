import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"

export default function JournalPage() {
    const [content, setContent] = useState("");
    const [calendarDate, setCalendarDate] = useState("");
    const [journalList, setJournalList] = useState([]);

    async function getAllJournal(){ // add this function to useeffect later, also change the params id to take the id of the user that logged in
        const response = await axios.get(API + "/journal", {
            params : {id: 1} // this is userid
        })
        const data = response.data;
        setJournalList(data);
        console.log(data);
    }

    async function postJournal(){
        await axios.post(API + "/journal/add", {
            content: content,
            id : 1, // need to change the id later to a dynamic one when user logs in
            date: calendarDate
        })
    }

    async function deleteJournal(){
        await axios.delete(API + "/journal/delete", {
            params : {id: 1, date: "2024-06-01"} // change the id and date to not hard coded later
        })
    }

    useEffect(() => {
        getAllJournal();
    }, []);

    return (
    <Container>
        <h1 className="my-3">My Journal</h1>
        <Container>
        {     journalList.map((journal) => {
                return <a href={`/journal/canvas/${journal.journal_id}`}> <div> <li>{journal.journal_id} - {journal.calendar_date}</li> </div> </a>
        })}

        </Container>
    </Container>
    )

}