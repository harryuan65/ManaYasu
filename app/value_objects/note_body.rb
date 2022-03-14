# frozen_string_literal: true

# Body of a Note
class NoteBody
  attr_reader :time, :blocks, :version

  def initialize(time: Time.now.to_i, blocks: [], version: '2.8.1')
    @time = time
    @blocks = blocks
    @version = version
  end

  def mongoize
    {
      time: @time,
      blocks: @blocks,
      version: @version
    }
  end

  def to_json(*_args)
    mongoize
  end

  class << self
    def demongoize(obj)
      new(**obj.symbolize_keys)
    end

    def mongoize(obj)
      case obj
      when Body
        obj.mongoize
      when Hash
        new(**obj.symbolize_keys).mongoize
      else
        pp obj
        raise 'Unknown obj type'
      end
    end
  end
end
