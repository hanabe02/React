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

### option

    option은 HTML <select> 드롭다운 안에서 '선택지 하나'를 나타내는 요소
    사용자에게 보이는 라벨(텍스트)과 폼/상태로 전달되는 값(value)을 갖는다.

    ex) mpaList를 돌면서 각 맵을 하나의 <option> 으로 만든다.
    {(Array.isArray(mapList) ? mapList : []).map((map, index) => (
        <option key={index} value={map.name}>
            {map.alias || map.name}
        </option>
    ))}
    

### select

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
        
    ex) err.status/err.message
    function hasStatus(err: unknown): err is { status: number; message: string } {
      return (
        typeof err === 'object' &&
         ㄴ null/문자열/숫자 같은 원시값을 배제하고 객체임을 확인
        err !== null &&
        'status' in err &&
         ㄴ status 라는 키가 존재 하는지 확인
        typeof (err as { status: unknown }).status === 'number' &&
         ㄴ 존재만으로는 부족하니 숫자 타입인지 체크
        'message' in err &&
         ㄴ message 도 존재하고 문자열인지 확인
          (일반 error의 message가 문자열이라, Object.assign(new Error(...), {status:400}) 같은 패턴도 잡힘)
        typeof (err as { message: unknown }).message === 'string'
      );
    }
    ex) err.message
    any 대신 unknown + instanceof를 쓰는 이유
    any 타입 검사를 꺼버림. e.message가 없어도 컴파일이 통과 -> 런타임 에러 위험
    unknown : 타입 모름으로 받고, 접근 전 반드시 좁히기가 필요. 
     그래서 e instanceof Error ? e.message : String(e)로 런타임 검사 후 안전하게 꺼냄
      instanceof 에러면 message가 확실히 string
      그 외(문자열, 숫자, 객체 등으로 throw 된 경우)엔 string(e)로 문자열화
    
    

### session await getServerSession(authOptions) any 타입 제거
    ex) 
    any 타입 : 타입 검사를 통째로 꺼버린다. 이후 err.code, user.xyzzy 같은 존재하지 않는 속성도 에러 없이 접근됨
    as {userid?: string }: user 안에 userid 가 있을 수도 있고 string 없을 수도 있다.
     ㄴ 구체적인 형태만 컴파일러에 알려준다. 
        그 모양 안에서만 접근이 허용되고, 다른 속성에 접근하면 여전히 타입 에러가 난다. 안정성 up

### 타입 개념 정리
    const MessageAttributes: Record<string, any> = {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: process.env.AWS_SNS_TYPE || "Transactional",
      },
    };
     ㄴ 타일스크립트 제너릭으로 키가 K, 값이 V인 객체를 의미한다.
     즉, record<string, any> 키는 문자열, 값은 아무 타입이나 ok 타입 안전성 0
     그래서 lint시 오류가 난다. any는 타입 검사를 꺼버리기 때문이다.

     ts 에게 이 객체는 키가 문자열이고, 값은 sns가 요구하는 그 모양이다 를 의미한다.
     때문에 컴파일 타임에 보장시키려면 타입 주석이 필요하다 

     객체 리터럴은 런타임 값으로 string, transactional 같은 실제 데이터를 넣는 것이다. 
     DataType, stringValue 에다가, 

     하지만 record<> 가 타입 규칙인데, 거기서 any를 써버리면 값 모양은 아무거나 허용이 되기에 타입 체크가
     꺼져서 그래서 타입을 지정해주는 것이다.
        
    obj; unknown 
     ㄴ 매개변수 타입 주석, 이 함수에 들어오는 obj는 타입을 모를 수 있으니 unknown 으로 받겠다는 의미 
       (여기서 : 는 TypeScript 타입 표기 연산자)
    (...): unknown
     ㄴ 함수의 반환 타입 주석이다, 이 함수가 돌려주는 값의 타입도 unknown 이다. 라는 선언
        즉, 호출하는 쪽은 결과를 바로 쓰지 말고 좁히기(타입 가드/체크) 후 사용해야 한다.
    괄호 () 
     ㄴ 화살표 함수의 파라미터 목록이다, 파라미터가 1개일 때 타입 주석이 없으면
        obj => { ... } 처럼 괄호를 생략할 수 있지만, 타입 주석을 붙이면 반드시 괄호가 필요하다.
        obj: unknown => { ... } 는 문법적으로 안 된다.
    
    타입 표기
    const x: number = 3 
     ㄴ 변수 x는 number
    function f(a: string):boolean { ... } 
     ㄴ 반환타입 boolean

    블록(스코프) 
    if (cond) {const x = 1;}

    객체 리터럴
    const user = {name: "kim", age:20}

    타입 리터럴(ts)
    type user = {name:string; age:number}

    as 타입 단언(캐스팅 비슷)
     as 는 ts의 타입 단언 문법이다,
     컴파일러에 이 값의 타입을 내가 더 잘 아니까, 이 타입이라고 믿어줘 라고 명시하는 것이다.
    const u = session.user as { userid?: string; id?: string }
     ㄴ 남용하면 타입 안전성이 떨어짐, 가능하면 타입 가드(런타임 체크) 나 정확한 타입 선언이 더 좋음
        as const : 리터럴을 불변, 리터럴 타입으로 고정 

    user?: string 
     ㄴ 여기서 ? 는 옵셔녈(선택) 프로퍼티를 뜻한다.
     ex)
     type CustomToken = {
      sub?: string;   // ← 있어도 되고 없어도 됨
      role?: string;
    } 이 타입의 값에는 sub가 있을 수도 있고, 있다면 string 이어야 한다는 의미이다.
    읽을 때 타입은 string | undefined 로 취급 한다.






















    


