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

var levelregister = {};
var timerStarted = false;

function shuffle(arr) {
    var i = arr.length, j, temp;
    while (i>0) {
        j = Math.floor(Math.random() * i);
        i--;
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

var loadLevel_orig = loadLevel;
loadLevel = function(n) {
    if (!timerStarted) {
        timerStarted = true;
        if (!localStorage.getItem("tnar_start")) {
            localStorage.setItem("tnar_start", Date.now());
        }
        startTime = parseInt(localStorage.getItem("tnar_start"));
    }

    var puzzleArea = document.getElementById("puzzle-area");
    puzzleArea.innerHTML = "";

    var counter = document.getElementById("level-counter");
    if (counter) {
        counter.textContent = n + " / 50";
    }

    var btn = document.getElementById("verify-btn");
    btn.disabled = true;
    btn.classList.remove("success");
    btn.textContent = "Verify";

    if (levelregister[n]) {
        levelregister[n].render();
    } else {
        puzzleArea.innerHTML = "<p style='padding:20px;color:#888'>Loading level " + n + "...</p>";
    }
};

var verifyLevel_orig = verifyLevel;
verifyLevel = function(n) {
    var btn = document.getElementById("verify-btn");
    btn.disabled = true;
    btn.classList.add("success");
    btn.textContent = "✓";

    var nextLevel = n + 1;
    localStorage.setItem("tnar_level", nextLevel);
    currentLevel = nextLevel;

    var card = document.getElementById("captcha-card");
    card.style.opacity = "0";
    card.style.transition = "opacity 0.4s";

    setTimeout(function() {
        card.style.opacity = "1";
        loadLevel(currentLevel);
    }, 500);
};

function failLevel() {
    var puzzleArea = document.getElementById("puzzle-area");
    puzzleArea.style.outline = "2px solid red";
    setTimeout(function() {
        puzzleArea.style.outline = "";
    }, 400);
    if (levelregister[currentLevel] && levelregister[currentLevel].reset) {
        levelregister[currentLevel].reset();
    }
}

window.onload = function() {
    loadLevel(currentLevel);
};

var handleVerify_orig = handleVerify;
handleVerify = function() {
    var btn = document.getElementById("verify-btn");
    if (btn.disabled) return;
    if (levelregister[currentLevel] && levelregister[currentLevel].verify) {
        levelregister[currentLevel].verify();
    } else {
        verifyLevel(currentLevel);
    }
};
function blueHeader(subtitle, title) {
    return '<div style="background:#4a90d9;padding:14px 16px;margin:-8px -8px 14px -8px;border-radius:3px 3px 0 0;"><div style="color:rgba(255,255,255,0.82);font-size:12px;font-weight:400;margin-bottom:3px;">'+subtitle+'</div><div style="color:#fff;font-size:21px;font-weight:700;line-height:1.2;letter-spacing:-0.3px;">'+title+'</div></div>';
}
var l1clicked = false;
levelregister[1] = {
    render: function() {
        l1clicked = false;
        var area = document.getElementById("puzzle-area");
        var html = blueHeader("Confirm you're human", "Check the box");
        html += '<div style="padding:22px 0 18px;text-align:center;">';
        html += '<div style="display:inline-flex;align-items:center;gap:14px;background:#f8f9fa;border:1px solid #e0e0e0;border-radius:4px;padding:14px 22px;cursor:pointer;" onclick="l1click()" id="l1row">';
        html += '<div id="l1box" style="width:26px;height:26px;border:2px solid #bbb;border-radius:3px;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0;transition:all 0.18s;">';
        html += '<div id="l1spin" style="display:none;width:14px;height:14px;border:2px solid #4a90d9;border-top-color:transparent;border-radius:50%;animation:spin00.7s linear infinite;"></div>';
        html += '<div id="l1chk" style="display:none;color:#4a90d9;font-size:18px;font-weight:900;line-height:1;">✓</div>';
        html += '</div>';
        html += '<span style="font-size:15px;color:#202124;font-weight:500;user-select:none;">I\'m not a robot</span>';
        html += '</div></div>';
        html += '<p id="l1msg" style="font-size:11px;color:#999;text-align:center;margin:0 0 6px;">Click the checkbox to verify</p>';
        area.innerHTML = html;
    },
    reset: function() { levelregister[1].render(); }
};

function l1click() {
    if (l1clicked) return;
    l1clicked = true;
    var box = document.getElementById("l1box");
    var spin = document.getElementById("l1spin");
    var row = document.getElementById("l1row");
    box.style.borderColor = "#4a90d9";
    spin.style.display = "block";
    if (row) row.style.borderColor = "#4a90d9";
    setTimeout(function() {
        spin.style.display = "none";
        var chk = document.getElementById("l1chk");
        chk.style.display = "block";
        box.style.background = "#e8f4fd";
        document.getElementById("l1msg").textContent = "✓ Human detected";
        document.getElementById("l1msg").style.color = "#34a853";
        document.getElementById("verify-btn").disabled = false;
    }, 2000);
}
var l2items = [];
var l2sel = {};
levelregister[2] = {
    render: function() {
        l2sel = {};
    var pool = [
            { img: "images/light1.jpg", correct: true },
            { img: "images/light2.jpg", correct: true },
            { img: "images/light3.jpg", correct: true },
            { img: "images/light4.jpg", correct: true },
            { img: "images/light5.jpg", correct: true },
            { img: "images/cone.jpg", correct: false, penalty: true },
            { img: "images/bus.jpg", correct: false },
            { img: "images/bike.jpg", correct: false },
            { img: "images/car.jpg", correct: false }
        ];
        
        pool = shuffle(pool);
        l2items = pool;
        
        var area = document.getElementById("puzzle-area");
        var html = blueHeader("Select all squares with a", "Traffic Light");
        html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;" id="l2grid">';
        
        for (var i=0; i<9; i++) {
            html += '<div id="l2cell'+i+'" onclick="l2click('+i+')" style="height:80px; background-color:#f5f5f5; background-image:url(\'' + pool[i].img + '\'); background-size:cover; background-position:center; border:2px solid #e0e0e0; border-radius:4px; cursor:pointer; user-select:none; transition:all 0.15s; position:relative;">';
            html += '<div id="l2chk'+i+'" style="display:none; position:absolute; top:4px; right:4px; background:#4a90d9; color:white; border-radius:50%; width:20px; height:20px; font-size:12px; font-weight:bold; align-items:center; justify-content:center;">✓</div>';
            html += '</div>';
        }
        
        html += '</div>';
        html += '<p id="l2msg" style="font-size:11px;color:#ea4335;margin:7px 0 0;min-height:15px;text-align:center;"></p>';
        area.innerHTML = html;
    },
    reset: function() { l2sel = {}; levelregister[2].render(); }
};
function l2click(idx) {
    var item = l2items[idx];
    var cell = document.getElementById("l2cell"+idx);
    var checkmark = document.getElementById("l2chk"+idx);
    if (!cell) return;
    
    if (item.penalty) {
        document.getElementById("l2msg").textContent = "❌ That's a construction barrier, not a traffic light!";
        cell.style.borderColor = "#ea4335";
        var oldBg = cell.style.backgroundImage;
        cell.style.backgroundImage = "linear-gradient(rgba(234, 67, 53, 0.5), rgba(234, 67, 53, 0.5)), " + oldBg;
        setTimeout(function() { failLevel(); }, 700);
        return;
    }
    
    if (!item.correct) {
        document.getElementById("l2msg").textContent = "That's not a traffic light...";
        cell.style.borderColor = "#fbbc04";
        setTimeout(function() { cell.style.borderColor = "#e0e0e0"; }, 600);
        return;
    }
    if (l2sel[idx]) {
        l2sel[idx] = false;
        cell.style.borderColor = "#e0e0e0";
        cell.style.transform = "scale(1)";
        checkmark.style.display = "none";
    } else {
        l2sel[idx] = true;
        cell.style.borderColor = "#4a90d9";
        cell.style.transform = "scale(0.92)"; 
        checkmark.style.display = "flex";
    }
    
    var count = 0;
    for (var k in l2sel) { if (l2sel[k]) count++; }
    
    if (count == 5) {
        document.getElementById("l2msg").textContent = "✓ All traffic lights selected!";
        document.getElementById("l2msg").style.color = "#34a853";
        document.getElementById("verify-btn").disabled = false;
    } else {
        document.getElementById("verify-btn").disabled = true;
        document.getElementById("l2msg").textContent = count + " / 5 selected";
        document.getElementById("l2msg").style.color = "#555";
    }
}
var l3cells = [];
var L3_STAB = 3;
var L3_SIGN_X1 = 30, L3_SIGN_X2 = 70;
var L3_SIGN_Y1 = 8,  L3_SIGN_Y2 = 75;

levelregister[3] = {
    render: function() {
        l3cells = [];
        var id = 0;
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                l3cells.push({
                    id: id++,
                    x: (c / 3) * 100,
                    y: (r / 3) * 100,
                    w: 100 / 3,
                    h: 100 / 3,
                    depth: 0,
                    sel: false
                });
            }
        }
        var area = document.getElementById("puzzle-area");
        var html = blueHeader("Select all squares with a", "Stop Sign");
        html += '<div id="l3wrap" style="position:relative;width:100%;height:240px;overflow:hidden;border-radius:4px;background:#b22222;">';
        html += '<img src="images/stopsign.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'">';
        html += '<div id="l3grid" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>';
        html += '</div>';
        html += '<p id="l3msg" style="font-size:11px;color:#999;text-align:center;margin:7px 0 0;min-height:15px;">Click the squares containing the stop sign</p>';
        area.innerHTML = html;
        l3draw();
    },
    reset: function() { levelregister[3].render(); },
    verify: function() {
        var wrong = false;
        var missedAny = false;
        for (var i = 0; i < l3cells.length; i++) {
            if (l3cells[i].depth < L3_STAB) continue;
            var hasSign = l3cellHasSign(l3cells[i]);
            if (l3cells[i].sel && !hasSign) wrong = true;
            if (!l3cells[i].sel && hasSign) missedAny = true;
        }
        if (!wrong && !missedAny) {
            verifyLevel(3);
        } else {
            failLevel();
        }
    }
};

