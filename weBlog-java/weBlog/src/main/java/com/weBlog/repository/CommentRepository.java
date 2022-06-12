package com.weBlog.repository;


import com.weBlog.model.Comment;
import com.weBlog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long blogId);

}
