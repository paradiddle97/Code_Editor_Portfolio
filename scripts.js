const skills = {
	frontend: [
		{ name: "HTML", level: 90, color: "#1a7a3d" },
		{ name: "CSS", level: 85, color: "#1a7a3d" },
		{ name: "JavaScript", level: 60, color: "#1a7a3d" },
		{ name: "Webflow", level: 90, color: "#1a7a3d" },
	],
	backend: [
		{ name: "Zapier / Make", level: 90, color: "#1a7a3d" },
		{ name: "HubSpot", level: 90, color: "#1a7a3d" },
		{ name: "SQL", level: 75, color: "#1a7a3d" },
		{ name: "Next.js / React / Vue", level: 60, color: "#1a7a3d" },
	],
	tools: [
		{ name: "Git / CLI", level: 70, color: "#1a7a3d" },
		{ name: "Figma", level: 85, color: "#1a7a3d" },
		{ name: "Adobe CC", level: 80, color: "#1a7a3d" },
		{ name: "Asana", level: 85, color: "#1a7a3d" },
	],
	languages: [
		{ name: "Dutch", level: 100, color: "#1a7a3d" },
		{ name: "English", level: 90, color: "#1a7a3d" },
		{ name: "German", level: 50, color: "#1a7a3d" },
		{ name: "Signlanguage (Dutch)", level: 60, color: "#1a7a3d" },
	],
};

function renderSkills(containerId, skillArr) {
	const el = document.getElementById(containerId);

	// Ga naar de buitenste wrapper van deze container
	const wrapper = el.closest('div[style*="margin: 4px"]') || el.parentElement;

	let prevLine = null;
	let current = wrapper.previousElementSibling;

	while (current) {
		if (current.classList && current.classList.contains("code-line")) {
			const lnSpan = current.querySelector(".ln");
			if (lnSpan) {
				prevLine = current;
				break;
			}
		}
		current = current.previousElementSibling;
	}

	const lastLn = prevLine ? prevLine.querySelector(".ln") : null;
	const startNumber = lastLn ? parseInt(lastLn.textContent, 10) + 1 : 7;

	el.innerHTML = skillArr
		.map(
			(s, i) => `
    <div class="code-line" style="animation-delay:${i * 40}ms">
      <span class="ln">${startNumber + i}</span>
      <div class="gutter"></div>
      <span class="code-content" style="display:flex;align-items:center;gap:0;">
        <span style="color:var(--purple-light);margin-right:4px;">  { </span>
        <span class="prop">${s.name}</span>
        <span style="margin:0 8px;color:var(--gray1);">│</span>
        <span class="skill-bar-wrap">
          <span class="skill-bar-fill" style="width:0%;background:${s.color};" data-target="${s.level}"></span>
        </span>
        <span class="skill-pct" style="margin-left:8px;">${s.level}%</span>
        <span style="color:var(--purple-light);margin-left:4px;">},</span>
      </span>
    </div>
  `,
		)
		.join("");

	setTimeout(() => {
		el.querySelectorAll(".skill-bar-fill").forEach((bar) => {
			bar.style.width = bar.dataset.target + "%";
		});
	}, 200);
}

renderSkills("skills-frontend", skills.frontend);
renderSkills("skills-backend", skills.backend);
renderSkills("skills-tools", skills.tools);
renderSkills("skills-languages", skills.languages);

// Generate minimap lines
const minimap = document.getElementById("minimap-content");
for (let i = 0; i < 80; i++) {
	const line = document.createElement("div");
	line.className = "minimap-line";
	const w = Math.random() * 60 + 20;
	const colors = [
		"var(--bg4)",
		"var(--purple-dim)",
		"var(--green-dim)",
		"var(--bg3)",
	];
	line.style.width = w + "%";
	line.style.background = colors[Math.floor(Math.random() * colors.length)];
	minimap.appendChild(line);
}

// Tab switching
function switchTab(tabEl, section) {
	document
		.querySelectorAll(".tab")
		.forEach((t) => t.classList.remove("active"));
	tabEl.classList.add("active");
	showSection(section);
	updateBreadcrumb(section);
	updateStatusBar(section);
}

