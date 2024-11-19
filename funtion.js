// Obtenemos referencias a los elementos del DOM
const form = document.getElementById('product-form'); // Formulario para agregar productos
const gallery = document.getElementById('gallery'); // Galería donde se mostrarán los productos
const productNameInput = document.getElementById('product-name'); // Input del nombre del producto
const productPriceInput = document.getElementById('product-price'); // Input del precio del producto
const productUrlInput = document.getElementById('product-url'); // Input de la URL de la imagen
const productImageInput = document.getElementById('product-image'); // Input para subir imagen local

// Crear un elemento para mostrar el total de precios
const totalPriceElement = document.createElement('div');
totalPriceElement.id = 'total-price'; // Asignamos un ID para estilizar
totalPriceElement.textContent = 'Total: $0'; // Texto inicial
gallery.parentNode.appendChild(totalPriceElement); // Lo agregamos al DOM debajo de la galería

// Inicializamos el total de precios en 0
let totalPrice = 0;

// Escuchar el envío del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    // Obtener los valores ingresados por el usuario
    const name = productNameInput.value.trim(); // Nombre del producto
    const price = parseFloat(productPriceInput.value); // Precio del producto
    const url = productUrlInput.value.trim(); // URL de la imagen
    const file = productImageInput.files[0]; // Archivo local si se subió uno

    // Validar que el precio sea un valor positivo y no contenga letras ni caracteres especiales
    if (isNaN(price) || price <= 0) {
        alert('Por favor, ingrese un precio válido (número positivo).'); // Alerta si el precio no es válido
        return; // Salir de la función si el precio no es válido
    }

    // Validar que al menos una imagen se haya proporcionado (URL o archivo local)
    if (!url && !file) {
        alert('Por favor, proporcione una URL de imagen o cargue un archivo de imagen.'); // Alerta si no se proporcionó imagen
        return; // Salir de la función si no se proporciona imagen
    }

    // Crear un objeto que represente al producto
    const product = {
        name, // Nombre del producto
        price, // Precio del producto
        image: file ? URL.createObjectURL(file) : url, // Usar imagen local si existe, si no usar la URL proporcionada
        url, // Guardar la URL para abrir en nueva pestaña
    };

    // Agregar el producto a la galería
    addProductToGallery(product);

    // Actualizar el total de precios
    updateTotalPrice(price);

    // Limpiar el formulario para la próxima entrada
    clearForm();
});

// Función para agregar un producto a la galería
function addProductToGallery(product) {
    // Crear un contenedor para el producto
    const card = document.createElement('div');
    card.classList.add('product-card'); // Clase para aplicar los estilos

    // Crear la imagen del producto
    const img = document.createElement('img');
    img.src = product.image; // Establecer la fuente de la imagen
    img.alt = product.name; // Texto alternativo para la imagen
    img.addEventListener('click', () => {
        if (product.url) {
            window.open(product.url, '_blank'); // Abrir la URL en una nueva pestaña si existe
        }
    });
    card.appendChild(img); // Agregar la imagen al contenedor del producto

    // Crear un elemento para el nombre del producto
    const nameElement = document.createElement('p');
    nameElement.textContent = product.name; // Mostrar el nombre del producto
    card.appendChild(nameElement); // Agregar el nombre al contenedor

    // Crear un elemento para el precio del producto
    const priceElement = document.createElement('p');
    priceElement.textContent = `$${product.price.toFixed(2)}`; // Mostrar el precio con dos decimales
    card.appendChild(priceElement); // Agregar el precio al contenedor

    // Crear un botón para eliminar el producto
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>'; // Ícono de papelera de Font Awesome
    deleteBtn.classList.add('delete-btn'); // Clase para aplicar los estilos
    deleteBtn.addEventListener('click', () => {
        // Restar el precio del producto del total
        updateTotalPrice(-product.price);
        // Eliminar el contenedor del producto de la galería
        gallery.removeChild(card);
    });
    card.appendChild(deleteBtn); // Agregar el botón de eliminar al contenedor

    // Agregar el contenedor del producto a la galería
    gallery.appendChild(card);
}

// Función para actualizar el total de precios
function updateTotalPrice(amount) {
    totalPrice += amount; // Sumar o restar el precio al total
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`; // Actualizar el texto del total
}

// Función para limpiar el formulario después de agregar un producto
function clearForm() {
    productNameInput.value = ''; // Limpiar el campo del nombre del producto
    productPriceInput.value = ''; // Limpiar el campo del precio
    productUrlInput.value = ''; // Limpiar el campo de la URL
    productImageInput.value = ''; // Limpiar el campo de imagen local
}
