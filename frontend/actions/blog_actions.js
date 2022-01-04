import * as BlogApiUtil from '../util/blog_api_util'

export const RECEIVE_BLOGS = 'RECEIVE_BLOGS';
export const RECEIVE_BLOG = 'RECEIVE_BLOG';
export const REMOVE_BLOG = 'REMOVE_BLOG';

const receiveBlogs = blogs => ({
    type: RECEIVE_BLOGS,
    blogs
})

const receiveBlog = blogId => ({
    type: RECEIVE_BLOG,
    blogId
})

const removeBlog = blogId => ({
    type: REMOVE_BLOG,
    blogId
})

export const fetchBlog = blogId => dispatch (
    BlogApiUtil.fetchBlog(blogId)
    .then(blog => dispatch(receiveBlog(blog)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const deleteBlog = blogId => dispatch => (
    BlogApiUtil.deleteBlog(blogId)
    .then(blog => dispatch(removeBlog(blog)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const updateBlog = blog => dispatch => (
    BlogApiUtil.updateBlog(blog)
    .then(blog => dispatch(receiveBlog(blog)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const createBlog = blog => dispatch => (
    BlogApiUtil.createBlog(blog)
    .then(blog => dispatch(receiveBlog(blog)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
)
