# About The Project

Trades & shop-workers often work on multiple jobs daily. If they do not carefully tack the hours spent on each job, it can lead to issues when it is time write invoices or bill contractors.


## Technologies

- Express
- React
- MongoDb


### Current State
Currently the frontend displays 2 tables. 
The first is this week's jobs which is incomplete due to upcomming database changes. 

The second displays all jobs and allows one to edit a job or delete it 

Sample of a job's data
    {
        "_id": "65f26b92f6e0418f37e81550",
        "title": "Test",
        "hours": 12,
        "date": "2024-03-06T07:00:00.000Z",
        "__v": 0
    }


### What is comming

Changes to job data: 
    {
        "_id": "65f26b92f6e0418f37e81550",
        "title": "Test",
        "description" : "lorem ipsum dolor...",
        "timeLogged":[ 
            {timeLog},
            {
                "hours": 18,
                "date": "2024-03-06T07:00:00.000Z",
            },
            {
                "hours": 4,
                "date": "2024-03-06T07:00:00.000Z",
            },
            {
                "hours": 3.5,
                "date": "2024-03-07T07:00:00.000Z",
            },
        ],
    }

    timeLog represents an amount of hours logged on a specific date. 

    We will need routes: 
    - create a new job which has empty time logged
    - edit an existing job 
    - log time on a job 
    - edit logged time on a job 
