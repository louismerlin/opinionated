Sequel.connect('postgres://hack:zurich@db/')

class User < Sequel::Model
  many_to_many :discussions
  one_to_many :links
end

class Discussion < Sequel::Model
  many_to_many :users
  one_to_many :links
end

class Link < Sequel::Model
  many_to_one :discussion
  many_to_one :user
  many_to_one :reaction
end

class Reaction < Sequel::Model
  one_to_one :link
end
