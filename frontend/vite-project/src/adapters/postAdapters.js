import handleFetch from "./handleFetch"

export const getAllPosts = async () => {
    const [allPosts, error] = await handleFetch('/api/posts/')
    return [allPosts, error];
}

export const getPostById = async (id) => {
    const [post, error] = await handleFetch(`/api/posts/${id}`);
    return [post, error];
}

export const createPost = async (postTitle, postContent = '') => {
    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ postTitle, postContent })
    }

    const [newPost, error] = await handleFetch(`/api/posts/`, options);
    return [newPost, error];
}

export const deletePost = async (id) => {
    const options = {
        method: "DELETE",
    };
    const [success, error] = await handleFetch(`/api/posts/${id}`, options);
    return [success, error];
}

export const updatePost = async (id, updates) => {
    const options = {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updates)
    };

    const [updatedPost, error] = await handleFetch(`/api/posts/${id}`, options);
    return [updatedPost, error];
}
