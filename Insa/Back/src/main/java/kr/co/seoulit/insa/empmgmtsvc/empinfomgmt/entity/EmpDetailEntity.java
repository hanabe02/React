package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

import java.util.Date;
@Entity
@Data
@Table(name="EMP")

public class EmpDetailEntity {
    @Id
    private String empCode;
    private String empName;
    private String birthdate;
    private String gender;
    private String mobileNumber;
    private String address;
    private String detailAddress;
    private String postNumber;
    private String email;
    private String lastSchool;
//    private String image;
    private String deptCode;
    private String positionCode;
    private String authority;


}
