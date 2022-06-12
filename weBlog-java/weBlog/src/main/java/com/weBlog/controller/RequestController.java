package com.weBlog.controller;

import com.weBlog.model.Blog;
import com.weBlog.model.Post;
import com.weBlog.model.Request;
import com.weBlog.model.User;
import com.weBlog.repository.BlogRepository;
import com.weBlog.repository.RequestRepository;
import com.weBlog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/requests")
public class RequestController {

    private final RequestRepository requestRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Request> getRequests() {
        return requestRepository.findAll();
    }

    @GetMapping("/{id}")
    public Request getRequest(@PathVariable Long id) {
        return requestRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/blogName")
    public ResponseEntity<List<Request>> getRequestByBlogName(@RequestParam String blogName) throws UnsupportedEncodingException {
        //String blogname = URLEncoder.encode(blogName, StandardCharsets.UTF_8.toString());
        return new ResponseEntity<List<Request>>(requestRepository.findByBlogName(blogName), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createRequest(@RequestBody Request request) throws URISyntaxException {
        Request savedRequest = requestRepository.save(request);
        return ResponseEntity.created(new URI("/requests/" + savedRequest.getId())).body(savedRequest);
    }

    @PostMapping("/{id}")
    public ResponseEntity activateBlog(@PathVariable Long id, @RequestBody Blog blog) throws URISyntaxException {
        Request currentRequest = requestRepository.findById(id).orElseThrow(RuntimeException::new);

        if (currentRequest != null) {
            blogRepository.save(blog);
            currentRequest.setProcessed(1);
            requestRepository.save(currentRequest);
        }
        return ResponseEntity.ok(currentRequest);

    }
}
