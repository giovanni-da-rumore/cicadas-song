json.extract! user, :id, :username, :email, :moderator, :about
json.polyId user.id.to_s + "_user"
json._type "User"
json.avatar asset_path(user.avatar.url(:original))

json.annotations user.annotations do |annotation|
	json.extract! annotation, :id, :text_id, :author_id, :content, :score,
	 					:start_index, :end_index, :created_at, :updated_at
end

json.uploaded_texts user.uploaded_texts do |text|
	json.extract! text, :id, :title, :author_id, :user_id, :body, :created_at, :updated_at
end
