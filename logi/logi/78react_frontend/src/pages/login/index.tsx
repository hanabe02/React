import { ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Link from '../../Link';

// project imports
import LAYOUT from 'constant';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import AuthLogin from 'components/authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  console.log("로그인 부분 isLoggedIn : " + isLoggedIn);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  // page 컴포넌트는 페이지의 전체 레이아웃과 seo 메타 데이터를 설정하는 역할을 한다.
    // 이 컴포넌트는 next.js의 페이지 컴포넌트를 래핑(wrapping) 하여 페이지의 공통적인 속성과 구조를 제공하는 데 사용된다.
    
  return (
    <Page title="Login">
      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link href="#" aria-label="theme-logo">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                              Hi, Welcome Back
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography
                          component={Link}
                          href={isLoggedIn ? '/pages/authentication/auth3/register' : '/register'}
                          variant="subtitle1"
                          sx={{ textDecoration: 'none' }}
                        >
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </AuthWrapper1>
    </Page>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};


export default Login;
