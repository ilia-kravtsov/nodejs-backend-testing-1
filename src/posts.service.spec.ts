import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // Act
    const newPost = postsService.create({text: 'Some new post'});
    const posts = postsService.getPosts();

    // Assert
    expect(newPost).toHaveProperty('id');
    expect(newPost).toHaveProperty('date');
    expect(newPost.text).toBe('Some new post');
    expect(posts).toContainEqual(newPost);
  });

  it('should find a post', () => {
    // Arrange
    const createdPost = postsService.create({text: 'Find me!'});

    // Act
    const foundPost = postsService.find(createdPost.id);

    // Assert
    expect(foundPost).toEqual(createdPost);
  });
});