function switchTabByName(section) {
	const tab = document.querySelector(`[data-section="${section}"]`);
	if (tab) switchTab(tab, section);
}

function showSection(name) {
	document.querySelectorAll('[id^="section-"]').forEach((s) => {
		s.className = "hidden-section";
	});
	const el = document.getElementById("section-" + name);
	if (el) el.className = "visible-section";
}

const langMap = {
	about: "JavaScript",
	skills: "JavaScript",
	projects: "JSON",
	contact: "Markdown",
	experience: "JavaScript",
};
const fileMap = {
	about: "about.js",
	skills: "skills.js",
	projects: "projects.json",
	contact: "contact.md",
	experience: "experience.js",
};

function updateBreadcrumb(section) {
	document.getElementById("bc-current").textContent =
		fileMap[section] || section;
}

function updateStatusBar(section) {
	document.getElementById("status-lang").textContent =
		langMap[section] || "Plain Text";
}

// Panel
let panelOpen = false;
function togglePanel() {
	panelOpen = !panelOpen;
	document.getElementById("panel").classList.toggle("open", panelOpen);
	if (
		panelOpen &&
		document.getElementById("terminal-cmd").textContent === ""
	) {
		typeTerminalCmd("node about.js");
	}
}

function typeTerminalCmd(cmd) {
	const el = document.getElementById("terminal-cmd");
	let i = 0;
	el.textContent = "";
	const timer = setInterval(() => {
		if (i < cmd.length) {
			el.textContent += cmd[i++];
		} else {
			clearInterval(timer);
			setTimeout(showTerminalOutput, 400);
		}
	}, 60);
}

function showTerminalOutput() {
	const lines = document.getElementById("terminal-lines");
	const outputs = [
		{ cls: "t-out", txt: "" },
		{
			cls: "t-success",
			txt: "✓ Compiled successfully in 238ms",
		},
		{ cls: "t-out", txt: "" },
		{
			cls: "t-out",
			txt: '{ name: "Niels Aling", role: "Full-Stack Developer"',
		},
		{
			cls: "t-out",
			txt: "  availableForWork: true, ← you should click this",
		},
		{ cls: "t-out", txt: "  coffeePerDay: Infinity }" },
		{ cls: "t-out", txt: "" },
		{
			cls: "t-success",
			txt: "→ Process exited with code 0  (hire him)",
		},
	];
	let i = 0;
	const next = () => {
		if (i >= outputs.length) return;
		const div = document.createElement("div");
		div.className = outputs[i].cls;
		div.textContent = outputs[i].txt;
		lines.appendChild(div);
		i++;
		setTimeout(next, 80);
	};
	next();
}

// Run button
const runMessages = [
	"> node skills.js\n✓ Build successful\n→ All 94 tests passed\n💚 0 vulnerabilities found",
	"> npm run deploy\n📦 Bundling...\n✓ Deployed to prod in 3.2s\n🚀 Live at portfolio.paradiddle97.dev",
	"> git log --oneline -5\nabc123 fix: that bug I introduced yesterday\ndef456 feat: add dark mode (it's already dark)\nghi789 chore: update deps (yolo)\n...",
	"> echo $AVAILABLE_FOR_HIRE\ntrue\n💡 Hint: contact.md has the details",
];
let runIdx = 0;
function runCode() {
	if (!panelOpen) togglePanel();
	const lines = document.getElementById("terminal-lines");
	lines.innerHTML = "";
	const msg = runMessages[runIdx++ % runMessages.length];
	msg.split("\n").forEach((line, i) => {
		setTimeout(() => {
			const div = document.createElement("div");
			div.className = line.startsWith(">")
				? "t-cmd"
				: line.startsWith("✓") ||
					  line.startsWith("💚") ||
					  line.startsWith("🚀")
					? "t-success"
					: "t-out";
			div.textContent = line;
			lines.appendChild(div);
		}, i * 80);
	});
}

