package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EducationInfoTo;
import org.apache.ibatis.annotations.Mapper;
import java.util.ArrayList;
import java.util.HashMap;

@Mapper
public interface EducationInfoMapper {
    public ArrayList<EducationInfoTo> selectEducationList(String empCode);
    public void insertEducationInfo(HashMap<String, String> educationInfoMap);
    public void updateEducationInfo(EducationInfoTo educationInfoTo);
    public void deleteEducationInfo(EducationInfoTo educationInfoTo);
}
