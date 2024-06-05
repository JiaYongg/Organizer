import React, {useState, useEffect} from "react"
import { convertToSQLDatetime, convertToSQLDate, getThisMonth } from "../components/dateHandling"
import axios from "axios";
import { API, REM } from "../constants"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Popup from "../components/Popup";

import styles from "../css/MainPage.module.css"

export default function MainPage() {

    const id = 1

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

    function onSelect(e) {
        console.log(e.start)
        
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
        <main>
            
            <div className={styles.nav}>
                <div>Header</div>
                <div>
                    <button>Logout</button>
                </div>
            </div>
            <div className={styles.calander_cont}>
                <Calendar localizer={localizer} startAccessor="start" endAccessor="end" events={reminders} components={components} selectable onSelectSlot={(e) => onSelect(e)}/>
            </div>

            <button className={styles.add_button} onClick={() => {setAddPopup((prev) => !prev)}}>
                <p>+</p>
            </button>

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