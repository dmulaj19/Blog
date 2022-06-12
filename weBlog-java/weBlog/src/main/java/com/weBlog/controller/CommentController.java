package com.weBlog.controller;

import com.weBlog.model.Comment;
import com.weBlog.model.Post;
import com.weBlog.repository.CommentRepository;
import com.weBlog.repository.PostRepository;
import com.weBlog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentRepository commentRepository;

    @GetMapping
    public List<Comment> getComments() { return commentRepository.findAll(); }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable Long id) {
        return commentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/postId")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@RequestParam String postId) {
        return new ResponseEntity<List<Comment>>(commentRepository.findByPostId(Long.parseLong(postId)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createComment(@RequestBody Comment comment) throws URISyntaxException {
        comment.setLikes(0L);
        comment.setDislikes(0L);
        Comment saveComment = commentRepository.save(comment);
        return ResponseEntity.created(new URI("/comments/" + saveComment.getId())).body(saveComment);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        Comment currentComment = commentRepository.findById(id).orElseThrow(RuntimeException::new);

        if(currentComment != null){
            currentComment.setContent(comment.getContent());

            currentComment = commentRepository.save(currentComment);
        }else {
            currentComment = commentRepository.save(comment);
        }

        return ResponseEntity.ok(currentComment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
