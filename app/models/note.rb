# frozen_string_literal: true

# Notes for learning
class Note < Base
  validates_presence_of :title, on: :create, message: "can't be blank"
  validates_presence_of :body, on: :create, message: "can't be blank"

  field :title, type: String
  field :body, type: Hash

  belongs_to :user
end
