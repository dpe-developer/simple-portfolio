# David Paul — Terminal Portfolio

An interactive, terminal-styled portfolio site. Instead of scrolling sections, visitors type commands to explore who I am, what I've built, and how to reach me.

## Running locally

No build step or dependencies — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Alternatively, just open `index.html` directly.

## Commands

| Command | Description |
| --- | --- |
| `help` | list all available commands |
| `about` | learn more about me |
| `skills` | see my technical skills |
| `projects` | browse featured projects |
| `contact` | ways to reach me |
| `resume` | about my resume/CV |
| `whoami` | who are you, really? |
| `neofetch` | system info, portfolio-style |
| `date` | show the current date & time |
| `echo [text]` | print text back to the terminal |
| `history` | show your command history |
| `clear` | clear the terminal screen |

Press <kbd>↑</kbd>/<kbd>↓</kbd> to browse command history and <kbd>Tab</kbd> to autocomplete.

## Project structure

```
index.html   terminal window markup
styles.css   terminal theme (dark, monospace, CRT scanline overlay)
script.js    command parser, history/autocomplete, boot sequence
```

## Customizing

All personal content — name, bio, skills, projects, and contact links — lives in the `PROJECTS`, `SKILLS`, and command handlers near the top of `script.js`. Update those objects to make this your own; no other files need to change for content edits.
