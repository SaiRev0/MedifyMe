# [MedifyMe](https://medifymeiitbhu.me/)

MedifyMe is a web application that provides users with a platform to manage their health records and appointments. This project has been built by four students of IIT BHU for Smart India Hackathon 2023 by Geeks for Geeks

![landingPage](https://user-images.githubusercontent.com/96655163/232332327-36459110-9580-45bf-8002-e655624321e2.png)

## Problem 

Patients often have to visit multiple doctors, clinics, or hospitals for their treatment, which can lead to fragmented and incomplete medical records. This can be a major issue for patients and healthcare providers, especially those with chronic conditions. It can lead to ineffective or even dangerous treatments due to a lack of information about previous diagnoses, medications, and procedures. In cases of emergencies or sudden health issues, it is challenging to provide relevant medical information to healthcare providers in a timely and accurate manner. Moreover, patients may face difficulties in tracking their medication schedules, keeping up with follow-up appointments, and accessing their medical records when needed.

## Objective

Our Idea, MedifyMe, is a web application that aims to simplify healthcare management for both patients and doctors aims to solve these issues by providing a centralized platform for patients to store and manage their medical records, including doctor's notes, prescriptions, test results, and appointment history utilizing OCR and generative AI to ease the record management process for both patients and the healthcare provider. This allows for a more complete and accurate medical record, which can facilitate better treatment outcomes and reduce the risk of medical errors. The platform helps patients keep track of their medical history, prescriptions, appointments, and test reports. It also provides reminders for medications and tests, allowing patients to give feedback about their treatment experiences. The tool is segmented into various tabs to ease different parts of the healthcare process.

## Methodology

MedifyMe's frontend is built using React, to build user interfaces. The backend is built using Node.js, Express is used as the web application framework, and MongoDB is used as the NoSQL database, used for storing Patients and Doctors data. Google Cloud Storage Buckets are used for storing users' medical prescriptions and bills.

The application uses Google Oauth2 for authentication, React-Redux for state management, React-Toolkit-Query for handling query requests, React-Cookies for storing and accessing cookies, and React-Toastify for displaying toast information. The application also utilizes OCR Space’s API to extract medicine data from prescriptions, tests, and reports uploaded by users.

## Results

MedifyMe provides an easy and secure communication channel for patients and doctors to exchange messages and medical information. Patients can ask questions, get advice, and share updates with their doctors in a timely and convenient manner. Payments for various appointments and tests can be made on the platform itself, reducing the hassle.

MedifyMe provides users with a user-friendly and secure platform for managing their health records and appointments. The application allows users to view their medical history, schedule appointments with doctors, and receive personalized recommendations based on their input.

## Getting Started

To get started with MedifyMe, follow the steps below:
1. Fork this repository by clicking on the Fork button in the top right corner of this page.
2. Clone your forked repository to your local machine.
3. Navigate to both the frontend and backend folders in the terminal and run the command `npm install` to install the required dependencies.
4. Run the command `npm start` to start the application.

## Tech Stack
### Frontend
- React
- React-Redux
- React-Toolkit-Query
- Google Oauth2
- React-Cookies
- React-Toastify
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Google Cloud Storage Buckets
- OCR Space
- OPENAI's API with prompt engineering

## UI Design
The entire UI of MedifyMe has been built in Figma, and the design is available [here](https://www.figma.com/file/p850Ggh3o7Wx06xZKHPmRP/Aaspaas-MedifyMe-GFG?node-id=0%3A1&t=MQ3j3cVIlFJdoxmI-1)

## Deployment
MedifyMe is deployed on Google Cloud AMD VM instances. Google Cloud AMD VM instances are virtual machines that provide high performance and scalability. The web application is hosted on the cloud, which offers high availability and accessibility to users.

## Conclusion
MedifyMe is a smart health record platform that provides users with a seamless and secure way to manage their medical records and appointments. The application leverages modern technologies such as React, Node.js, MongoDB, and Google Cloud to provide a fast and reliable user experience. With the help of OCR technology and OpenAI's API, MedifyMe is able to extract and analyze medical data from user-uploaded prescriptions, tests, and reports, providing personalized recommendations to improve the user experience.

MedifyMe has the potential to revolutionize the way medical record management is done, making it more accessible, efficient, and secure.
