import React from 'react';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const theme = useTheme();

  const { login } = useAuth(); // 사용자 정의 함수 내장 되어 있는 react hook 함수가 아님
  // useAuth() 가 반환한 객체에서 login 함수를 가져온다.
    // value 안에 들어 있는 login 함수를 가져온다는 의미
      // 이때 login 함수는 context의 value 에 들어있는 함수이다.
  
  // useAuth()는
    // useContext(AuthContext)를 호출 -> 이 호출은 authcontext.proider 의 value를 반환한다.
      // value 의 객체에는 상태 값(...state), 함수(login, logout) 객체 등이 포함되어 있다.
  const scriptedRef = useScriptRef();

  const [checked, setChecked] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  return (
    <Formik
      initialValues={{
        email: 'EMP-01', // info@codedthemes.com
        password: '2222',
        submit: null
      }}
      // 민성 코드 수정 : 주석처리 5줄줄
      // validationSchema={Yup.object().shape({
      //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      //   password: Yup.string().max(255).required('Password is required')
      // })}

      // 서버와의 통신이 발생하는 위치
        // onsubmit 핸들러 내부에서 발생
        // 이 부분에서 사용자 입력 데이터를 서버로 전송하여 인증 요청을 수행한다.
        
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
         /*
          sign in 버튼 클릭
          <form> 태그의 onsubmit 속성에 설정된 handleSubmit 함수 실행 
          로그인 서버에 접속됨 axios 
        */
        try {
          
          await login(values.email, values.password);
          // 서버로 로그인 요청
            // login 함수에 서버 요청 로직을 캡슐화

          // 요청 성공시 if 문 실행, 실패시 error 처리
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err: any) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component={Link}
                href={loginProp ? `/pages/authentication/auth${loginProp}/forgot-password` : '/pages/authentication/auth3/forgot-password'}
                color="secondary"
                sx={{ textDecoration: 'none' }}
              >
                Forgot Password?
              </Typography>
            </Grid>
          </Grid>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Sign In
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
