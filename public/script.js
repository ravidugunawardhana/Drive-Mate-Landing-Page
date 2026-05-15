const body = document.body;
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const sosButton = document.querySelector(".sos-core");
const pageLoader = document.querySelector(".page-loader");

body.classList.add("is-loading");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
    link.classList.add("is-active");

    body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

const syncHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

let hasFinishedInitialLoad = false;

const finishInitialLoad = () => {
  if (hasFinishedInitialLoad) {
    return;
  }

  hasFinishedInitialLoad = true;
  body.classList.remove("is-loading");
  body.classList.add("is-ready");

  if (!pageLoader) {
    return;
  }

  pageLoader.classList.add("is-hidden");
  window.setTimeout(() => {
    if (pageLoader.isConnected) {
      pageLoader.remove();
    }
  }, 800);
};

const queueInitialLoadFinish = (delay = 180) => {
  window.setTimeout(finishInitialLoad, delay);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  queueInitialLoadFinish();
} else {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      queueInitialLoadFinish();
    },
    { once: true }
  );
}

window.addEventListener(
  "load",
  () => {
    queueInitialLoadFinish(0);
  },
  { once: true }
);

window.addEventListener("pageshow", () => {
  queueInitialLoadFinish(0);
});

window.setTimeout(() => {
  queueInitialLoadFinish(0);
}, 1600);

if (!("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (sosButton) {
  sosButton.addEventListener("click", () => {
    sosButton.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.94)" },
        { transform: "scale(1.04)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 420,
        easing: "ease-out",
      }
    );
  });
}
