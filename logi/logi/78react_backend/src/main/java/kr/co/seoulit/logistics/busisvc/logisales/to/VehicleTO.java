package kr.co.seoulit.logistics.busisvc.logisales.to;


import kr.co.seoulit.logistics.logiinfosvc.compinfo.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class VehicleTO extends BaseTO {
    private String divisionCodeNo;
    private String detailCode;
    private String detailCodeName;
    private String codeUseCheck;
    private String description;
}
