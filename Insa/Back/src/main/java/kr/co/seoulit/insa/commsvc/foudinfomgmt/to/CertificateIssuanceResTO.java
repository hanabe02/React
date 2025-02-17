package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@Data
@EqualsAndHashCode(callSuper=false)
public class CertificateIssuanceResTO extends BaseTO {

	private String residentId;
	@Transient
	private String address;
	@Transient
	private String position;
	@Transient
	private String hiredate;
	@Transient
	private String retiredate;



}
