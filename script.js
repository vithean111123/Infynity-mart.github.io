
 let cart =[];
 let cartTotal = 0;
function addToCart(name, price, image) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${name} added to cart!`);
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotalElement = document.getElementById('cartTotal');
            const cartCount = document.getElementById('cartCount');
            
            cartItems.innerHTML = '';
            cartTotal = 0;
            
            cart.forEach(item => {
                cartTotal += item.price * item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="decreaseQuantity('${item.name}')">-</button>
                        <button onclick="increaseQuantity('${item.name}')">+</button>
                        <button onclick="removeFromCart('${item.name}')"><i class='bx bx-trash'></i></button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotalElement.textContent = cartTotal.toFixed(2);
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }

        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            updateCart();
        }

        function increaseQuantity(name) {
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        }

        function decreaseQuantity(name) {
            const item = cart.find(item => item.name === name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCart();
            } else {
                removeFromCart(name);
            }
        }

        function openCart() {
            document.getElementById('cartSidebar').classList.add('active');
        }

        function closeCart() {
            document.getElementById('cartSidebar').classList.remove('active');
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        

        // Close cart when clicking outside
        function showQRCode() {
                if (cart.length === 0) {
                    showNotification("Your cart is empty!");
                    return;
                }
                
                document.getElementById('paymentAmount').textContent = cartTotal.toFixed(2);
                document.getElementById('qrModal').classList.add('active');
                closeCart();
        }

        function closeQRCode() {
            document.getElementById('qrModal').classList.remove('active');
            document.getElementById('paymentSuccess').classList.remove('active');
        }

            function simulatePayment() {
                // In a real application, this would connect to a payment gateway
                document.getElementById('paymentSuccess').classList.add('active');
                
                // Clear cart after successful payment
                setTimeout(() => {
                    cart = [];
                    updateCart();
                    closeQRCode();
                    showNotification("Payment successful! Your order is being processed.");
                }, 3000);
            }

            // Close cart when clicking outside
            
            document.addEventListener('click', function(event) {
                const cartSidebar = document.getElementById('cartSidebar');
                const cartButton = document.querySelector('.mss a:first-child');
                
                if (cartSidebar && !cartSidebar.contains(event.target) && !cartButton.contains(event.target)) {
                    closeCart();
                }
            });


// 
