package kr.co.seoulit.logistics.busisvc.logisales.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import kr.co.seoulit.logistics.busisvc.logisales.service.LogisalesService;
import kr.co.seoulit.logistics.busisvc.logisales.to.EstimateDetailTO;
import kr.co.seoulit.logistics.busisvc.logisales.to.EstimateTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

@CrossOrigin
@RestController
@RequestMapping("/logisales/*")
public class EstimateController {

	@Autowired
	private LogisalesService logisalesService;

	ModelMap map=null;

	// GSON 라이브러리
	private static Gson gson = new GsonBuilder().serializeNulls().create(); // 속성값이 null 인 속성도 json 변환

	@RequestMapping(value="/estimate/list", method=RequestMethod.GET)
	public ModelMap searchEstimateInfo(
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			@RequestParam("dateSearchCondition") String dateSearchCondition
	) {
		map = new ModelMap();

		try {
			ArrayList<EstimateTO> estimateTOList = logisalesService.getEstimateList(dateSearchCondition, startDate, endDate);

			map.put("gridRowJson", estimateTOList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;

	}

	@RequestMapping(value="/estimatedetail/list", method=RequestMethod.GET)
	public ModelMap searchEstimateDetailInfo(@RequestParam("estimateNo") String estimateNo) {

		map = new ModelMap();

		try {
			ArrayList<EstimateDetailTO> estimateDetailTOList = logisalesService.getEstimateDetailList(estimateNo);

			map.put("gridRowJson", estimateDetailTOList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value="/estimate/new", method=RequestMethod.POST)
	// uri로 들어오는 post 요청을 처리한다.
	public ModelMap addNewEstimate(
			@RequestBody Map<String, Object> params
			// 요청 본문(json 형식)을 java의 map<string, Object> 형태로 변환하여 params 에 저장한다.
	) {
		//EstimateTO newEstimateTO = gson.fromJson(newEstimateInfo, EstimateTO.class);

		map = new ModelMap();
		ObjectMapper mapper = new ObjectMapper();
		// objectMapper 생성
			// jackson 라이브러리를 사용해 json 데이터를 java 객체로 변환한다.
			// 여기서 사용한 ObjectMapper는 기본 설정을 커스터 마이즈하고 있다.
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		// json에 java 객체에 정의되지 않은 속성이 포함되어 있어도 무시하고 변환한다.
			// 예: JSON에 "extraField": "value"가 있어도 오류가 발생하지 않음.
		mapper.setVisibilityChecker(
				VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
		EstimateTO newEstimateInfo = mapper.convertValue(params.get("newEstimateInfo"), EstimateTO.class);
		String estimateDate = newEstimateInfo.getEstimateDate();
		ArrayList<EstimateDetailTO> estimateDetailTO = newEstimateInfo.getEstimateDetailTOList();
		EstimateDetailTO estimateDetailTO1 = estimateDetailTO.get(0);

		try {
			System.out.println(params.toString());
			System.out.println("estimateDetailTO1.getEstimateAmount() = " + estimateDetailTO1.getEstimateAmount());
			System.out.println(estimateDate);
			System.out.println(newEstimateInfo);
			System.out.println(estimateDate);
			System.out.println("승환시작");
			System.out.println(newEstimateInfo.getEstimateDetailTOList());

			HashMap<String, Object> resultList = logisalesService.addNewEstimate(estimateDate, newEstimateInfo);

			map.put("result", resultList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}
	@RequestMapping(value="/estimate", method=RequestMethod.DELETE)
	public ModelMap deleteEstimateInfo(
			@RequestParam("estimateNo") String estimateNo,
			@RequestParam("status") String status
	) {

		map = new ModelMap();

		try {
			HashMap<String, Object> resultList = logisalesService.removeEstimate(estimateNo, status);

			map.put("result", resultList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공");

		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value="/estimatedetail/batch", method=RequestMethod.POST)
	public ModelMap batchListProcess(@RequestParam("batchList") String batchList) {

		//String estimateNo = request.getParameter("estimateNo");
		ArrayList<EstimateDetailTO> estimateDetailTOList = gson.fromJson(batchList,
				new TypeToken<ArrayList<EstimateDetailTO>>() {}.getType());

		map = new ModelMap();

		try {
			HashMap<String, Object> resultList = logisalesService.batchEstimateDetailListProcess(estimateDetailTOList,estimateDetailTOList.get(0).getEstimateNo());

			map.put("result", resultList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

}