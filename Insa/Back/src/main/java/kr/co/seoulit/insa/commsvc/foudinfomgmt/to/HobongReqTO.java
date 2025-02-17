package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper=false)
public class HobongReqTO {
    private String positionCode;
    private int baseSalaryInit;
    private int baseSalaryIncr;
    private int posAllowanceInit;
    private int posAllowanceIncr;
    private int longevityBonusInit;
    private int longevityBonusIncr;
    private String applyDate;
    private String applyEndDate;

}
