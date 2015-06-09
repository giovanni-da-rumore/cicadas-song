json.array! @postlets do |postlet|
  json.extract! postlet, :image_url, :post_order, :description, :text_id
  json.title postlet.text.title
  json.author_name postlet.text.author.name

end
