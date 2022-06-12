package com.weBlog.repository;


import com.weBlog.model.Request;
import com.weBlog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByBlogName(String blogName);

}
