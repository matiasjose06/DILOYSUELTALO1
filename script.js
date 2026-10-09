const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const commentText = document.getElementById("commentText");
const charCount = document.getElementById("charCount");
const commentForm = document.getElementById("commentForm");
const postList = document.getElementById("postList");
const postCount = document.getElementById("postCount");
const formMessage = document.getElementById("formMessage");
let sessionPosts = 0;

commentText.addEventListener("input", () => {
  charCount.textContent = `${commentText.value.length}/500`;
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

commentForm.addEventListener("submit", event => {
  event.preventDefault();
  const rawText = commentText.value.trim();
  if (!rawText) {
    formMessage.textContent = "Escribe algo antes de publicar.";
    return;
  }

  const nickname = document.getElementById("nickname").value.trim() || "Anónimo";
  const category = document.getElementById("category").value;
  const safeName = escapeHTML(nickname);
  const safeCategory = escapeHTML(category);
  const safeText = escapeHTML(rawText).replace(/\n/g, "<br>");
  const initial = escapeHTML((nickname.trim()[0] || "A").toUpperCase());

  const article = document.createElement("article");
  article.className = "post-card";
  article.innerHTML = `
    <div class="post-avatar">${initial}</div>
    <div>
      <div class="post-meta"><strong>${safeName}</strong><span>Ahora · ${safeCategory}</span></div>
      <p>${safeText}</p>
      <span class="post-tag">#DiloYSuéltalo</span>
    </div>`;
  postList.prepend(article);
  sessionPosts += 1;
  postCount.textContent = String(sessionPosts);
  commentForm.reset();
  charCount.textContent = "0/500";
  formMessage.textContent = "¡Tu comentario se agregó a esta demostración!";
});

const moodButton = document.getElementById("moodButton");
const moodColor = document.getElementById("moodColor");
const moodResult = document.getElementById("moodResult");
moodButton.addEventListener("click", () => {
  if (!moodColor.value) {
    moodResult.textContent = "Elige una opción para completar la dinámica.";
    return;
  }
  const selected = moodColor.options[moodColor.selectedIndex].text;
  moodResult.textContent = `Hoy elijo: ${selected}. Me doy permiso para reconocer cómo me siento.`;
});
