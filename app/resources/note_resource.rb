# frozen_string_literal: true

# Serializer for a full Note
class NoteResource < BaseResource
  attribute :_id do |resource|
    resource._id.to_s
  end

  attributes :title

  attributes :body
end
