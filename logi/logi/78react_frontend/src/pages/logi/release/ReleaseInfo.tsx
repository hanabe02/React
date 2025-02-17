import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from 'layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { deliveryCompleteRequest2 } from '../delivery/reducer/SalesReducer';

function ReleaseInfo() {
    const [selected, setSelected] = useState<string[]>([]); // 선택된 아이템의 문자열 배열

    const dispatch = useDispatch();
  
    const deliveryCompleteData = useSelector((state: any) => state.sales.deliveryCompleteData);
    console.log('delListdelListdelList', deliveryCompleteData);
  
    useEffect(() => {
      console.log('🔎 dispatch(deliveryCompleteRequest2()) 실행');
      dispatch(deliveryCompleteRequest2());
    }, [dispatch]);
    
    const columns = [
      { headerName: '출고번호', field: 'shipmentNo' },
      { headerName: '견적번호', field: 'estimateNo', hide: true },
      { headerName: '수주번호', field: 'contractNo', hide: true },
      { headerName: '수주상세일련번호', field: 'contractDetailNo', hide: true },
      { headerName: '거래처코드', field: 'customerCode', hide: true },
      { headerName: '처리자코드', field: 'personCodeInCharge' },
      { headerName: '품목코드', field: 'itemCode', hide: true },
      { headerName: '품목명', field: 'itemName' },
      { headerName: '단위', field: 'unitOfContract' },
      { headerName: '출고수량', field: 'estimateAmount' },
      {
        headerName: '단가',
        field: 'unitPriceOfContract',
        cellRenderer: function (params: any) {
          var num = params.value + '';
          var point = num.length % 3;
          var len = num.length;
          var str = num.substring(0, point);
          while (point < len) {
            if (str != '') str += ',';
            str += num.substring(point, point + 3);
            point += 3;
          }
          return str;
        }
      },
      {
        headerName: '총액',
        field: 'sumPriceOfContract',
        cellRenderer: function (params: any) {
          var num = params.value + '';
          var point = num.length % 3;
          var len = num.length;
          var str = num.substring(0, point);
          while (point < len) {
            if (str != '') str += ',';
            str += num.substring(point, point + 3);
            point += 3;
          }
          return str;
        }
      },
      { headerName: '납품날짜', field: 'deliverydate' },
      { headerName: '배송지', field: 'deliveryPlaceName' },
      { headerName: '운송수단', field: 'transportMethod' }
    ];
  
    const handleClick = (event: any, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];
      if (selectedIndex === -1) {
        newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
      }
      setSelected(newSelected);
    };
  
    return (
      <Page title="Collapse Table">
        <MainCard content={false} title="출고 현황">
          <TableContainer>
            <Table aria-label="납품 현황">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell sx={{ py: 3 }} key={column.headerName} style={{ minWidth: '100px' }}>
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryCompleteData &&
                  deliveryCompleteData.map((list: any, index: number) => {
                    const isSelected = selected.includes(list);
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
                        {columns.map((column) => (
                          <TableCell key={column.field}>{list[column.field] || 'No Data'}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Page>
    );
  }
export default ReleaseInfo;
