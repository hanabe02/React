package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper.DeptMapper;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper.HobongMapper;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper.WorkInfoMapper;
import kr.co.seoulit.insa.commsvc.systemmgmt.mapper.DetailCodeMapper;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.DetailCodeTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper.*;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.repository.EmpDetailRepository;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static java.lang.Integer.parseInt;

@Service
public class EmpInfoServiceImpl implements EmpInfoService {

    @Autowired
    private EmpAppointmentMapper empAppointmentMapper;
    @Autowired
    private DeptMapper deptMapper;
    @Autowired
    private EmpMapper empMapper;
    @Autowired
    private HobongMapper hobongMapper;
    @Autowired
    private DetailCodeMapper detailCodeMapper;
    @Autowired
    private FamilyInfoMapper familyInfoMapper;
    @Autowired
    private EducationInfoMapper educationInfoMapper;
    @Autowired
    private WorkExperMapper workExperMapper;
    @Autowired
    private CertificationsMapper certificationsMapper;
    @Autowired
    private EmpCertificationsMapper empCertificationsMapper;
    @Autowired
    private LanguageSkillsMapper languageSkillsMapper;

    @Autowired
    private LicenseInfoMapper licenseInfoMapper;
    @Autowired
    private EmpEvalMapper empEvalMapper;

    @Autowired
    private EmpDetailRepository empDetailRepository;


