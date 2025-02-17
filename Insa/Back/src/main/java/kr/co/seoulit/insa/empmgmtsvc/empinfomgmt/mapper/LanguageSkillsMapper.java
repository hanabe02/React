package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface LanguageSkillsMapper {
    public void insertLanguageSkills(HashMap<String, String> languageSkillsMap);
}
