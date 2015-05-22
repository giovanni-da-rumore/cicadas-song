json.total_pages @search_results.total_pages

json.search_results @search_results.map(&:searchable) do |search_result|
  if search_result.is_a? User
    json.partial! "api/users/show", user: search_result
  elsif search_result.searchable_type == "Author"
    json.author search_result
  else
    json.text search_result
  end
end
