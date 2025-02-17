package kr.co.seoulit.insa.commsvc.foudinfomgmt.mapper;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.LanguageSkillssTo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface LanguageSkillssMapper {
    public ArrayList<LanguageSkillssTo> selectLanguageSkillsList();
}
