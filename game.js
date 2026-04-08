var currentLevel = parseInt(localStorage.getItem("tnar_level")) || 1;
    var startTime = parseInt(localStorage.getItem("tnar_start")) || Date.now();
var audioEnabled = false;
   var mainCheckDone = false;

if (!localStorage.getItem("tnar_start")) {
        localStorage.setItem("tnar_start", startTime);
}

function updateLevelCounter() {
  var num = currentLevel < 10 ? "0" + currentLevel : "" + currentLevel;
      document.getElementById("level-num").textContent = num;
}

function loadLevel(n) {
        updateLevelCounter();
  var area = document.getElementById("puzzle-area");
    area.innerHTML = '<p style="color:#888; font-size:13px; text-align:center; padding:20px 0;">Loading level...</p>';
  var btn = document.getElementById("verify-btn");
        btn.disabled = true;
    btn.classList.remove("success");
}

function verifyLevel(n) {
  var btn = document.getElementById("verify-btn");
      btn.classList.add("success");
    btn.textContent = "✓ Verified";
        btn.disabled = true;

  var next = n + 1;

      if (next == 5) {
    next = 6;
      }

  localStorage.setItem("tnar_level", next);

      var card = document.getElementById("captcha-card");
    card.classList.add("fading");

  setTimeout(function() {
        currentLevel = next;
      card.classList.remove("fading");
    btn.textContent = "Verify";
        btn.classList.remove("success");
      loadLevel(currentLevel);
  }, 600);
}

function failLevel() {
        var btn = document.getElementById("verify-btn");
    btn.disabled = true;
        loadLevel(currentLevel);
}

function handleMainCheck() {
      if (mainCheckDone) return;
}

function handleVerify() {
  var btn = document.getElementById("verify-btn");
      if (btn.disabled) return;
    verifyLevel(currentLevel);
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
  var btn = document.getElementById("audio-btn");

      if (audioEnabled) {
        btn.classList.add("active");
    btn.textContent = "🔊";
      } else {
    btn.classList.remove("active");
        btn.textContent = "🔇";
  }
}

updateLevelCounter();
    loadLevel(currentLevel);