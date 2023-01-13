package com.kob.backend.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/user/all")
    public List<User> getAll() {
        return userMapper.selectList(null);
    }

//    @GetMapping("/user/{userId}/")
//    public User getuser(@PathVariable int userId) {
//        return userMapper.selectById(userId);
//    }
//    第二种实现
    @GetMapping("/user/{userId}/")
    public User getUser(@PathVariable int userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", userId);
//        queryWrapper.ge("id", 2).le("id", 3);
//        相应的要将返回值修改为List<User>,userMapper调用也要使用selectList
        return userMapper.selectOne(queryWrapper);
    }

    @GetMapping("/user/add/{userId}/{userName}/{password}/")
    public String addUser(@PathVariable int userId, @PathVariable String userName, @PathVariable String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(userId, userName, encodedPassword);
        userMapper.insert(user);
        return "Add user successfully!";
    }

    @GetMapping("/user/delete/{userId}/")
    public String deleteUser(@PathVariable int userId) {
        userMapper.deleteById(userId);
        return "Delete user successfully!";
    }

}
