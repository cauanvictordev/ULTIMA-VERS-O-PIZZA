// ===========================
// Seletores Principais
// ===========================
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const menu = document.querySelector(".menu");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const checkoutBtn = document.getElementById("checkout-btn");
const customerNameInput = document.getElementById("customer-name");
const paymentProofInput = document.getElementById("payment-proof");
const paymentInfo = document.getElementById("payment-info");
const pixInfo = document.getElementById("pix-info");
const copyPixBtn = document.getElementById("copy-pix-btn");
const pixKey = document.getElementById("pix-key");

// ===========================
// Exibição do Modal do Carrinho
// ===========================
cartBtn.addEventListener("click", () => {
  cartModal.classList.add("active");
  cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  cartModal.classList.remove("active");
  cartModal.style.display = "none";
});

// ===========================
// Adicionar Item ao Carrinho
// ===========================
menu.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    const imageSrc = parentButton.querySelector("img").getAttribute("src");
    addToCart(name, price, imageSrc);
  }
});

function addToCart(name, price, imageSrc) {
  const existingItem = cart.find((item) => item.name === name);
  existingItem ? existingItem.quantity++ : cart.push({ name, price, quantity: 1, imageSrc });
  updateCartModal();
}

// ===========================
// Atualização do Modal do Carrinho
// ===========================
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p><strong>Produto:</strong> ${item.name}</p>
        <p><strong>Quantidade:</strong> ${item.quantity}</p>
        <p><strong>Preço:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-from-cart-btn" data-index="${index}">
        <i class="fas fa-trash-alt"></i> Remover
      </button>`;
    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  updateCartCount();
}

// ===========================
// Remover Item do Carrinho
// ===========================
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.closest(".remove-from-cart-btn")) {
    const index = parseInt(event.target.closest(".remove-from-cart-btn").getAttribute("data-index"));
    cart.splice(index, 1);
    updateCartModal();
  }
});

// ===========================
// Finalizar Compra
// ===========================
checkoutBtn.addEventListener("click", () => {
  const name = customerNameInput.value.trim();
  const address = addressInput.value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  const total = cartTotal.textContent;

  if (!name || !address || !paymentMethod) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  const cartItems = cart.map((item) => `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${(item.price * item.quantity).toFixed(2)}`).join("\n");

  let message = `Olá, segue o pedido:\n\nNome: ${name}\nEndereço: ${address}\nForma de Pagamento: ${paymentMethod}\nTotal: ${total}\n\nProdutos:\n${cartItems}`;

  if (paymentMethod === "PIX") {
    alert("Você selecionou PIX como forma de pagamento. Por favor, envie o comprovante manualmente na conversa do WhatsApp após abrir o link.");
    message += "\nPor favor, envie o comprovante de pagamento nesta conversa.";
  }

  window.open(`https://wa.me/67996123728?text=${encodeURIComponent(message)}`, "_blank");
  cart = [];
  addressInput.value = "";
  customerNameInput.value = "";
  updateCartModal();
});

// ===========================
// Atualizar Contador do Carrinho
// ===========================
function updateCartCount() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// ===========================
// Forma de Pagamento - PIX
// ===========================
copyPixBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(pixKey.textContent).then(() => {
    alert("Chave Pix copiada para a área de transferência!");
  }).catch(() => {
    alert("Falha ao copiar a chave Pix. Por favor, copie manualmente.");
  });
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", handlePaymentMethodChange);
});

function handlePaymentMethodChange() {
  document.querySelector('input[name="payment"]:checked').value === "pix" ? pixInfo.classList.remove("hidden") : pixInfo.classList.add("hidden");
}













// ===========================
// <!-- CARROSSEL -->
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");

  let currentIndex = 0;

  const updateCarousel = () => {
      const offset = -currentIndex * 100; // Move para a próxima imagem (100% por imagem)
      carouselImages.style.transform = `translateX(${offset}%)`;
  };

  prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Vai para a imagem anterior
      updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // Vai para a próxima imagem
      updateCarousel();
  });

  // Inicializa o carrossel
  updateCarousel();
});







// ===========================
// <!-- SABORES -->
// ===========================

