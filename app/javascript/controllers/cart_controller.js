import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    const cart = JSON.parse(localStorage.getItem("cart"))

    if (!cart || cart.length <= 0) {
      return
    }

    let total = 0
    let cartItems = document.getElementById("cart_items")

    for(let i = 0; i < cart.length; i++ ) {
      total += cart[i].price * cart[i].quantity

      let removeBtn = document.createElement("button")
      removeBtn.value = i
      removeBtn.addEventListener("click", this.removeFromCart)
      removeBtn.classList.add("font-medium", "text-indigo-600", "hover:text-indigo-500")
      removeBtn.innerText = "Remove"

      let cartItem = document.createElement("li")
      cartItem.classList.add("flex", "py-6")
      cartItem.innerHTML = `<div class="flex flex-1 flex-col">
          <div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <h3>
                ${cart[i].name}
              </h3>
              <p class="ml-4">$${cart[i].price}</p>
            </div>
            <p class="mt-1 text-sm text-gray-500">Size: ${cart[i].size}</p>
          </div>
          <div class="flex flex-1 items-end justify-between text-sm">
            <p class="text-gray-500">Qty ${cart[i].quantity}</p>
            <div class="flex remove-btn-container"></div>
          </div>
        </div>`

      cartItem.querySelector('.remove-btn-container').appendChild(removeBtn);
      cartItems.appendChild(cartItem)
    }

    let cartTotal = document.getElementById("cart-total")
    cartTotal.innerHTML = `<div class="border-t border-gray-200 mt-6 py-6">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$${total}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      </div>`
  }

  removeFromCart(event) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    const id = event.target.value
    const index = cart.findIndex(item => item.id === id)
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
  }

  clearAll() {
    localStorage.removeItem("cart")
    window.location.reload()
  }

  checkout() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const payload = {
      authenticity_token: "",
      cart: cart
    }

    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        window.location.href = body.url
      } else {
        const errorEl = document.createElement("div")
        errorEl.innerText = `There was an error processing your order. ${body.error}`
        errorEl.classList.add("mx-auto", "my-4", "max-w-screen-xl", "rounded-lg", "bg-red-100", "px-6", "py-5", "text-base", "text-red-700")
        let errorContainer = document.getElementById("errorContainer")
        errorContainer.appendChild(errorEl)
      }
    })
  }
}
