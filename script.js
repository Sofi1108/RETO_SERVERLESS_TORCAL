const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");

  if (!name.value.trim() || !email.validity.valid) {
    status.textContent = "Completa tu nombre y un email válido para continuar.";
    status.style.color = "#ff9b71";
    if (!name.value.trim()) name.focus();
    else email.focus();
    return;
  }

  status.textContent = `Gracias, ${name.value.trim()}. Te escribiremos muy pronto.`;
  status.style.color = "var(--cyan)";
  form.reset();
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });
});
