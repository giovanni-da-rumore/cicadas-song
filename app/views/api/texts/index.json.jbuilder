json.array! @texts do |text|
  json.extract! text, :title, :date, :body, :author_id, :author_is_user,
  :user_id, :created_at, :updated_at
end
