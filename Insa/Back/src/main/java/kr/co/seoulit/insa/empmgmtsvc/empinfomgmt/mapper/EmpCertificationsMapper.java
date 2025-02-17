package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.CertificationsTo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
public interface EmpCertificationsMapper {
    public ArrayList<CertificationsTo> selectEmpCertificationsList(String empCode);
    public void insertEmpCertifications(HashMap<String, String> certificationsMap);
    public void updateEmpCertifications(CertificationsTo certificationsTo);
    public void deleteEmpCertifications(CertificationsTo certificationsTo);
}
