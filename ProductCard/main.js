// Global variables
const productImages = [
    'image1.png',
    'image2.png', 
    'image3.png'
];

const basePrice = 15.00;

const sizePriceMultipliers = {
    'S': 1.0,
    'M': 1.0,
    'L': 1.1,
    'XL': 1.2,
    'XXL': 1.3
};

// Current product state
let currentState = {
    imageIndex: 1,
    size: 'M',
    color: 'green',
    quantity: 1
};

// Function to update price based on size and quantity
function updatePrice() {
    // Calculate new price based on size multiplier and quantity
    let updatedPrice = basePrice * sizePriceMultipliers[currentState.size] * currentState.quantity;
    console.log("Updated price:", updatedPrice);
    
    // Update price display in DOM with 2 decimal places
    document.getElementById("productPrice").textContent = "$" + updatedPrice.toFixed(2);
}

// Function to change product image
function changeImage(index) {
    // Update image src attribute (replace with actual image URLs)
    const imageElement = document.getElementById("productImage");
    imageElement.src = productImages[index];
    
    // Update current state
    currentState.imageIndex = index;
    
    // Update dot indicators
    updateImageDots(index);
}

// Function to update image dot indicators
function updateImageDots(activeIndex) {
    // Get all dot elements
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current dot
    if (dots[activeIndex]) {
        dots[activeIndex].classList.add('active');
    }
}

// Function to handle size selection
function handleSizeSelection() {
    // Get all size option elements
    const sizeOptions = document.querySelectorAll('.size-option');
    
    // Add click event to each size option
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all sizes
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update current state with selected size
            currentState.size = option.getAttribute('data-size');
            
            // Recalculate and update price
            updatePrice();
            
            console.log("Selected size:", currentState.size);
        });
    });
}

// Function to handle color selection
function handleColorSelection() {
    // Get all color option elements
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Add click event to each color option
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all colors
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update current state with selected color
            currentState.color = option.getAttribute('data-color');
            
            console.log("Selected color:", currentState.color);
            
            // Optional: Change image based on color
            // changeImageByColor(currentState.color);
        });
    });
}

// Function to handle quantity input
function handleQuantityChange() {
    // Get quantity input element
    const quantityInput = document.getElementById('quantityInput');
    
    // Add input event listener
    quantityInput.addEventListener('input', () => {
        // Get input value and convert to number
        let quantity = parseInt(quantityInput.value);
        
        // Validate quantity (between 1 and 10)
        if (quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        } else if (quantity > 10) {
            quantity = 10;
            quantityInput.value = 10;
        }
        
        // Update current state
        currentState.quantity = quantity;
        
        // Recalculate and update price
        updatePrice();
        
        console.log("Selected quantity:", currentState.quantity);
    });
}

// Function to handle image dot navigation
function handleImageDots() {
    // Get all dot elements
    const dots = document.querySelectorAll('.dot');
    
    // Add click event to each dot
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Get image index from data attribute
            const imageIndex = parseInt(dot.getAttribute('data-image'));
            
            // Change to selected image
            changeImage(imageIndex);
            
            console.log("Changed to image:", imageIndex);
        });
    });
}

// Function to handle buy button click
function handleBuyButton() {
    // Get buy button element
    const buyButton = document.getElementById('buyButton');
    
    // Add click event listener
    buyButton.addEventListener('click', () => {
        // Calculate final price
        const finalPrice = basePrice * sizePriceMultipliers[currentState.size] * currentState.quantity;
        
        // Create order summary
        const orderSummary = {
            size: currentState.size,
            color: currentState.color,
            quantity: currentState.quantity,
            unitPrice: basePrice,
            totalPrice: finalPrice.toFixed(2)
        };
        
        // Display order summary in console
        console.log("Order Summary:", orderSummary);
        
        // Optional: Display alert with order details
        alert(`Order Summary:
Size: ${orderSummary.size}
Color: ${orderSummary.color}
Quantity: ${orderSummary.quantity}
Total Price: $${orderSummary.totalPrice}`);
        
        // Optional: Add success animation
        buyButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buyButton.style.transform = 'scale(1)';
        }, 150);
    });
}

// Optional: Keyboard navigation for images
function handleKeyboardNavigation() {
    // Add keydown event to document
    document.addEventListener('keydown', (event) => {
        // Handle left arrow key (previous image)
        if (event.key === 'ArrowLeft') {
            let newIndex = currentState.imageIndex - 1;
            if (newIndex < 0) newIndex = productImages.length - 1;
            changeImage(newIndex);
        }
        
        // Handle right arrow key (next image)
        if (event.key === 'ArrowRight') {
            let newIndex = currentState.imageIndex + 1;
            if (newIndex >= productImages.length) newIndex = 0;
            changeImage(newIndex);
        }
    });
}

// Optional: Auto slideshow functionality
function startAutoSlideshow() {
    let slideshowInterval;
    const imageContainer = document.querySelector('.product-image-container');
    
    // Function to start slideshow
    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            let nextIndex = currentState.imageIndex + 1;
            if (nextIndex >= productImages.length) nextIndex = 0;
            changeImage(nextIndex);
        }, 3000); // Change image every 3 seconds
    }
    
    // Function to stop slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }
    
    // Pause slideshow on mouse enter
    imageContainer.addEventListener('mouseenter', stopSlideshow);
    
    // Resume slideshow on mouse leave
    imageContainer.addEventListener('mouseleave', startSlideshow);
    
    // Start initial slideshow
    startSlideshow();
}

// Main initialization function
function init() {
    // Initialize all event handlers
    handleSizeSelection();
    handleColorSelection();
    handleQuantityChange();
    handleImageDots();
    handleBuyButton();
    
    // Optional features
    handleKeyboardNavigation();
    // startAutoSlideshow(); // Uncomment to enable auto slideshow
    
    // Set initial price display
    updatePrice();
    
    console.log("Product card initialized successfully!");
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);