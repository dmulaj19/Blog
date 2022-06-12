package com.weBlog.repository;


import com.weBlog.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

//    List<Blog> findBlogByCategoryId(Long categoryId);

}
