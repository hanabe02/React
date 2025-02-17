package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.DailyAttdSearchReqTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RequestMapping("/hr/empinfomgmt/*")
@RestController
@CrossOrigin
public class EmpRegisterController {

	@Autowired
	private EmpInfoService empInfoService;

	@PostMapping("/employee")
	public Map<String, Object> registEmployee(@RequestBody EmpTO empTO) {
		System.out.println("empTo가 오냐ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ"+empTO.getFamilyInfo());
		System.out.println("empTo가 오냐ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ"+empTO.getEducationInfo());
		System.out.println("empTo가 오냐wwwwwwwwwwwwwwwwwwww"+empTO.getWorkExper());
		System.out.println("empTo가 오냐CCCCCCCCCCCCCCCCCCC"+empTO.getCertification());
		System.out.println("empTo가 오냐llllllllllllllllllll"+empTO.getLanguageSkills());
		System.out.println("<<<<<<<<<<< empTO = " + empTO);
		Map<String, Object> map = new HashMap<>();

		try {
			empInfoService.registEmployee(empTO);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception e) {
			map.clear();
			map.put("errorMsg", e.getMessage());
			map.put("errorCode", -1);

		}
		return map;
	}
	@PostMapping("/employee-pic")
	public void registPicOfEmployee(@RequestParam("file") MultipartFile file, @RequestParam("residentId") String residentId) {
		System.out.println("registPicOfEmployee Controller로 넘어옴");
		System.out.println(file.getOriginalFilename());
		System.out.println(residentId);
		empInfoService.registEmployeePic(file, residentId);

	}

}
