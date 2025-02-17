package kr.co.seoulit.logistics.busisvc.logisales.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.HashMap;

@Mapper
public interface ReleaseMapper {
    public void release(HashMap<String, Object> map);
}
