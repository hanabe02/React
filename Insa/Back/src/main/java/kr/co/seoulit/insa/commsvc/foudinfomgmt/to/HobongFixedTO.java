package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class HobongFixedTO {
    private String positionCode;
    private int baseSalaryFixed;
    private int posAllowanceFixed;
    private int longevityBonusFixed;
    private String applyDate;
    private String applyEndDate;
}
