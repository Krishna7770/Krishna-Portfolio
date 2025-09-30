// Minimal interactivity (English labels)
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Theme toggle with localStorage
const btn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
if (saved === 'light') document.documentElement.classList.add('light');
if (saved === 'dark') document.documentElement.classList.add('dark');
if (!saved && !prefersDark) document.documentElement.classList.add('light');

btn && btn.addEventListener('click', ()=>{
  const isDark = document.documentElement.classList.toggle('dark');
  document.documentElement.classList.toggle('light', !isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Filter projects by tag
const select = document.getElementById('filter');
const cards = Array.from(document.querySelectorAll('.card'));
const results = document.getElementById('resultsCount');

function updateResults(){
  const value = select.value;
  let visible = 0;
  cards.forEach(c => {
    const tags = c.getAttribute('data-tags') || '';
    const show = (value === 'all') || tags.includes(value);
    c.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  if (results) results.textContent = `${visible} project(s) shown`;
}

select && select.addEventListener('change', updateResults);
updateResults();
