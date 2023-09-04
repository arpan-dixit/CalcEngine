# Project Name: CalcEngine

## Project Description

CalcEngine is a Node.js and Express.js-based web application that allows users to perform mathematical operations and keeps a history of these operations. It provides a simple API to evaluate mathematical expressions via URL paths and stores the history of operations performed by users.

## Features

- Perform basic mathematical operations (addition, subtraction, multiplication, division, exponentiation, modulus, negation).
- Supports chaining multiple operations in a single URL request.
- Stores the history of operations, allowing users to access their calculation history.
- Clean and intuitive RESTful API for mathematical calculations.
- Minimalistic web interface for accessing sample URLs and checking the project's functionality.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies by running: `npm install`.

### Usage

1. Start the server by running: `npm start`.
2. Access the sample URLs to perform calculations or view the history:
   - [http://localhost:3000/](http://localhost:3000/)
   - [http://localhost:3000/history](http://localhost:3000/history)
   
### API Endpoints

- `/`: Home page with sample URLs for performing calculations.
- `/history`: View the history of mathematical operations.
- `/...`: Perform mathematical operations by including numbers and operators in the URL path.

### Examples

- Calculate 5 + 3: `/5/plus/3`
- Calculate (5 - 3) + 8: `/5/minus/3/plus/8`
- View calculation history: `/history`

## Technologies Used

- Node.js
- Express.js
- HTML/CSS
