package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper.EmpMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;


@RequestMapping("/hr/empinfomgmt/*")
@RestController
@CrossOrigin("*")
public class EmpListController {

	@Autowired
	private EmpInfoService empInfoService;
	private EmpMapper empMapper;

	ModelMap map = null;

	// 사원 정보를 부서코드에 따라서 본인직급 미만만 조회
	@GetMapping("/emplist")
	public Map<String,Object> emplist(@RequestParam(value="value",required = true,defaultValue = "000000") String val,
									  @RequestParam("authLevel") String authLevel) {

	Map<String,Object> map = new HashMap<>();

		try {
			System.out.println("성민=" + val);
			String value = "000000";
			if (val != null) {
				value = val;
			}
			List<EmpDetailEntity> list = empInfoService.findEmpList(value, authLevel);
			map.put("errorCode",0);
			map.put("errorMsg","succeed");
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<list:"+list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
			map.put("list",null);
		}
		return map;
	}

	// 사원 정보를 부서코드에 따라서 전체 조회
	@GetMapping("/empAllList")
	public Map<String,Object> empAllList(@RequestParam(value="value",required = true,defaultValue = "000000") String val) {

		Map<String,Object> map = new HashMap<>();
		System.out.println("여기까지는 오니 ??");

		try {
			System.out.println("부서번호=" + val);
			String value = "000000";
			if (val != null) {
				value = val;
			}
			List<EmpDetailEntity> list = empInfoService.findEmpAllList(value);

			map.put("errorCode",0);
			map.put("errorMsg","succeed");
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<list:"+list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
			map.put("list",null);
		}
		return map;
	}

	@GetMapping("/empreallist")
	public ModelMap emplist(HttpServletRequest request, HttpServletResponse response) {

		map = new ModelMap();
		try {

			ArrayList<EmpTO> list = empInfoService.findEmprealList();
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<<<< list = " + list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());
		}
		return map;
	}
	
	//인사기록카드
	@GetMapping("empcard")
	public Map<String, Object> findEmpCard(@RequestParam("empCode") String empCode) {
		System.out.println("findEmpCard 컨트롤러의 empCode = " + empCode);

		Map<String,Object> map = new HashMap<>();

		try {
			EmpTO empCard = empInfoService.findEmpCard(empCode);
			System.out.println("empCard = " + empCard);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			map.put("empCard", empCard);


		} catch (Exception dae) {
			dae.printStackTrace();
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	//사원정보를 수정하는 로직
    @PutMapping("empcard")
    public Map<String, Object> modifyEmployee(@RequestBody EmpTO empTO) {
        System.out.println("컨트롤러의 empTO = " + empTO);
        Map<String,Object> map = new HashMap<>();

        try {
            empInfoService.modifyEmployee(empTO);
            map.put("errorMsg", "success");
            map.put("errorCode", 0);

        } catch (Exception dae) {
            dae.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }
}