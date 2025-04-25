document.getElementById("apply-button").addEventListener("click", () => {
  const EXTENSION_ID = "your_extension_id";

  chrome.runtime.sendMessage(
    EXTENSION_ID,
    { action: "startAutoFill" },
    function (response) {
      if (chrome.runtime.lastError) {
        console.log("Extension not installed or disabled");
        return;
      }
      console.log("Auto-fill started");
    }
  );
});

document.getElementById("apply-button").addEventListener("click", async (e) => {
  e.preventDefault();

  const form = document.querySelector("form");
  const formData = new FormData(form);

  formData.append("platform", "jobslever");
  const jobRole = document.getElementById("jobrole").value;
  formData.append("job_role", jobRole);

  try {
    const response = await fetch("http://127.0.0.1:8000/apply/", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Application submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting application:", error);
  }
});
