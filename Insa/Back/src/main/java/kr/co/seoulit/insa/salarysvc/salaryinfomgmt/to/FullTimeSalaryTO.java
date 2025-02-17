package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@EqualsAndHashCode(callSuper=false)
public class FullTimeSalaryTO {

    private String empCode;
    private String basicSalary;
    private String positionSalary;
    private String benefit;
    private String familySalary;
    private String totalExtSal;
    private String totalDeduction;
    private String realSalary;
    private String mealSalary;

}
