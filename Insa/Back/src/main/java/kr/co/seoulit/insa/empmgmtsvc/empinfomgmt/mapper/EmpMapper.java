package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;

@Mapper
public interface EmpMapper {


	public EmpTO selectEmp(String empName);
	public String selectLastEmpCode();
	public ArrayList<EmpTO> selectEmpList();

	public ArrayList<EmpTO> selectEmpList(String deptCode);

	public String getEmpCode(String name);
	public EmpTO selectEmployee(String empCode);
	public void registEmployee(EmpTO emp);
	public void registEmpWorkInfo(HashMap<String, Object> map);

	public void updateEmployee(EmpTO empTO);
	public void deleteEmployee(String empCode);
	public String selectEmpCode(String empName, String deptCode);

	EmpTO empDetailcard(String empCode);
	public void insertEmpPic(HashMap<String, Object> map);
	public String selectAuthLevelByPositionCode(String position);


}
