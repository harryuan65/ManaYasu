# frozen_string_literal: true

module Api
  # Notes crud
  class NotesController < ApplicationController
    before_action :set_note, only: %i[show create update]

    def index
      notes = Note.all
      render json: NoteListResource.new(notes).serialize
    end

    def show
      render json: @note.serialize
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
      if @note.update(body: note_params[:data].to_h)
        head :no_content
      else
        render_error :bad_request, @note.errors.full_messages.join
      end
    end

    def check_params
      render json: {
        data: note_params.to_h
      }
    end

    private

    def set_note
      @note = Note.find(params[:id])
    end

    def note_params
      params.permit!
    end
  end
end
