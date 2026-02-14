// Elementi DOM
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.container');
const body = document.body;
const celebration = document.getElementById('celebration');
const catsContainer = document.getElementById('cats-container');

// Audio
const audio1 = document.getElementById('audio1'); // Chipi chipi
const audio2 = document.getElementById('audio2'); // Happy happy
let currentAudio = null;

// Stato
let isConfirmationPhase = false;

// 1. LOGICA BOTTONE NO (SCAPPA)
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton); // Nel caso riesca a cliccarlo velocemente
noBtn.addEventListener('touchstart', function (e) {
    e.preventDefault(); // Impedisce il click standard
    moveButton();
}); // Supporto touch per telefono/tablet

function moveButton() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcola una posizione random ma mantieni il bottone visibile
    const newX = Math.random() * (windowWidth - noBtn.offsetWidth);
    const newY = Math.random() * (windowHeight - noBtn.offsetHeight);

    // Imposta la posizione assoluta al body per farlo muovere liberamente
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// 2. LOGICA BOTTONE SI
yesBtn.addEventListener('click', function () {
    if (!isConfirmationPhase) {
        // Prima fase: Chiede "Sei sicura?"
        document.querySelector('h1').innerText = "Sei sicura sicura??? 🤔";
        isConfirmationPhase = true;
        noBtn.style.display = 'none'; // Nasconde il bottone NO
        spawnManyYesButtons();
    } else {
        // Seconda fase: Cliccato uno qualsiasi dei SI
        startParty();
    }
});

function spawnManyYesButtons() {
    // Creiamo 100 bottoni SI sparsi per lo schermo
    for (let i = 0; i < 70; i++) {
        const btn = document.createElement('button');
        btn.innerText = "Sì! 😍";
        btn.classList.add('fill-screen-btn');

        // Posizione casuale
        const x = Math.random() * (window.innerWidth - 80);
        const y = Math.random() * (window.innerHeight - 40);

        btn.style.left = x + 'px';
        btn.style.top = y + 'px';

        // Al click di QUALSIASI bottone, parte la festa
        btn.addEventListener('click', startParty);

        body.appendChild(btn);
    }
}

function startParty() {
    // Nascondi tutto il resto e rimuovi i bottoni creati
    container.style.display = 'none';
    const extraBtns = document.querySelectorAll('.fill-screen-btn');
    extraBtns.forEach(btn => btn.remove());
    noBtn.style.display = 'none'; // Rimuovi il bottone No fuggitivo

    // Mostra la schermata finale
    celebration.classList.remove('hidden');

    // Fai partire la musica e i gattini
    playMusic();
    showCats();
}

// 3. LOGICA MUSICA
function playMusic() {
    // Rendiamo la canzone un loop infinito
    audio2.loop = true;

    // Fai partire Happy Happy (audio2)
    audio2.play().catch(e => console.log("Click necessario per audio:", e));
}

function showCats() {
    // Aggiunge GIF di gattini misti (Giphy/Tenor)
    const catImages = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJjZDI1Mm00OWV5dmh5YnZ4YnZ4YnZ4YnZ4YnZ4YnZ4YnZ4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif", // Cat 1
        "https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif", // Cat vibe
        "https://media1.tenor.com/m/m-XVTK1iZ3AAAAAC/cat-cat-jumping.gif"  // Happy cat originale
    ];

    // Pulisce contenitore
    catsContainer.innerHTML = '';

    // Aggiungi immagini principali
    catImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('cat-gif');
        // Fallback in caso di errore
        img.onerror = function () {
            this.src = "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"; // Fallback generico
        };
        catsContainer.appendChild(img);
    });

    // Aggiungi gatti casuali sullo sfondo
    spawnBackgroundCats();
}

function spawnBackgroundCats() {
    // URL del gatto richiesto per lo sfondo
    const catUrl = "https://media.tenor.com/lCKwsD2OW1kAAAAi/happy-cat-happy-happy-cat.gif";
    const numberOfCats = 50;

    for (let i = 0; i < numberOfCats; i++) {
        const img = document.createElement('img');
        img.src = catUrl;
        img.classList.add('background-cat');

        // Posizione casuale
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Dimensioni variabili
        const size = (Math.random() * 100) + 50;

        img.style.position = 'absolute'; // Forziamo la posizione assoluta qui
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.width = size + 'px';
        img.style.zIndex = '-1'; // Dietro al resto

        document.getElementById('celebration').appendChild(img);
    }
}