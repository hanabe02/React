package kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.CertificationsNameTo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface CertificationsNameMapper {
    public ArrayList<CertificationsNameTo> selectCertificationsNameList();
}
