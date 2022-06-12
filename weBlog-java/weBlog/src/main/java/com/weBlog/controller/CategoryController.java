package com.weBlog.controller;

import com.weBlog.model.Blog;
import com.weBlog.model.Category;
import com.weBlog.model.Post;
import com.weBlog.model.Role;
import com.weBlog.repository.BlogRepository;
import com.weBlog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final BlogRepository blogRepository;

    @GetMapping
    public List<Category> getCategories() { return categoryRepository.findAll(); }

    @PostMapping
    public ResponseEntity createRole(@RequestBody Category category) throws Exception {
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(savedCategory);
    }




}
