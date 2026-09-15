const copyButton = document.querySelector('#copyBib');
const bibtex = document.querySelector('#bibtex').innerText;
const toast = document.querySelector('#toast');
copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(bibtex); } catch { const area = document.createElement('textarea'); area.value = bibtex; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
  copyButton.classList.add('copied'); copyButton.firstChild.textContent = 'Copied ';
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800);
  setTimeout(() => { copyButton.classList.remove('copied'); copyButton.firstChild.textContent = 'Copy BibTeX '; }, 2200);
});
