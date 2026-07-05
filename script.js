// ================= Pricing data =================

const PRICING = {
  iphone: [
    { name: "Screen Replacement", sub: "iPhone 11 — 15 series", price: 119 },
    { name: "Battery Replacement", sub: "Genuine-quality cell", price: 79 },
    { name: "Charge Port Repair", sub: "Clean, repair or replace", price: 89 },
    { name: "Rear Camera Repair", sub: "Module replacement", price: 109 },
    { name: "Back Glass Repair", sub: "Laser removal & refit", price: 99 },
    { name: "Water Damage Treatment", sub: "Ultrasonic clean & assess", price: 89 },
  ],
  samsung: [
    { name: "Screen Replacement", sub: "Galaxy S & A series", price: 139 },
    { name: "Battery Replacement", sub: "Genuine-quality cell", price: 89 },
    { name: "Charge Port Repair", sub: "Clean, repair or replace", price: 89 },
    { name: "Rear Camera Repair", sub: "Module replacement", price: 119 },
    { name: "Back Glass Repair", sub: "Removal & refit", price: 89 },
    { name: "Water Damage Treatment", sub: "Ultrasonic clean & assess", price: 89 },
  ],
  ipad: [
    { name: "Glass & Screen Replacement", sub: "iPad & Android tablets", price: 129 },
    { name: "Battery Replacement", sub: "Genuine-quality cell", price: 99 },
    { name: "Charge Port Repair", sub: "Clean, repair or replace", price: 99 },
    { name: "Camera Repair", sub: "Front or rear module", price: 109 },
    { name: "Button & Sensor Repair", sub: "Home, power & volume", price: 89 },
    { name: "Water Damage Treatment", sub: "Ultrasonic clean & assess", price: 99 },
  ],
  laptop: [
    { name: "Screen Replacement", sub: "MacBook & Windows laptops", price: 189 },
    { name: "Battery Replacement", sub: "Genuine-quality cell", price: 129 },
    { name: "Keyboard Replacement", sub: "Full keyboard or keys", price: 119 },
    { name: "Charge Port / DC Jack", sub: "Repair or replace", price: 109 },
    { name: "SSD Upgrade & Data Transfer", sub: "Speed up an old machine", price: 99 },
    { name: "Water Damage Treatment", sub: "Board-level clean & assess", price: 119 },
  ],
};

const priceList = document.getElementById("priceList");
const tabs = document.querySelectorAll(".price-tab");

function renderPrices(key) {
  priceList.innerHTML = PRICING[key]
    .map(
      (item) => `
      <div class="price-row">
        <div class="price-info">
          <h3>${item.name}</h3>
          <p>${item.sub}</p>
        </div>
        <div class="price-side">
          <span class="price-amount"><span class="from">from</span><span class="value">$${item.price}</span></span>
          <a class="price-cta" href="#quote">Get quote &rarr;</a>
        </div>
      </div>`
    )
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderPrices(tab.dataset.tab);
  });
});

renderPrices("iphone");

// ================= Quote form =================

const quoteForm = document.getElementById("quoteForm");
const formSuccess = document.getElementById("formSuccess");

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return;
  }

  const name = document.getElementById("qName").value.trim();
  const phone = document.getElementById("qPhone").value.trim();
  const device = document.getElementById("qDevice").value;
  const issue = document.getElementById("qIssue").value.trim();

  // No backend yet — open the user's mail client with the quote pre-filled
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nDevice: ${device}\n\nIssue:\n${issue}`
  );
  window.location.href = `mailto:ifixit2u@gmail.com?subject=${encodeURIComponent(
    `Free quote request — ${device}`
  )}&body=${body}`;

  formSuccess.hidden = false;
  quoteForm.reset();
});

// ================= Mobile nav =================

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});

mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  })
);

// ================= Scroll reveal =================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
