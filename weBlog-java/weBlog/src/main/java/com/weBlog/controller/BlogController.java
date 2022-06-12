package com.weBlog.controller;

import com.weBlog.model.Blog;
import com.weBlog.model.Request;
import com.weBlog.model.User;
import com.weBlog.repository.BlogRepository;
import com.weBlog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/blogs")
public class BlogController {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Blog> getBlogs() { return blogRepository.findAll(); }

    @GetMapping("/{id}")
    public Blog getReservation(@PathVariable Long id) {
        return blogRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createReservation(@RequestBody Blog blog) throws URISyntaxException {
        Blog savedBlog = blogRepository.save(blog);
        return ResponseEntity.created(new URI("/blogs/" + savedBlog.getId())).body(savedBlog);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Blog currentBlog = blogRepository.findById(id).orElseThrow(RuntimeException::new);

        if(currentBlog != null){
            currentBlog.setDomain(blog.getDomain());
            currentBlog.setName(blog.getName());
            if(currentBlog.getUser().getId() != null){
                User user = userRepository.getById(currentBlog.getUser().getId());
                if(user != null){
                    currentBlog.setUser(user);
                }
            }
            currentBlog = blogRepository.save(currentBlog);
        }else {
            currentBlog = blogRepository.save(blog);
        }

        return ResponseEntity.ok(currentBlog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
