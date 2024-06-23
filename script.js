document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress .progress-bar");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to the clicked link
      event.currentTarget.classList.add("active");

      // Update progress bar height
      const newHeight = event.currentTarget.getAttribute("data-progress");
      progressBar.style.height = `${newHeight}%`;
      progressBar.setAttribute("aria-valuenow", newHeight);
    });
  });
});

// Function to update progress bar based on which section is in view
function updateProgressBar() {
  // Get the about, career, and project section elements
  const sections = [
    { element: document.getElementById("about"), progress: 33 },
    { element: document.getElementById("career"), progress: 66 },
    { element: document.getElementById("project"), progress: 100 },
  ];

  for (const section of sections) {
    const rect = section.element.getBoundingClientRect();
    if (rect.top >= -400 && rect.bottom >= 0) {
      updateProgress(section.progress);
      activateNavLink(section.element.id);
      break;
    }
  }
}

// Function to add 'active' class to the relevant navigation link
function activateNavLink(sectionId) {
  // Remove 'active' class from all nav links
  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));

  // Add 'active' class to the relevant nav link
  const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// Function to update progress bar with a specified percentage
function updateProgress(percentage) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.height = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", percentage);
}

// Debounce function to limit the rate of execution of updateProgressBar()
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Attach debounced scroll event listener to monitor changes
const debouncedUpdateProgressBar = debounce(updateProgressBar, 200);
window.addEventListener("scroll", debouncedUpdateProgressBar);
