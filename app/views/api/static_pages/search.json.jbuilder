json.total_pages @search_results.total_pages

json.search_results @search_results.map(&:searchable) do |search_result|
  if search_result.is_a? User
    json.partial! "api/users/show", user: search_result
  elsif search_result.is_a? Author
    json.partial! "api/authors/show", author: search_result
  else
    json.partial! "api/texts/show", text: search_result
  end
end
