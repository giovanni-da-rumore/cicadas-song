json.extract! @description, :id, :text_id, :author_id, :content,
					:score, :created_at, :updated_at

json.author @description.author
