package kr.co.seoulit.logistics.logiinfosvc.compinfo.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.logistics.logiinfosvc.compinfo.entity.CompanyEntity;
import kr.co.seoulit.logistics.logiinfosvc.compinfo.service.JpaCompInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import kr.co.seoulit.logistics.logiinfosvc.compinfo.service.CompInfoService;
import kr.co.seoulit.logistics.logiinfosvc.compinfo.to.CompanyTO;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/compinfo/*")
public class CompanyController {

	@Autowired
	private CompInfoService compInfoService;
	@Autowired
	private JpaCompInfoService jpaCompInfoService;

	ModelMap map = null;
	
	private static Gson gson = new GsonBuilder().serializeNulls().create(); // 속성값이 null 인 속성도 JSON 변환

//	@RequestMapping(value = "/company/list", method = RequestMethod.GET)
//	public ModelMap searchCompanyList(HttpServletRequest request, HttpServletResponse response) {
//		map = new ModelMap();
//		try {
//			ArrayList<CompanyTO> companyList  = compInfoService.getCompanyList();
//
//			map.put("gridRowJson", companyList);
//			map.put("errorCode", 1);
//			map.put("errorMsg", "성공!");
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}
@RequestMapping(value = "/company/list", method = RequestMethod.GET)
public ModelMap searchCompanyList(HttpServletRequest request, HttpServletResponse response) {
	map = new ModelMap();
	// ModelMap 을 반환하여 데이터를 클라이언트로 전달하고 있다.
		// spring 에서는 modelMap 이나 Map 객체를 통해 데이터를 반환하고, 이 데이터는 json 형식으로 직렬화 된다.
		// json 직렬화는 spring boot 가 기본으로 제공하는 jackson 라이브러리를 사용하여 자동으로 처리된다.

	/*
		spring 에서는 httpservletResponse 를 직접 사용하지 않고도 데이터를 반환할 수 있는 여러 가지 편리한 방법을 제공
		1. ModelMap 또는 단순 객체를 반환하면 Spring이 내부적으로 json 직렬화를 처리하여 클라이언트에 응답을 전송
		2. RESTful 스타일의 반환
			spring 에서는 @RestController 또는  @ResponseBody 를 사용하여 객체를 반환하면, 이를 json
			형태로 자동으로 변환한다.
	* */

	try {
		ArrayList<CompanyEntity> companyList  = jpaCompInfoService.getCompanyList();
		System.out.println("\n"+ companyList + "\n");

		map.put("gridRowJson", companyList);
		map.put("errorCode", 1);
		map.put("errorMsg", "성공!");
	} catch (Exception e1) {
		e1.printStackTrace();
		map.put("errorCode", -1);
		map.put("errorMsg", e1.getMessage());
	}
	return map;
}

	@RequestMapping(value = "/company/batch", method = RequestMethod.POST)
	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {
		String batchList = request.getParameter("batchList");
		map = new ModelMap();
		try {
			ArrayList<CompanyTO> companyList = gson.fromJson(batchList, new TypeToken<ArrayList<CompanyTO>>() {
			}.getType());
	
			HashMap<String, Object> resultMap = compInfoService.batchCompanyListProcess(companyList);
	
			map.put("result", resultMap);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공!");
		} catch (Exception e1) { 
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

}
