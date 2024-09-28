// Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return (this.mytitle);
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

// Function to toggle row highlight and manage column visibility
function toggleRowHighlight() {
  const selectedRows = document.querySelectorAll('.row-check:checked');
  const deleteColumnHeaders = document.querySelectorAll('.delete-column');
  const editColumnHeaders = document.querySelectorAll('.edit-column');

  // Highlight selected rows and remove highlight from non-selected rows
  selectedRows.forEach(row => {
      row.closest('tr').style.backgroundColor = 'yellow';
  });
  
  const nonSelectedRows = document.querySelectorAll('.row-check:not(:checked)');
  nonSelectedRows.forEach(row => {
      row.closest('tr').style.backgroundColor = '';
  });

  // Show the delete and edit columns if any row is selected, otherwise hide them
  if (selectedRows.length > 0) {
      deleteColumnHeaders.forEach(th => th.style.display = '');
      editColumnHeaders.forEach(th => th.style.display = '');
  } else {
      deleteColumnHeaders.forEach(th => th.style.display = 'none');
      editColumnHeaders.forEach(th => th.style.display = 'none');
  }

  // Enable or disable the submit button based on selection
  const submitButton = document.getElementById('button');
  submitButton.disabled = selectedRows.length === 0; // Disable if no checkboxes are checked
  submitButton.style.backgroundColor = submitButton.disabled ? 'lightgray' : ''; // Change background color based on the disabled state
  submitButton.style.borderColor = submitButton.disabled ? 'lightgray' : '';
}

// Function to handle row deletion with confirmation
function handleDelete(e) {
  if (confirm('Are you sure you want to delete this row?')) {
      const row = e.target.closest('tr');
      const dropdownRow = row.nextElementSibling; // Assuming dropdown row follows immediately
      row.remove();
      dropdownRow.remove();
      toggleRowHighlight(); // Update column visibility and button state
  }
}

// Function to handle editing via alert
function handleEdit(e) {
  const row = e.target.closest('tr');
  const studentName = row.cells[1].textContent; // Get the student name from the second cell
 
  // Use a single prompt to collect all the needed data as a string
  const editMessage = `
   Edit details of ${studentName}:\n`;

  const userInput = prompt(editMessage);

  alert(`${studentName} data updated successfully`);
      
}

// Function to toggle dropdown visibility
function toggleDropdown(e) {
  const row = e.target.closest('tr');
  const dropdownRow = row.nextElementSibling;
  if (dropdownRow.style.display === 'none') {
      dropdownRow.style.display = 'table-row';
  } else {
      dropdownRow.style.display = 'none';
  }
}


let studentCounter = 1;

// Function to add a new dummy student row
function addNewStudent() {
  const table = document.querySelector('#myTable tbody');
  const studentNum = studentCounter; // Use the counter value for student number
  const teacherNum = studentCounter; // Assuming Teacher numbering is also sequential
  const newRow = `
  <tr>
      <td><input type="checkbox" class="row-check" /><br /><br /><img src="down.png" class="toggle-dropdown" width="25px" /></td>
      <td>Student ${studentNum}</td>
      <td>Teacher ${teacherNum}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${10000 + studentNum}</td>
      <td>100%</td>
      <td class="delete-column" style="display: none;"><button class="delete-btn">Delete</button></td>
      <td class="edit-column" style="display: none;"><button class="edit-btn">Edit</button></td>
  </tr>
  <tr class="dropDownTextArea" style="display: none;"><td colspan="10">
      Advisor:<br /><br />
      Award Details<br />
      Summer 1-2014(TA)<br />
      Budget Number: <br />
      Tuition Number: <br />
      Comments:<br /><br /><br />
      Award Status:<br /><br /><br />
  </td></tr>`;

  table.insertAdjacentHTML('beforeend', newRow);
  alert(`Added new record for Student ${studentNum}`);

  studentCounter++; // Increment counter for the next student

  attachEventListeners(); // Reattach event listeners for the new row
}


// Attach event listeners for delete and edit buttons
function attachEventListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
      button.addEventListener('click', handleDelete);
  });

  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
      button.addEventListener('click', handleEdit);
  });

  const checkboxes = document.querySelectorAll('.row-check');
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', toggleRowHighlight);
  });

  const toggleDropdowns = document.querySelectorAll('.toggle-dropdown');
  toggleDropdowns.forEach(icon => {
      icon.addEventListener('click', toggleDropdown);
  });
}

// Hide dropdowns on initial load
function hideDropdownsOnLoad() {
  const dropdowns = document.querySelectorAll('.dropDownTextArea');
  dropdowns.forEach(row => {
      row.style.display = 'none'; // Collapse all dropdowns initially
  });
}

// Initial setup on page load
hideDropdownsOnLoad();
attachEventListeners();

// Event listener for the "Add New Student" button
document.getElementById('add').addEventListener('click', addNewStudent);
