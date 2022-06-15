package com.weBlog.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weBlog.model.*;
import com.weBlog.repository.CategoryRepository;
import com.weBlog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<Post> getPosts() { return postRepository.findAll(); }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/blogId")
    public ResponseEntity<List<Post>> getPostsByBlogId(@RequestParam String blogId) {
        return new ResponseEntity<List<Post>>(postRepository.findByBlogId(Long.parseLong(blogId)), HttpStatus.OK);
    }
//
//    @GetMapping("/{postId}")
//    public Post getOwnerOfPost(@PathVariable Long postId) {
//        return postRepository.findById(id).orElseThrow(RuntimeException::new);
//    }


    @PutMapping("/{postId}/categories/{categoryId}")
    Post addCategoryToPost(
            @PathVariable Long postId,
            @PathVariable Long categoryId
    ) {
        Category category = categoryRepository.getOne(categoryId);
        Post post = postRepository.getOne(postId);
        post.assignCategory(category);
        return postRepository.save(post);
    }

    @PostMapping
    public ResponseEntity createPost(@RequestPart("file") MultipartFile file, @RequestPart("post") String post) throws URISyntaxException, IOException {

        Post postJson;
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        postJson = objectMapper.readValue(post, Post.class);
        postJson.setImage(file.getBytes());
        Post savePost = postRepository.save(postJson);

        return ResponseEntity.created(new URI("/posts/" + savePost.getId())).body(savePost);
    }

    @PostMapping("/{id}")
    public ResponseEntity updatePost(@PathVariable Long id, @Nullable @RequestPart("file") MultipartFile file, @RequestPart("post") String post) throws IOException {
        Post currentPost = postRepository.findById(id).orElseThrow(RuntimeException::new);

        if(currentPost != null){
            Post postJson;
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.findAndRegisterModules();
            postJson = objectMapper.readValue(post, Post.class);
            if(file != null){
                currentPost.setImage(file.getBytes());
            }
            currentPost.setContent(postJson.getContent());
            currentPost.setTitle(postJson.getTitle());

            currentPost = postRepository.save(postJson);

        }else {
            currentPost = postRepository.save(currentPost);
        }

        return ResponseEntity.ok(currentPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/categories/{categoryId}")
    Post deletePostCategory(
            @PathVariable Long postId,
            @PathVariable Long categoryId
    ) {
        Category category = categoryRepository.getOne(categoryId);
        Post post = postRepository.getOne(postId);
        post.deleteCategory(category);
        return postRepository.save(post);
    }
}
