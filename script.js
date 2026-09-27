const nav = document.getElementById("nav");
const menuBtn = document.querySelector(".menu-btn");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a, .nav-cta").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("menu-open"));
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const start = performance.now();
    const duration = 1300;

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    observer.unobserve(counter);
  });
}, { threshold: 0.7 });

document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

if (window.matchMedia("(min-width: 1000px)").matches) {
  window.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });
}

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor?.style.setProperty("transform", "translate(-50%,-50%) scale(1.35)");
  });
  el.addEventListener("mouseleave", () => {
    cursor?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
  });
});
