// ==========================================================================
// NAVIGATION & LAYOUT
// ==========================================================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

const navItems = document.querySelectorAll('.nav-item');
const liquidTrans = document.getElementById('liquidTransition');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        
        if (href && href.startsWith('#') && liquidTrans) {
            e.preventDefault();
            liquidTrans.classList.add('active');
            
            setTimeout(() => {
                document.querySelector(href).scrollIntoView({ behavior: 'auto' });
                liquidTrans.classList.remove('active');
                liquidTrans.classList.add('finish');
                
                setTimeout(() => { liquidTrans.classList.remove('finish'); }, 600);
            }, 600);
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        
        scrollProgress.style.width = scroll;
    }
});


// ==========================================================================
// CINEMATIC EFFECTS & UI PHYSICS
// ==========================================================================

const enterBtn = document.getElementById('enterBtn');
const splashScreen = document.getElementById('splash-screen');
const bgMusic = document.getElementById('lofiSound');

if (enterBtn && splashScreen) {
    enterBtn.addEventListener('click', () => {
        splashScreen.classList.add('hidden');
        
        setTimeout(() => {
            document.querySelectorAll('#home .fade-in-left, #home .fade-in-right').forEach(el => {
                el.classList.add('visible');
            });
        }, 100); 
        
        if (bgMusic && localStorage.getItem('portfolioMuted') !== 'true') {
            bgMusic.play().catch((err)=>{ console.log("Audio prevented by browser:", err) });
            const muteIcon = document.getElementById('muteIcon');
            if (muteIcon) muteIcon.innerText = '🔊';
        }
    });
}

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    if (cursorDot && cursorOutline) {
        const posX = e.clientX; 
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`; 
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`; 
        cursorOutline.style.top = `${posY}px`;
    }
});

document.querySelectorAll('.hover-target, a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { document.body.classList.remove('hovering'); });
});

window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    
    const shiftX = (e.clientX - window.innerWidth / 2) / 80;
    const shiftY = (e.clientY - window.innerHeight / 2) / 80;
    document.documentElement.style.setProperty('--shift-x', `${shiftX}`);
    document.documentElement.style.setProperty('--shift-y', `${shiftY}`);
});

document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    btn.addEventListener('mouseout', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

const physicsContainer = document.getElementById('physics-skills');
const physicsTags = document.querySelectorAll('.physics-tag');

if (physicsContainer) {
    physicsContainer.addEventListener('mousemove', (e) => {
        physicsTags.forEach(tag => {
            const rect = tag.getBoundingClientRect();
            const tagX = rect.left + rect.width / 2;
            const tagY = rect.top + rect.height / 2;
            
            const distX = e.clientX - tagX;
            const distY = e.clientY - tagY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < 100) { 
                const pushX = (distX / distance) * -20; 
                const pushY = (distY / distance) * -20;
                tag.style.transform = `translate(${pushX}px, ${pushY}px)`;
            } else { 
                tag.style.transform = `translate(0px, 0px)`; 
            }
        });
    });
    
    physicsContainer.addEventListener('mouseleave', () => {
        physicsTags.forEach(tag => tag.style.transform = `translate(0px, 0px)`);
    });
}


// ==========================================================================
// SCROLL & TEXT REVEAL ANIMATIONS
// ==========================================================================

const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('visible'); }, index * 100); 
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.15 });

document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    animationObserver.observe(el);
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()1234567890";
const decryptObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const originalText = el.getAttribute('data-value');
            if (!originalText) return;
            
            let iterations = 0;
            const interval = setInterval(() => {
                el.innerText = originalText.split("").map((letter, index) => {
                    if (index < iterations) return originalText[index];
                    return letters[Math.floor(Math.random() * 44)];
                }).join("");
                
                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1/3;
            }, 30);
            
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.decrypt-text').forEach(el => decryptObserver.observe(el));

document.addEventListener("DOMContentLoaded", () => {
    const typeWriterSpan = document.getElementById('typewriter');
    if (!typeWriterSpan) return;
    
    const rawData = typeWriterSpan.getAttribute('data-type');
    const phrases = rawData ? rawData.split(', ') : ["Loading..."];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeWriterSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeWriterSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 80;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; 
            phraseIndex = (phraseIndex + 1) % phrases.length; 
            typeSpeed = 500; 
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 4000); 
});


