json.array! @postlets do |postlet|
  json.postlet postlet
  json.title postlet.text.title
  json.author_name postlet.text.author.name

end
