# David Paul — Portfolio

A modern, single-page portfolio: sticky nav, hero, about, skills, and project sections — plus an interactive terminal easter egg for visitors who'd rather type commands than scroll.

## Running locally

No build step or dependencies — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Alternatively, just open `index.html` directly.

## Terminal

Scroll to (or click "Open terminal" / "Terminal" in the nav) the terminal section and it boots automatically. Everything in the visual sections is also reachable as a command:

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
index.html   page markup — nav, hero, about, skills, projects, terminal, contact, footer
styles.css   design system (colors/type/spacing) + terminal theme (CRT scanline overlay)
script.js    renders skills/project cards, nav + scroll-reveal behavior, terminal (parser, history/autocomplete, boot sequence)
```

## Customizing

All personal content — name, bio, skills, projects, and contact links — lives in the `PROJECTS` and `SKILLS` data and the command handlers near the top of `script.js`. `PROJECTS` and `SKILLS` are the single source of truth: they feed both the visual cards and the terminal's `projects`/`skills` commands, so update them once and both stay in sync. Section copy (hero heading, about text, contact links) lives directly in `index.html`.
