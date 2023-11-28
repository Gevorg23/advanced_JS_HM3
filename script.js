document.addEventListener('DOMContentLoaded', function () {
    // Вызывается при загрузке страницы
    loadProductList();
    loadReviews();
});

// Функция для добавления отзыва
function addReview() {
    // Получение значений из полей ввода
    const productName = document.getElementById('productName').value;
    const reviewText = document.getElementById('reviewText').value;

    // Проверка наличия введенных данных
    if (productName && reviewText) {
        // Получение текущих отзывов из LocalStorage или создание нового объекта
        let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        reviews[productName] = reviews[productName] || [];
        // Добавление нового отзыва
        reviews[productName].push(reviewText);
        // Сохранение отзывов в LocalStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Перезагрузка отзывов на странице
        loadReviews();
    } else {
        // Вывод предупреждения, если не все поля заполнены
        alert('Пожалуйста, заполните все поля.');
    }
}

// Функция для загрузки списка продуктов с отзывами
function loadProductList() {
    // Получение элемента списка продуктов
    const productList = document.getElementById('productList');
    // Получение текущих отзывов из LocalStorage или создание нового объекта
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

    // Очистка списка продуктов
    productList.innerHTML = '';
    // Перебор продуктов и добавление их в список
    for (const product in reviews) {
        const listItem = document.createElement('li');
        listItem.className = 'product-item';
        // Добавление ссылки на продукт с обработчиком клика
        listItem.innerHTML = `<a href="#" onclick="showReviews('${product}')">${product}</a>`;
        productList.appendChild(listItem);
    }
}

// Функция для загрузки отзывов
function loadReviews() {
    // Получение контейнера для отзывов
    const reviewsContainer = document.getElementById('reviewsContainer');
    // Получение текущих отзывов из LocalStorage или создание нового объекта
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

    // Очистка контейнера
    reviewsContainer.innerHTML = '';
    // Перебор продуктов и отзывов
    for (const product in reviews) {
        // Создание списка отзывов для каждого продукта
        const reviewsList = document.createElement('ul');
        reviewsList.className = 'review-list';

        // Перебор отзывов и добавление их в список
        reviews[product].forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${review} <span class="delete-btn" onclick="deleteReview('${product}', '${review}')">Удалить</span>`;
            reviewsList.appendChild(listItem);
        });

        // Создание контейнера для продукта и его отзывов
        const productContainer = document.createElement('div');
        productContainer.className = 'product-container';
        productContainer.innerHTML = `<h3>${product}</h3>`;
        productContainer.appendChild(reviewsList);

        // Добавление контейнера в общий контейнер
        reviewsContainer.appendChild(productContainer);
    }
}

// Функция для отображения отзывов по выбранному продукту
function showReviews(product) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const reviewsList = document.getElementById('reviewsContainer');

    // Очистка контейнера
    reviewsList.innerHTML = '';
    const reviewsArray = reviews[product] || [];
    const reviewsListElement = document.createElement('ul');

    // Перебор отзывов и добавление их в список
    reviewsArray.forEach(review => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${review} <span class="delete-btn" onclick="deleteReview('${product}', '${review}')">Удалить</span>`;
        reviewsListElement.appendChild(listItem);
    });

    // Добавление списка отзывов в контейнер
    reviewsList.appendChild(reviewsListElement);
}

// Функция для удаления отзыва
function deleteReview(product, review) {
    // Получение текущих отзывов из LocalStorage или создание нового объекта
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    // Удаление отзыва из массива
    reviews[product] = reviews[product].filter(r => r !== review);
    // Удаление продукта, если отзывов больше нет
    if (reviews[product].length === 0) {
        delete reviews[product];
    }
    // Сохранение отзывов в LocalStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Перезагрузка списка продуктов и отзывов
    loadProductList();
    loadReviews();
}
