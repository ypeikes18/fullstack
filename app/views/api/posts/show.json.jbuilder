json.extract! @post, :id, :title, :subtitle, :body, :image_url, :created_at, :blog_id
json.parentComments @post.parent_comments.pluck(:id)