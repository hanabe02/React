package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.WorkExperTo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
public interface WorkExperMapper {
    public ArrayList<WorkExperTo> selectWorkExperList(String empCode);
    public void insertWorkExper(HashMap<String, String> workExperMap);
    public void updateWorkExper(WorkExperTo workExperTo);
    public void deleteWorkExper(WorkExperTo workExperTo);
}