// Format
function formatDocument() {
	const ec = document.getElementById("editor-content");
	ec.classList.add("format-flash");
	showNotification("✨ Document formatted. 3 semicolons added.", "success");
	setTimeout(() => ec.classList.remove("format-flash"), 800);
}

// Sidebar toggle
let sidebarOpen = true;
function toggleSidebar() {
	sidebarOpen = !sidebarOpen;
	document.getElementById("sidebar").style.width = sidebarOpen
		? "var(--sidebar-w)"
		: "0";
	document.getElementById("sidebar").style.overflow = sidebarOpen
		? ""
		: "hidden";
}

// Notification
let notifTimer;
function showNotification(msg, type) {
	const el = document.getElementById("notification");
	const [title, ...rest] = msg.split("\n");
	document.getElementById("notif-title").textContent = title;
	document.getElementById("notif-body").textContent = rest.join("\n");
	el.classList.add("show");
	clearTimeout(notifTimer);
	notifTimer = setTimeout(() => el.classList.remove("show"), 3500);
}

// Copy to clipboard
function copyToClipboard(text, msg) {
	if (navigator.clipboard) navigator.clipboard.writeText(text);
	showNotification(msg || "Copied!", "success");
}

// Command Palette
const commands = [
	{
		label: "Go to About",
		key: "about",
		kbd: "Ctrl+1",
		action: () => switchTabByName("about"),
	},
	{
		label: "Go to Skills",
		key: "skills",
		kbd: "Ctrl+2",
		action: () => switchTabByName("skills"),
	},
	{
		label: "Go to Projects",
		key: "projects",
		kbd: "Ctrl+3",
		action: () => switchTabByName("projects"),
	},
	{
		label: "Go to Contact",
		key: "contact",
		kbd: "Ctrl+4",
		action: () => switchTabByName("contact"),
	},
	{
		label: "Go to Experience",
		key: "experience",
		kbd: "Ctrl+5",
		action: () => switchTabByName("experience"),
	},
	{
		label: "Open Terminal",
		key: "terminal",
		kbd: "Ctrl+`",
		action: () => {
			if (!panelOpen) togglePanel();
		},
	},
	{ label: "Run Code", key: "run", kbd: "F5", action: runCode },
	{
		label: "Format Document",
		key: "format",
		kbd: "Shift+Alt+F",
		action: formatDocument,
	},
	{
		label: "Copy Email",
		key: "email",
		kbd: "",
		action: () =>
			copyToClipboard("niels.aling@hotmail.com", "📋 Email copied!"),
	},
	{
		label: "Toggle Sidebar",
		key: "sidebar",
		kbd: "Ctrl+B",
		action: toggleSidebar,
	},
	{
		label: "Toggle Dark Mode",
		key: "dark",
		kbd: "",
		action: () =>
			showNotification("😅 It's always dark mode here.", "info"),
	},
	{
		label: "Hire Niels",
		key: "hire",
		kbd: "Ctrl+H",
		action: () => {
			switchTabByName("contact");
			showNotification("🎉 Great choice! Check contact.md", "success");
		},
	},
];
let filteredCmds = [...commands];
let focusedIdx = 0;

function openCmdPalette() {
	document.getElementById("cmd-overlay").classList.add("show");
	document.getElementById("cmd-input").value = "";
	filteredCmds = [...commands];
	renderCmds();
	setTimeout(() => document.getElementById("cmd-input").focus(), 50);
}

function closeCmdPalette(e) {
	document.getElementById("cmd-overlay").classList.remove("show");
}

function renderCmds() {
	const list = document.getElementById("cmd-list");
	list.innerHTML = filteredCmds
		.map(
			(c, i) => `
    <div class="cmd-item ${i === focusedIdx ? "focused" : ""}" onclick="execCmd(${i})">
      <span class="cmd-item-icon">›</span>
      <span>${c.label}</span>
      ${c.kbd ? `<span class="cmd-item-kbd">${c.kbd}</span>` : ""}
    </div>
  `,
		)
		.join("");
}

