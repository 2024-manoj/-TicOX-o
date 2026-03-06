# TicOX Play

A clean, modern Tic-Tac-Toe game built with React and Vite.

## Features

- **Two-player gameplay** — X and O take turns on a 3×3 board
- **Win & draw detection** — automatically detects winners and draws
- **Score tracking** — keeps a running tally across rounds
- **Animated popup** — displays the result with a smooth entrance animation
- **Responsive design** — works on desktop and mobile

## Tech Stack

- **React 19** — functional components, hooks, Context API
- **Vite 7** — fast dev server and optimized production builds
- **CSS** — custom properties, CSS Grid, animations, responsive media queries

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root component
├── App.css               # Component styles
├── index.css             # Global reset & variables
├── components/
│   └── board.jsx         # Board, Square, and Popup components
└── context/
    └── gameContext.jsx    # Game state provider (board, turns, winner)
```

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev



```
