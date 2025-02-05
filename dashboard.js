// frontend/dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    // Initialize DOM elements
    const productSelect = document.getElementById('productSelect');
    const priceInput = document.getElementById('priceInput');
    const generateLinkButton = document.getElementById('generateLinkButton');
    const uncategorizedButton = document.getElementById('uncategorizedButton');
    const saleLinkContainer = document.getElementById('saleLinkContainer');

    // Handle product selection and price input
    productSelect.addEventListener('change', updatePriceInput);
    priceInput.addEventListener('input', updatePricePreview);

    // Handle generating a custom link
    generateLinkButton.addEventListener('click', function () {
        const productId = productSelect.value;
        const price = priceInput.value;
        generateSaleLink(productId, price);
    });

    // Handle uncategorized sale
    uncategorizedButton.addEventListener('click', function () {
        const customPrice = prompt("Enter custom price for uncategorized item:");
        if (customPrice) {
            generateSaleLink('uncategorized', customPrice);
        }
    });

    // Update price preview when product is selected
    function updatePriceInput() {
        const selectedProduct = productSelect.value;
        // Fetch price from the backend or set a default price (this part can be dynamic)
        const defaultPrice = selectedProduct === 'uncategorized' ? 0 : 100; // Placeholder price
        priceInput.value = defaultPrice;
        updatePricePreview();
    }

    // Show price preview as user types
    function updatePricePreview() {
        const previewContainer = document.getElementById('pricePreview');
        previewContainer.textContent = `Price: $${priceInput.value}`;
    }

    // Generate a link for customers to purchase the product
    function generateSaleLink(productId, price) {
        const link = `/purchase/${productId}?price=${price}`;
        saleLinkContainer.innerHTML = `<a href="${link}" target="_blank">Click here to buy the product for $${price}</a>`;
    }
});
