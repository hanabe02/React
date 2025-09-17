### UseState
    내부 상태값과 그걸 바꾸는 세터 함수를 만드는 코드

    const [pointName, setPointName] = useState('');
    const [pointType, setPointType] = useState('Delivery point');

    useState()는 튜플을 반환하는데 현재 상태값 pointName, pointType
    그 값을 바꾸는 함수(setPointName, setPointType)

    이 초깃값은 "처음 마운트 될 때 한 번만" 사용 된다. 아휴 재렌더에 서는 useState9'') 의 문자열을 다시 읽지 않아
    초기화 가 자동으로 되는게 아니라, 우리가 세터로 직접 빈 값을 넣어줘야 한다.

    setPointName(''); // 포인터 이름을 빈 문자열로 되돌림
    setDrawMode('none'); // 모드도 기본값으로 되돌림

    ex) useState 로 기본 상태를 주고 
    버튼을 클릭해 상태 값을 변경, 한 번더 누르면 변경 취소
    변경 된 상태 값에 따라 
    버튼을 클릭시 handleMapClick() 함수가 실행 되는 원리

### <option> 

    option은 HTML <select> 드롭다운 안에서 '선택지 하나'를 나타내는 요소
    사용자에게 보이는 라벨(텍스트)과 폼/상태로 전달되는 값(value)을 갖는다.

    ex) mpaList를 돌면서 각 맵을 하나의 <option> 으로 만든다.
    {(Array.isArray(mapList) ? mapList : []).map((map, index) => (
        <option key={index} value={map.name}>
            {map.alias || map.name}
        </option>
    ))}
    

### <select>

### useEffect

    렌더 이후 (화면 업데이트) 끝난 뒤 실행되는 '사이드 이펙트'
    여기서 말하는 사이드 이펙트는
     ㄴ 데이터 fetch, 이벤트/구독 등록, 타이머, 콘솔로그, 수동 DOM 조작, 지도 SDK 호출 같은 것을 말한다.

### any 타입 제거 

    ex)
    const res = await fetch() 
     ㄴ 를 통해서 벡엔드에서 데이터를 가져올 때
    const data: AnnRaw[] = await res.json();
     ㄴ json 형식으로 데이터 를 담을 때. AnnRaw[] 타입을 지정해서
        서버가 보내준 그대로의 json을 나타내는 타입이다.
    const formatteddata:Announcement[] = data.map((item) => ({...})
     ㄴ 컴포넌트가 쓰기 편한 모양, author, isPublic, views 항상 숫자, 날짜는 yyyy-mm-dd emd
        이게 Announcement 인터페이스 이다.

    즉, 포인트
     ㄴ Peiam > 서버에서 변환 > AnnRaw(JSON) > 프론트에서 가공 > Announcement 상태

    데이터 타입 2개를 사용하는 이유는? 
     ㄴ 서버가 준 원본 (AnnRaw)과 화면에서 쓰기 편한 형태 (Announcement) 가 조금이라도 다르면
        map 한 번으로 변환해서 이후 ui 코드를 단순화하려고요
        (필드명 변경, 파생값, 기본값 채우기, 날짜 포맷 등)
  
### err 메시지 any 타입 제거

    ex) err.code
    any 타입을 사용하는 기본적인 이유
     ㄴ err.code 에 속성 접근을 할때 catch 변수 타입이 unknown 이라 
        err.code에 바로 접근하면 오류가 난다, 이것을 피하기 위해 any 를 지정한다.

    즉, get은 속성 접근이 없어서 그냥 err, Delete는 err.code를 쓰기 위해 any를 사용하는 것이다.

    해결 방법은 
        err.code 같은 프리즈마 전용 속성은 그 if 블록 안에서만 읽어야 한다.
        그 밖에서 읽게 되면 (타입도 깨지고, 런타임에서도 undefined 일 수 있기 때문이다.)
    ex) err.status 
    

### session await getServerSession(authOptions) any 타입 제거

    ex) 
    any 타입 : 타입 검사를 통째로 꺼버린다. 이후 err.code, user.xyzzy 같은 존재하지 않는 속성도 에러 없이 접근됨
    as {userid?: string }: user 안에 userid 가 있을 수도 있고 string 없을 수도 있다.
     ㄴ 구체적인 형태만 컴파일러에 알려준다. 
        그 모양 안에서만 접근이 허용되고, 다른 속성에 접근하면 여전히 타입 에러가 난다. 안정성 up




