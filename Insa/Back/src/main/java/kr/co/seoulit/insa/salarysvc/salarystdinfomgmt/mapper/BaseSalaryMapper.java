package kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity.FullTimeSalaryEntity;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.FullTimeSalaryTO;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.to.BaseSalaryTO;

@Mapper
public interface BaseSalaryMapper {
	public ArrayList<BaseSalaryTO> selectBaseSalaryList();
	public void updateBaseSalary(BaseSalaryTO baseSalary);
	public List<FullTimeSalaryTO> selectMonthSalary(HashMap<String, Object> map);
}
