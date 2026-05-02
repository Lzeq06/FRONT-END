// ─── 1. NAVBAR — Hide/Show on Scroll ─────────────────────────

const nav = document.querySelector('nav');

let lastScroll = 0; // stores the last scroll position for comparison

window.addEventListener('scroll', () => {

    const currentScroll = window.scrollY; // current scroll position in pixels

    if (currentScroll > lastScroll && currentScroll > 80) {
        // user scrolled DOWN and is past the navbar height
        nav.style.transform = 'translateY(-100%)'; // push nav up, out of view
        nav.style.transition = 'transform 0.4s ease';
    } else {
        // user scrolled UP — bring the nav back
        nav.style.transform = 'translateY(0)';
        nav.style.transition = 'transform 0.4s ease';
    }

    lastScroll = currentScroll; // update last position for the next scroll event

});


// ─── 2. SCROLL REVEAL — Elements animate in when visible ──────

const revealElements = document.querySelectorAll('.reveal');

// IntersectionObserver watches each element and fires when it enters the viewport
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            // element is now visible — trigger the animation
            entry.target.classList.add('active');
            // stop watching this element once it has already appeared
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15 // fires when at least 15% of the element is visible on screen
});

// register every reveal element to be watched by the observer
revealElements.forEach((el) => observer.observe(el));


// ─── 3. ABOUT GALLERY — Smooth image swap ─────────────────────

function functio(small) {
    const full = document.getElementById('imagebox');

    // fade out first
    full.style.opacity = '0';
    full.style.transition = 'opacity 0.3s ease';

    // swap the image halfway through the fade, then fade back in
    setTimeout(() => {
        full.src = small.src;
        full.style.opacity = '1';
    }, 300);
}


// ─── 4. CART — Add to cart, counter & side drawer ─────────────

// cart starts as an empty array — each item is an object {name, price, img, qty}
let cart = [];

// inject the cart drawer HTML and counter badge into the page
document.body.insertAdjacentHTML('beforeend', `

    <span id="cart-count">0</span>

    <div id="cart-overlay"></div>

    <div id="cart-drawer">
        <div id="cart-header">
            <h2>Your Cart</h2>
            <i class="fa-solid fa-xmark" id="cart-close"></i>
        </div>
        <div id="cart-items"></div>
        <div id="cart-footer">
            <p id="cart-total">Total: $0.00</p>
            <button id="checkout-btn">Checkout</button>
        </div>
    </div>

`);

// grab all the cart elements now that they exist in the DOM
const cartIcon    = document.querySelector('.fa-cart-shopping');
const cartDrawer  = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose   = document.getElementById('cart-close');
const cartCount   = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotal   = document.getElementById('cart-total');

// open drawer when clicking the cart icon
cartIcon.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
});

// close drawer when clicking the X button or the dark overlay
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
}

// attach "Add to Cart" logic to every product button
document.querySelectorAll('.btn_add').forEach((btn) => {

    btn.addEventListener('click', (e) => {
        e.preventDefault(); // prevent the default anchor jump

        // climb up the DOM from the button to find the parent card
        const card  = btn.closest('.card');

        // grab the product info from inside that card
        const name  = card.querySelector('h2').textContent;
        const price = card.querySelector('h3').textContent;
        const img   = card.querySelector('div[class^="pdr"] img').src;

        // check if this product is already in the cart
        const existing = cart.find((item) => item.name === name);

        if (existing) {
            existing.qty += 1; // already in cart — just increase the quantity
        } else {
            cart.push({ name, price, img, qty: 1 }); // new item — add it
        }

        updateCart();  // re-render the cart UI
        openCart();    // open the drawer to confirm the addition
    });

});

function updateCart() {

    // count total number of items (sum of all quantities)
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // calculate the total price
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price * item.qty;
    }, 0);

    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // rebuild the items list inside the drawer
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p id="cart-empty">Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {

        cartItemsEl.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, +1)">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash cart-item-remove" onclick="removeItem(${index})"></i>
            </div>
        `);

    });

}

function changeQty(index, delta) {
    cart[index].qty += delta;
    // if quantity reaches 0, remove the item entirely
    if (cart[index].qty <= 0) removeItem(index);
    else updateCart();
}

function removeItem(index) {
    cart.splice(index, 1); // remove 1 item at position index
    updateCart();
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
}

// initialize the cart display on page load
updateCart();


// ─── 5. ACTIVE NAV LINK — Highlight current section ───────────

const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach((section) => {
        // check if the user has scrolled past the top of each section
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link'); // highlight the matching nav link
        }
    });

});


// ─── 6. BACK TO TOP BUTTON ────────────────────────────────────

document.body.insertAdjacentHTML('beforeend', `
    <button id="back-to-top" title="Back to top">
        <i class="fa-solid fa-chevron-up"></i>
    </button>
`);

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // show the button only after the user has scrolled 400px down
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});