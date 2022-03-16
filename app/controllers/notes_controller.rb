# frozen_string_literal: true

# Notes crud
class NotesController < ApplicationController
  before_action :set_note, only: %i[create update]

  def index
    @notes = Note.all
    render json: @notes.map(&:serialize)
  end

  def create
    note = Note.new(note_params)
    if note.save
      head :no_content
    else
      render_error :bad_request, @note.errors.full_messages.join
    end
  end

  def update
    if @note.update(note_params)
      head :no_content
    else
      render_error :bad_request, @note.errors.full_messages.join
    end
  end

  private

  def set_note
    @note = Note.find(params[:_id])
  end

  def note_params
    params.permit(%i[_id created_at updated_at title body])
  end
end