function l3cellHasSign(cell) {
    var cx = cell.x + cell.w / 2;
    var cy = cell.y + cell.h / 2;
    return cx >= L3_SIGN_X1 && cx <= L3_SIGN_X2 && cy >= L3_SIGN_Y1 && cy <= L3_SIGN_Y2;
}

function l3draw() {
    var grid = document.getElementById("l3grid");
    if (!grid) return;
    grid.innerHTML = "";

    var anyStable = false;
    for (var s = 0; s < l3cells.length; s++) {
        if (l3cells[s].depth >= L3_STAB) { anyStable = true; break; }
    }

    for (var i = 0; i < l3cells.length; i++) {
        var cell = l3cells[i];
        var stable = cell.depth >= L3_STAB;

        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = cell.x + "%";
        div.style.top = cell.y + "%";
        div.style.width = cell.w + "%";
        div.style.height = cell.h + "%";
        div.style.boxSizing = "border-box";
        div.style.cursor = "pointer";
        div.style.transition = "background 0.12s";

        if (stable && cell.sel) {
            div.style.border = "2px solid #4a90d9";
            div.style.background = "rgba(74,144,217,0.4)";
        } else if (stable) {
            div.style.border = "2px solid rgba(255,255,255,0.8)";
            div.style.background = "rgba(0,0,0,0.04)";
        } else {
            div.style.border = "2px solid rgba(255,255,255,0.35)";
            div.style.background = "transparent";
        }

        (function(ii) {
            div.onclick = function() { l3click(ii); };
        })(i);

        grid.appendChild(div);
    }

    var btn = document.getElementById("verify-btn");
    var msg = document.getElementById("l3msg");

    if (!anyStable) {
        btn.disabled = true;
        msg.textContent = "Click the squares to zoom in";
        msg.style.color = "#999";
        return;
    }

    var signCells = 0, selSignCells = 0, wrongSel = false;
    for (var j = 0; j < l3cells.length; j++) {
        if (l3cells[j].depth < L3_STAB) continue;
        if (l3cellHasSign(l3cells[j])) {
            signCells++;
            if (l3cells[j].sel) selSignCells++;
        } else {
            if (l3cells[j].sel) wrongSel = true;
        }
    }

    if (signCells > 0 && selSignCells > 0 && selSignCells == signCells && !wrongSel) {
        btn.disabled = false;
        msg.textContent = "✓ All stop sign squares selected!";
        msg.style.color = "#34a853";
        return;
    }

    btn.disabled = true;
    msg.textContent = selSignCells + " / " + signCells + " selected";
    msg.style.color = "#555";
}
function l3click(idx) {
    var cell = l3cells[idx];
    if (!cell) return;
    var msg = document.getElementById("l3msg");

    if (cell.depth >= L3_STAB) {
        cell.sel = !cell.sel;
        l3draw();
        return;
    }

    var ox = cell.x;
    var oy = cell.y;
    var hw = cell.w / 2;
    var hh = cell.h / 2;
    var nd = cell.depth + 1;

    l3cells.splice(idx, 1);
    l3cells.push({ id: Math.random(), x: ox,      y: oy,      w: hw, h: hh, depth: nd, sel: false });
    l3cells.push({ id: Math.random(), x: ox + hw, y: oy,      w: hw, h: hh, depth: nd, sel: false });
    l3cells.push({ id: Math.random(), x: ox,      y: oy + hh, w: hw, h: hh, depth: nd, sel: false });
    l3cells.push({ id: Math.random(), x: ox + hw, y: oy + hh, w: hw, h: hh, depth: nd, sel: false });

    if (nd >= L3_STAB) {
        msg.textContent = "Now select all squares containing the stop sign";
        msg.style.color = "#4a90d9";
    } else {
        msg.textContent = "Hmm, try clicking again...";
        msg.style.color = "#999";
    }

    l3draw();
}