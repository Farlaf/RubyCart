class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.string :customer_email
      t.boolean :fulfilled
      t.float :total
      t.string :address

      t.timestamps
    end
  end
end
