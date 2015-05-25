json.extract! author, :id, :name, :birth, :death, :created_at, :updated_at

json._type "Author"

json.texts author.texts do |text|
	json.extract! text, :id, :author_id, :user_id, :body, :created_at, :updated_at
end
