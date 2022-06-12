package com.weBlog.repository;


import com.weBlog.model.Post;
import com.weBlog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBlogId(Long blogId);
}
