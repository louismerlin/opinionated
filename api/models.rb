Sequel.connect('postgres://hack:zurich@db/')

class User < Sequel::Model
  many_to_many :discussions
  one_to_many :links
end
#User.many_to_many :discussions, :class=>:Discussion,
 #:eager_graph=>:links do |ds|
  # ds.order(:links__date)
#end

class Discussion < Sequel::Model
  many_to_many :users
  one_to_many :links
end

class Link < Sequel::Model
  many_to_one :discussion
  many_to_one :user
end
