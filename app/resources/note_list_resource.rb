# frozen_string_literal: true

# Rendering list of note(s).
# Only contains id and title
class NoteListResource < BaseResource
  root_key :note, :notes

  attribute :_id do |resource|
    resource._id.to_s
  end

  attributes :title
end
