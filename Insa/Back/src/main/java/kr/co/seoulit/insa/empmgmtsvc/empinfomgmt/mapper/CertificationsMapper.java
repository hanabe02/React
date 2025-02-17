package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.CertificationsTo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface CertificationsMapper {
    public ArrayList<CertificationsTo> selectCertificationsList(String certificationsCode);
    public void insertCertifications(String certificationsName);
    public void updateCertifications(CertificationsTo certificationsTo);
    public void deleteCertifications(CertificationsTo certificationsTo);
}
