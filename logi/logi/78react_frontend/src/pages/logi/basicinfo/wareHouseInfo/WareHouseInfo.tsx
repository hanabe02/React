import Layout from 'layout';
import { useEffect, useState } from 'react';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Page from 'ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { addWareHouseTO, saveWarehouseList, searchWarehouseList, warehouseDetail } from '../action/LogisticsInfoAction';
import WarehouseDialog from './WareHouseDialog';
import WarehouseDialogInfo from './WareHouseDialogInfo';

function WareHouseInfo() {
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const warehouseList = useSelector((state) => state.logisticsinfo.warehouseList);
  const warehouseDetailList = useSelector((state) => state.logisticsinfo.warehouseDetail);
  const [showWarehouseDetailDialog, setShowWarehouseDetailDialog] = useState(false); // 자재조회 다이얼로그 표시 여부 상태 추가
  const [authCheck, setAuthCheck] = useState<null | boolean>(null); 

  const [selected, setSelected] = useState<string[]>([]); // 선택된 아이템의 문자열 배열
  // forceRender 상태를 추가
  const [forceRender, setForceRender] = useState(false);
  const [warehouseCode, setWarehouseCode] = useState({});

  const rankOrder: { [key: string]: number } = {
    사원: 1,
    대리: 2,
    과장: 3,
    차장: 4,
    부장: 5,
    CTO: 6,
    CEO: 7,
  };

  const columns = [
    {
      headerName: '창고 코드',
      field: 'warehouseCode'
    },
    {
      headerName: '창고명',
      field: 'warehouseName',
      editable: true
    },
    {
      headerName: '창고 사용여부',
      field: 'warehouseUseOrNot',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] }
    },
    { headerName: '설명', field: 'description', editable: true },
    { headerName: 'status', field: 'status' }
  ];
  const column = [
    {
      headerName: '창고코드',
      field: 'warehouseCode'
    },
    {
      headerName: '자재코드',
      field: 'itemCode',
      editable: true
    },
    {
      headerName: '자재명',
      field: 'itemName',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] }
    },
    { headerName: '단위', field: 'unitOfStock', editable: true },
    { headerName: '안전재고량', field: 'safetyAllowanceAmount', editable: true },
    { headerName: '가용재고량', field: 'stockAmount', editable: true },
    { headerName: '전체재고량', field: 'totalStockAmount', editable: true }
  ];

  const addClick = () => {
    setAddOpenDialog(true);
  };

  const close = () => {
    setAddOpenDialog(false);
  };

  const handleClick = (event: any, name: any) => {
    console.log('@@@@@name@@@@@@', name);
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
    }
    setSelected(newSelected);
    setWarehouseCode(name.warehouseCode);
  };

  const searchOnClick = () => {
    console.log('자재조회 클릭!');
    console.log('현재 warehouseCode는??? : ', warehouseCode);
    dispatch(warehouseDetail({ warehouseCode }));
    setShowWarehouseDetailDialog(true); // 자재조회 테이블 표시
  };
  console.log('@@@@@warehouseDetailList@@@@@', warehouseDetailList);

  const onSubmit = (warehouseTo) => {
    // 복사본을 만들어서 새 행을 생성
    const newRows = [...warehouseList, warehouseTo];
    dispatch(addWareHouseTO(warehouseTo)); // Redux를 통해 저장
    // 콘솔에 로그 출력 (새 행 확인)
    console.log('새로운 행:', warehouseTo);
    console.log('전체 데이터:', newRows);
    setAddOpenDialog(false);
  };

  const onSave = () => {
    dispatch(saveWarehouseList(warehouseList));
    setForceRender(!forceRender); // forceRender를 토글하여 리랜더링을 강제로 발생시킴

    return Swal.fire({
      icon: 'success',
      title: '저장 되었습니다'
    });
  };

  const onDelete = () => {
    const selectedData = selected;

    if (selectedData) {
      let newSelected: any[] | ((prevState: string[]) => string[]) = [];
      selectedData.map((selectedRow) => {
        if (selectedRow.status === 'INSERT') newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
        else newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
      });
      setSelected(newSelected);
      onSave();
    } else {
      Swal.fire({
        icon: 'error',
        title: '창고를 선택해주세요.'
      });
    }
  };

  useEffect(() => {
      const position = localStorage.getItem('positionName') as string; // 직급 정보 가져오기
      console.log("사용자 직급:", position);
  
      const minRequiredRank = 3; // 최소 접근 가능 직급 (과장 이상)
  
      if (position && rankOrder[position] >= minRequiredRank) {
        setAuthCheck(true);
      } else {
        setAuthCheck(false);
        Swal.fire({
          icon: 'error',
          text: `'과장' 직급 이상만 접근 가능합니다.`,
        });
      }
    }, []);

  useEffect(() => {
    dispatch(searchWarehouseList());
  }, [dispatch, forceRender]);

  return (
    <Page title="창고 관리">
      {authCheck === null ? ( // authCheck가 null이면 로딩 화면 표시
      <MainCard style={{ textAlign: 'center', padding: '20px' }}>
        <p>권한 확인 중...</p>
      </MainCard>
      ) : authCheck ? (
        <>
          <MainCard
            title="창고 관리"
            content={false}
            secondary={
              <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={addClick}>
                  창고 추가
                </Button>
                <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={searchOnClick}>
                  자재조회
                </Button>
                <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={onDelete}>
                  삭제
                </Button>
                <Button variant="contained" color="secondary" onClick={onSave}>
                  저장
                </Button>
              </Grid>
            }
          >
            <TableContainer>
              <Table aria-label="창고 관리">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell sx={{ py: 3 }} key={column.headerName} style={{ minWidth: column.minWidth }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warehouseList &&
                    warehouseList.map((list: any, index: number) => {
                      const isSelected = selected.includes(list);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          key={index}
                          sx={{ py: 3 }}
                          hover
                          tabIndex={-1}
                          role="checkbox"
                          onClick={(event) => handleClick(event, list)}
                          selected={isSelected}
                        >
                          {columns.map((column, index) => {
                            const value = list[column.field];
                            return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
  
            <WarehouseDialog open={addOpenDialog} close={close}>
              <div>
                <WarehouseDialogInfo onSubmit={onSubmit} />
              </div>
            </WarehouseDialog>
          </MainCard>
  
          <Dialog open={showWarehouseDetailDialog} onClose={() => setShowWarehouseDetailDialog(false)} sx={{ minWidth: '1000px' }}>
            <DialogTitle>자재 조회</DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table aria-label="자재 조회">
                  <TableHead>
                    <TableRow>
                      {column.map((col) => (
                        <TableCell sx={{ py: 3 }} key={col.headerName} style={{ minWidth: col.minWidth }}>
                          {col.headerName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {warehouseDetailList &&
                      warehouseDetailList.map((list: any, index: number) => {
                        const isSelected = selected.includes(list);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            key={index}
                            sx={{ py: 3 }}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            onClick={(event) => handleClick(event, list)}
                            selected={isSelected}
                          >
                            {column.map((col, index) => {
                              const value = list[col.field];
                              return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowWarehouseDetailDialog(false)} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <MainCard
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DoDisturbIcon style={{ color: 'red', marginRight: '8px' }} />
              접근 권한 없음
            </div>
          }
          style={{ textAlign: 'center', padding: '20px' }}
        >
          <p>권한이 부족하여 이 페이지에 접근할 수 없습니다.</p>
        </MainCard>
      )}
    </Page>
  );
}

WareHouseInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default WareHouseInfo;
function setAuthCheck(arg0: boolean) {
  throw new Error('Function not implemented.');
}

