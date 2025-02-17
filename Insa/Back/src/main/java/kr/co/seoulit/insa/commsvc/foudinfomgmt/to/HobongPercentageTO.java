package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class HobongPercentageTO {
    private String positionCode;
    private int baseSalaryPer;
    private int posAllowancePer;
    private int longevityBonusPer;
    private String applyDate;
    private String applyEndDate;
}
