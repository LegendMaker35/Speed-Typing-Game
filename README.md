#  Speed Typing Game

A fast-paced web-based typing game where you race against the clock to type randomly generated quotes as accurately and quickly as possible. Features high score tracking, optional Google Sign-In, and a persistent backend database.

---

##  Features

-  Optional **Google Sign-In** using OAuth 2.0
-  High score tracking with SQLite
-  Accuracy & speed scoring system
-  Fetches random quotes from [Zenquotes.io]((https://zenquotes.io/api/random))
-  Fully Express-based backend with RESTful API
-  Play as a guest or a signed-in user
-  Can access the game from the web

---

##  How to Run It Locally

- To just play game go to: https://speed-typing-game-fhra.onrender.com/
  
- If you want to run locally continue below

###  Requirements
- [Node.js](https://nodejs.org/) installed
- Internet connection (for fetching quotes)
- (Optional for Google Sign-In): A Google Cloud project with OAuth 2.0 credentials configured:
    - Go to Google Cloud Console
    - Enable OAuth 2.0 Client IDs
    - Set Authorized Origin to http://localhost:8000
    - Set Redirect URI to http://localhost:8000/auth/google/callback
    - Add credentials to your .env file

---

###  One-Click Setup (Windows)

Just download the project and double-click `setup.bat`. It will:
- Install dependencies
- Create a `.env` file (if missing)
- Launch the server in a new terminal window
- Open the game in your browser at [http://localhost:8000](http://localhost:8000)
- Enjoy!

---

## Gameplay

1. Click **Start** to begin the 60-second timer
2. Type the quotes shown as quickly and accurately as possible
3. View your score, accuracy, and quotes completed
4. Submit your score and view the leaderboard

---

##  Google Sign-In (Optional)

- Sign in with Google to auto-fill your name
- Scores are tied to your Google account name
- Works offline with manual name entry if no login

---
##  To Close Game

- Simply Close Browser tab or window.
- To stop the server:
    - In terminal window "npm start" type ctrl + C
    - Type Y to Terminate batch job
    - Close "npm start" and "npm install" terminal windows

---

##  Deployment Details

- **Port**: `http://localhost:8000`
- **Frontend & Backend**: Served through Express
- **Dependencies**:
  - `express`
  - `sqlite3`
  - `passport`
  - `passport-google-oauth20`
  - `express-session`
  - `dotenv`
- **Database**: SQLite (`scores.db`, auto-created)
- **Start Command**: `npm run dev`
- **Environment**: Copy `.env.example` → `.env`

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Auth**: Passport.js + Google OAuth 2.0
- **API**: [Quotable.io](https://api.quotable.io)

---

## AI Citation

### Tool Used:
- **ChatGPT (OpenAI, GPT-4)**

### Prompts Used (Abbreviated):
- "Help me set up Google Identity with my Express"
- "What is my CORS errors"
- "Can you clean up my README file"
- "How can I simplify install for users?"

### Affected Files:
- `Server.js` — Express + Passport + OAuth routes error spot
- `script.js` — Guided to Auth integration + user experience
- `setup.bat` — Guided to create a automated Windows installer
- `README.md` — Refined via AI guidance

> This project used AI to improve quality, structure, and development speed. AI usage was transparent, educational, and fully collaborative.

---

## License

MIT — Remix, reuse, and hack away!

