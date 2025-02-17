package kr.co.seoulit.insa.commsvc.foudinfomgmt.service;

import java.util.ArrayList;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.*;

public interface FoudInfoMgmtService {

  //부서정보관리
  public void batchDeptProcess(ArrayList<DeptTO> deptTO);
  public ArrayList<DeptTO> findDeptList();

  //직위정보관리
  public ArrayList<PositionTO> findPositionList();
  public void modifyPosition(ArrayList<PositionTO> positionList);

  //자격증이름정보관리
  public ArrayList<CertificationsNameTo> findCertificationsNameList();

  //어학능력정보관리
  public ArrayList<LanguageSkillssTo> findLanguageSkillsList();

  //공휴일정보관리
  public ArrayList<HolidayTO> findHolidayList();
  public String findWeekDayCount(String startDate, String endDate);
  public void batchHolidayProcess(ArrayList<HolidayTO> holidayList);

  //기준근무시간관리
  public ArrayList<BaseWorkTimeTO> findTimeList();
  public void batchTimeProcess(BaseWorkTimeTO timeTO);
  public void deleteTimeProcess(BaseWorkTimeTO timeTO);

  //호봉테이블 관리
  public ArrayList<HobongTO> findHobongList(String positionCode);
  //호봉테이블 등록
  public void insertHobongList(HobongReqTO hobongReqTO);

  //호봉 정률 인상
  public void updateHobongByPercentage(HobongPercentageTO hobongPercentageTO);

  //호봉 정액 인상
  public void updateHobongByFixed(HobongFixedTO hobongFixedTO);

  public ArrayList<CertificateIssuanceResTO> searchEmpDeatilInfo(String empCode);
}
