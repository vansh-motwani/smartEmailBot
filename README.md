# Automated Email Categorizer & Responder
## Overview
### This project is an automated email categorizer and responder using Gmail API.
### It scans unread emails, categorizes them into predefined categories (e.g., Interested, Not Interested), sends appropriate replies, and moves them into corresponding labels. 
## Features
### - Automatically fetches unread emails.
### - Categorizes emails using custom logic.
### - Sends predefined replies based on the category.
### - Moves emails to corresponding Gmail labels.
### - Handles token expiration and auto-refreshes tokens.
## Setup & Usage 
### Prerequisites 
#### - Node.js (16.x or above) - NPM or Yarn 
#### - Reddis
## Installation-
### 1. Clone the repository: ```bash git clone <repository-url>
### 2. Navigate to the project directory: cd <project-folder>
### 3. npm install
### 4. Install Redis through- (Redis Win 11 installation guide)[https://redis.io/blog/install-redis-windows-11/]
## Configuration
### 1. Set up Gmail API credentials:
####    -Go to Google Cloud Console.
####    -Create a new project and enable the Gmail API.
####    -Download the credentials.json file.
