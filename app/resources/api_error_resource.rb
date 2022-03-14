# frozen_string_literal: true

# Serializer for ApiErrorMessage
# Looks like
# @example
# ```ruby
# {
#   error: {
#     code: 400,
#     message: 'Honey should be sweet'
#   }
# }
# ```
class ApiErrorMessageResource
  include Alba::Resource

  key :error

  attribute :code do |resource|
    Rack::Utils::SYMBOL_TO_STATUS_CODE[resource.status]
  end

  attributes :message
end
