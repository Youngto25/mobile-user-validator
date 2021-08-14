/**
 * Created by Fred(qq:24242811) on 2018/6/25.
 */
import React from 'react';
import dva, { connect } from 'dva';
import createLoading from 'dva-loading';
import './index.css'

// 1. Initialize
const app = dva();
app.use(createLoading());
// 4. Router
app.router(require('./router').default);
// 5. Start
app.start('#root');
export default app._store;
