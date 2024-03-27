import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: Object }

  addToCart() {
    console.log("product", this.productValue)
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


