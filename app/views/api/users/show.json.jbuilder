json.extract! @user, :id, :username, :email, :moderator
json.avatar asset_path(@user.avatar.url(:original))
