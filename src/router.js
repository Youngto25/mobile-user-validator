/**
 * Created by Fred(qq:24242811) on 2018/6/25.
 */
import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch>
              <Route path="/" exact render={()=>(<Redirect
                to={{
                  pathname: "/index",
                }}
              />)}/>
              <Route path="/index" exact component={require('./routes/index').default}></Route>
			</Switch>
		</Router>
	);
}

export default RouterConfig;
