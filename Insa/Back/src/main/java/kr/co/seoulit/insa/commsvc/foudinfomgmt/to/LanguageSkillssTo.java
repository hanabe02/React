package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class LanguageSkillssTo {
    private String testSubjectCode, testSubject, subject;
}
