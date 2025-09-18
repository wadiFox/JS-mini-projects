const btnCreate = document.getElementById("createNoteBtn");
const notesContainer = document.querySelector(".notes-container"); // Fixed: "contaiber" → "container"

// Function to save notes in localStorage
function saveNotes() {
  const notes = [];
  const noteElements = document.querySelectorAll('.notes-text');
  
  noteElements.forEach((note, index) => {
    // Get content without images
    let content = note.innerHTML;
    // Remove images from content before saving
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => img.remove());
    
    notes.push({
      id: index,
      content: tempDiv.innerHTML.trim() || "&nbsp;"
    });
  });
  
  localStorage.setItem('myNotes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem('myNotes');
  if (savedNotes) {
    const notes = JSON.parse(savedNotes);
    
    if (notes.length > 0) {
      // Hide empty state message
      const emptyState = document.getElementById("emptyState");
      if (emptyState) {
        emptyState.style.display = "none";
      }
      
      notes.forEach(noteData => {
        createNoteElement(noteData.content);
      });
    }
  }
}

// Function to create a note element
function createNoteElement(content = "&nbsp;") {
  let p = document.createElement("p");
  notesContainer.appendChild(p);
  
  p.classList.add("notes-text");
  p.setAttribute("contenteditable", "true");
  p.innerHTML = content;
  
  let deleteImg = document.createElement("img");
  deleteImg.src = "delete.png";
  deleteImg.style.cursor = "pointer";
  
  let cancelImg = document.createElement("img");
  cancelImg.src = "cancel.jpg";
  cancelImg.style.cursor = "pointer";
  cancelImg.classList.add("delete-text");
  
  p.appendChild(cancelImg);
  p.appendChild(deleteImg);
  
  // Events for this note
  cancelImg.addEventListener("click", () => {
    p.innerHTML = "&nbsp;";
    p.appendChild(cancelImg);
    p.appendChild(deleteImg);
    setCursorAtStart(p);
    saveNotes(); // Save after modification
  });

  deleteImg.addEventListener("click", () => {
    p.remove();
    let remainingNotes = document.querySelectorAll('.notes-container p');
    if (remainingNotes.length === 0) {
      document.getElementById("emptyState").style.display = "block";
    }
    saveNotes(); // Save after deletion
  });
  
  // Automatically save when user types
  p.addEventListener('input', () => {
    saveNotes();
  });
  
  return p;
}

// Utility function to position the cursor
function setCursorAtStart(element) {
  element.focus();
  let range = document.createRange();
  let selection = window.getSelection();
  range.setStart(element.firstChild, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

// Event to create a new note
btnCreate.addEventListener("click", () => {
  // Use the createNoteElement function
  const newNote = createNoteElement();
  
  // Position initial cursor
  setCursorAtStart(newNote);
  
  // Hide empty state message
  let emptyState = document.getElementById("emptyState");
  if (emptyState) {
    emptyState.style.display = "none";
  }
  
  // Save after creation
  saveNotes();
});

// Load notes when page starts
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
});