# frozen_string_literal: true

# Notes for learning
class Note
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :body, type: Body

  belongs_to :user
end
