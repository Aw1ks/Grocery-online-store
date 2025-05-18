let body = document.querySelector('body');
let products_div = document.createElement('div');

if (products_div) {
    products_div.className = 'products';
    body.prepend(products_div);
}

let div_add_products = document.createElement('div');
if (div_add_products) {
    div_add_products.className = 'products__add';
    products_div.append(div_add_products);

    let img_add = document.createElement('img');
    img_add.className = 'add';
    img_add.src = "media/add.svg";
    div_add_products.append(img_add);
}

localStorage.setItem('card', JSON.stringify({
    image: 'media/2.webp',
    rating: '4,94',
    calorie: '500 ккал.',
    card_name: 'Стейк',
    price: '450',
    counter: 0
}));

let locStor_card = localStorage.getItem('card');
let card = JSON.parse(locStor_card);
let products = JSON.parse(localStorage.getItem('products')) || [];
let product_counter = parseInt(localStorage.getItem('counter')) || 0;

console.log("Initial product counter:", product_counter);

function createProdcut(card) {
    product_counter++;
    localStorage.setItem('counter', product_counter);

    let new_product = {
        image: card.image,
        rating: card.rating,
        calorie: card.calorie,
        card_name: card.card_name,
        price: card.price,
        counter: product_counter
    };

    if (!products.some(test_product => test_product.counter === new_product.counter)) {
        products.push(new_product);
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function appendProducts(product) {
    let prod_card_div = document.createElement('div');
    prod_card_div.className = 'products__card';

    prod_card_div.innerHTML = `
        <div class="card__image-block">
            <img class="card__image" src="${product.image}" alt="Product Image">
        </div>
        <div class="card__description">
            <div class="card__meta">
                <div class="card__rating">${product.rating}</div>
                <div class="card__value">${product.calorie}</div>
            </div>
            <div class="card__name">${product.card_name}</div>
            <div class="card__cost">${product.price}</div>
        </div>
        <div class="delete-icon"></div>
    `;

    products_div.prepend(prod_card_div);

    let delete_icon = prod_card_div.querySelector('.delete-icon');
    delete_icon.addEventListener('click', function() {
        prod_card_div.remove();
        products = products.filter(test_product => test_product.counter !== product.counter);
        localStorage.setItem('products', JSON.stringify(products));
    });
}


let img_add = document.querySelector('.products__add img');

function hideImage() {
    // img_add.classList.add('hide');
    img_add.remove();
}


function createInput(labelText, inputClass, inputId) {
    let label = document.createElement('label');
    label.textContent = labelText;

    let input = document.createElement('input');
    input.type = 'text';
    input.classList.add('text-field', inputClass);
    input.id = inputId;
    input.required = true;

    label.appendChild(input);
    return label;
}


let presence_product_form = false;

div_add_products.addEventListener('click', function () {
    if (!presence_product_form) {

        let div_form_fields = document.createElement('div');
        div_form_fields.classList.add('form__fields');

        let form_add__form = document.createElement('form');
        form_add__form.classList.add('add__form');

        let image_form = createInput('Путь до изображения:', 'form__image-path', 'image-path');
        let rating_form = createInput('Оценка товара:', 'form__rating', 'rating');
        let value_form = createInput('Калорийность товара:', 'form__value', 'value');
        let name_form = createInput('Название товара:', 'form__name', 'name');
        let cost_form = createInput('Цена товара:', 'form__cost', 'cost');

        form_add__form.appendChild(image_form);
        form_add__form.appendChild(rating_form);
        form_add__form.appendChild(value_form);
        form_add__form.appendChild(name_form);
        form_add__form.appendChild(cost_form);

        let div_button_block = document.createElement('div');
        div_button_block.classList.add('button-block');

        let button_form__button = document.createElement('button');
        button_form__button.textContent = 'Отправить';
        button_form__button.classList.add('form__button');
        button_form__button.type = 'submit';

        div_button_block.appendChild(button_form__button);

        div_form_fields.appendChild(form_add__form);
        div_form_fields.appendChild(div_button_block);
        div_add_products.appendChild(div_form_fields)

        // appendProducts(card);
        // createProdcut(card);
        hideImage();
    }
    presence_product_form = true;
});



window.onload = function () {
    if (products.length > 0) {
        products.forEach(product => {
            appendProducts(product);
        });
    }
};
