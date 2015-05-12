# Schema Information

## text
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null
published_date | integer |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
text_id     | integer   | not null, foreign key (references blogs)
follower_id | integer   | not null, foreign key (references users)

## annotation
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
body        | text      | not null
approval    | integer   |


## text_description
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
text_id     | integer   | not null, unique
author_id   | integer   | not null, foreign key

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
editor          | boolean   | default false


## to make tables for joining texts and annotations with multiple authors
## Also, if have time, add current hotness for texts and overall points for users
