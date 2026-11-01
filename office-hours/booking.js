// Office hours booking widget, shared by office-hours/api-209/ and office-hours/epa-101/.
//
// Each page sets window.OH_SCHEDULES before loading this file. One entry per booking option:
//   id        short name, also the URL hash (/office-hours/api-209/#in-person)
//   label     text on the tab (tabs only appear when there are two or more options)
//   where     one line shown above the calendar
//   calLink   Cal.com "username/event-slug" (from the event's public link cal.com/username/event-slug)
//   google    old Google appointment-schedule link, used only while calLink is empty
//
// The Cal.com booker is themed with the site palette (html/custom.scss and html/dark.scss)
// and follows the site's light/dark toggle.
(function () {
  const PALETTE = {
    light: {
      "cal-brand": "#A51C30",
      "cal-brand-emphasis": "#861626",
      "cal-brand-text": "#ffffff",
      "cal-brand-subtle": "#f6e8ea",
      "cal-brand-accent": "#ffffff",
      "cal-text": "#3f3f46",
      "cal-text-emphasis": "#27272a",
      "cal-text-subtle": "#71717b",
      "cal-text-muted": "#b8b8bf",
      "cal-bg": "#ffffff",
      "cal-bg-emphasis": "#e4e4e7",
      "cal-bg-subtle": "#f4f4f5",
      "cal-bg-muted": "#fafafa",
      "cal-border": "#e4e4e7",
      "cal-border-emphasis": "#b8b8bf",
      "cal-border-subtle": "#e4e4e7",
      "cal-border-muted": "#f4f4f5",
      "cal-border-booker": "#e4e4e7",
      "cal-border-booker-width": "1px",
      "radius": "8px"
    },
    dark: {
      "cal-brand": "#9fc3c9",
      "cal-brand-emphasis": "#b8d4d9",
      "cal-brand-text": "#252526",
      "cal-brand-subtle": "#37474f",
      "cal-brand-accent": "#252526",
      "cal-text": "#c3cfd0",
      "cal-text-emphasis": "#dce8e8",
      "cal-text-subtle": "#848b8c",
      "cal-text-muted": "#55595a",
      "cal-bg": "#252526",
      "cal-bg-emphasis": "#343435",
      "cal-bg-subtle": "#2a2a2c",
      "cal-bg-muted": "#2a2a2c",
      "cal-border": "#343435",
      "cal-border-emphasis": "#55595a",
      "cal-border-subtle": "#343435",
      "cal-border-muted": "#2a2a2c",
      "cal-border-booker": "#343435",
      "cal-border-booker-width": "1px",
      "radius": "8px"
    }
  };

  const siteTheme = () => document.body.classList.contains("quarto-dark") ? "dark" : "light";

  // Cal.com's embed loader, as given by its embed snippet generator.
  function loadCal() {
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  }

  const calUi = theme => ({
    theme: theme,
    cssVarsPerTheme: PALETTE,
    hideEventTypeDetails: true,            // the page already says the slot length and place
    showTimezoneWhenEventDetailsHidden: true,
    layout: "month_view"
  });

  document.addEventListener("DOMContentLoaded", function () {
    const schedules = (window.OH_SCHEDULES || []).filter(s => s.calLink || s.google);
    const tabs     = document.getElementById("oh-tabs");
    const where    = document.getElementById("oh-where");
    const booking  = document.getElementById("oh-booking");
    const fallback = document.getElementById("oh-fallback");
    const link     = document.getElementById("oh-link");
    if (!booking) return;

    if (!schedules.length) {
      booking.innerHTML = '<div class="oh-setup">The booking calendar is not connected yet.</div>';
      return;
    }

    const panels = {};   // id -> panel element, built the first time its tab is opened
    const calNamespaces = [];

    function build(s) {
      const panel = document.createElement("div");
      panel.id = "oh-panel-" + s.id;
      booking.appendChild(panel);

      if (s.calLink) {
        if (!window.Cal) loadCal();
        const ns = "oh-" + s.id;
        panel.className = "oh-cal";
        Cal("init", ns, { origin: "https://cal.com" });
        Cal.ns[ns]("inline", {
          elementOrSelector: "#" + panel.id,
          calLink: s.calLink,
          config: { layout: "month_view", theme: siteTheme() }
        });
        Cal.ns[ns]("ui", calUi(siteTheme()));
        calNamespaces.push(ns);
      } else {
        // Google's booking page accepts ?gv=true to render the embeddable view.
        const u = s.google;
        panel.className = "oh-embed";
        const frame = document.createElement("iframe");
        frame.title = "Book an office hours slot";
        frame.src = u.includes("gv=true") ? u : u + (u.includes("?") ? "&" : "?") + "gv=true";
        panel.appendChild(frame);
      }
      return panel;
    }

    function select(s, pushHash) {
      if (!panels[s.id]) panels[s.id] = build(s);
      Object.keys(panels).forEach(id => { panels[id].hidden = id !== s.id; });
      if (where) where.textContent = s.where || "";
      if (link) link.href = s.calLink ? "https://cal.com/" + s.calLink : s.google;
      tabs.querySelectorAll(".oh-tab").forEach(b =>
        b.setAttribute("aria-selected", b.dataset.id === s.id ? "true" : "false"));
      if (pushHash) history.replaceState(null, "", "#" + s.id);
    }

    if (schedules.length > 1) {
      schedules.forEach(s => {
        const b = document.createElement("button");
        b.className = "oh-tab";
        b.type = "button";
        b.setAttribute("role", "tab");
        b.dataset.id = s.id;
        b.textContent = s.label;
        b.addEventListener("click", () => select(s, true));
        tabs.appendChild(b);
      });
      tabs.hidden = false;
    }

    // Deep link: /office-hours/api-209/#in-person opens that option directly.
    const fromHash = schedules.find(s => "#" + s.id === location.hash);
    select(fromHash || schedules[0], false);
    if (fallback) fallback.hidden = false;

    // Follow the site's light/dark toggle.
    let shownTheme = siteTheme();
    new MutationObserver(() => {
      const theme = siteTheme();
      if (theme === shownTheme) return;
      shownTheme = theme;
      calNamespaces.forEach(ns => Cal.ns[ns]("ui", calUi(theme)));
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  });
})();
