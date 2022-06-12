package com.weBlog.repository;

import com.weBlog.model.Blog;
import com.weBlog.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

//    List<Category> findCategoryByBlogId(Long blogId);
}
