(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // --- shared content (feeds both the visual sections and the terminal) --

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
    {
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
      icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'REST', 'GraphQL'],
      icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>',
    },
    {
      category: 'Data & Infra',
      items: ['PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'CI/CD'],
      icon: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
    },
    {
      category: 'Tools',
      items: ['Git', 'VS Code', 'Figma', 'Jest'],
      icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
    },
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

  const svgIcon = (inner) =>
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  const EXTERNAL_LINK_ICON =
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';

  const GITHUB_ICON =
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>';

  // --- render: skills & project cards (visual sections) ------------------

  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    grid.innerHTML = SKILLS.map(
      ({ category, items, icon }) => `
        <div class="skill-card reveal">
          <span class="skill-icon">${svgIcon(icon)}</span>
          <h3>${escapeHtml(category)}</h3>
          <div class="skill-tags">
            ${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>`
    ).join('');
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(
      (p, i) => `
        <div class="project-card reveal">
          <span class="project-index">${String(i + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.desc)}</p>
          <div class="project-tags">
            ${p.tech.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${p.github}" target="_blank" rel="noopener">${svgIcon(GITHUB_ICON)} GitHub</a>
            <a href="${p.live}" target="_blank" rel="noopener">${svgIcon(EXTERNAL_LINK_ICON)} Live demo</a>
          </div>
        </div>`
    ).join('');
  }

  // --- nav: scroll shadow, mobile toggle, active link -------------------

  function initNav() {
    const header = document.getElementById('siteHeader');
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    if (!header || !nav || !toggle) return;

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
      const setActive = (id) => {
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      };

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      sections.forEach((section) => observer.observe(section));
    }
  }

  // --- scroll reveal ------------------------------------------------------

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // --- terminal ------------------------------------------------------------

  function initTerminal() {
    const output = document.getElementById('terminalOutput');
    const terminal = document.getElementById('terminal-window');
    const terminalBody = document.getElementById('terminalBody');
    if (!output || !terminal || !terminalBody) return;

    let liveRow = null;
    let liveInput = null;
    const history = [];
    let historyIndex = 0;

    const scrollToBottom = () => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
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
      liveInput.focus();
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
      scrollToBottom();
    }

    terminal.addEventListener('click', () => {
      if (window.getSelection().toString()) return;
      liveInput?.focus();
    });

    async function boot() {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : ms));

      const bootLines = [
        'Booting david-paul-portfolio v2.0.0 ...',
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

    // Boot the terminal once it actually scrolls into view, so it doesn't
    // run (and grab focus) while the visitor is still reading the hero.
    if ('IntersectionObserver' in window) {
      let booted = false;
      const bootObserver = new IntersectionObserver(
        (entries) => {
          if (booted) return;
          if (entries.some((e) => e.isIntersecting)) {
            booted = true;
            bootObserver.disconnect();
            boot();
          }
        },
        { threshold: 0.3 }
      );
      bootObserver.observe(terminal);
    } else {
      boot();
    }
  }

  renderSkills();
  renderProjects();
  initNav();
  initReveal();
  initFooterYear();
  initTerminal();
})();
