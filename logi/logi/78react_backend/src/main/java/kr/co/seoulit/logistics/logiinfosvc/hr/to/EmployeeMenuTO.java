package kr.co.seoulit.logistics.logiinfosvc.hr.to;

import kr.co.seoulit.logistics.logiinfosvc.compinfo.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmployeeMenuTO extends BaseTO {
    private String empCode;
    private String userPassword;
    private String empName;
    private String menuCode;
    private String menuName;
    private int menuLevel;
    private String positionName;
}
