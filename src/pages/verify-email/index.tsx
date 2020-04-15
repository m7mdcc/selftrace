import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import { useAuthRedirect } from '../../hooks';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authStatus: state.auth.status,
  isEmailVerified: state.auth.userInfo.isEmailVerified,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({}, dispatch);

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function ConfirmEmailPage({ authStatus, isEmailVerified }: Props) {
  useAuthRedirect(authStatus, isEmailVerified);

  return (
    <PageContainer showHeader={false} isProtected={false}>
      <Text style={styles.title}>{t('headers.verifyEmail')}</Text>
    </PageContainer>
  );
}

ConfirmEmailPage.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage);
