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

  const yesScale = 1 + Math.min(noCount, 20) * 0.1;
  yesBtn.style.transform = `scale(${yesScale})`;

  const cardRect = document.getElementById("card").getBoundingClientRect();
  const maxX = Math.max(0, cardRect.width - 140);
  const maxY = Math.max(0, 120);

  const x = Math.floor(Math.random() * maxX) - maxX / 2;
  const y = Math.floor(Math.random() * maxY) - maxY / 3;

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${Math.max(0.72, 1 - noCount * 0.03)})`;

  if (noCount === 1) hint.textContent = "TRY AGAIN 😭😭😭";
  if (noCount === 4) hint.textContent = "AHHH YOU WANT TO PRESS NO THAT BADLY 💀💀💀";
  if (noCount === 6) hint.textContent = "YOU SUCK AT THIS 🤣🤣🤣";
  if (noCount === 9) hint.textContent = "ITS FUNNY HOW YOUR CHASING THE BUTTON NOW 😭😭💀💀";

  if (noCount >= 12) {
    noBtn.disabled = true;
    noBtn.style.opacity = "0.5";
    hint.textContent = "JUST PRESS THE YES BUTTON 🤦🏻‍♂️";
  }
}

noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodgeNo(); }, { passive: false });
noBtn.addEventListener("click", dodgeNo);

yesBtn.addEventListener("click", () => {
  question.textContent = "FINALLY!!! 💞";
  sub.textContent = "Ananya is officially Nadil’s Valentine 😌💘";
  hint.textContent = "Screenshot this and send it back to Nadil 😭📸";

  btnRow.innerHTML = `
    <button class="btn yes success" id="yayBtn">Send Nadil a ‘Yes’ 💌</button>
    <a class="btn no success" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center;"
       href="#" id="copyBtn">Copy a cute message ✨</a>
  `;

  popConfetti();

  const copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const msg = "Yes Nadil 😌💘 I’ll be your Valentine! (You really bullied the ‘No’ button lol)";
    try {
      await navigator.clipboard.writeText(msg);
      copyBtn.textContent = "Copied! ✅";
      setTimeout(() => copyBtn.textContent = "Copy a cute message ✨", 1600);
    } catch {
      copyBtn.textContent = "Copy didn’t work 😭";
      setTimeout(() => copyBtn.textContent = "Copy a cute message ✨", 1600);
    }
  });

  const yayBtn = document.getElementById("yayBtn");
  yayBtn.addEventListener("click", () => {
    window.location.href = "sms:?&body=" + encodeURIComponent("Yes Nadil 😌💘 I’ll be your Valentine! (Also… that No button was fighting for its life 😭)");
  });
});

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
    p.style.height = (size * 1.2) + "px";
    p.style.top = (-10 - Math.random() * 30) + "px";

    const hue = Math.floor(Math.random() * 360);
    p.style.background = `hsl(${hue} 90% 70%)`;

    confetti.appendChild(p);
  }

  setTimeout(() => (confetti.innerHTML = ""), 4500);
}


