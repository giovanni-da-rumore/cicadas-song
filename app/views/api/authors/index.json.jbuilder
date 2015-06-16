json.array! @authors do |author|
  json.extract! author, :id, :name, :birth, :death, :created_at, :updated_at
  json.image asset_path(author.image.url(:original))
end
