package kr.co.seoulit.logistics.logiinfosvc.compinfo.controller;


import kr.co.seoulit.logistics.logiinfosvc.hr.to.EmployeeMenuTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import kr.co.seoulit.logistics.logiinfosvc.compinfo.service.CompInfoService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class loginController {
    @Autowired
    private CompInfoService compInfoService;

    @PostMapping
    public Map<String, Object> loginToken(@RequestBody Map<String, String> loginRequest) {
        Map<String, Object> map = new HashMap<>();


        // 클라이언트에서 전달받은 데이터 확인
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        String authority = loginRequest.get("authority");

        // 서버 로그 출력
        System.out.println("서버 요청 완료: 이메일 - " + email + ", 비밀번호 - " + password + ", 접근권한 - " + authority);

        ArrayList<EmployeeMenuTO> user = compInfoService.login(email, password, authority);

        System.out.println("테스트중입니다");

        if (user != null && !user.isEmpty()) {
            // 로그인 성공 시 토큰 생성 및 응답
            String token = "true";
            map.put("serviceToken", token);
            map.put("user", user);

            System.out.println("로그인 성공");
            return map;
        } else {
            // 로그인 실패 시 응답
            map.put("message", "이메일 또는 비밀번호가 일치하지 않습니다.");
            map.put("serviceToken", false);
            System.out.println("로그인 실패");
            return map;
        }
    }
}
