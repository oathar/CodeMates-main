document.addEventListener('DOMContentLoaded', (event) => { 
    // Set default date to current date
     const dateInput = document.getElementById('date'); const today = new Date().toISOString().split('T')[0]; dateInput.value = today; });

     
 //  document.getElementById('add-topic').addEventListener('click', addTopic); // Enable Enter key to submit form 
//  document.getElementById('topic').addEventListener('keydown', (event) => { if (event.key === 'Enter') { addTopic(); } });