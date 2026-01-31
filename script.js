const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const sub = document.getElementById("sub");
const hint = document.getElementById("hint");
const btnRow = document.getElementById("btnRow");
const confetti = document.getElementById("confetti");

let noCount = 0;

function dodgeNo() {
  noCount++;

  // YES button grows aggressively
  const yesScale = 1 + Math.min(noCount, 20) * 0.1;
  yesBtn.style.transform = `scale(${yesScale})`;

  // NO button moves away
  const cardRect = document.getElementById("card").getBoundingClientRect();
  const maxX = Math.max(0, cardRect.width - 140);
  const maxY = Math.max(0, 120);

  const x = Math.floor(Math.random() * maxX) - maxX / 2;
  const y = Math.floor(Math.random() * maxY) - maxY / 3;

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${Math.max(
    0.72,
    1 - noCount * 0.03
  )})`;

  // Bully-funny messages
  if (noCount === 1) hint.textContent = "TRY AGAIN 😭😭😭";
  if (noCount === 4) hint.textContent = "AHHH YOU WANT TO PRESS NO THAT BADLY 💀💀💀";
  if (noCount === 6) hint.textContent = "YOU SUCK AT THIS 🤣🤣🤣";
  if (noCount === 9) hint.textContent = "ITS FUNNY HOW YOU’RE CHASING THE BUTTON NOW 😭💀";

  if (noCount >= 12) {
    noBtn.disabled = true;
    noBtn.style.opacity = "0.5";
    hint.textContent = "JUST PRESS THE YES BUTTON 🤦🏻‍♂️";
  }
}

// NO button events
noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    dodgeNo();
  },
  { passive: false }
);
noBtn.addEventListener("click", dodgeNo);

// YES click
yesBtn.addEventListener("click", () => {
  question.textContent = "FINALLY!!! 💞";

  sub.innerHTML = `
    Thank you for saying YES 💀.<br>
    I added picture of us, thought it was cute ❤️.<br><br>
    
    <img src="us.jpg"
         style="
           max-width:90%;
           border-radius:18px;
           box-shadow:0 12px 30px rgba(0,0,0,.35);
           animation: fadeIn 0.8s ease-in-out;
         ">
  `;

  hint.textContent = "Let me know your reply 👍";

  // Only TWO buttons now
  btnRow.innerHTML = `
    <button class="btn yes success" id="waPresetBtn">
      Send an automated reply to Nadil on WhatsApp 💬
    </button>

    <div style="width:100%; margin-top:14px; text-align:left;">
      <div style="font-weight:800; font-size:16px; margin-bottom:8px;">
        Or send your own reply:
      </div>

      <textarea id="customMsg"
        placeholder="Type your message here..."
        style="
          width:100%;
          min-height:90px;
          padding:12px;
          border-radius:14px;
          border:1px solid rgba(0,0,0,.22);
          font-size:16px;
          resize:vertical;
          outline:none;
        "></textarea>

      <button class="btn yes" id="waCustomBtn" style="margin-top:10px;">
        Send your own reply to Nadil on WhatsApp ✍️
      </button>
    </div>
  `;

  popConfetti();

  // Preset message (exactly what you wanted)
  const presetMsg =
    "Yes, I will be your valentine Nadil 💗💗💗. Also just letting you know that you are better than me in everything.";

  // Your Sri Lanka WhatsApp number (94 + drop leading 0)
  const nadilWhatsAppNumber = "94762171117";

  function openWhatsApp(message) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${nadilWhatsAppNumber}?text=${encoded}`;
    window.open(url, "_blank");
  }

  // Preset WhatsApp button
  document
    .getElementById("waPresetBtn")
    .addEventListener("click", () => openWhatsApp(presetMsg));

  // Custom WhatsApp button
  document
    .getElementById("waCustomBtn")
    .addEventListener("click", () => {
      const msg = document.getElementById("customMsg").value.trim();
      if (!msg) {
        document.getElementById("customMsg").focus();
        return;
      }
      openWhatsApp(msg);
    });
});

// Confetti
function popConfetti() {
  confetti.innerHTML = "";
  const pieces = 120;

  for (let i = 0; i < pieces; i++) {
    const p = document.createElement("i");
    const left = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const duration = 1.8 + Math.random() * 1.6;
    const size = 8 + Math.random() * 10;

    p.style.left = left + "vw";
    p.style.animationDelay = delay + "s";
    p.style.animationDuration = duration + "s";
    p.style.width = size + "px";
    p.style.height = size * 1.2 + "px";
    p.style.top = -10 - Math.random() * 30 + "px";

    const hue = Math.floor(Math.random() * 360);
    p.style.background = `hsl(${hue} 90% 70%)`;

    confetti.appendChild(p);
  }

  setTimeout(() => (confetti.innerHTML = ""), 4500);
}








