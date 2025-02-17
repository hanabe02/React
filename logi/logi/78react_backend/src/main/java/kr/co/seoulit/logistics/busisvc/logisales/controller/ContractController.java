package kr.co.seoulit.logistics.busisvc.logisales.controller;

import java.util.ArrayList;
import java.util.Map;

import kr.co.seoulit.logistics.busisvc.logisales.service.LogisalesService;
import kr.co.seoulit.logistics.busisvc.logisales.to.ContractDetailTO;
import kr.co.seoulit.logistics.busisvc.logisales.to.ContractInfoTO;
import kr.co.seoulit.logistics.busisvc.logisales.to.EstimateTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@RestController
@RequestMapping("/logisales/*")

public class ContractController {

	@Autowired
	private LogisalesService logisalesService;


	ModelMap map=null;

	private static Gson gson = new GsonBuilder().serializeNulls().create();

	//@requestparam
	@RequestMapping(value="/contract/list", method=RequestMethod.GET)
	public ModelMap searchContract(
			@RequestParam("startDate") String startDate,
			@RequestParam("searchCondition") String searchCondition,
			@RequestParam("endDate") String endDate,
			@RequestParam("customerCode") String customerCode
		) {


		map = new ModelMap();

		try {
			ArrayList<ContractInfoTO> contractInfoTOList = null;

			contractInfoTOList = logisalesService.getContractList(searchCondition, startDate ,endDate ,customerCode);
			map.put("gridRowJson", contractInfoTOList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공!");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value="/contractdetail/list" , method=RequestMethod.GET)
	public ModelMap searchContractDetail(@RequestParam("contractNo") String contractNo) {

		map = new ModelMap();

		try {
			ArrayList<ContractDetailTO> contractDetailTOList = logisalesService.getContractDetailList(contractNo);
			map.put("gridRowJson", contractDetailTOList);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공!");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value= "/estimate/list/contractavailable", method=RequestMethod.GET)
	public ModelMap searchEstimateInContractAvailable(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {

		map = new ModelMap();

		try {

			ArrayList<EstimateTO> estimateListInContractAvailable = logisalesService.getEstimateListInContractAvailable(startDate, endDate);
			map.put("gridRowJson", estimateListInContractAvailable);
			map.put("errorCode", 1);
			map.put("errorMsg", "성공!");

		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value="/contract/new" , method=RequestMethod.POST)
//	public ModelMap addNewContract(@RequestParam("batchList") String batchList) {
	public ModelMap addNewContract(@RequestBody Map<String, Object> params) {
//	public ModelMap addNewContract(@RequestBody ContractTO to) {
//		String batchList = (String)params.get("batchList");
//		System.out.println(batchList);

//		System.out.println(to);
		String contractType = params.get("contractType") != null ? params.get("contractType").toString() : "";
		String estimateNo = params.get("estimateNo") != null ? params.get("estimateNo").toString() : "";
		String description = params.get("description") != null ? params.get("description").toString() : "";
		String contractRequester = params.get("contractRequester") != null ? params.get("contractRequester").toString() : "";
		String customerCode = params.get("customerCode") != null ? params.get("customerCode").toString() : "";
		String contractNo = params.get("contractNo") != null ? params.get("contractNo").toString() : "";
		String contractDate = params.get("contractDate") != null ? params.get("contractDate").toString() : "";
		String personCodeInCharge = params.get("personCodeInCharge") != null ? params.get("personCodeInCharge").toString() : "";


		System.out.println("\n" + contractType);
		System.out.println(estimateNo);
		// System.out.println(description);
		System.out.println(contractRequester);
		System.out.println(customerCode);
		// System.out.println(contractNo);
		System.out.println(contractDate);
		System.out.println(personCodeInCharge+"\n");


		map = new ModelMap();

		try {
//			HashMap<String,String[]>workingContractList = gson.fromJson(batchList,new TypeToken<HashMap<String,String[]>>() {}.getType()) ;
//			map = logisalesService.addNewContract(workingContractList);
			map = logisalesService.addNewContract(params);
			System.out.println("\n"+"수주등록 map : "+ map+"\n");
		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	@RequestMapping(value="/estimate/cancel" , method=RequestMethod.PUT)
	public ModelMap cancleEstimate(@RequestParam("estimateNo") String estimateNo) {

		map = new ModelMap();

		try {

			logisalesService.changeContractStatusInEstimate(estimateNo, "N");

			map.put("errorCode", 1);
			map.put("errorMsg", "성공!");
			map.put("cancledEstimateNo", estimateNo);

		} catch (Exception e1) {
			e1.printStackTrace();
			map.put("errorCode", -1);
			map.put("errorMsg", e1.getMessage());
		}
		return map;
	}

	//
//	@RequestMapping(value="/contract/list", method=RequestMethod.GET)
//	public ModelMap searchContract(HttpServletRequest request, HttpServletResponse response) {
//
//		String searchCondition = request.getParameter("searchCondition");
//		String startDate = request.getParameter("startDate");
//		String endDate = request.getParameter("endDate");
//		String customerCode = request.getParameter("customerCode");
//
//		map = new ModelMap();
//
//		try {
//			ArrayList<ContractInfoTO> contractInfoTOList = null;
//
//			contractInfoTOList = logisalesService.getContractList(searchCondition, startDate ,endDate ,customerCode);
//			map.put("gridRowJson", contractInfoTOList);
//			map.put("errorCode", 1);
//			map.put("errorMsg", "성공!");
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}
//	@RequestMapping(value="/contractdetail/list" , method=RequestMethod.GET)
//	public ModelMap searchContractDetail(HttpServletRequest request, HttpServletResponse response) {
//		String contractNo = request.getParameter("contractNo");
//
//		map = new ModelMap();
//
//		try {
//			ArrayList<ContractDetailTO> contractDetailTOList = logisalesService.getContractDetailList(contractNo);
//			map.put("gridRowJson", contractDetailTOList);
//			map.put("errorCode", 1);
//			map.put("errorMsg", "성공!");
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}
//
//	@RequestMapping(value= "/estimate/list/contractavailable", method=RequestMethod.GET)
//	public ModelMap searchEstimateInContractAvailable(HttpServletRequest request, HttpServletResponse response) {
//		String startDate = request.getParameter("startDate");
//		String endDate = request.getParameter("endDate");
//
//		map = new ModelMap();
//
//		try {
//
//			ArrayList<EstimateTO> estimateListInContractAvailable = logisalesService.getEstimateListInContractAvailable(startDate, endDate);
//			map.put("gridRowJson", estimateListInContractAvailable);
//			map.put("errorCode", 1);
//			map.put("errorMsg", "성공!");
//
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}
//
//	@RequestMapping(value="/contract/new" , method=RequestMethod.POST)
//	public ModelMap addNewContract(HttpServletRequest request, HttpServletResponse response) {
//		String batchList = request.getParameter("batchList");
//
//		map = new ModelMap();
//
//		try {
//
//			HashMap<String,String[]>workingContractList = gson.fromJson(batchList,new TypeToken<HashMap<String,String[]>>() {}.getType()) ;
//			map = logisalesService.addNewContract(workingContractList);
//			System.out.println("수주등록 map : "+ map);
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}
//
//	@RequestMapping(value="/estimate/cancel" , method=RequestMethod.PUT)
//	public ModelMap cancleEstimate(HttpServletRequest request, HttpServletResponse response) {
//		String estimateNo = request.getParameter("estimateNo");
//
//		map = new ModelMap();
//
//		try {
//
//			logisalesService.changeContractStatusInEstimate(estimateNo, "N");
//
//			map.put("errorCode", 1);
//			map.put("errorMsg", "성공!");
//			map.put("cancledEstimateNo", estimateNo);
//
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e1.getMessage());
//		}
//		return map;
//	}

}
