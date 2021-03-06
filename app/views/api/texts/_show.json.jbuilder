json.extract! text, :id, :title, :date, :body, :author_id, :author_is_user,
:user_id, :created_at, :updated_at

json.image asset_path(text.image.url(:original))
json.polyId text.id.to_s + "_text"



json._type "Text"


json.author text.author #, :id, :name, :birth, :death, :created_at, :updated_at

json.text_description text.descriptions.first

json.annotations text.annotations do |annotation|
	json.extract! annotation, :id, :text_id, :author_id, :content, :score,
	 					:start_index, :end_index, :created_at, :updated_at
end
