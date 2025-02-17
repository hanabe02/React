package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@Data
@EqualsAndHashCode(callSuper=false)
public class HobongTO extends BaseTO {
	
	private String hobongLevel;
	@Transient
	private String baseSalary;
	@Transient
	private String positionAllowance;
	@Transient
	private String longevityBonus;
	@Transient
	private String totalHobong;

}
