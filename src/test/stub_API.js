// JavaScript source code
import _ from 'lodash';

class StubAPI {

    constructor() {
        this.posts = [
            {
                id: 1,
                title: 'Transcages Ireland Twitter Feed.',
                link: 'https://twitter.com/transcages',
                username: 'jbloggs',
                comments: [],
                upvotes: 0
            },
            {
                id: 2,
                title: 'Transcages Ireland Facebook.',
                link: 'https://www.facebook.com/transcagesireland/',
                username: 'notme',
                comments: [],
                upvotes: 12
            },
           
        ];
    }

    getAll() {
        return this.posts;
    }

    add(t, l) {
        let id = 1;
        let last = _.last(this.posts);
        if (last) {
            id = last.id + 1;
        }
        let len = this.posts.length;
        let newLen = this.posts.push({
            'id': id,
            title: t, link: l, username: '', comments: [], upvotes: 0
        });
        return newLen > len;
    }

    upvote(id) {
        let index = _.findIndex(this.posts,
            function (post) {
                return post.id === id;
            });
        if (index !== -1) {
            this.posts[index].upvotes += 1;
            return true;
        }
        return false;
    }

    downvote(id) {
        let index = _.findIndex(this.posts,
            function (post) {
                return post.id === id;
            });
        if (index !== -1) {
            this.posts[index].upvotes -= 1;
            return true;
        }
        return false;
    }


    getPost(id) {
        let result = null;
        let index = _.findIndex(this.posts, function (post) {
            return post.id === id;
        });
        if (index !== -1) {
            result = this.posts[index];
        }
        return result;
    }

    addComment(postId, c, n) {
        let post = this.getPost(postId);
        let id = 1;
        let last = _.last(post.comments);
        if (last) {
            id = last.id + 1;
        }
        post.comments.push({
            'id': id,
            comment: c, author: n, upvotes: 0
        });
    }

    upvoteComment(postId, commentId) {
        let post = this.getPost(postId);
        let index = _.findIndex(post.comments, function (c) {
            return c.id === commentId;
        });
        if (index !== -1) {
            post.comments[index].upvotes += 1;
        }

    }
}

export default (new StubAPI());