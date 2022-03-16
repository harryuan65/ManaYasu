# frozen_string_literal: true

# Serializer for Note
class NoteResource < BaseResource
  attribute :_id do |resource|
    resource._id.to_s
  end

  attributes :title

  attribute :data do |resource|
    resource.body.to_json
  end
end
