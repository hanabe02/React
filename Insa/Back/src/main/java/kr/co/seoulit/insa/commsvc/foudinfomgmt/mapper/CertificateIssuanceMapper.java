package kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.CertificateIssuanceResTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface CertificateIssuanceMapper {
	public ArrayList<CertificateIssuanceResTO> selectEmpDeatilInfo(String empCode);
}