// ==========================================================================
// WIDGETS, MODALS & CHATBOT
// ==========================================================================

const themeToggleBtn = document.getElementById('themeToggle');
const themes = ['dark', 'matrix', 'light'];
let currentThemeIndex = 0;

const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolioTheme', newTheme);
    });
}

const projectPanel = document.getElementById('projectPanel');
const panelOverlay = document.getElementById('panelOverlay');
const pTitle = document.getElementById('panelTitle');
const pDesc = document.getElementById('panelDesc');
const pStack = document.getElementById('panelStack');
const pLink = document.getElementById('panelLink');

document.querySelectorAll('.open-panel').forEach(btn => {
    btn.addEventListener('click', () => {
        if (pTitle) pTitle.innerText = btn.getAttribute('data-title');
        if (pDesc) pDesc.innerText = btn.getAttribute('data-desc');
        if (pStack) pStack.innerText = btn.getAttribute('data-stack');
        if (pLink) pLink.href = btn.getAttribute('data-link');
        
        if (projectPanel) projectPanel.classList.add('active');
        if (panelOverlay) panelOverlay.classList.add('active');
    });
});

function closeProjectPanel() {
    if (projectPanel) projectPanel.classList.remove('active');
    if (panelOverlay) panelOverlay.classList.remove('active');
}

const closePanelBtn = document.getElementById('closePanel');
if (closePanelBtn) closePanelBtn.addEventListener('click', closeProjectPanel);
if (panelOverlay) panelOverlay.addEventListener('click', closeProjectPanel);

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");

document.querySelectorAll(".cert-card").forEach(card => {
    card.addEventListener("click", function() {
        if (modalImg) modalImg.src = this.querySelector("img").src;
        if (captionText) captionText.textContent = this.querySelector("h3").textContent;
        if (modal) modal.classList.add("active");
    });
});

function closeModal() { if (modal) modal.classList.remove("active"); }

const closeModalBtn = document.querySelector(".close-modal");
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", function(e) { if (e.target !== modalImg) closeModal(); });

const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

if (terminalInput) {
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            let response = '';
            
            if (command === 'help') response = "> Commands: 'about', 'clear', 'sudo get-motivation'";
            else if (command === 'about') response = "> Vaibhav: AI Engineer & Full-Stack Developer.";
            else if (command === 'clear') { terminalOutput.innerHTML = ''; this.value = ''; return; }
            
            else if (command === 'sudo get-motivation') {
                const motivationResponse = "> A King Never Wavers A King Never Bends A King Never Relies on Others A King Never Gives Up";
                
                if (terminalOutput) {
                    const p = document.createElement('p');
                    p.style.color = 'var(--accent)'; 
                    terminalOutput.appendChild(p);
                    
                    let quoteIndex = 0;
                    function typeQuote() {
                        if (quoteIndex < motivationResponse.length) {
                            p.innerHTML += motivationResponse.charAt(quoteIndex);
                            quoteIndex++;
                            setTimeout(typeQuote, (Math.random() * 30 + 30)); 
                            if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        }
                    }
                    typeQuote();
                }
            } 
            else if (command !== '') response = `> Command not found: ${command}`;

            if (response && terminalOutput) {
                const p = document.createElement('p');
                p.innerHTML = response;
                terminalOutput.appendChild(p);
            }
            
            this.value = ''; 
            if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const chatToggle = document.getElementById('chatToggle');
const closeChat = document.getElementById('closeChat');
const sendChatBtn = document.getElementById('sendChat');

if (chatToggle) chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
if (closeChat) closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

function appendMessage(text, sender) {
    if (!chatBody) return;
    const p = document.createElement('p');
    p.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
    p.innerHTML = text;
    chatBody.appendChild(p); 
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChat() {
    if (!chatInput) return;
    const text = chatInput.value.trim().toLowerCase();
    if (!text) return;
    
    appendMessage(chatInput.value, 'user');
    chatInput.value = '';
    
    setTimeout(() => {
        let reply = "I'm still learning! Ask me about Vaibhav's <strong>skills</strong>, <strong>resume</strong>, or <strong>contact</strong>.";
        
        if (text.includes('skill')) reply = "Vaibhav excels in Python, Java, JavaScript, AI/ML, and Full-Stack Development!";
        if (text.includes('contact') || text.includes('email')) reply = "You can email him at vaibhav09122005@gmail.com";
        if (text.includes('resume') || text.includes('cv')) reply = "You can download his CV from the top navigation bar!";
        if (text.includes('project')) reply = "Check out the Projects section to see his AI Study Mentor and Virtual Mouse.";
        
        appendMessage(reply, 'bot');
    }, 600);
}

if (sendChatBtn) sendChatBtn.addEventListener('click', handleChat);
if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });


