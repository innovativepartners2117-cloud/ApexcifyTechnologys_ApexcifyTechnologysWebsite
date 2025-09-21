document.getElementById("yr").textContent = new Date().getFullYear();

const hamburger = document.getElementById("hamburger");
const links = document.getElementById("navLinks");
hamburger.addEventListener("click", () => links.classList.toggle("open"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const filterBtns = document.querySelectorAll('.filters [data-filter]');
const items = [...document.querySelectorAll(".gallery .item")];
let activeFilter = "all";

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    items.forEach((it) => {
      const show = activeFilter === "all" || it.dataset.category === activeFilter;
      it.style.display = show ? "block" : "none";
    });
  })
);

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const closeBtn = document.getElementById("close");

let visibleItems = items;
let index = 0;

function updateVisible() {
  visibleItems = items.filter(
    (it) => activeFilter === "all" || it.dataset.category === activeFilter
  );
}

function openLightbox(i) {
  updateVisible();
  index = i;
  const el = visibleItems[index];
  const img = el.querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = img.alt;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

function nav(delta) {
  updateVisible();
  index = (index + delta + visibleItems.length) % visibleItems.length;
  const el = visibleItems[index];
  const img = el.querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = img.alt;
}

items.forEach((el, i) => {
  el.addEventListener("click", () => {
    updateVisible();
    const actualIndex = visibleItems.indexOf(el);
    openLightbox(actualIndex > -1 ? actualIndex : i);
  });
});

next.addEventListener("click", () => nav(1));
prev.addEventListener("click", () => nav(-1));
closeBtn.addEventListener("click", closeLightbox);

lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});

window.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nav(1);
  if (e.key === "ArrowLeft") nav(-1);
});

const slides = [...document.querySelectorAll(".slide")];
let si = 0;

function showSlide(n) {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === n));
}

document.getElementById("tNext").addEventListener("click", () => {
  si = (si + 1) % slides.length;
  showSlide(si);
});

document.getElementById("tPrev").addEventListener("click", () => {
  si = (si - 1 + slides.length) % slides.length;
  showSlide(si);
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks! We'll get back to you shortly.");
  this.reset();
});