    @Override
    public EmpTO findAllEmpInfo(String empCode) {
        EmpTO empTO = null;
        empTO = empMapper.selectEmployee(empCode);
        return empTO;

    }
    public void registEmployeePic(MultipartFile file, String residentId){

        String originalFileName = file.getOriginalFilename();
        Path currentWorkingDirectory = Paths.get("").toAbsolutePath();
        String newPathString = currentWorkingDirectory.toString(); // newPath를 String으로 변환
        String imagePath = newPathString + File.separator + "images"; // 경로 구분자 추가
        System.out.println("Current working directory: " + imagePath);
        String saveFileName = "";

        if (!originalFileName.isEmpty()) {
            saveFileName = UUID.randomUUID().toString()  // UUID는 이미지 이름 중복 방지 위해 랜덤하게 생성된 고유값
                    + originalFileName.substring(originalFileName.lastIndexOf('.'));
        }
        try {
            file.transferTo(new File(imagePath, saveFileName));
            String fullImagePath = imagePath + File.separator +  saveFileName; // 경로 구분자 추가
            System.out.println("saveFileName: " + saveFileName);

//            // MultipartFile에서 InputStream 가져오기
//            InputStream inputStream = file.getInputStream();
//
//            // InputStream에서 바이트 배열로 읽어들이기
//            byte[] imageBytes = inputStream.readAllBytes();

            HashMap<String, Object> map = new HashMap<>();
            map.put("fileName", saveFileName);
            map.put("residentId", residentId);
            System.out.println("ServiceImpl에 받아온 map: " + map);
            empMapper.insertEmpPic(map);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    // 본인 직급 이하의 사원 조회할때 사용하는 코드
    @Override
    public List<EmpDetailEntity> findEmpList(String deptCode, String authLevel) {

        List<EmpDetailEntity> empList = null;

        System.out.println("부서코드" + deptCode);

        if (deptCode.equals("000000")) {
            empList = empDetailRepository.findSubAll(authLevel);
        } else if (deptCode.substring(deptCode.length() - 1, deptCode.length()).equals("팀")) {
            empList = empDetailRepository.findSubAllByDeptCodeOrderByEmpCodeAsc(deptCode, authLevel);

        } else {
            empList = empDetailRepository.findSubAllByDeptCodeOrderByEmpCodeAsc(deptCode, authLevel);
            System.out.println("되나요" + empList);
        }
        return empList;
    }

    // 전체 사원 조회
    @Override
    public List<EmpDetailEntity> findEmpAllList(String deptCode) {

        List<EmpDetailEntity> empAllList = null;

        System.out.println("부서코드" + deptCode);

        if (deptCode.equals("000000")) {
            empAllList = empDetailRepository.findAll();

            //날짜가 00년00월00일 00:00:00 시분초 나와 시분초를 없애는 코드과정
            for(EmpDetailEntity bean: empAllList){
                String birthDate = bean.getBirthdate();
                if(birthDate != null){
                    String[] parts = birthDate.split(" ");   // 출력 형식으로 포맷팅하여 문자열로 변환
                    String outputDateStr = parts[0];
                    bean.setBirthdate(outputDateStr);
                }
                // 입력 날짜를 파싱하여 Date 객체로 변환
                System.out.println("getBirthdate: " + bean.getBirthdate());
            }
        } else if (deptCode.substring(deptCode.length() - 1, deptCode.length()).equals("팀")) {
            empAllList = empDetailRepository.findAllByDeptCodeOrderByEmpCodeAsc(deptCode);

        } else {
            empAllList = empDetailRepository.findAllByDeptCodeOrderByEmpCodeAsc(deptCode);
            System.out.println("되나요" + empAllList);
        }
        return empAllList;

    }

    @Override
    public ArrayList<EmpTO> findEmprealList() {

        ArrayList<EmpTO> empList = null;

        empList = empMapper.selectEmpList();

        return empList;
    }

//    @Override
//    public void registEmployeePic(String image) {
//        String encodedImage = image.split(",")[1];
//        System.out.println("인코딩된 이미지: " + encodedImage);
//        byte[] imageBytes = Base64.getDecoder().decode(encodedImage);
//        empMapper.insertEmpPic(imageBytes);
//    }

    @Override
    public EmpTO findEmpCard(String empCode) {
        EmpTO empTO = null;
        empTO = empMapper.empDetailcard(empCode);
        System.out.println("empTO = " + empTO);
        return empTO;
    }

    @Override
    public void registEmployee(EmpTO emp) {
        System.out.println("emp.getFamilyInfo()sssssssssssssssssssssssssssssss = " + emp.getFamilyInfo());
        System.out.println("emp.getCertification()sssssssssssssssssssssssssssssss = " + emp.getCertification());
        System.out.println("emp.getEducationInfo()sssssssssssssssssssssssssssssss = " + emp.getEducationInfo());
        System.out.println("emp.getHiredate()aaaaaaaaaaaaaaaaaaaaaaa = " + emp.getHiredate());
        System.out.println("emp.getPosition = " + emp.getPosition());

        // 마지막 사원의 empCode를 가져와서 새로운 사원의 empCode를 생성한다.
        String lastEmpCode = empMapper.selectLastEmpCode();
        String lastTwoDigits = lastEmpCode.substring(lastEmpCode.length() - 2);
        int number = parseInt(lastTwoDigits) + 1;

        String empCode = "EMP-" + String.format("%02d", number);
        System.out.println("<<<< emp_code = " + empCode);
        System.out.println("<<<< hiredate = " + empCode);


        HashMap<String, String> certificationsMap = new HashMap<>();
        CertificationsTo certifications = emp.getCertification();
        certificationsMap.put("certificationsCode", certifications.getCertificationsCode());
        certificationsMap.put("certificationsName", certifications.getCertificationsName());
        certificationsMap.put("acquisitionDate", certifications.getAcquisitionDate());
        certificationsMap.put("expirationDate", certifications.getExpirationDate());
        certificationsMap.put("empCode",empCode);

        HashMap<String, String> familyInfoMap = new HashMap<>();
        FamilyInfoTO family = emp.getFamilyInfo();
        familyInfoMap.put("familyName", family.getFamilyName());
        familyInfoMap.put("relation", family.getRelation());
        familyInfoMap.put("familyDate", family.getFamilyDate());
        familyInfoMap.put("liveTogether", family.getLiveTogether());
        familyInfoMap.put("empCode",empCode);

        HashMap<String, String> educationInfoMap = new HashMap<>();
        EducationInfoTo educationInfoTo = emp.getEducationInfo();
        educationInfoMap.put("empCode",empCode);
        educationInfoMap.put("schoolName", educationInfoTo.getSchoolName());
        educationInfoMap.put("major", educationInfoTo.getMajor());
        educationInfoMap.put("entranceDate", educationInfoTo.getEntranceDate());
        educationInfoMap.put("graduateDate", educationInfoTo.getGraduateDate());

        HashMap<String, String> workExperMap = new HashMap<>();
        WorkExperTo workExperTo = emp.getWorkExper();
        workExperMap.put("empCode",empCode);
        workExperMap.put("placeOfEmployment", workExperTo.getPlaceOfEmployment());
        workExperMap.put("employmentPeriod", workExperTo.getEmploymentPeriod());
        workExperMap.put("workedPosition", workExperTo.getWorkedPosition());
        workExperMap.put("jobDuties", workExperTo.getJobDuties());
        workExperMap.put("workAddress", workExperTo.getWorkAddress());

        HashMap<String, String> languageSkillsMap = new HashMap<>();
        LanguageSkillsTo languageSkillsTo = emp.getLanguageSkills();
        languageSkillsMap.put("empCode", empCode);
        languageSkillsMap.put("testSubjectCode", languageSkillsTo.getTestSubjectCode());
        languageSkillsMap.put("score", languageSkillsTo.getScore());



        //새로 생성된 empCode를 넘겨받은 객체의 empCode로 할당
        emp.setEmpCode(empCode);
        String hobongCode = hobongMapper.selectHobongCodeByHobongLevel(emp.getHobong());
        System.out.println("hobongCode wwwwwwwwwwwwwwwwwwwwwwwww = " + hobongCode);
        // authority 불러오기
        String authority = empMapper.selectAuthLevelByPositionCode(emp.getPosition());
        System.out.println("authority wwwwwwwwwwwwwwwwwwwwwwwwwwwww= " + authority);
        emp.setHobongCode(hobongCode);
        emp.setAuthority(authority);
        familyInfoMapper.insertFamilyInfo(familyInfoMap);
        educationInfoMapper.insertEducationInfo(educationInfoMap);
        workExperMapper.insertWorkExper(workExperMap);
        empCertificationsMapper.insertEmpCertifications(certificationsMap);
        languageSkillsMapper.insertLanguageSkills(languageSkillsMap);



        // EMP테이블 등록
        empMapper.registEmployee(emp);

        System.out.println("emp.getEmpCode()aaaaaaaaaaaaaaaaaaaaaaaa = " + emp.getEmpCode());
        System.out.println("emp.getHiredate()aaaaaaaaaaaaaaaaaaaaaaa = " + emp.getHiredate());

       String[] parts = emp.getHiredate().split("-");
        String convertedDate = "";
        for (int i = 0; i < parts.length; i++) {
            if (i == 0) {
                convertedDate += parts[i].substring(2); // "20"을 제거
            } else {
                convertedDate += parts[i];
            }
        }
        int workInfoDays = parseInt(convertedDate);
        System.out.println("workInfo:  " + emp.getWorkInfo());
        System.out.println("workInfoDaysaaaaaaaaaaaaaaaaaa:  " + workInfoDays);
        HashMap<String, Object> map = new HashMap<>();
        map.put("empCode", emp.getEmpCode());
        map.put("hiredate", emp.getHiredate());
        map.put("occupation", emp.getOccupation());
        map.put("employmentType", emp.getEmployment());
        map.put("hobong",emp.getHobong());
        map.put("workInfoDays", workInfoDays);
        map.put("position", emp.getPosition());
        map.put("deptName", emp.getDeptName());

         //WORK_INFO 테이블 등록
        System.out.println("<<<< WORK_INFO 테이블 등록전 map = " + map);
        empMapper.registEmpWorkInfo(map);

        // DETAIL_CODE 테이블 등록
        DetailCodeTO detailCodeto = new DetailCodeTO();
        detailCodeto.setDetailCodeNumber(emp.getEmpCode());
        detailCodeto.setDetailCodeName(emp.getEmpName());
        detailCodeto.setCodeNumber("CO-17");
        detailCodeto.setDetailCodeNameusing("N");
        detailCodeMapper.registDetailCode(detailCodeto);

    }


    // 아래의 코드들은 empMapper.updateEmployee(emp)를 제외하고는 복합적인 문제로 인하여 작동하지 않을 확률이 높습니다.
    @Override
    public void modifyEmployee(EmpTO empTO) {
        System.out.println("서비스단 empTO = " + empTO);
        empMapper.updateEmployee(empTO);
//        if (!"".equals(emp.getStatus()) || emp.getStatus().equals("update")) {
//            empMapper.updateEmployee(emp);
//        }
//        if (emp.getWorkInfo() != null) {
//            ArrayList<WorkInfoTO> workInfoList = emp.getWorkInfo();
//            for (WorkInfoTO workInfo : workInfoList) {
//                switch (workInfo.getStatus()) {
//                    case "insert":
//                        workInfoMapper.insertWorkInfo(workInfo);
//                        break;
//                    case "update":
//                        workInfoMapper.updateWorkInfo(workInfo);
//                        break;
//                    case "delete":
//                        workInfoMapper.deleteWorkInfo(workInfo);
//                        break;
//                }
//            }
//        }
    }
//
//        if (emp.getLicenseInfoList() != null && emp.getLicenseInfoList().size() > 0) {
//            ArrayList<LicenseInfoTO> licenseInfoList = emp.getLicenseInfoList();
//            for (LicenseInfoTO licenseInfo : licenseInfoList) {
//                switch (licenseInfo.getStatus()) {
//                    case "insert":
//                        licenseInfoMapper.insertLicenseInfo(licenseInfo);
//                        break;
//                    case "update":
//                        licenseInfoMapper.updateLicenseInfo(licenseInfo);
//                        break;
//                    case "delete":
//                        licenseInfoMapper.deleteLicenseInfo(licenseInfo);
//                        break;
//                }
//            }
//        }
//
//        if (emp.getFamilyInfoList() != null && emp.getFamilyInfoList().size() > 0) {
//            ArrayList<FamilyInfoTO> familyInfoList = emp.getFamilyInfoList();
//            for (FamilyInfoTO familyInfo : familyInfoList) {
//                switch (familyInfo.getStatus()) {
//                    case "insert":
//                        familyInfoMapper.insertFamilyInfo(familyInfo);
//                        break;
//                    case "update":
//                        familyInfoMapper.updateFamilyInfo(familyInfo);
//                        break;
//                    case "delete":
//                        familyInfoMapper.deleteFamilyInfo(familyInfo);
//                        break;
//                }
//            }
//        }

    //}

    @Override
    public void removeEmployee(List<EmpDetailEntity> empDetailEntities) {
        for (EmpDetailEntity emp : empDetailEntities) {
            empMapper.deleteEmployee(emp.getEmpCode());
            DetailCodeTO detailCodeto = new DetailCodeTO();
            detailCodeto.setDetailCodeNumber(emp.getEmpCode());
            detailCodeto.setDetailCodeName(emp.getEmpName());
            detailCodeMapper.deleteDetailCode(detailCodeto);
        }

    }


    // 인사고과 관련 코드

    @Override


    public void registEmpEval(EmpEvalTO empeval) {

        System.out.println("<<<<<<<< empeval.getEmpCode()" + empeval.getEmpCode());
        String code = empEvalMapper.selectEmpEvalByEmpCode(empeval.getEmpCode());
        System.out.println("code == null?\"<<<<<<<<<<<<<\"+null:\"<<<<<<<<<<<<<<<<\"+code = " + code == null ? "<<<<<<<<<<<<<" + null : "<<<<<<<<<<<<<<<<" + code);

        // 인사고과 페이지에서 넘어온 데이터에 있는 사원의 empCode가
        // Emp_Eval 테이블에 존재하는지의 여부에 따라
        // Emp_Eval에 새로운 인사고과 데이터를  입력하거나
        // Emp_Eval에 있는 인사고과 데이터를 수정한다.

        if (code == null) {
            empEvalMapper.insertEmpEval(empeval);

        } else if (code != null) {
            empEvalMapper.updateEmpEval(empeval);
        }


    }

    @Override
    public List<EmpEvalTO> findValidEmpEvalList(String authLevel) {

        return empEvalMapper.selectValidEmpEvalList(authLevel);
    }


    @Override
    public List<EmpEvalTO> findEmpEvalListByApprovalStatus() {

        return empEvalMapper.selectEmpEvalListByApprovalStatus();
    }


    @Override
    public List<EmpEvalTO> findEmpEvalByApprovalStatusCondition(String approvalStatus) {
        return empEvalMapper.selectEmpEvalByApprovalStatusCondition(approvalStatus);
    }


    @Override
    public List<EmpEvalTO> findEmpEvalList() {
        return empEvalMapper.selectEmpEvalList();
    }

    @Override
    public ArrayList<EmpEvalTO> findEmpEval() {

        ArrayList<EmpEvalTO> empevallsit = null;
        empevallsit = empEvalMapper.selectEmpEval();
        return empevallsit;

    }

    @Override
    public ArrayList<EmpEvalTO> findEmpEval(String dept, String year) {
        HashMap<String, String> map = new HashMap<>();
        map.put("deptName", dept);
        map.put("apply_day", year);
        ArrayList<EmpEvalTO> empevallsit = null;

        if (dept.equals("모든부서")) {
            empevallsit = empEvalMapper.selectEmpEval();
        } else {
            empevallsit = empEvalMapper.selectEmpEvalDept(map);
        }
        return empevallsit;

    }


    // 여기서 배열로 받은 approved 객체배열의 데이터를 수정하는 로직
    @Override
    public void modifyApprovedEmpEval(List<EmpEvalTO> empEvalTO) {

        for (int i = 0; i < empEvalTO.size(); i++) {

            if (!"".equals(empEvalTO.get(i).getEmpCode())) {
                empEvalTO.get(i).setApprovalStatus("승인");
                System.out.println("<<<<<<<<<<< empEvalTO.get(i) = " + empEvalTO.get(i));
                empEvalMapper.updateEmpEval(empEvalTO.get(i));
            }
        }


    }

    // 배열로 받은 rejected된 객체배열의 데이터를 수정하는 로직
    @Override
    public void modifyRejectedEmpEval(List<EmpEvalTO> empEvalTO) {


        for (int i = 0; i < empEvalTO.size(); i++) {

            if (!"".equals(empEvalTO.get(i).getEmpCode())) {
                empEvalTO.get(i).setApprovalStatus("반려");
                System.out.println("<<<<<<<<<<< empEvalTO.get(i) = " + empEvalTO.get(i));
                empEvalMapper.updateEmpEval(empEvalTO.get(i));
            }
        }


    }


    @Override
    public void removeEmpEvalList(List<EmpEvalTO> empEvalTO) {


        for (int i = 0; i < empEvalTO.size(); i++) {
            if (!"".equals(empEvalTO.get(i).getEmpCode())) {
                empEvalMapper.deleteEmpEval(empEvalTO.get(i));
                System.out.println("<<<<<<<< empEvalTO.get(i) = " + empEvalTO.get(i));
            }
        }
    }


    // 인사발령


    public String getHosu() {
        return empAppointmentMapper.getHosu();
    }


    @Override
    public void registAppoint(EmpAppointmentRegTO empAppointmentRegTO) {

        empAppointmentRegTO.setEndDate(empAppointmentRegTO.getStartDate());
        empAppointmentMapper.insertEmpAppointment(empAppointmentRegTO);
    }


    public ArrayList<EmpAppointmentTO> findAppointmentEmpList() {

        return empAppointmentMapper.findAppointmentEmpList();

    }

    // 등록된 인사발령 데이터중 승인대기인 데이터만 조회
    public ArrayList<EmpAppointmentTO> findAllAppointmentList() {

        return empAppointmentMapper.selectAllAppointmentList();

    }

    // 등록된 인사발령 데이터중 승인 혹은 반려된 데이터만 조회
    public ArrayList<EmpAppointmentTO> selectApprovedOrRejectedAppointment() {

        return empAppointmentMapper.selectApprovedOrRejectedAppointment();

    }


    public void modifyApprovedAppointmentEmp(List<EmpAppointmentTO> empAppointmentTO) {
        System.out.println();
        System.out.println();
        System.out.println();
        System.out.println("승인된 인사발령 데이터를 DB에 업데이트하는 로직 ");
        try {
            for (int i = 0; i < empAppointmentTO.size(); i++) {

                String hosu = empAppointmentTO.get(i).getHosu();
                String empCode = empAppointmentTO.get(i).getEmpCode();
                Map<String, Object> map = new HashMap<>();

                // 한번에 한명의 사원에 대한 인사발령 데이터를 수정하기때문에 사용할 값들을 map에
                // 다 넣어 놓는다.
                map.put("hosu", hosu);
                map.put("empCode", empCode);
                map.put("approvalStatus", "승인");
                // 해당하는 appointment_emp 의 의 승인상태를 승인으로 변경
                empAppointmentMapper.updateAppointmentEmp(map);
                // 해당하는 appointment_info 의 승인상태를 승인으로 변경
                empAppointmentMapper.updateAppointmentInfo(map);


                EmpAppointmentTO list = empAppointmentMapper.selectAppointmentInfoEmp(map);
                // 각각의 인사발령에 해당하는 정보를 가지고 와서 변수에 할당
                // ---> 인사발령의 타입을 알기위함.
                //      인사발령 타입은 인사발령을
                //      등록할때 appointment_emp 테이블에 입력됨 'N'또는 'Y'로 들어가 있음
                System.out.println("아래의 데이터는 해당하는 인사발령 타입의 DB 테이블에 업데이트될 데이터임.");
                String deptChange = list.getDeptChangeStatus();
                String leaveStatus = list.getLeaveStatus();
                String positionChange = list.getPositionChangeStatus();
                // 인사발령 후의 데이터를 가지고 오는 코드 
                String afterChange = empAppointmentTO.get(i).getAfterChange();
                map.put("afterChange", afterChange);
                System.out.println(deptChange);
                System.out.println(leaveStatus);
                System.out.println(positionChange);
                System.out.println("afterChange = " + afterChange);


                // 특정 타입에 해당하는 테이블들에는 approval_status가 없다.
                // ex) dept_move, leave, position_promotion ...
                if (leaveStatus.equals("Y")) {
                    System.out.println("<<<<<<<< this is leaveStatus");


                } else if (deptChange.equals("Y")) {
                    System.out.println("<<<<<<<<< this is deptChange");

                    // emp 테이블에서 부서코드를 변경된 직급 코드로 변경
                    // dept_move 테이블에서 해당하는 hosu의 afterChange를 변경된 데이터로 업데이트
                    // ---> 코드가 길어지기 때문에 메서드로 뺐습니다.
                    empAppointmentMapper.updateDeptMoveNextDept(map);
                    changeDeptMoveAfterChangeToDeptCode(empCode, afterChange);


                } else if (positionChange.equals("Y")) {
                    System.out.println("<<<<<<<< this is positionChange");

                    // emp 테이블에서 직급코드를 변경된 직급 코드로 변경
                    // position_promotion 테이블에서 해당하는 hosu의 afterChange를 변경된 직급명으로 변경
                    // ---> 코드가 길어지기 때문에 메서드로 뺐습니다.
                    System.out.println("<<<<<<<<<<<<<<<<map is :"+map);
                    empAppointmentMapper.updatePositionPromotionNextPosition(map);
                    changePositionPromotionAfterChangeToPositionCode(empCode, afterChange);

                }


                System.out.println("<<<<<<<<<<<<<<<<<<< list = " + list);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("e = " + e);

        }
        System.out.println();
    }

    //  modifyApprovedAppointmentEmp 메서드 에서 사용하는 메서드
    public void changeDeptMoveAfterChangeToDeptCode(String empCode, String afterChange) {
        System.out.println();
        System.out.println("empCode + \"\" + afterChange = " + empCode+ "" + afterChange);
        Map<String, Object> map = new HashMap<>();
        String nextDept = "";
        switch (afterChange) {
            case "회계팀 ":
                nextDept = "DEP000";
                break;
            case "인사팀":
                nextDept = "DEP001";
                break;
            case "전산팀":
                nextDept = "DEP002";
                break;
            case "보안팀":
                nextDept = "DEP003";
                break;
            case "개발팀":
                nextDept = "DEP004";
                break;
        }
        System.out.println("아래의 데이터는 인사발령된 사원의 emp 테이블에 업데이트할 정보");
        System.out.println("<<<<<<<<<<<<<<< nextDept = " + nextDept);
        map.put("empCode", empCode);
        map.put("nextDept", nextDept);
        System.out.println("<<<<<<<<<< map = " + map);
        // emp 테이블에 인사발령된 사원의 dept_code를 변경된 dept_code로 업데이트
        empAppointmentMapper.updateEmpDeptCode(map);
        System.out.println();
        System.out.println();
        System.out.println();
    }

    //  modifyApprovedAppointmentEmp 메서드 에서 사용하는 메서드
    public void changePositionPromotionAfterChangeToPositionCode(String empCode, String afterChange) {
        System.out.println();
        System.out.println("empCode + \"\" + afterChange = " + empCode + "" + afterChange);

        Map<String, Object> map = new HashMap<>();
        String nextPosition = "";
        switch (afterChange) {
            case "인턴":
                nextPosition = "POS000";
                break;
            case "사원":
                nextPosition = "POS001";
                break;
            case "대리":
                nextPosition = "POS002";
                break;
            case "팀장":
                nextPosition = "POS003";
                break;
            case "부장":
                nextPosition = "POS004";
                break;
            case "상무":
                nextPosition = "POS005";
                break;
            case "대표이사":
                nextPosition = "POS006";
                break;

        }
        System.out.println("아래의 데이터는 인사발령된 사원의 emp 테이블에 업데이트할 정보");
        System.out.println("<<<<<<<<<< nextPosition = " + nextPosition);
        map.put("empCode", empCode);
        map.put("nextPosition", nextPosition);
        System.out.println("<<<<<<<<<< map = " + map);
        // emp 테이블의 인사발령 승인된 사원의 position_code를 변경된 position_code로 업데이트
        empAppointmentMapper.updateEmpPositionCode(map);
        System.out.println();
        System.out.println();
        System.out.println();
    }


    public void modifyRejectedAppointmentEmp(List<EmpAppointmentTO> empAppointmentTO) {
        System.out.println();
        System.out.println();
        System.out.println();
        System.out.println("반려된 인사발령 데이터를 DB에 업데이트하는 로직");
        try {
            for (int i = 0; i < empAppointmentTO.size(); i++) {

                String hosu = empAppointmentTO.get(i).getHosu();
                String empCode = empAppointmentTO.get(i).getEmpCode();
                Map<String, Object> map = new HashMap<>();

                // 한번에 한명의 사원에 대한 인사발령 데이터를 수정하기때문에 사용할 값들을 map에
                // 다 넣어 놓는다. 
                map.put("hosu", hosu);
                map.put("empCode", empCode);
                map.put("approvalStatus", "반려");
                // 해당하는 appointment_emp 의 의 승인상태를 반려로 변경
                empAppointmentMapper.updateAppointmentEmp(map);
                // 해당하는 appointment_info 의 승인상태를 반려로 변경
                empAppointmentMapper.updateAppointmentInfo(map);


                EmpAppointmentTO list = empAppointmentMapper.selectAppointmentInfoEmp(map);
                // 각각의 인사발령에 해당하는 정보를 가지고 와서 변수에 할당
                // ---> 인사발령의 타입을 알기위함.
                //      인사발령 타입은 인사발령을
                //      등록할때 appointment_emp 테이블에 입력됨
                String deptChange = list.getDeptChangeStatus();
                String leaveStatus = list.getLeaveStatus();
                String positionChange = list.getPositionChangeStatus();
                String afterChange = empAppointmentTO.get(i).getAfterChange();
                System.out.println(deptChange);
                System.out.println(leaveStatus);
                System.out.println(positionChange);
                System.out.println("afterChange = " + afterChange);


                // 특정 타입에 해당하는 테이블들에는 approval_status가 없다.
                // 프론트 단에서 승인시 해당하는 타입의 테이블들의 데이터는 건드리지 않아도
                // 될거 같다.
                if (leaveStatus.equals("Y")) {
                    System.out.println("<<<<<<<< this is leaveStatus");


                } else if (deptChange.equals("Y")) {
                    System.out.println("<<<<<<<<< this is deptChange");


                } else if (positionChange.equals("Y")) {
                    System.out.println("<<<<<<<< this is positionChange");


                }


                System.out.println("<<<<<<<<<<<<<<<<<<< list = " + list);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("e = " + e);

        }
        System.out.println();
        System.out.println();
        System.out.println();
    }


    // 아래의 코드의 결과로 출력되는 코드는 너무 길다 사용하지 않을예정
    @Override
    public ArrayList<EmpAppointmentTypeTO> findAllAppointEmp(String hosu) {
        ArrayList<EmpAppointmentTypeTO> list = empAppointmentMapper.selectAllAppointEmp(hosu);
        return list;
    }


    // 인사발령 사원의 숫자를 세는 로직은 필요하지 않다.
    @Override
    public EmpAppointmentTO countAppointmentEmp(String hosu) {
        EmpAppointmentTO list = empAppointmentMapper.countAppointmentEmp(hosu);
        return list;
    }


    // 아래의 쿼리문에서는 empCode를 확인할수 없다.
    // ---> 해당하는 호수의 인사발령 현황만을 확인할수 있다.
    @Override
    public ArrayList<EmpAppointmentTO> findAppointmentList() {
        ArrayList<EmpAppointmentTO> appointmentList = null;
        appointmentList = empAppointmentMapper.selectAppointmentList();

        return appointmentList;
    }


    //여기서는 특정 호수에 해당하는 인사발령 결과만 확인할수 있다. ---> 사용하지 않을것
    @Override
    public ArrayList<EmpAppointmentTO> findDetailAppointmentList(String hosu) {
        ArrayList<EmpAppointmentTO> detailAppointmentList = null;
        detailAppointmentList = empAppointmentMapper.selectDetailAppointmentList(hosu);

        return detailAppointmentList;
    }

    @Override
    public String findEmpCode(String empName, String deptCode){
        String empCode = null;
        empCode = empMapper.selectEmpCode(empName, deptCode);
        System.out.println(empCode);
        return empCode;
    }



}
