# Grocery-online-store
## Project Description
This project is a web page for displaying and adding product cards. It uses JavaScript to dynamically create HTML elements, manage data in localStorage, and handle events.
## Functionality
* **Displaying Products:** On page load, reads product data from localStorage and displays it as cards.
* **Adding a Product:** Clicking on an element with the `add_products` class creates a new product card based on the data from localStorage (the `card` key) and adds it to the page.
* **Removing a Product:** Each product card contains a delete icon. Clicking on this icon removes the card from the page and also removes the corresponding object from the products array in localStorage.
* **Saving Data:** Product data (an array of objects) is stored in localStorage under the `products` key. The product counter `counter` is also stored in localStorage to ensure unique identifiers.
## Usage
1. Clone the repository.
2. Open the `index.html` file in a browser.
3. Click on the element with the `add_products` class to add a new product card.
4. Click on the delete icon on the product card to delete it.
