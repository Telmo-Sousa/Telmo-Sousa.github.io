(() => {
  'use strict';

  /* ---------- uptime ---------- */
  const uptimeEl = document.getElementById('uptime');
  const startTime = Date.now();

  function pad(n){ return String(n).padStart(2, '0'); }

  function formatUptime(ms){
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `uptime ${h}h ${pad(m)}m`;
    if (m > 0) return `uptime ${m}m ${pad(sec)}s`;
    return `uptime ${sec}s`;
  }

  function tick(){
    if (uptimeEl){
      uptimeEl.textContent = formatUptime(Date.now() - startTime);
    }
  }
  tick();
  setInterval(tick, 1000);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- project accordion ---------- */
  const projectRows = document.querySelectorAll('.proj-row');
  projectRows.forEach(row => {
    row.setAttribute('aria-expanded', 'false');

    row.addEventListener('click', (e) => {
      // let the real "→ GitHub" link inside the row navigate normally,
      // without also toggling (or re-closing) the accordion
      if (e.target.closest('a.link')) return;

      const isOpen = row.getAttribute('aria-expanded') === 'true';
      // close others for a tidy single-open listing
      projectRows.forEach(r => r.setAttribute('aria-expanded', 'false'));
      row.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    // rows are divs (not buttons) so they need explicit keyboard handling
    row.addEventListener('keydown', (e) => {
      if (e.target.closest('a.link')) return;
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        row.click();
      }
    });
  });

  function openProject(name){
    const row = Array.from(projectRows).find(r =>
      r.querySelector('.pname').textContent.trim().toLowerCase() === name.toLowerCase()
    );
    if (!row) return null;
    projectRows.forEach(r => r.setAttribute('aria-expanded', 'false'));
    row.setAttribute('aria-expanded', 'true');
    row.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return row;
  }

  /* ---------- interactive console ---------- */
  const form = document.getElementById('consoleForm');
  const input = document.getElementById('cmdInput');
  const output = document.getElementById('consoleOutput');

  const history = [];
  let historyPos = -1;

  const CV_URL = 'https://tsousa.dev/telmo-sousa.pdf';
  const GITHUB_URL = 'https://github.com/Telmo-Sousa';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/telmo-sousa/';

  const projectNames = Array.from(document.querySelectorAll('.proj-row .pname'))
    .map(el => el.textContent.trim());

  function printEcho(cmd){
    const line = document.createElement('p');
    line.className = 'line echo';
    line.innerHTML = `<span class="prompt">telmo@viseu</span><span class="colon">:</span><span class="path">~</span>$ ${escapeHtml(cmd)}`;
    output.appendChild(line);
  }

  function print(text, cls){
    const line = document.createElement('p');
    line.className = 'line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    output.appendChild(line);
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function scrollToId(id){
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const commands = {
    help(){
      print('available commands:');
      print('  about              show a short bio');
      print('  skills             jump to skills/');
      print('  projects           jump to projects/');
      print('  cat <project>      open a project by name (e.g. cat invert)');
      print('  github             open github profile');
      print('  linkedin           open linkedin profile');
      print('  cv                 download my cv (pdf)');
      print('  contact            jump to contact section');
      print('  clear              clear this console');
      print('  sudo <anything>    try it and see');
    },
    about(){
      scrollToId('about');
      print('scrolled to about.txt', 'ok');
    },
    skills(){
      scrollToId('skills');
      print('scrolled to skills/', 'ok');
    },
    projects(){
      scrollToId('projects');
      print('scrolled to projects/', 'ok');
    },
    contact(){
      scrollToId('contact');
      print('scrolled to contact.txt', 'ok');
    },
    github(){
      print(`opening ${GITHUB_URL}`, 'ok');
      window.open(GITHUB_URL, '_blank', 'noopener');
    },
    linkedin(){
      print(`opening ${LINKEDIN_URL}`, 'ok');
      window.open(LINKEDIN_URL, '_blank', 'noopener');
    },
    cv(){
      print(`opening ${CV_URL}`, 'ok');
      window.open(CV_URL, '_blank', 'noopener');
    },
    clear(){
      output.innerHTML = '';
    },
    whoami(){
      print('telmo_sousa');
    },
    ls(arg){
      if (arg === 'projects' || arg === 'projects/'){
        print(projectNames.join('  '));
      } else if (arg === 'skills' || arg === 'skills/'){
        print('linux  scripting  aws  backend  frontend  docker');
      } else {
        print('about  skills  projects  contact');
      }
    },
    cat(arg){
      if (!arg){
        print('usage: cat <project-name>', 'err');
        return;
      }
      const row = openProject(arg);
      if (row){
        const url = row.getAttribute('data-url');
        print(`${arg}: found. expanded below.`, 'ok');
        if (url) print(`→ ${url}`);
      } else {
        print(`cat: ${arg}: no such project. try 'ls projects'`, 'err');
      }
    },
    sudo(arg){
      print(`telmo is not in the sudoers file. this incident will not be reported.`, 'err');
    }
  };

  function runCommand(raw){
    const trimmed = raw.trim();
    if (!trimmed) return;
    printEcho(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (commands[cmd]){
      commands[cmd](arg);
    } else {
      print(`command not found: ${cmd} — type 'help' for a list`, 'err');
    }
    output.scrollTop = output.scrollHeight;
  }

  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value;
      if (val.trim()){
        history.push(val);
        historyPos = history.length;
      }
      runCommand(val);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp'){
        e.preventDefault();
        if (historyPos > 0){
          historyPos--;
          input.value = history[historyPos];
        }
      } else if (e.key === 'ArrowDown'){
        e.preventDefault();
        if (historyPos < history.length - 1){
          historyPos++;
          input.value = history[historyPos];
        } else {
          historyPos = history.length;
          input.value = '';
        }
      }
    });
  }

  /* focus the console input when its section scrolls into view via nav clicks is
     intentionally NOT automatic — avoids stealing focus/scroll on load */
})();