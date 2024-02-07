class Category < ApplicationRecord
  has_many :products, dependent: :destroy

  has_one_attached :image do |img|
    img.variant :thumb, resize_to_limit: [50, 50]
  end
end
