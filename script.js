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

  // Make YES grow a lot
  const yesScale = 1 + Math.min(noCount, 20) * 0.1;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Make NO move randomly (within the card)
  const cardRect = document.getElementById("card").getBoundingClientRect();
  const maxX = Math.max(0, cardRect.width - 140);
  const maxY = Math.max(0, 120);

  const x = Math.floor(Math.random() * maxX) - maxX / 2;
  const y = Math.floor(Math.random() * maxY) - maxY / 3;

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${Math.max(0.72, 1 - noCount * 0.03)})`;

  // Your custom bully/funny messages
  if (noCount === 1) hint.textContent = "TRY AGAIN 😭😭😭";
  if (noCount === 4) hint.textContent = "AHHH YOU WANT TO PRESS NO THAT BADLY 💀💀💀";
  if (noCount === 6) hint.textContent = "YOU SUCK AT THIS 🤣🤣🤣";
  if (noCount === 9) hint.textContent = "ITS FUNNY HOW YOUR CHASING THE BUTTON NOW 😭😭💀💀";

  // After enough tries, disable NO
  if (noCount >= 12) {
    noBtn.disabled = true;
    noBtn.style.opacity = "0.5";
    hint.textContent = "JUST PRESS THE YES BUTTON 🤦🏻‍♂️";
  }
}

// Mobile + desktop triggers for NO
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

// YES click = success screen
yesBtn.addEventListener("click", () => {
  question.textContent = "FINALLY!!! 💞";

  // If you added your photo, keep this line as-is but ensure filename matches.
  // Example: <img src="us.jpg.jpeg" ...>
  // If you don't want the photo, you can remove the <img> part.
  sub.innerHTML = `
    Ananya is officially Nadil’s Valentine 😌💘<br><br>
    <img src="us.jpg"
         style="
           max-width:90%;
           border-radius:18px;
           box-shadow:0 12px 30px rgba(0,0,0,.35);
           animation: fadeIn 0.8s ease-in-out;
         ">
  `;

  hint.textContent = "Pick one 😌👇";

  // --- WhatsApp + copy + custom reply UI ---
  btnRow.innerHTML = `
    <button class="btn yes success" id="waPresetBtn">Send preset to Nadil on WhatsApp 💬</button>
    <button class="btn no success" id="copyPresetBtn">Copy preset reply 📋</button>

    <div style="width:100%; margin-top:14px; text-align:left;">
      <div style="font-weight:800; font-size:16px; margin-bottom:8px;">
        Or write your own reply:
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

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button class="btn yes" id="waCustomBtn">Send your reply on WhatsApp ✍️</button>
        <button class="btn no" id="copyCustomBtn">Copy your reply 📎</button>
      </div>
    </div>
  `;

  popConfetti();

  // ✅ Your exact preset message
  const presetMsg = "yes, now I will be your valentine. Also, you are better than me in everything.";

  // ✅ Your Sri Lanka WhatsApp number in international format (94 + drop 0)
  const nadilWhatsAppNumber = "94762171117";

  const waPresetBtn = document.getElementById("waPresetBtn");
  const copyPresetBtn = document.getElementById("copyPresetBtn");
  const waCustomBtn = document.getElementById("waCustomBtn");
  const copyCustomBtn = document.getElementById("copyCustomBtn");
  const customMsg = document.getElementById("customMsg");

  function openWhatsAppWithMessage(message) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${nadilWhatsAppNumber}?text=${encoded}`;
    window.open(url, "_blank");
  }

  // 1) Send preset to WhatsApp
  waPresetBtn.addEventListener("click", () => {
    openWhatsAppWithMessage(presetMsg);
  });

  // 2) Copy preset
  copyPresetBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(presetMsg);
      copyPresetBtn.textContent = "Copied ✅";
      setTimeout(() => (copyPresetBtn.textContent = "Copy preset reply 📋"), 1400);
    } catch {
      copyPresetBtn.textContent = "Copy failed 😭";
      setTimeout(() => (copyPresetBtn.textContent = "Copy preset reply 📋"), 1400);
    }
  });

  // 3) Send custom reply on WhatsApp
  waCustomBtn.addEventListener("click", () => {
    const msg = customMsg.value.trim();
    if (!msg) {
      customMsg.focus();
      return;
    }
    openWhatsAppWithMessage(msg);
  });

  // 4) Copy custom reply
  copyCustomBtn.addEventListener("click", async () => {
    const msg = customMsg.value.trim();
    if (!msg) {
      customMsg.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(msg);
      copyCustomBtn.textContent = "Copied ✅";
      setTimeout(() => (copyCustomBtn.textContent = "Copy your reply 📎"), 1400);
    } catch {
      copyCustomBtn.textContent = "Copy failed 😭";
      setTimeout(() => (copyCustomBtn.textContent = "Copy your reply 📎"), 1400);
    }
  });
});

// Confetti animation
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



