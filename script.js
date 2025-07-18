const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const carItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


cartBtn.addEventListener("click",function() {
  updataCartModal();
  cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function (event) {
   if(event.target == cartModal){
    cartModal.style.display = "none"
   } 
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name , price)
    }
})


function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
        name,
        price,
        quantity: 1,
        })
    }

    updataCartModal()
    
}


function updataCartModal() {
    carItemsContainer.innerHTML = "";
    let total = 0 ;

    cart.forEach(item =>{
        const carItemsElement = document.createElement("div");
        carItemsElement.classList.add("felx", "justify-between", "mb-4", "flex-col")

        carItemsElement.innerHTML = `
            <div class=" flex items-center justify-between">
                 <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="bg-red-500 text-white px-2 py-1 rounded remove-btn" data-name="${item.name}">
                    Remover
                </button>
                
            </div>
        `

        total += item.price * item.quantity;

        carItemsContainer.appendChild(carItemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR" , {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}

carItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item =  cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updataCartModal();
            return;
        }

        cart.splice(index, 1);
        updataCartModal();
    }
    
}

addressInput.addEventListener("input" , function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500", "border-2");
        addressWarn.classList.add("hidden");
    }
})

checkoutBtn.addEventListener("click" , function(){

    const isOpen =  checkRestauranteOpen();

    if(!isOpen){
         Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();
         return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500", "border-2");
        return;
    }

    const cartItems = cart.map((item) => {
        return (
           `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )

    }).join("")

    const massage = encodeURIComponent(cartItems)
    const phone = "5512988258362"

    window.open(`https://wa.me/${5512988258362}?text=${massage} Endereço: ${addressInput.value}`, "_blank")


    cart = [];
    updataCartModal();

})


function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <22;
}


const spanItem = document.getElementById("deta-span")
const isOpen = checkRestauranteOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-500");
    spanItem.classList.add("bg-red-600")
}