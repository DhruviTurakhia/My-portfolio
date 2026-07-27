const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const year = document.querySelector("[data-year]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeNavigation = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

if (year) year.textContent = new Date().getFullYear();

copyEmailButton?.addEventListener("click", async () => {
  const email = "turakhiadhruvi21@gmail.com";
  const originalLabel = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Email copied";
  } catch {
    window.location.href = `mailto:${email}`;
    copyEmailButton.textContent = "Open email";
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = originalLabel;
  }, 1800);
});
