import React, {useState, useEffect, useCallback, useMemo} from "react"
import useDocumentTitle from "../components/useDocumentTitle"
import axios from "axios";
import { API, REM } from "../constants"
import { Calendar, Views, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Popup from "../components/Popup";

import styles from "../css/MainPage.module.css"
import AppNavBar from "../components/AppNavBar";
import { useNavigate } from "react-router-dom";

export default function MainPage() {

    const today = new Date()

    const id = sessionStorage.getItem("uid")
    useDocumentTitle("Calander Board")
    const [reminders, setReminders] = useState([])
    const [addPopup, setAddPopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)
    const [addJournal, setAddJournal] = useState(false) 

    const localizer = momentLocalizer(moment)

    const [newReminderTitle, setNewReminderTitle] = useState("")
    const [newReminderStart, setNewReminderStart] = useState("")
    const [newReminderEnd, setNewReminderEnd] = useState("")

    const [updateReminderTitle, setUpdateReminderTitle] = useState("")
    const [updateReminderStart, setUpdateReminderStart] = useState("")
    const [updateReminderEnd, setUpdateReminderEnd] = useState("")
    const [todaysReminders, setTodaysReminders] = useState([])

    const [editId, setEditId] = useState()

    const [toggleCalendar, setToggleCalendar] = useState("m")
    const [currentView, setCurrentView] = useState(Views.MONTH)
    const [editDate, setEditDate] = useState('')
    const [journalContent, setJournalContent] = useState("")

    const [date, setDate] = useState(moment(new Date()).toDate())

    const navigate = useNavigate()

    const View_list = {
        "m": Views.MONTH,
        "d": Views.DAY,
        "w": Views.WEEK,        
    }

    function toggleView(letter) {
        setCurrentView(View_list[letter])
        setToggleCalendar(letter)
    }

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
            let todaysReminders = []
            let formattedReminders = reminders.map((reminder) => {

                if (moment(reminder.start.slice(0, -1)).format("YYYY-MM-DD")== moment(today).format("YYYY-MM-DD")) {
                    todaysReminders.push(
                        {
                            start: moment(reminder.start.slice(0, -1)).toDate(),
                            end: moment(reminder.end.slice(0, -1)).toDate(),
                            title: reminder.title,
                            reminder_id: reminder.reminder_id
                        }
                    )
                }
                return {
                    start: moment(reminder.start.slice(0, -1)).toDate(),
                    end: moment(reminder.end.slice(0, -1)).toDate(),
                    title: reminder.title,
                    reminder_id: reminder.reminder_id
                }
            })

            setReminders(formattedReminders)
            setTodaysReminders(todaysReminders)
      
        }catch (error){
            console.error( error.message)
        }
    }

    async function postJournal(calendarDate){
        console.log(journalContent, calendarDate)
        const response = await axios.post(API + "/journal/add", {
            content: journalContent,
            id : sessionStorage.getItem("uid"),
            date: calendarDate
        })

        // console.log(response)

        navigate(`/journal/canvas/${response.data.journal_id}`)
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
        setAddPopup(false)
        setUpdatePopup(false)
       const response = await axios.get(API+"/journal/detail", {
            params : {
                id: sessionStorage.getItem("uid"),
                date: date 
            }
        })
        
        console.log(response.data)
        if (response.data) {
            navigate(`/journal/canvas/${response.data.journal_id}`)
        } else {
            setEditDate(date)
            setAddJournal((prev) => !prev)
        }

        console.log(response)
    }

    function onSelect(e) {
        console.log("triggered")
        getJournalId(moment(e.start).format("YYYY-MM-DD"))
            
    }
    // async function AddEvent() {}

    const onNextClick = useCallback(() => {
        if (currentView === Views.DAY) setDate((prev) => moment(prev).add(1, "d").toDate())
        if (currentView === Views.WEEK) setDate((prev) => moment(prev).add(1, "w").toDate())
        if (currentView === Views.MONTH) setDate((prev) => moment(prev).add(1, "M").toDate())
    })


    const onPrevClick = useCallback(() => {
        if (currentView === Views.DAY) setDate((prev) => moment(prev).subtract(1, "d").toDate())
        if (currentView === Views.WEEK) setDate((prev) => moment(prev).subtract(1, "w").toDate())
        if (currentView === Views.MONTH) setDate((prev) => moment(prev).subtract(1, "M").toDate())
    })

    const dateText = useMemo(() => {
        if (currentView=== Views.DAY) return moment(date).format("dddd, MMMM DD");
        if (currentView=== Views.WEEK) {
            const from = moment(date)?.startOf("week");
            const to = moment(date)?.endOf("week");

            return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`
        }
        
        if (currentView === Views.MONTH) {
            return moment(date).format("MMMM YYYY")
        }
    }, [currentView, date])

    useEffect(() => {
        if (sessionStorage.getItem("uid") === null){
            return navigate("/login");
        }
        getMonthEvents()
    }, [])


    const components =  {
        event: (props) => {
            return (
                <div className={styles.calendar_item} onClick={() => {
                    setAddPopup(false)
                    setAddJournal(false)
                    setEditId(props.event.reminder_id)
                    setUpdatePopup((prev) => !prev)
                    getSingleReminder(props.event.reminder_id)
                }}>
                    <p> {props.title}</p>
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
                        {todaysReminders.map((reminder) => {
                            return(
                                <div className={styles.item}>
                                    <span>{moment(reminder.start).format("hh:mm a")} - {moment(reminder.end).format("hh:mm a")}</span>
                                    <p>{reminder.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.calander_cont}>
                    <h3 style={{fontSize: "20px"}}>{dateText}</h3>
                    <Calendar date={date} view={currentView} toolbar={false} localizer={localizer} startAccessor="start" endAccessor="end" events={reminders} components={components} selectable onSelectSlot={(e) => onSelect(e)}/>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.calendar_controls}>
                        <div onClick={() => toggleView("d")} className={(toggleCalendar==="d")?`${styles.control} ${styles.active}`: styles.control}>
                            Day 
                        </div>
                        <div onClick={() => toggleView("w")} className={(toggleCalendar==="w")?`${styles.control} ${styles.active}`: styles.control}>
                            Week 
                        </div>
                        <div onClick={() => toggleView("m")} className={(toggleCalendar==="m")?`${styles.control} ${styles.active}`: styles.control}>
                            Month 
                        </div>

                        <div className={styles.row}>
                            <div onClick={onPrevClick}>
                                <i className='bx bx-left-arrow-alt' ></i>
                            </div>
                            <div onClick={onNextClick}>
                                <i className='bx bx-right-arrow-alt' ></i>
                            </div>
                        </div>
                    </div>
                    <button className={styles.add_button} onClick={() => {
                        setUpdatePopup(false)
                        setAddJournal(false)
                        setAddPopup((prev) => !prev)
                    }}>
                        
                        <p>+</p>
                    </button>
                </div>
                
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

            <Popup activePopup={addJournal} setActivePopup={setAddJournal}>
                <div className={styles.content}>
                    <h3>{moment(editDate).format("DD MMM YYYY")}</h3>
                    <h1>Add Journal Entry</h1>
                    <p>Write down you thoughts</p>
                    <textarea  value={journalContent} onChange={(e) => {setJournalContent(e.target.value)}}/><br></br>

                    <button onClick={() => {
                        postJournal(editDate)                        
                    }}>Record Journal</button>        
                </div>    
            </Popup>
        </main>
    )

}