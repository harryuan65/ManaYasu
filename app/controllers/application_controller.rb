# frozen_string_literal: true

# Api base controller
class ApplicationController < ActionController::API
  protected

  def render_error(status, message)
    message = ApiErrorMessage.new(status, message)
    resource = ApiErrorMessageResource.new(message)
    render json: resource.serialize
  end
end
