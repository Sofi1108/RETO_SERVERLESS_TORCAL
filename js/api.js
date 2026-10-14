const API_URL =
  "https://ls1vaxu1c9.execute-api.us-east-1.amazonaws.com/dev";

const form = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const statusMessage = document.querySelector(".form-status");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#ff9b71" : "var(--cyan)";
}

function isFormValid() {
  if (!nameInput.value.trim()) {
    setStatus("Escribe tu nombre para continuar.", true);
    nameInput.focus();
    return false;
  }

  if (!emailInput.validity.valid) {
    setStatus("Introduce un email válido para continuar.", true);
    emailInput.focus();
    return false;
  }

  return true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isFormValid()) {
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  setStatus("Enviando tu contacto...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo enviar el formulario.");
    }

    setStatus(
      result.message ||
        `Gracias, ${nameInput.value.trim()}. Te escribiremos muy pronto.`,
    );
    form.reset();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    setStatus(
      "No hemos podido enviar tus datos. Inténtalo de nuevo en unos segundos.",
      true,
    );
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
  }
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});
