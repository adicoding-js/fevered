# FEVERED ❤️‍🔥

A browser-based CAPTCHA parody game. You're trying to prove you're not a robotexcept the challenges keep getting weirder and more broken the further you get. 50 levels. No frameworks, no build tools, just open and play.

Made for Hack Club YSWS with way too much love 💖

## How to Run

Clone the repo and double click `index.html`. That's it. No npm, no build step, nothing.

Or go to [Fevered!](https://fevered.netlify.app/)

## How to Play

Each level is a different CAPTCHA challenge styled to look like real reCAPTCHA. Level 1 is just a checkbox. By level 3 you're clicking grid cells that keep splitting every time you touch them, trying to find a stop sign inside. Just read what the puzzle says and figure it out, that's kind of the point.

Your progress saves automatically so refreshing won't reset you. If you want to start over, open the browser console and clear localStorage.

## What's in it so far

- Fake reCAPTCHA UI the card, the logo, the verify button, all hand-made
- Progress saved to localStorage across sessions
- Level transitions with fade animation
- Level counter in the bottom bar

## Levels

**Level 1Check the box**click the checkbox, it spins for 2 seconds pretending to think, then lets you through.

**Level 2Traffic lights**3x3 image grid, pick all 5 traffic light photos. One tile is a traffic cone. Click it and the level resets.

**Level 3Stop sign**big photo, 3x3 grid overlay. Clicking any cell splits it into 4 smaller ones. You have to split 3 times before cells become selectable. Then you pick only the ones actually containing the sign.

## Known Issues

- Audio button is there but doesn't do anything yet
- Stop sign detection isn't tuned yet and is broken still

## Plans

- More levels (a lot more)
- Actual audio puzzles
- A proper ending screen
- Maybe a timer leaderboard

---

Made with 💖 by adicoding-js 