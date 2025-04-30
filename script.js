let body = document.querySelector('body');

let products_div = document.createElement('div');
if (document.createElement('div')) {
    products_div.className = 'products';
    body.prepend(products_div);
}

let div_add_products = document.createElement('div');
if (document.createElement('div')) {
    div_add_products.className = 'add_products';
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
    products_div.prepend(prod_card_div);

    let card__image_div = document.createElement('div');
    card__image_div.className = 'card__image-block';
    prod_card_div.append(card__image_div);

    let card__image_img = document.createElement('img');
    card__image_img.className = 'card__image';
    card__image_img.src = product.image;
    card__image_div.append(card__image_img);

    let card__descript_div = document.createElement('div');
    card__descript_div.className = 'card__description';
    card__image_div.after(card__descript_div);

    let card__meta_div = document.createElement('div');
    card__meta_div.className = 'card__meta';
    card__descript_div.append(card__meta_div);

    let card__rating_div = document.createElement('div');
    card__rating_div.className = 'card__rating';
    card__rating_div.innerHTML = product.rating;
    card__meta_div.append(card__rating_div);

    let card__value_div = document.createElement('div');
    card__value_div.className = 'card__value';
    card__value_div.innerHTML = product.calorie;
    card__rating_div.after(card__value_div);

    let card__name_div = document.createElement('div');
    card__name_div.className = 'card__name';
    card__name_div.innerHTML = product.card_name;
    card__meta_div.after(card__name_div);

    let card__cost_div = document.createElement('div');
    card__cost_div.className = 'card__cost';
    card__cost_div.innerHTML = product.price;
    card__name_div.after(card__cost_div);

    
    let delete_icon = document.createElement('div');
    delete_icon.className = 'delete-icon';
    prod_card_div.append(delete_icon);

    delete_icon.addEventListener('click', function() {
        prod_card_div.remove();
        products = products.filter(test_product => test_product.counter !== product.counter);
        localStorage.setItem('products', JSON.stringify(products));
    });
};

div_add_products.addEventListener('click', function () {
    appendProducts(card);
    createProdcut(card);
});

window.onload = function () {
    if (products.length > 0) {
        products.forEach(product => {
            appendProducts(product);
        });
    }
};
