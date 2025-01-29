// Function to update UTC Time dynamically
function updateTime() {
    const utcTimeElement = document.querySelector("[data-testid='currentTimeUTC']");
    const now = new Date();
    utcTimeElement.textContent = `UTC Time: ${now.toUTCString()}`;
}

// Update time on page load
updateTime();