// Função para capturar sabores selecionados e adicionar ao carrinho
document.getElementById('addToCartBtn').addEventListener('click', function () {
  // Captura o nome da pizza e o tamanho selecionado
  const pizzaName = document.querySelector('.custom-popup-title').innerText;
  const size = document.querySelector('input[name="size"]:checked').parentElement.innerText;

  // Captura os sabores selecionados
  const flavors = [];
  document.querySelectorAll('input[name="flavor"]:checked').forEach((checkbox) => {
      flavors.push(checkbox.value);
  });

  // Validação: garante que pelo menos um sabor foi selecionado
  if (flavors.length === 0) {
      alert('Por favor, selecione pelo menos um sabor.');
      return;
  }

  // Cria um item do carrinho com os detalhes da pizza
  const cartItem = {
      name: pizzaName,
      size: size,
      flavors: flavors,
      price: calculatePrice(size), // Função para calcular o preço com base no tamanho
  };

  // Adiciona o item ao carrinho global (supondo que há uma variável global cart)
  cart.push(cartItem);

  // Atualiza a interface do carrinho
  updateCartUI();

  // Fecha o popup de personalização
  document.getElementById('customPopup').style.display = 'none';
});

// Função para calcular o preço com base no tamanho da pizza
function calculatePrice(size) {
  const basePrice = parseFloat(document.querySelector('.menu-price').dataset.basePrice);
  const sizeMultiplier = parseFloat(document.querySelector(`input[name="size"]:checked`).dataset.sizeMultiplier);
  return (basePrice * sizeMultiplier).toFixed(2);
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = ''; // Limpa o conteúdo atual

  // Atualiza os itens do carrinho
  cart.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
          <p><strong>${item.name}</strong> (${item.size})</p>
          <p>Sabores: ${item.flavors.join(', ')}</p>
          <p>Preço: R$ ${item.price}</p>
      `;
      cartContainer.appendChild(itemElement);
  });

  // Atualiza o total do carrinho
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;

  // Atualiza a contagem de itens no botão do carrinho
  document.getElementById('cart-count').innerText = cart.length;
}









// Função para atualizar o número máximo de sabores
document.querySelectorAll('input[name="size"]').forEach((input) => {
  input.addEventListener("change", () => {
    const maxFlavors = input.getAttribute("data-max-flavors") || 2;
    document.getElementById("maxFlavors").textContent = maxFlavors;
  });
});

// Função para habilitar/desabilitar o botão "Adicionar ao Carrinho"
const addToCartBtn = document.getElementById("addToCartBtn");
const form = document.querySelector(".custom-popup-form");

form.addEventListener("input", () => {
  const sizeSelected = document.querySelector('input[name="size"]:checked');
  const doughSelected = document.querySelector('input[name="massa"]:checked');
  addToCartBtn.disabled = !(sizeSelected && doughSelected);
});

// Fechar o popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("customPopup").style.display = "none";
});












// ===========================
// Função para Notificar Usuário
// ===========================
function notifyPendingCart() {
  if (cart.length > 0) {
    alert("Você tem itens no carrinho! Não esqueça de finalizar sua compra.");
  }
}

// ===========================
// Iniciar Notificação Repetitiva
// ===========================
function startCartNotification() {
  setInterval(() => {
    if (cart.length > 0 && !document.body.classList.contains("checkout-in-progress")) {
      notifyPendingCart();
    }
  }, 60000); // 60.000 ms = 1 segundos
}

// ===========================
// Marcar Checkout em Progresso
// ===========================
checkoutBtn.addEventListener("click", () => {
  document.body.classList.add("checkout-in-progress");
  setTimeout(() => document.body.classList.remove("checkout-in-progress"), 300000); // Remove após 5 minutos
});

// ===========================
// Inicializar ao Carregar Página
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  startCartNotification(); // Ativa a notificação ao carregar a página
});




























// ===========================
// CUSTOM POPUP
// ===========================

// ===========================
// CUSTOM POPUP
// ===========================

let cart = []; // Itens do carrinho
let selectedPizza = null; // Pizza selecionada
let basePrice = 0; // Preço base

// Elementos do popup
const popup = document.getElementById('customPopup');
const popupTitle = document.querySelector('.custom-popup-title');
const popupCloseBtn = document.getElementById('closePopup');
const popupAddBtn = document.getElementById('addToCartBtn');
const flavorCheckboxes = document.querySelectorAll('input[name="flavor"]');
const maxFlavorsDisplay = document.getElementById('maxFlavors');

// ===========================
// FUNÇÕES DE CONTROLE
// ===========================

// Atualiza o número máximo de sabores e habilita/desabilita checkboxes
function updateMaxFlavors() {
  const selectedSize = document.querySelector('input[name="size"]:checked');
  const maxFlavors = parseInt(selectedSize?.dataset.maxFlavors || 2);
  const selectedFlavors = Array.from(flavorCheckboxes).filter(cb => cb.checked);

  maxFlavorsDisplay.textContent = maxFlavors;

  // Controla habilitação dos sabores
  flavorCheckboxes.forEach(cb => {
    cb.disabled = !cb.checked && selectedFlavors.length >= maxFlavors;
  });
}

// Habilita/desabilita o botão "Adicionar ao Carrinho"
function toggleAddButton() {
  const sizeSelected = !!document.querySelector('input[name="size"]:checked');
  const massaSelected = !!document.querySelector('input[name="massa"]:checked');
  const flavorsSelected = Array.from(flavorCheckboxes).some(cb => cb.checked);
  popupAddBtn.disabled = !(sizeSelected && massaSelected && flavorsSelected);
}

// Abre o popup para personalização
function openCustomPopup(name, price) {
  selectedPizza = name;
  basePrice = parseFloat(price);
  popupTitle.textContent = `Personalize sua ${name}`;
  popup.style.display = 'flex';

  // Resetar os campos
  flavorCheckboxes.forEach(cb => (cb.checked = false));
  document.querySelectorAll('input[name="size"]').forEach(input => (input.checked = false));
  document.querySelectorAll('input[name="massa"]').forEach(input => (input.checked = false));
  document.querySelectorAll('input[name="borda"]').forEach(input => (input.checked = false));

  updateMaxFlavors();
  toggleAddButton();
}

// Fecha o popup
popupCloseBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Adiciona ao carrinho
popupAddBtn.addEventListener('click', () => {
  const selectedSize = document.querySelector('input[name="size"]:checked');
  const sizeMultiplier = parseFloat(selectedSize.dataset.sizeMultiplier);
  const selectedFlavors = Array.from(flavorCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
  const selectedBorda = document.querySelector('input[name="borda"]:checked');
  const bordaPrice = selectedBorda ? parseFloat(selectedBorda.dataset.extraPrice) : 0;

  // Preço final
  const finalPrice = (basePrice * sizeMultiplier) + bordaPrice;

  // Adiciona ao carrinho
  cart.push({
    name: selectedPizza,
    size: selectedSize.value,
    flavors: selectedFlavors,
    borda: selectedBorda?.value || 'Sem Borda',
    price: finalPrice.toFixed(2),
    quantity: 1,
  });

  console.log('Carrinho:', cart);
  popup.style.display = 'none';
});

// Eventos para atualização dinâmica
flavorCheckboxes.forEach(cb => cb.addEventListener('change', () => {
  updateMaxFlavors();
  toggleAddButton();
}));

document.querySelectorAll('input[name="size"]').forEach(input => input.addEventListener('change', () => {
  updateMaxFlavors();
  toggleAddButton();
}));

document.querySelectorAll('input[name="massa"]').forEach(input => input.addEventListener('change', toggleAddButton));












// ======================================================
// Funções do Carrinho
// ======================================================

/**
 * Atualiza o modal do carrinho com os itens e o total.
 */
function updateCartModal() {
    cartItemsContainer.innerHTML = ""; // Limpa o conteúdo existente
    let total = 0;

    cart.forEach((item, index) => {
        // Cria o elemento do item do carrinho
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        // Preenche as informações do item
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <p><strong>Produto:</strong> ${item.name} (${item.size})</p>
                <p><strong>Adicionais:</strong> ${item.extras.join(", ") || "Nenhum"}</p>
                <p><strong>Quantidade:</strong> ${item.quantity}</p>
                <p><strong>Preço:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-index="${index}">
                <i class="fas fa-trash-alt"></i> Remover
            </button>
        `;

        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    updateCartCount();
}

/**
 * Atualiza o contador de itens no carrinho.
 */
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = count;
}

// ======================================================
// Eventos de Interação
// ======================================================

// Remover item do carrinho
cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".remove-from-cart-btn")) {
        const index = parseInt(event.target.closest(".remove-from-cart-btn").getAttribute("data-index"));
        cart.splice(index, 1);
        updateCartModal();
    }
});

// ======================================================
// Inicialização da Página
// ======================================================

/**
 * Inicializa os preços padrão e configurações ao carregar a página.
 */
document.addEventListener("DOMContentLoaded", () => {
    updateCartModal(); // Atualiza o carrinho na inicialização
});




























