// ==========================================================================
// APIS & DATABASE INTEGRATIONS
// ==========================================================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = "Sending...";
        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://formspree.io/f/xpqoaawa", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.textContent = "Message Received! 🚀";
                btn.style.backgroundColor = "#2ecc71"; 
                btn.style.color = "#fff";
                btn.style.boxShadow = "0 0 20px rgba(46, 204, 113, 0.6)";
                contactForm.reset();
            } else {
                btn.textContent = "Oops! Error sending.";
                btn.style.backgroundColor = "#e74c3c"; 
            }
        } catch (error) {
            btn.textContent = "Network Error!";
            btn.style.backgroundColor = "#e74c3c"; 
        }
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = ""; 
            btn.style.color = "";
            btn.style.boxShadow = "";
        }, 4000);
    });
}

const githubUsername = 'Vaibhav090212'; 

fetch(`https://api.github.com/users/${githubUsername}`)
    .then(response => response.json())
    .then(data => {
        const repoEl = document.getElementById('gh-repos');
        const followEl = document.getElementById('gh-followers');
        
        if (repoEl && data.public_repos !== undefined) repoEl.innerText = data.public_repos;
        if (followEl && data.followers !== undefined) followEl.innerText = data.followers;
    })
    .catch(error => console.log("GitHub API Error: ", error));


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2-Upg0aJOtMXndmTBohvJl_i-EKcUzEU",
    authDomain: "vaibhav-portfolio-93dd2.firebaseapp.com",
    projectId: "vaibhav-portfolio-93dd2",
    storageBucket: "vaibhav-portfolio-93dd2.firebasestorage.app",
    messagingSenderId: "215016794666",
    appId: "1:215016794666:web:620c14305d71bf88fa7153"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestbookForm = document.getElementById('commentForm');
const commentsFeed = document.getElementById('commentsFeed');

if (guestbookForm && commentsFeed) {
    const commentsCol = collection(db, "guestbook");
    const q = query(commentsCol, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
        commentsFeed.innerHTML = ""; 
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            
            let timeString = "Just now";
            if (data.timestamp) {
                const date = data.timestamp.toDate();
                timeString = date.toLocaleDateString() + " at " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }

            newComment.innerHTML = `
                <strong class="accent-text">${data.name}</strong> <span class="comment-date">${timeString}</span>
                <p>${data.message}</p>
            `;
            commentsFeed.appendChild(newComment);
        });
    });

    guestbookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = guestbookForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = "Posting...";

        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');

        try {
            await addDoc(commentsCol, {
                name: nameInput.value,
                message: textInput.value,
                timestamp: serverTimestamp()
            });
            guestbookForm.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            btn.textContent = "Error!";
        }

        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}


// ==========================================================================
// BACKGROUND AUDIO & STAR GENERATION
// ==========================================================================

const lofiSound = document.getElementById('lofiSound');
if (lofiSound) lofiSound.volume = 0.3; 

let isMuted = localStorage.getItem('portfolioMuted') === 'true';
const muteToggle = document.getElementById('muteToggle');
const muteIcon = document.getElementById('muteIcon');

function updateMuteState() {
    if (muteIcon) muteIcon.innerText = isMuted ? '🔇' : '🔊';
    if (lofiSound) lofiSound.muted = isMuted;
}
updateMuteState();

if (muteToggle) {
    muteToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        localStorage.setItem('portfolioMuted', isMuted);
        updateMuteState();
        
        if (!isMuted && lofiSound && lofiSound.paused) {
            lofiSound.play().catch(()=>{});
        }
    });
}

// Generate the Floating Stars
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('space-container');
  if (container) {
    for (let i = 0; i < 100; i++) {
      let star = document.createElement('div');
      star.className = 'star';
      star.style.top = Math.random() * 100 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
      star.style.animationDelay = (Math.random() * 5) + 's';
      container.appendChild(star);
    }
  }
});
