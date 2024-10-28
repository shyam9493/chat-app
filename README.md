# Real Time Chat Application using MERN

## Description
This project is a simple Real Time Chat application build using React(Vite),Node and Socket.io and Gemini AI.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Output](#Output)
- [Approach](#approach)
- [Api](#api)
  

## Prerequisites
Before getting started, ensure you have the following prerequisites installed on your system:

- Git: [Download & Install](https://git-scm.com/downloads)
- Any IDE
- Node:[Download & Install](https://nodejs.org/en)
## Installation
To run this project locally, follow these steps:
- Clone the repository:
```bash
git clone https://github.com/shyam9493/chat-app.git
```
- locate to the folder where you have installed and create a file named '.env' and the content is 
```bash
MONGO="Your_Atlas_Connection_String"
API="Your_Gemini_API"
```
To get MONGO Connection string
Go to MongoDb Atlas and Sign Up using your Email and create a Cluster and you get a connection string

TO get gemini api
signup and create new api
[Signup](https://www.bing.com/ck/a?!&&p=58053060397588beJmltdHM9MTcxNDE3NjAwMCZpZ3VpZD0wMWNiMWQ1Ni00NzZlLTZkYjctMmY2ZS0wOTFkNDZjODZjNDUmaW5zaWQ9NTIxNA&ptn=3&ver=2&hsh=3&fclid=01cb1d56-476e-6db7-2f6e-091d46c86c45&psq=gemini+ai+api&u=a1aHR0cHM6Ly9haS5nb29nbGUuZGV2Lw&ntb=1)
- to intsall requirements and modules in server side(Node)
```bash
cd server
npm install
```
- to intsall requirements and modules in client side(Node)
```bash
cd client
npm install
```
- after successful installation of server to run the application go to terminal and enter 
```bash
npm start
```
- after successful installation of client to run the application go to terminal and enter 
```bash
npm run dev
```
## Output
Login to access the chat application
After selecting a chat you can chat in real time
To activate the ai messages use @duo-ai preceeding your message such that the message is transfered to gemini ai and then output will be displayed

## Approach

I first started by creating a user interface with the help of tailwind css, then integrated user authentication and then started by looking at the documentation of socket.io and understood emit and on functions and its functionalities , then saved the messages sent and recieved by unique pair(userfrom,userto) and after the simple chat application, I exteneded my thoughts by implementing ai into the application using gemini ai api, used NLP to know wheather the chat is requesting for ai or not .

## API Response

```bash
Subject: Weather Update: Mist 

Hi [Recipient Name],

Just wanted to let you know that there's a bit of mist outside at the moment. Visibility might be a little reduced, so do take care if you're heading out and about. 

Regards,

Shyam
```

