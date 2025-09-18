const ul = document.querySelector("ul");

ul.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        // Get the color directly from computed style
        const color = getComputedStyle(e.target).backgroundColor;
        const DivBackground = document.querySelector(".background");
        DivBackground.style.backgroundColor = color;

        // Remove 'active' from all li elements
        const allLi = ul.querySelectorAll("li");
        allLi.forEach(li => li.classList.remove("active"));
        
        // Add 'active' to the clicked li
        e.target.classList.add("active");

       // Toggle on the clicked element only
    //     if(e.target.classList.contains("active")){
    //         e.target.classList.remove("active");
    //     } else {
    //         // Remove active from others
    //         ul.querySelectorAll("li").forEach(li => li.classList.remove("active"));
    //         // Add to clicked element
    //         e.target.classList.add("active");
    //     }
    
    localStorage.setItem("backgroundColor", color);

  }
});

// Helper function to mark the correct li as active
function setActiveLiByColor(color) {
    const allLi = document.querySelectorAll("li");
    allLi.forEach(li => {
        const liColor = getComputedStyle(li).backgroundColor;
        if (liColor === color) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem("backgroundColor");
    const DivBackground = document.querySelector(".background");
    
    if (savedColor) {
        // Apply the saved color
        DivBackground.style.backgroundColor = savedColor;
        
        // Mark the correct li as active
        setActiveLiByColor(savedColor);
    }
});