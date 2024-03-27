import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: Object }

  addToCart() {
    const cart = localStorage.getItem("cart")

    if (cart) {
      const cartArray = JSON.parse(cart)
      const foundIndex = cartArray.findIndex(item => item.id === this.productValue.id && item.size === this.sizeValue)
      if (foundIndex >= 0) {
        cartArray[foundIndex].quantity = parseInt(cartArray[foundIndex].quantity) + 1
      } else {
        cartArray.push({
          id: this.productValue.id,
          name: this.productValue.name,
          price: this.productValue.price,
          size: this.sizeValue,
          quantity: 1
        })
      }
    } else {
      const cartArray = []
      cartArray.push({
        id: this.productValue.id,
        name: this.productValue.name,
        price: this.productValue.price,
        size: this.sizeValue,
        quantity: 1
      })
    }
    localStorage.setItem("cart", JSON.stringify(cartArray))
  }

  selectedSize(e) {
    Array.from(document.querySelectorAll(".selected-size-item")).forEach(size => {
      size.classList.remove('border-indigo-500')
    })
    e.target.classList.add('border-indigo-500')

    this.sizeValue = e.target.value
    const selectedSizeEl = document.getElementById("selected-size")
    selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`
  }
}


