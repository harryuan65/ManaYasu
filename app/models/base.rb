# frozen_string_literal: true

# base for mongo docs
class Base
  include ActiveModel::Validations
  include Mongoid::Document
  include Mongoid::Timestamps

  def serialize(use_serializer = nil)
    serializer = if use_serializer
                   use_serializer.new(self)
                 elsif Object.const_defined?(default_resource_name)
                   default_resource_name.constantize.new(self)
                 else
                   raise NotImplementedError
                 end

    serializer.serialize
  end

  protected

  def default_resource_name
    @default_resource_name ||= "#{self.class.name}Resource"
  end
end
