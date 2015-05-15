json.array! @texts do |text|
  json.extract! text, :id, :title, :date, :body, :author_id, :author_is_user,
  :user_id, :created_at, :updated_at
end
