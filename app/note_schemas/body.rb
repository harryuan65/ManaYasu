# frozen_string_literal: true

# Body of a Note
class Body
  attr_accessor :time, :blocks, :version

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

  class << self
    def demongoize(obj)
      new(**obj)
    end

    def mongoize(obj)
      case obj
      when Body
        obj.mongoize
      when Hash
        new(**obj).mongoize
      else
        pp obj
        raise 'Unknown obj type'
      end
    end
  end
end
