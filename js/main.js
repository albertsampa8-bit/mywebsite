const projectList = document.getElementById("project-list");
const projectSearch = document.getElementById("project-search");
const projectReset = document.getElementById("project-reset");
const projectResults = document.getElementById("project-results");
const projectEmpty = document.getElementById("project-empty");

// Keep the project list useful by showing only cards that match the search.
function filterProjects() {
  const query = projectSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  for (const card of projectList.querySelectorAll(".project-card")) {
    const matches = card.textContent.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  }

  projectResults.textContent = query
    ? `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} found.`
    : `Showing all ${visibleCount} projects.`;
  projectEmpty.hidden = visibleCount !== 0;
}

projectSearch.addEventListener("input", filterProjects);
projectReset.addEventListener("click", () => {
  projectSearch.value = "";
  filterProjects();
  projectSearch.focus();
});
filterProjects();

// Expand each project's extra details and keep its button state in sync.
for (const button of document.querySelectorAll(".details-toggle")) {
  const details = document.getElementById(button.getAttribute("aria-controls"));
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Show details" : "Hide details";
    details.hidden = expanded;
  });
}

const galleryPhotos = [
  {
    src: "../../images/photo2.jpg",
    alt: "Green vegetables growing in a garden",
    caption: "A view of my garden vegetables"
  },
  {
    src: "../../images/photo3.jpg",
    alt: "An open book and handwritten notes on a study desk",
    caption: "A study afternoon: coding under a quiet clear sky"
  },
  {
    src: "../../images/photo5.jpg",
    alt: "Books and papers arranged on a desk beside a plant",
    caption: "My favorite place to calm my mind and relax"
  }
];
const galleryImage = document.getElementById("gallery-image");
const galleryCaption = document.getElementById("gallery-caption");
const galleryPosition = document.getElementById("gallery-position");
const galleryPrevious = document.getElementById("gallery-previous");
const galleryNext = document.getElementById("gallery-next");
let galleryIndex = 0;

// Update the displayed photo and disable navigation at either end.
function showGalleryPhoto(index) {
  galleryIndex = index;
  const photo = galleryPhotos[galleryIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;
  galleryPosition.textContent = `Photo ${galleryIndex + 1} of ${galleryPhotos.length}`;
  galleryPrevious.disabled = galleryIndex === 0;
  galleryNext.disabled = galleryIndex === galleryPhotos.length - 1;
}

galleryPrevious.addEventListener("click", () => showGalleryPhoto(galleryIndex - 1));
galleryNext.addEventListener("click", () => showGalleryPhoto(galleryIndex + 1));

const contactForm = document.getElementById("contact-form");
const contactFields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  topic: document.getElementById("topic"),
  message: document.getElementById("message")
};
const contactPreview = document.getElementById("contact-preview");
const formStatus = document.getElementById("form-status");

function setFieldError(fieldName, message) {
  const field = contactFields[fieldName];
  const error = document.getElementById(`${fieldName}-error`);
  error.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

// Validate locally, then render a safe text-only preview without submitting.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactPreview.hidden = true;

  const name = contactFields.name.value.trim();
  const email = contactFields.email.value.trim();
  const topic = contactFields.topic.value.trim();
  const message = contactFields.message.value.trim();
  const errors = {
    name: name ? "" : "Enter your name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Enter a valid email address, such as name@example.com.",
    message: message ? "" : "Enter a message before previewing."
  };

  for (const [fieldName, error] of Object.entries(errors)) {
    setFieldError(fieldName, error);
  }

  const invalidField = Object.keys(errors).find((fieldName) => errors[fieldName]);
  if (invalidField) {
    formStatus.textContent = "Please correct the highlighted fields.";
    contactFields[invalidField].focus();
    return;
  }

  document.getElementById("preview-name").textContent = `Name: ${name}`;
  document.getElementById("preview-email").textContent = `Email: ${email}`;
  document.getElementById("preview-topic").textContent = `Topic: ${topic || "Not provided"}`;
  document.getElementById("preview-message").textContent = `Message: ${message}`;
  contactPreview.hidden = false;
  formStatus.textContent = "Your form data was validated successfully.";
});

for (const fieldName of ["name", "email", "message"]) {
  contactFields[fieldName].addEventListener("input", () => {
    setFieldError(fieldName, "");
    formStatus.textContent = "";
    contactPreview.hidden = true;
  });
}

const mediaInputs = [
  { input: "video-file", player: "intro-video", status: "video-status" },
  { input: "audio-file", player: "intro-audio", status: "audio-status" }
];

for (const item of mediaInputs) {
  const input = document.getElementById(item.input);
  const player = document.getElementById(item.player);
  const status = document.getElementById(item.status);
  let currentUrl;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(file);
    player.src = currentUrl;
    status.textContent = `${file.name} is ready to play.`;
  });
}
