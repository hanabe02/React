package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import java.util.ArrayList;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Transient;

@Data
@ToString
@EqualsAndHashCode(callSuper = false)
public class EmpTO extends BaseTO {

    private String empCode;
    private String empName;
    private String deptCode;
    private String birthDate;
    private String gender;
    private String mobileNumber;
    private String address;
    private String detailAddress;
    private String postNumber;
    private String email;
    private String lastSchool;
    private String position;
    private String residentId;

    @Transient
    private String image;
    @Transient
    private String hobong;

    @Transient
    private String hobongCode;
    @Transient
    private String deptName;
    @Transient
    private String employment;
    @Transient
    private String authority;

    private String hiredate;

    //private String hireDate;
    //    @Transient
//    private String achievement;
//    @Transient
//    private String ability;
//    @Transient
//    private String attitude;
    @Transient
    private String status;
    @Transient
    private String certificationsName;
    @Transient
    private String acquisitionDate;
    @Transient
    private String expirationDate;
    @Transient
    private String highSchoolName;
    @Transient
    private String major;
    @Transient
    private String entranceDate;
    @Transient
    private String graduateDate;
    @Transient
    private String testSubject;
    @Transient
    private String subject;
    @Transient
    private String score;
    @Transient
    private String familyName;
    @Transient
    private String relation;
    @Transient
    private String familyBirthdate;
    @Transient
    private String liveTogether;
    @Transient
    private String placeOfEmployment;
    @Transient
    private String employmentPeriod;
    @Transient
    private String employmentPosition;
    @Transient
    private String jobDuties;
    @Transient
    private String workAddress;
    @Transient
    private String employmentType;
    @Transient
    private String occupation;





//    @Transient
//    ArrayList<FamilyInfoTO> familyInfoList;
//    @Transient
//    ArrayList<LicenseInfoTO> licenseInfoList;
//    @Transient
//    ArrayList<WorkInfoTO> workInfo;
//

//    public String getImgExtend() {
//        return "jpg";
//    }

//    public void setWorkInfo(ArrayList<WorkInfoTO> workInfo) {
//        this.workInfo = workInfo;
//    }


    @Transient
    FamilyInfoTO familyInfo;
    @Transient
    EducationInfoTo educationInfo;
    @Transient
    WorkExperTo workExper;
    @Transient
    CertificationsTo certification;
    @Transient
    LanguageSkillsTo languageSkills;
    @Transient
    ArrayList<FamilyInfoTO> familyInfoList;
    @Transient
    ArrayList<LicenseInfoTO> licenseInfoList;
    @Transient
    ArrayList<WorkInfoTO> workInfo;

}