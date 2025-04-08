# Speed Typing Game - How to Run

Prerequisites:
- Node.js installed (https://nodejs.org)
- VS Code (or any code editor)

How to Set Up:

1. Unzip the folder anywhere on your computer.
2. Open the folder in VS Code.
3. Open a CMD terminal inside VS Code.

4. Run this to install dependencies:
   npm install express sqlite3 cors dotenv

5. Start the game with:
   npm start

6. On Browser open localhost:8000

What this does:
- Runs the Node.js backend server (on port 3000)
- Opens the frontend in your browser (on port 8000)

Once the game is open:
- Click “Start” to play
- After the timer, enter your name and submit your score
- Click “Show High Scores” to see the leaderboard!

To reset scores:
(Optional) Delete the `scores.db` file if you want a fresh leaderboard.

To end game:
- In CMD terminal, click ctrl + C
- Type Y to terminate batch job
- close vs code
