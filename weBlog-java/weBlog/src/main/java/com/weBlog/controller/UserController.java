package com.weBlog.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.weBlog.model.ResponseMessage;
import com.weBlog.model.User;
import com.weBlog.repository.UserRepository;
import com.weBlog.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private FileStorageService storageService;

    private final UserRepository userRepository;

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/username")
    public ResponseEntity<List<User>> getUsersByName(@RequestParam String username) {
        return new ResponseEntity<List<User>>(userRepository.findByUsername(username), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
    }

    @PostMapping("/upload/{id}")
    //public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("user") User user) {
    public ResponseEntity uploadFile(@PathVariable Long id, @Nullable @RequestPart("file") MultipartFile file, @RequestPart("user") String user) {
        String message = "";
        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

        try {
            User userJson;
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.findAndRegisterModules();
            userJson = objectMapper.readValue(user, User.class);

            if (currentUser != null) {
                currentUser.setFirstName(userJson.getFirstName());
                currentUser.setLastName(userJson.getLastName());
                currentUser.setEmail(userJson.getEmail());
                currentUser.setUsername(userJson.getUsername());
                currentUser.setPassword(userJson.getPassword());
                currentUser.setPhoneNumber(userJson.getPhoneNumber());
                if(file != null){
                    currentUser.setImage(file.getBytes());
                }

                currentUser = userRepository.save(currentUser);
            } else {
                currentUser = userRepository.save(userJson);
            }


            return ResponseEntity.ok(currentUser);
        } catch (Exception e) {
            System.out.println(e);
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody User User) throws IOException {
        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

        if (currentUser != null) {
            currentUser.setFirstName(User.getFirstName());
            currentUser.setLastName(User.getLastName());
            currentUser.setEmail(User.getEmail());
            currentUser.setUsername(User.getUsername());
            currentUser.setPassword(User.getPassword());
            currentUser.setPhoneNumber(User.getPhoneNumber());
            if (User.getRole() != null) {
                currentUser.setRole(User.getRole());
            }

            if (User.getImage() != null) {
                currentUser.setImage(User.getImage());

            }

            currentUser = userRepository.save(currentUser);
        } else {
            currentUser = userRepository.save(User);
        }

        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}