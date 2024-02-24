class Product < ApplicationRecord
  belongs_to :category
  has_many :stocks, dependent: :destroy
  has_many :order_products

  has_many_attached :images do |img|
    img.variant :thumb, resize_to_limit: [50, 50]
    img.variant :medium, resize_to_limit: [250, 250]
  end
end
