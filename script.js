let body = document.querySelector('body');
let products_div = document.querySelector('.products');

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


function createModal() {
    let modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.classList.add('show');
    
    let modalTitle = document.createElement('div');
    modalTitle.className = 'modal__title';
    modalTitle.textContent = 'Вы уверены, что хотите удалить товар?';
    modal.appendChild(modalTitle);
    
    let modalButtons = document.createElement('div');
    modalButtons.className = 'modal__buttons';
    modal.appendChild(modalButtons);
    
    let yesButton = document.createElement('button');
    yesButton.id = 'yes';
    yesButton.className = 'modal__button';
    yesButton.textContent = 'Да';
    modalButtons.appendChild(yesButton);
    
    let noButton = document.createElement('button');
    noButton.id = 'no';
    noButton.className = 'modal__button';
    noButton.textContent = 'Нет';
    modalButtons.appendChild(noButton);
    
    return modal;
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
        <button class="card__delete"></button>
    `;
    
    products_div.prepend(prod_card_div);
    
    let delete_icon = prod_card_div.querySelector('.card__delete');
    delete_icon.addEventListener('click', function() {
        let modal = createModal();
        body.appendChild(modal);
        
        modal.classList.add('active');
        
        document.getElementById('yes').addEventListener('click', function() {
            modal.classList.remove('active');
            modal.classList.add('closed');
            
            modal.addEventListener('animationend', function() {
                prod_card_div.remove();
                products = products.filter(test_product => test_product.counter !== product.counter);
                localStorage.setItem('products', JSON.stringify(products));
                modal.remove();
                
                setTimeout(function() {
                    location.reload(); 
                }, 600); 
            }, { once: true });
        });

        document.getElementById('no').addEventListener('click', function() {
            modal.classList.remove('active');
            modal.classList.add('closed');
            
            modal.addEventListener('animationend', function() {
                modal.remove();
            }, { once: true });
        });
    });
}


let div_add_products = document.querySelector('.products__add');

div_add_products.addEventListener('click', function () {
    let img_add = document.querySelector('.products__add img');
    img_add.classList.add('hide');

    let div_form__fields = document.querySelector('.form__fields');
    div_form__fields.classList.add('show');
    
    let button_form__button = document.querySelector('.form__button');
    button_form__button.addEventListener('click', function (event) {
        event.preventDefault();

        let form_add__form = document.querySelector('.add__form');
        if (form_add__form.checkValidity()) {
            let image = document.getElementById('image-path').value;
            let rating = document.getElementById('rating').value;
            let calorie = document.getElementById('value').value;
            let card_name = document.getElementById('name').value;
            let price = document.getElementById('cost').value;

            let newCard = {
                image: image,
                rating: rating,
                calorie: calorie,
                card_name: card_name,
                price: price,
            };

            appendProducts(newCard);
            createProdcut(newCard);

            location.reload()
        } else {
            alert('Заполните все поля');
        }
    });
}, { once: true });


window.onload = function () {
    if (products.length > 0) {
        products.forEach(product => {
            appendProducts(product);
        });
    }
};
