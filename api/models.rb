Sequel.connect('postgres://hack:zurich@db/')

class User < Sequel::Model
  many_to_many :discussions
end

class Discussion < Sequel::Model
  many_to_many :users
end
