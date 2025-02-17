package kr.co.seoulit.insa.commsvc.foudinfomgmt.controller;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.service.FoudInfoMgmtService;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.LanguageSkillssTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@CrossOrigin //Axioserror,CORS에러일때 사용하면 앞단으로 데이터 잘넘어감.
@RequestMapping("/hr/foudinfomgmt/*")
@RestController
public class LanguageSkillsController {
    @Autowired
    private FoudInfoMgmtService foudInfoMgmtService;

    ModelMap map = null;
    @GetMapping("languageskillslist")
    public ModelMap findLanguageSkillsList(HttpServletRequest request, HttpServletResponse response) {

        map = new ModelMap();
        try {
            ArrayList<LanguageSkillssTo> languageSkillsList;
            languageSkillsList = foudInfoMgmtService.findLanguageSkillsList();
            System.out.println("QWWDQDQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"+languageSkillsList);
            LanguageSkillssTo languageSkillssTo = new LanguageSkillssTo();

            map.put("languageSkillsList", languageSkillsList);
            map.put("emptyPositionBean", languageSkillssTo);
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
