class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    @products = @category.products.take(5)
  end
end
