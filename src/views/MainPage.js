import React, {useState, useEffect} from "react"
import useDocumentTitle from "../components/useDocumentTitle"
import axios from "axios";
import { API, REM } from "../constants"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Popup from "../components/Popup";

import styles from "../css/MainPage.module.css"
import AppNavBar from "../components/AppNavBar";
import { useNavigate } from "react-router-dom";

export default function MainPage() {

    const today = new Date()

    const id = 1
    useDocumentTitle("Calander Board")
    const [reminders, setReminders] = useState([])
    const [addPopup, setAddPopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)

    const localizer = momentLocalizer(moment)

    const [newReminderTitle, setNewReminderTitle] = useState("")
    const [newReminderStart, setNewReminderStart] = useState("")
    const [newReminderEnd, setNewReminderEnd] = useState("")

    const [updateReminderTitle, setUpdateReminderTitle] = useState("")
    const [updateReminderStart, setUpdateReminderStart] = useState("")
    const [updateReminderEnd, setUpdateReminderEnd] = useState("")

    const [editId, setEditId] = useState()

    const navigate = useNavigate()

    //Get monthly Events
    async function getMonthEvents() {
        try {
            const response = await axios.get(API + REM, {
                params: {
                    id : id,
                }
            });
            const reminders = response.data;
            console.log(reminders)

            let formattedReminders = reminders.map((reminder) => {
                return {
                    start: moment(reminder.start.slice(0, -1)).toDate(),
                    end: moment(reminder.end.slice(0, -1)).toDate(),
                    title: reminder.title,
                    reminder_id: reminder.reminder_id
                }
            })

            setReminders(formattedReminders)
      
        }catch (error){
            console.error( error.message)
        }
    }

    async function addEvent() {
        const reminder = {
            id: id,
            title: newReminderTitle,
            start: newReminderStart,
            end: newReminderEnd
        }

        await axios.post(API + REM, {
            ...reminder
        })

        getMonthEvents()
        setAddPopup(false)
        
    }

    async function getSingleReminder(rem_id) {
        const details =  await axios.get(API+REM+`/${rem_id}`)
        console.log(details)
        setUpdateReminderTitle(details.data.title)
        setUpdateReminderStart(moment(details.data.start.slice(0, -1)).format('YYYY-MM-DDTHH:mm'))
        setUpdateReminderEnd(moment(details.data.end.slice(0, -1)).format('YYYY-MM-DDTHH:mm'))
    }


    async function updateEvent() {
        const reminder = {
            reminder_id: editId,
            title: updateReminderTitle,
            start: updateReminderStart,
            end: updateReminderEnd
        }

        await axios.put(API + REM, {
            ...reminder
        })

        getMonthEvents()
        setUpdatePopup(false)
        
    }

    async function deleteEvent() {
        await axios.delete(API + REM + `/${editId}`)

        getMonthEvents()
        setUpdatePopup(false)

    }

    async function getJournalId(date) {
       const response = await axios.get(API+"/journal/detail", {
            params : {
                id: 5,
                date: date 
            }
        })
        
        console.log(response.data)
        if (response.data) {
            navigate(`/journal/canvas/${response.data.journal_id}`)
        }

        console.log(response)
    }

    function onSelect(e) {
        console.log("triggered")
        getJournalId(moment(e.start).format("YYYY-MM-DD"))
            
    }
    // async function AddEvent() {}

    useEffect(() => {
        getMonthEvents()
    }, [])


    const components =  {
        event: (props) => {
            return (
                <div className={styles.calendar_item} onClick={() => {
                    setEditId(props.event.reminder_id)
                    setUpdatePopup((prev) => !prev)
                    getSingleReminder(props.event.reminder_id)
                }}>
                    <p>{moment(props.event.start).format('h:mm a')} - {moment(props.event.end).format(' h:mm a')} {props.title}</p>
                </div>
            )
        },
    }

    return (
        <main className={`${styles.main_page} Lato`}>
            
            <AppNavBar/>
            <div className={styles.calendar_component}>
                <div className={styles.today_items}>
                    <h3>Todays Events</h3>
                    <h5>Date: {moment(today).format("DD MMM YYYY")}</h5>
                    
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <span>12:00 - 12:45</span>
                            <p>Doctors Appointment</p>
                        </div>
                    </div>
                </div>
                <div className={styles.calander_cont}>
                    <Calendar localizer={localizer} startAccessor="start" endAccessor="end" events={reminders} components={components} selectable onSelectSlot={(e) => onSelect(e)}/>
                </div>

                <button className={styles.add_button} onClick={() => {setAddPopup((prev) => !prev)}}>
                    <p>+</p>
                </button>

            </div>
            <Popup activePopup={addPopup} setActivePopup={setAddPopup}>
                <div className={styles.content}>
                    <h1>Add new Reminder</h1>
                    <input type="text" placeholder="Add title" value={newReminderTitle} onChange={(e) => {setNewReminderTitle(e.target.value)}}/>
                    <div>
                        From <input type='datetime-local' value={newReminderStart} onChange={(e) => setNewReminderStart(e.target.value)}/> to  <input type='datetime-local' value={newReminderEnd} onChange={(e) => setNewReminderEnd(e.target.value)} />
                    </div>        

                    <button onClick={() => {
                        addEvent()
                    }}>Add Entry</button>        
                </div>    
            </Popup>

            <Popup activePopup={updatePopup} setActivePopup={setUpdatePopup}>
                <div className={styles.content}>
                    <h1>Edit Reminder</h1>
                    <input type="text" placeholder="Edit title" value={updateReminderTitle} onChange={(e) => {setUpdateReminderTitle(e.target.value)}}/>
                    <div>
                        From <input type='datetime-local' value={updateReminderStart} onChange={(e) => {setUpdateReminderStart(e.target.value)}}/> to  <input type='datetime-local' value={updateReminderEnd} onChange={(e) => setUpdateReminderEnd(e.target.value)} />
                    </div>        

                    <div className={styles.buttons}>
                        <button onClick={() => {
                            updateEvent()
                        }}>Update Entry</button> 
                        
                        <button onClick={() => {
                            deleteEvent()
                        }}>Delete</button> 
                    </div>
          
                    
             
                </div>
            </Popup>
        </main>
    )

}