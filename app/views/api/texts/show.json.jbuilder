json.extract! @text, :id, :title, :date, :body, :author_id, :author_is_user,
:user_id, :created_at, :updated_at



json.author @text.author #, :id, :name, :birth, :death, :created_at, :updated_at
json.text_description @text.descriptions.first
