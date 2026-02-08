const themeToggle = document.getElementById("theme-toggle");
const floatingCta = document.getElementById("floating-cta");
const contactSection = document.getElementById("contact");
const languageSelect = document.getElementById("language");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = (isDark) => {
  document.body.classList.toggle("dark", isDark);
  themeToggle.querySelector(".toggle-label").textContent = isDark
    ? "Dark"
    : "Light";
};

setTheme(prefersDark.matches);

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
});

prefersDark.addEventListener("change", (event) => {
  if (!document.body.dataset.themeLocked) {
    setTheme(event.matches);
  }
});

themeToggle.addEventListener("click", () => {
  document.body.dataset.themeLocked = "true";
});

floatingCta.addEventListener("click", () => {
  contactSection.scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(
  ([entry]) => {
    floatingCta.classList.toggle("hidden", entry.isIntersecting);
  },
  { threshold: 0.4 }
);

observer.observe(contactSection);

languageSelect.addEventListener("change", () => {
  const selected = languageSelect.options[languageSelect.selectedIndex].text;
  languageSelect.blur();
  languageSelect.title = `${selected} selected`;
});
