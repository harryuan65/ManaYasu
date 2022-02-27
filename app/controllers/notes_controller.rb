# frozen_string_literal: true

# Notes crud
class NotesController < ApplicationController
  def index
    @notes = Note.all
  end
end
