json.author author

json.texts author.texts do |text|
	json.extract! text, :id, :author_id, :user_id, :body, :created_at, :updated_at
end
