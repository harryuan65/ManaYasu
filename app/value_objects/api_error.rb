# frozen_string_literal: true

# Value Object for Api Error message
class ApiErrorMessage
  attr_reader :status, :message

  # @param [Symbolb] status: Status status, in keys of `Rack::Utils::SYMBOL_TO_STATUS_CODE`
  # @param [String] message: Error Message
  def initialize(status, message)
    @status = status
    @message = message
  end
end
