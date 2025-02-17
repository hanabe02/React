package kr.co.seoulit.insa.commsvc.foudinfomgmt.controller;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.service.FoudInfoMgmtService;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin //Axioserror,CORS에러일때 사용하면 앞단으로 데이터 잘넘어감.
@RequestMapping("/hr/foudinfomgmt/*")
@RestController
public class CertificateIssuanceController {
    @Autowired
    private FoudInfoMgmtService foudInfoMgmtService;
    ModelMap map = null;

    @GetMapping("certificate-issuance")
    public ModelMap searchEmpDeatilInfo(@RequestParam("empCode") String empCode) {
        map = new ModelMap();
        try {
            ArrayList<CertificateIssuanceResTO> empDetailList = foudInfoMgmtService.searchEmpDeatilInfo(empCode);
            System.out.println(empDetailList);
            map.put("list", empDetailList);
            map.put("errorCode",0);
            map.put("errorMsg","success");

        } catch (Exception e){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

}
