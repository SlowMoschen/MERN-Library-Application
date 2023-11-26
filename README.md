# MERN-Library-Application

**!!CAUTION!!** Book entries will be deleted every 24h to keep Database clean **!!CAUTION!!**

## Application Description
The developed application is a full-featured library management application that allows users to add, edit books and track statistics about their library. The main functions and features of the application are:

**Book management**: <br/> The application allows users to add new books to their library. It records important information such as book title and author.

**Book editing**: <br/> Users have the ability to edit existing books and make updates. This allows them to make changes to book details without having to re-enter them.

**Statistics and overviews**: <br/> The application generates statistical data and overviews of the books stored. Users can view information such as the total number of books, author statistics and more.

## Techstack used

I have made this App to further pratice the MERN-Stack. I needed a total of 3 days to build it.

M - MongoDB is used to save the Data in a noSQL way <br/>
E - Express is used to build the API for managing data <br/>
R - The Frontend is build with React <br/>
N - NodeJs is used to run the Express API <br/>

<a href="https://www.chartjs.org/" target="_blank">Chart.js</a> used to build the graphs in the Overview tab

### Prerequisites to host the App on your own Maschine

- Node.js installed
- Accsess to a MongoDB Account and Database

### How to get Started

### Clone Repository
```
$ git clone https://github.com/SlowMoschen/MERN-Library-Application.git
```

#### Install Dependencies in "client" and "server" folder

Change directory to the server folder

```
$cd server
```

Install all Dependencies with "npm istall"
```
$ npm install
```

Change directory to the client folder

```
$cd ..\client
```

Again - Install all Dependencies with "npm install"

#### Add a .env file with your Port and MongoDB-URI

To run the App, you need to add a .env with your choosen Port and your accsess to your Testcluster on MongoDB, to the server folder.

#### Start Dev-Server

Start the Dev-Server with "npm run dev" in both the server and client folder
```
$ npm run dev
```
