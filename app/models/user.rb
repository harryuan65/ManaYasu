# frozen_string_literal: true

# Learners who take notes
class User
  include BCrypt
  include Mongoid::Document
  include Mongoid::Timestamps

  field :email, type: String
  field :password_hash, type: String

  has_many :notes

  def password=(new_password)
    self.password_hash = Password.create(new_password)
  end

  def valid_password?(check_password)
    password == check_password
  end

  private

  def password
    password_hash ? Password.new(password_hash) : ''
  end
end
