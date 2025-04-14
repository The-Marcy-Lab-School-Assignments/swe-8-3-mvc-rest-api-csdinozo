const getId = require('../utils/getId');

const posts = [
    { title: 'First Post', content: 'first', id: getId() },
    { title: 'Second Post', content: 'second', id: getId() },
    { title: 'Third Post', content: 'third', id: getId() },
];

class Post {
    static create(title, content) {
        const newPost = {
            title,
            content,
            id: getId();
        }
        posts.push(newPost);
        return newPost;
    }

    static list() {
        return [...posts];
    }

    static find(id) {
        return posts.find((post) => post.id === id);
    }

    static editTitle(id, newTitle) {
        const post = Post.find(id);
        if (!post) return null;
        post.title = newTitle;
        return post;
    }

    static editContent(id, newContent) {
        const post = Post.find(id);
        if (!post) return null;
        post.content = newContent;
        return post;
    }

    static delete(id) {
        const postIndex = posts.findIndex((post) => post.id === id);
        if (postIndex < 0) return false;
        posts.splice(postIndex, 1);
        return true;
    }
}

module.exports = Post;
