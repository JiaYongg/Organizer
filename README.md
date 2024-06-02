# Project Organize

## Description
OrganizeMe is a task and time management application designed to help users stay organized and productive. With OrganizeMe, users can efficiently manage their tasks, set reminders, and track their progress towards their goals.

## Features
### Task Management
- Create, edit, and delete tasks
- Organize tasks into categories or projects
- Set due dates and priorities for tasks
- Mark tasks as complete
- Set reminders for important deadlines or events

### Customization
- Customize task categories, labels, and priorities
- Choose from different themes or color schemes


### Journal
- Reflect and write thoughts down  
- Use prompts generated for guidance


## Installation Guide
To run this application, there are 3 main components that would be hosted on seperate areas. 

### Database 
The database uses mysql on the online service known as TiDB. this service allows remote hosting of database up to 5GB instead of a localhost. Allowing easy access from many users as long as the database details are provided

https://tidbcloud.com/console/clusters

The database that details are

Host: gateway01.ap-southeast-1.prod.aws.tidbcloud.com
Port: 4000
Username: 2pT3FsZNMW7qPr5.root
Password: ASK ME FOR THE PASSWORD
CA: This is the SSL certificate that is required to access the DB(isrgrootx1.pem)

You can also take a look at the current DB architecture here on lucidchart:
https://lucid.app/lucidchart/ae6a6f72-25eb-49ab-b2c1-72329801ac08/edit?viewport_loc=480%2C-160%2C2524%2C1167%2C0_0&invitationId=inv_56ac4242-9372-4467-95e8-4e1db7409063

### Backend
The backend will be hosted on replit for easy access as well from multiple parties

Public Link: https://replit.com/@Aw-ShaoShao/PCWEBAPI#index.js
Ask me to add for editor.


### Front End 
The front end will use react and it will be handled here. It will contain both the actual application as well as the marketing site.
