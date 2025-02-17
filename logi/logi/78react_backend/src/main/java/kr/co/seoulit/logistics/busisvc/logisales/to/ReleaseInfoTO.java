package kr.co.seoulit.logistics.busisvc.logisales.to;

import kr.co.seoulit.logistics.logiinfosvc.compinfo.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ReleaseInfoTO extends BaseTO {

    private String shipmentNo;
    private String estimateNo;
    private String contractNo;
    private String contractDetailNo;
    private String customerCode;
    private String personCodeInCharge;
    private String itemCode;
    private String itemName;
    private String unitOfContract;
    private String estimateAmount;
    private String unitPriceOfContract;
    private String sumPriceOfContract;
    private String deliverydate;
    private String deliveryPlaceName;
    private String transportMethod;
}
