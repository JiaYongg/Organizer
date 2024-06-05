import React, {useState, useEffect} from "react"
import { convertToSQLDatetime, convertToSQLDate, getThisMonth } from "../components/dateHandling"
import axios from "axios";
import { API, REM } from "../constants"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

import styles from "../css/MainPage.module.css"

export default function MainPage() {

    const thisMonth = getThisMonth()

    const id = 1

    const [start, setStart] = useState(thisMonth['start'])
    const [end, setEnd] =  useState(thisMonth['end'])

    const [reminders, setReminders] = useState([])
    const [addPopup, setAddPopup] = useState(false)

    const localizer = momentLocalizer(moment)

    const [newReminderTitle, setNewReminderTitle] = useState("")
    const [newReminderStart, setNewReminderStart] = useState("")
    const [newReminderEnd, setNewReminderEnd] = useState("")


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
                    start: moment(reminder.start).toDate(),
                    end: moment(reminder.end).toDate(),
                    title: reminder.title
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

        const response = await axios.post(API + REM, {
            ...reminder
        })

        getMonthEvents()
        setAddPopup(false)
        
    }

    function onSelect(e) {
        console.log(e.start)
        alert(convertToSQLDate(e.start))
    }
    // async function AddEvent() {}

    useEffect(() => {
        getMonthEvents()
    }, [start, end])


    const components =  {
        event: (props) => {
            return (
                <div onClick={() => alert("hello")}>
                    Hello
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

            <div className={addPopup?`${styles.add} ${styles.active}`:`${styles.add}`} draggable="true">
                <div className={styles.exit}>
                    <i className='bx bx-x' onClick={() => {setAddPopup((prev) => !prev)}}></i>
                </div>
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
            </div>
        </main>
    )

}