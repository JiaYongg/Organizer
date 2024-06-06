import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Image, Button, Container, Form } from "react-bootstrap";
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

    async function getJournal(id){
        const response = await axios.get(API + "/journal/canvas", {
            params : {id: id}
        })
        const data = response.data;
        setContent(data.content);
        setCalendarDate(data.calendar_date);
        console.log(data);
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
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
    <main style={{backgroundColor: "rgb(216, 216, 255)"}}>
    <AppNavBar/>
    <Container style={{overflow:"auto", padding: "20px", backgroundColor: "white"}}>
        <Container>
            {(journalList.length === 0) ? <><div style={{display:"flex", alignItems: "center", flexDirection:"column"}}><h1>No Journal Entries Found</h1><Image style={{height: "700px"}} src="images/empty-journal.jpg"></Image> </div></>: null}
        {     journalList.map((journal) => {
                return (
                    <Container onClick={
                        () => {
                            getJournal(journal.journal_id)
                        }
                    } style={{cursor: "pointer", display:"flex", alignItems: "center", marginBottom : "10px", padding: "30px", backgroundColor : "white", borderBottom: "1px solid grey"}}>
                        <Image src='images/book.jpg' width={"10%"} height={"10%"}/>
                        <div style={{marginLeft:"20px"}}>
                            <strong><p style={{fontSize: "20px"}}>{formatDate(journal.calendar_date)}</p></strong>
                            <a href={`/journal/canvas/${journal.journal_id}`}><Button variant="primary">Edit</Button></a>
                        </div>
                    </Container> 
                
        )})}

        </Container>
    </Container>

    <Container style={{padding:"30px", height: "100%"}}>
        <div style={{backgroundColor: "white", height: "100%", padding:"30px", borderRadius: "5px"}}>
            <h1>{calendarDate ? formatDate(calendarDate): "Choose a Journal"}</h1>
            <p>{content}</p>
        </div>
    </Container>
    </main>
    )

}