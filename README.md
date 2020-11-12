<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name
-->



[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">SRMS-(Frontend)</h3>

  <p align="center">
    SCHOOL_RECORD_MANAGEMENT_SYSTEM
    <br />
    <a href="https://github.com/segundara/srms-fe"><strong>Explore the repo »</strong></a>
    <br />
    <br />
    <a href="https://srms-ck-fe.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/segundara/srms-fe/issues">Report Bug</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://srms-ck-fe.herokuapp.com/)

This project is targeted at deploying a web application that is programmed in order to take care of exam/result and administrative records.
The system will be available to the tutors with their login information, to record their students’ result online and also be accessible to students in other to check and print/download their result wherever they are using their personal computers, tablets or smart phones. 
The system will also be available to a super-user tagged “ADMIN”, who will be in control of registering new student, tutor and also adding new course to the database.



### Built With

* [Create React App](https://github.com/facebook/create-react-app)
* [React-Bootstrap](https://react-bootstrap.github.io/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* DEPENDENCIES
```sh
    "@fortawesome/fontawesome-svg-core": "^1.2.29",
    "@fortawesome/free-brands-svg-icons": "^5.13.1",
    "@fortawesome/free-solid-svg-icons": "^5.13.1",
    "@fortawesome/react-fontawesome": "^0.1.11",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.20.0",
    "bootstrap": "^4.5.2",
    "date-fns": "^2.16.1",
    "downloadjs": "^1.4.7",
    "js-cookie": "^2.2.1",
    "node-sass": "^4.14.1",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-bootstrap-4-pagination": "^1.0.3",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "serve": "^11.3.2"
```

* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/segundara/srms-fe.git
```
2. Install NPM packages
```sh
npm install
```

<!-- USAGE EXAMPLES -->
## Usage

You can checkout this project using the following credentials:

* AS ADMIN

The system portal will enable School Administrator to login and perform various functions. Through the Admin Portal, School Administrator will be able to ;

1. Register new Student and Tutor and create their login details
2. Send electronic messages to Tutors and Students Via Email integrated within this SRMS
3. Create Subject / Courses and Tutors responsible for such

```sh
Email - segun@email.com
Password - segunoke
```

* AS TUTOR

The system portal will enable School Tutors to login and perform various functions. Through the Tutor Portal, Each tutor will be able to ;

1. View the list of students who are enrolled in his/her course and their details
2. Send electronic messages to Students Via Email integrated within this SRMS
3. Update students grade online
4. Update own profile

```sh
Email - perti@email.com
Password - pertipuhaka
```

* AS STUDENT

The system portal will enable Students to login and perform various functions. Through the Student Portal, Each student will be able to ;

1. View the list of courses available
2. Enrol into courses
3. View exam dates 
4. View grades and download transcript of records
5. Update own profile


```sh
Email - jani@email.com
Password - jani
```

<!-- CONTACT -->
## Contact

Olusegun Emmanuel Okedara - [@Linkedin](https://www.linkedin.com/in/olusegunemmanuelokedara/)

Project Link: [https://github.com/segundara/srms-fe](https://github.com/segundara/srms-fe)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/segundara/srms-fe.svg?style=flat-square
[issues-url]: https://github.com/segundara/srms-fe/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/olusegunemmanuelokedara/
[product-screenshot]: https://github.com/segundara/srms-fe/blob/main/public/srms_1.PNG
