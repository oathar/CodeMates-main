document.getElementById("add-topic").addEventListener("click", 
  function() {
    const topicInput = document.getElementById("topic");
    const topic = topicInput.value;
    if (topic) {
      addTopicToSchedule(topic);
      topicInput.value = ""; // clear input field
    }
  });
  
  function addTopicToSchedule(topic) {
    // Get today's date and calculate spaced repetition dates
    const today = new Date();
    const nextReview1 = new Date(today);
    nextReview1.setDate(today.getDate() + 1); // 1 day later
    const nextReview2 = new Date(today);
    nextReview2.setDate(today.getDate() + 3); // 3 days later
    const nextReview3 = new Date(today);
    nextReview3.setDate(today.getDate() + 7); // 7 days later
  
    // Create list item for the schedule
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${topic}</strong><br>
      Review 1: ${nextReview1.toLocaleDateString()}<br>
      Review 2: ${nextReview2.toLocaleDateString()}<br>
      Review 3: ${nextReview3.toLocaleDateString()}
    `;
    
    document.getElementById("schedule-list").appendChild(listItem);
  }
  function openNewPage() {
      window.location.href = "newpage.html"; // Specify the new page's file name
    }