function filterCmds(val) {
	filteredCmds = commands.filter(
		(c) =>
			c.label.toLowerCase().includes(val.toLowerCase()) ||
			c.key.includes(val.toLowerCase()),
	);
	focusedIdx = 0;
	renderCmds();
}

function execCmd(i) {
	filteredCmds[i]?.action();
	closeCmdPalette();
}

function handleCmdKey(e) {
	if (e.key === "ArrowDown") {
		focusedIdx = Math.min(focusedIdx + 1, filteredCmds.length - 1);
		renderCmds();
	}
	if (e.key === "ArrowUp") {
		focusedIdx = Math.max(focusedIdx - 1, 0);
		renderCmds();
	}
	if (e.key === "Enter") {
		execCmd(focusedIdx);
	}
	if (e.key === "Escape") {
		closeCmdPalette();
	}
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
	if ((e.metaKey || e.ctrlKey) && e.key === "p") {
		e.preventDefault();
		openCmdPalette();
	}
	if ((e.metaKey || e.ctrlKey) && e.key === "`") {
		e.preventDefault();
		togglePanel();
	}
	if ((e.metaKey || e.ctrlKey) && e.key === "b") {
		e.preventDefault();
		toggleSidebar();
	}
	if (e.key === "Escape") {
		closeCmdPalette();
	}
});

// Folder toggle
function toggleFolder(el) {
	el.classList.toggle("open");
	const children = el.nextElementSibling;
	if (children && children.classList.contains("folder-children")) {
		children.style.display =
			children.style.display === "none" ? "" : "none";
	}
}

// Random line cursor tracking
document
	.getElementById("editor-content")
	.addEventListener("click", function (e) {
		const line = e.target.closest(".code-line");
		if (line) {
			document
				.querySelectorAll(".code-line.cursor-line")
				.forEach((l) => l.classList.remove("cursor-line"));
			line.classList.add("cursor-line");
			const allLines = [
				...document.querySelectorAll("#editor-content .code-line"),
			];
			const idx = allLines.indexOf(line) + 1;
			document.getElementById("status-ln").textContent =
				`Ln ${idx}, Col ${Math.floor(Math.random() * 40) + 1}`;
		}
	});

// Fullscreen gimmick
function toggleFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement
			.requestFullscreen?.()
			.catch(() =>
				showNotification(
					"🤔 Fullscreen blocked. You're not missing much.",
					"info",
				),
			);
	} else {
		document.exitFullscreen?.();
	}
}

// Panel tab switcher
function switchPanelTab(el, name) {
	document
		.querySelectorAll(".panel-tab")
		.forEach((t) => t.classList.remove("active"));
	el.classList.add("active");
	const lines = document.getElementById("terminal-lines");
	if (name === "problems") {
		lines.innerHTML = `
      <div class="t-out" style="color:var(--yellow)">⚠ skills.js(43): Variable 'Bugs.ZERO' might be a lie  [eslint]</div>
      <div class="t-out" style="color:var(--yellow)">⚠ about.js(18): 'pretending to do yoga' is not a valid hobby type  [eslint]</div>
      <div class="t-success">● No errors. You're doing great.</div>
    `;
	} else if (name === "output") {
		lines.innerHTML = `
      <div class="t-out">[12:00:01] Starting portfolio.js...</div>
      <div class="t-out">[12:00:02] Loaded 4 sections, 0 bugs (see warnings)</div>
      <div class="t-success">[12:00:02] Portfolio ready. Awaiting recruiters...</div>
    `;
	}
}

// Easter egg: Konami code
let konamiSeq = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener("keydown", (e) => {
	konamiSeq.push(e.keyCode);
	if (konamiSeq.length > 10) konamiSeq.shift();
	if (JSON.stringify(konamiSeq) === JSON.stringify(konami)) {
		showNotification(
			"🎮 KONAMI CODE! You found the easter egg. +30 respect points.",
			"success",
		);
		document.body.style.transition = "filter 0.5s";
		document.body.style.filter = "hue-rotate(90deg)";
		setTimeout(() => {
			document.body.style.filter = "";
		}, 3000);
	}
});

// Init
renderCmds();
