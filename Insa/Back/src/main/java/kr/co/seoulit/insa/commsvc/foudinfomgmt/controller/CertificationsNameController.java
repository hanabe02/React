package kr.co.seoulit.insa.commsvc.foudinfomgmt.controller;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.service.FoudInfoMgmtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.CertificationsNameTo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@CrossOrigin //Axioserror,CORS에러일때 사용하면 앞단으로 데이터 잘넘어감.
@RequestMapping("/hr/foudinfomgmt/*")
@RestController
public class CertificationsNameController {
    @Autowired
    private FoudInfoMgmtService foudInfoMgmtService;
    ModelMap map = null;
    @GetMapping("certificationsnamelist")
    public ModelMap findCertificationsNameList(HttpServletRequest request, HttpServletResponse response) {

        map = new ModelMap();
        try {
            ArrayList<CertificationsNameTo> certificationsNameList = foudInfoMgmtService.findCertificationsNameList();
            System.out.println(certificationsNameList);
            CertificationsNameTo certificationsNameTO = new CertificationsNameTo();

            map.put("certificationsNameList", certificationsNameList);
            map.put("emptyPositionBean", certificationsNameTO);
            map.put("errorCode",0);
            map.put("errorMsg","success");

        } catch (DataAccessException dae){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }


}
