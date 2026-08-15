(() => {
  const output = document.getElementById('terminalOutput');
  const terminal = document.getElementById('terminal');

  let liveRow = null;
  let liveInput = null;
  const history = [];
  let historyIndex = 0;

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const scrollToBottom = () => {
    const body = document.getElementById('terminalBody');
    body.scrollTop = body.scrollHeight;
  };

  // Inserts before the live input row so it never gets appended after it.
  const printRaw = (html, className = '') => {
    const div = document.createElement('div');
    div.className = className ? `line ${className}` : 'line';
    div.innerHTML = html;
    if (liveRow) {
      output.insertBefore(div, liveRow);
    } else {
      output.appendChild(div);
    }
    scrollToBottom();
    return div;
  };

  const printText = (text = '', className = '') => {
    printRaw(escapeHtml(text) || '&nbsp;', className);
  };

  const promptHTML = () =>
    '<span class="prompt-user">guest</span><span class="prompt-at">@</span>' +
    '<span class="prompt-host">david-paul</span><span class="prompt-colon">:</span>' +
    '<span class="prompt-path">~</span><span class="prompt-dollar">$</span>';

  const moveCaretToEnd = (el) => {
    const val = el.value;
    el.value = '';
    el.value = val;
  };

  // --- content -------------------------------------------------------

  const PROJECTS = [
    {
      name: 'Storefront Dashboard',
      desc: 'A merchant-facing analytics dashboard for tracking sales, inventory, and customer trends in real time.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
      github: '#',
      live: '#',
    },
    {
      name: 'TaskFlow',
      desc: 'A collaborative task and project management tool with drag-and-drop boards and real-time updates.',
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'Socket.io'],
      github: '#',
      live: '#',
    },
    {
      name: 'DevNotes API',
      desc: 'A self-hosted notes and snippets service with a GraphQL API and full-text search.',
      tech: ['GraphQL', 'Express', 'Docker', 'Redis'],
      github: '#',
      live: '#',
    },
  ];

  const SKILLS = [
    { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'REST', 'GraphQL'] },
    { category: 'Data & Infra', items: ['PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'CI/CD'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Jest'] },
  ];

  const COMMANDS_META = [
    ['help', 'show this list of commands'],
    ['about', 'learn more about me'],
    ['skills', 'see my technical skills'],
    ['projects', 'browse featured projects'],
    ['contact', 'ways to reach me'],
    ['resume', 'about my resume/CV'],
    ['whoami', 'who are you, really?'],
    ['neofetch', 'system info, portfolio-style'],
    ['date', 'show the current date & time'],
    ['echo [text]', 'print text back to the terminal'],
    ['history', 'show your command history'],
    ['clear', 'clear the terminal screen'],
  ];

  const neofetchHTML = () => {
    const label = 'guest@david-paul';
    const rule = '-'.repeat(label.length);
    const rows = [
      ['OS', 'PortfolioOS 26.08'],
      ['Host', 'davidpaul.dev'],
      ['Shell', 'fake-zsh 5.9'],
      ['Role', 'Full-Stack Web Developer'],
      ['Languages', 'JavaScript &middot; TypeScript &middot; Python'],
      ['Frameworks', 'React &middot; Next.js &middot; Node.js &middot; Express'],
      ['Status', '<span class="status-dot">&#9679;</span> Open to opportunities'],
    ];
    const rowsHtml = rows
      .map(([k, v]) => `<span class="cmd-name">${k.padEnd(11)}</span>${v}`)
      .join('\n');
    return `<span class="cmd-name">${label}</span>\n${rule}\n${rowsHtml}`;
  };

  // --- commands --------------------------------------------------------

  const commands = {
    help: () => {
      printText('Available commands:');
      printText('');
      const width = Math.max(...COMMANDS_META.map(([c]) => c.length));
      COMMANDS_META.forEach(([cmd, desc]) => {
        printRaw(
          `<span class="cmd-name">${escapeHtml(cmd.padEnd(width + 2))}</span><span class="dim-line">${escapeHtml(desc)}</span>`
        );
      });
      printText('');
      printText('Tip: press Tab to autocomplete, ↑/↓ to browse history.', 'dim-line');
    },

    about: () => {
      printText('David Paul');
      printText('Full-Stack Web Developer');
      printText('');
      printText(
        'I build fast, accessible, end-to-end web applications — from React interfaces down to the databases and infrastructure behind them.'
      );
      printText('');
      printText(
        'Comfortable across the stack: JavaScript/TypeScript, React, Node.js, PostgreSQL, and cloud deployment on AWS/Docker.'
      );
      printText('');
      printText("Currently open to new opportunities. Type 'contact' to get in touch.", 'dim-line');
    },

    skills: () => {
      printText('My technical skills:');
      printText('');
      SKILLS.forEach(({ category, items }) => {
        printRaw(`<span class="cmd-name">${escapeHtml(category)}</span>`);
        printText('  ' + items.join(' · '), 'dim-line');
        printText('');
      });
    },

    projects: () => {
      printText(`Featured projects (${PROJECTS.length}):`);
      printText('');
      PROJECTS.forEach((p, i) => {
        printRaw(`<span class="cmd-name">${i + 1}. ${escapeHtml(p.name)}</span>`);
        printText('   ' + p.desc, 'dim-line');
        printText('   Tech: ' + p.tech.join(', '), 'dim-line');
        printRaw(
          `   <a href="${p.github}" target="_blank" rel="noopener">GitHub</a>  <a href="${p.live}" target="_blank" rel="noopener">Live demo</a>`
        );
        printText('');
      });
    },

    contact: () => {
      printText("Let's talk:");
      printText('');
      printRaw('  Email     <a href="mailto:hello@davidpaul.dev">hello@davidpaul.dev</a>');
      printRaw('  GitHub    <a href="#" target="_blank" rel="noopener">github.com/davidpaul</a>');
      printRaw('  LinkedIn  <a href="#" target="_blank" rel="noopener">linkedin.com/in/davidpaul</a>');
      printText('');
      printText("I'm currently open to new opportunities.", 'dim-line');
    },

    resume: () => {
      printText("I'd rather send you a current copy directly than host a stale PDF.");
      printText("Run 'contact' and reach out — I'll get it over to you.", 'dim-line');
    },

    whoami: () => {
      printText('guest');
      printText("(That's you. I'm David — try 'about'.)", 'dim-line');
    },

    neofetch: () => {
      printRaw(neofetchHTML(), 'neofetch-block');
    },

    date: () => {
      printText(new Date().toString());
    },

    echo: (args) => {
      printText(args.join(' '));
    },

    history: () => {
      if (history.length === 0) {
        printText('No commands yet.');
        return;
      }
      history.forEach((h, i) => printText(`  ${i + 1}  ${h}`, 'dim-line'));
    },

    sudo: () => {
      printText('guest is not in the sudoers file. This incident will be reported.', 'error-line');
      printText('(Kidding — it will not. But nice try.)', 'dim-line');
    },

    exit: () => {
      printText("This is a website, not a real shell — there's nothing to exit to.");
      printText("Try 'clear' if you want a fresh screen.", 'dim-line');
    },
  };

  // --- input handling ----------------------------------------------------

  const runCommand = (input) => {
    const [cmdRaw, ...args] = input.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();

    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    const handler = commands[cmd];
    if (!handler) {
      printText(`command not found: ${cmdRaw}`, 'error-line');
      printText("Type 'help' to see the list of available commands.", 'dim-line');
      return;
    }
    handler(args);
  };

  const handleSubmit = () => {
    const raw = liveInput.value;
    const trimmed = raw.trim();

    liveRow.classList.remove('terminal-input-line');
    liveRow.innerHTML = `<span class="prompt">${promptHTML()}</span> <span class="typed-command">${escapeHtml(raw)}</span>`;
    liveRow = null;
    liveInput = null;

    if (trimmed) {
      history.push(trimmed);
      runCommand(trimmed);
    }
    historyIndex = history.length;

    createLiveRow();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      liveInput.value = history[historyIndex] ?? '';
      moveCaretToEnd(liveInput);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      liveInput.value = history[historyIndex] ?? '';
      moveCaretToEnd(liveInput);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const val = liveInput.value.trim().toLowerCase();
      if (!val) return;
      const names = Object.keys(commands).concat('clear');
      const matches = [...new Set(names)].filter((c) => c.startsWith(val)).sort();
      if (matches.length === 1) {
        liveInput.value = matches[0] + ' ';
      } else if (matches.length > 1) {
        printText(matches.join('  '), 'dim-line');
      }
    }
  };

  function createLiveRow() {
    const row = document.createElement('div');
    row.className = 'line terminal-input-line';
    row.innerHTML = `<span class="prompt">${promptHTML()}</span>`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'terminal-input';
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Terminal command input');
    input.addEventListener('keydown', onKeyDown);

    row.appendChild(input);
    output.appendChild(row);

    liveRow = row;
    liveInput = input;
    input.focus();
    scrollToBottom();
  }

  terminal.addEventListener('click', () => {
    if (window.getSelection().toString()) return;
    liveInput?.focus();
  });

  // --- boot sequence -------------------------------------------------

  async function boot() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reduced ? 0 : ms));

    const bootLines = [
      'Booting david-paul-portfolio v1.0.0 ...',
      'Loading modules ... done',
      'Mounting /projects ... done',
      'Starting shell ... done',
    ];

    for (const line of bootLines) {
      await wait(160);
      printText(line, 'boot-line');
    }

    await wait(200);
    printRaw(neofetchHTML(), 'neofetch-block');
    await wait(150);
    printText('');
    printText("Welcome. Type 'help' to see what this terminal can do.");
    printText('');

    createLiveRow();
  }

  boot();
})();
