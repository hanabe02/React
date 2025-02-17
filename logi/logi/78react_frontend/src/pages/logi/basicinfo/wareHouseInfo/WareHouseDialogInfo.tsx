import { Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// const rankOrder: { [key: string]: number } = {
//   사원: 1,
//   대리: 2,
//   과장: 3,
//   차장: 4,
//   부장: 5,
//   CTO: 6,
//   CEO: 7,
// };

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%' // Fix IE 11 issue.
    // marginTop: theme.spacing(3)
  },
  submit: {
    // margin: theme.spacing(3, 0, 2)F
  }
}));
const currencies = [
  {
    value: 'Y',
    label: 'Y'
  },
  {
    value: 'N',
    label: 'N'
  }
];
export default function WareHouseDialogInfo(props) {
  const classes = useStyles();
  const [warehouseTo, setWarehouseTo] = useState<any>({ status: 'INSERT' });
  // const [authCheck, setAuthCheck] = useState(false);


  // useEffect(() => {
  //   const position = localStorage.getItem('positionName') as string; // 직급 정보 가져오기
  //   console.log("사용자 직급:", position);

  //   const minRequiredRank = 3; // 최소 접근 가능 직급 (과장 이상)

  //   if (position && rankOrder[position] >= minRequiredRank) {
  //     setAuthCheck(true);
  //   } else {
  //     setAuthCheck(false);
  //     Swal.fire({
  //       icon: 'error',
  //       text: `'과장' 직급 이상만 접근 가능합니다.`,
  //     });
  //   }
  // }, []);

  const onChange = (e) => {
    setWarehouseTo({
      ...warehouseTo,
      [e.target.name]: e.target.value
    });
  };

  // const {close} = props;
  const onClick = (e) => {
    e.preventDefault();
    props.onSubmit(warehouseTo);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                //autoComplete="warehouseCode"
                name="warehouseCode"
                variant="outlined"
                //placeholder="자동생성"
                helperText="창고 코드는 자동생성"
                disabled
                fullWidth
                //id="firstName"
                label="창고 코드"
                //onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                select
                fullWidth
                label="창고 사용 여부"
                name="warehouseUseOrNot"
                onChange={onChange}
                value={warehouseTo.warehouseUseOrNot}
              >
                {currencies.map((val) => (
                  <option key={val.value} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="창고 명"
                name="warehouseName"
                onChange={onChange}
                value={warehouseTo.warehouseName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="description"
                label="설명"
                onChange={onChange}
                value={warehouseTo.description}
                defaultValue={null}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={onClick}
          >
            창고 등록
          </Button>
        </form>
      </div>
    </Container>
  );
}
