package kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongFixedTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongPercentageTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongReqTO;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HobongTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface HobongMapper {
	public ArrayList<HobongTO> selectHobongList(String positionCode);

    public void insertHobongList(HobongReqTO hobongReqTO);
    public void updateHobongByPercentage(HobongPercentageTO hobongPercentageTO);
    public void updateHobongByFixed(HobongFixedTO hobongFixedTO);
    public String selectHobongCodeByHobongLevel(String hobongLevel);
}
