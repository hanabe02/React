package kr.co.seoulit.insa.commsvc.foudinfomgmt.controller;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.service.FoudInfoMgmtService;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongFixedTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongPercentageTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongReqTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin //Axioserror,CORS에러일때 사용하면 앞단으로 데이터 잘넘어감.
@RequestMapping("/hr/foudinfomgmt/*")
@RestController
public class HobongController {
    @Autowired
    private FoudInfoMgmtService foudInfoMgmtService;
    ModelMap map = null;

    @GetMapping("hobonglist")
    public ModelMap findHobongList(@RequestParam("positionCode") String positionCode) {

        map = new ModelMap();
        System.out.println("positionCode: "  + positionCode);
        try {
            ArrayList<HobongTO> hobongList = foudInfoMgmtService.findHobongList(positionCode);
            System.out.println(hobongList);
            map.put("hobongList", hobongList);
            map.put("errorCode",0);
            map.put("errorMsg","success");

        } catch (Exception e){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    @PostMapping("hobonglist")
    public ModelMap insertHobongList(@RequestBody HobongReqTO hobongReqTO) {

        map = new ModelMap();
        try {
            foudInfoMgmtService.insertHobongList(hobongReqTO);
            map.put("errorCode",0);
            map.put("errorMsg","success");

        } catch (Exception e){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    @PutMapping("hobong_percentage")
    public ModelMap updateHobongByPercentage(@RequestBody HobongPercentageTO hobongPercentageTO) {

        map = new ModelMap();
        try {
            foudInfoMgmtService.updateHobongByPercentage(hobongPercentageTO);
            map.put("errorCode",0);
            map.put("errorMsg","success");

        } catch (Exception e){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }
    @PutMapping("hobong_fixed")
    public ModelMap updateHobongByFixed(@RequestBody HobongFixedTO hobongFixedTO) {

        map = new ModelMap();
        try {
            foudInfoMgmtService.updateHobongByFixed(hobongFixedTO);
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
