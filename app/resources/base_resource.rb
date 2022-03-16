# frozen_string_literal: true

# Don't include alba in every file
# @!parse extend Alba::Resource::ClassMethods
class BaseResource
  include Alba::Resource
end
