
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app.js';
import { Index } from '../../ui/pages/index.js';
import { Login } from '../../ui/pages/login.js';
import { Signup } from '../../ui/pages/signup.js';
import { Contacts } from '../../ui/pages/contacts';
import { Create } from '../../ui/pages/create';
import { Edit } from '../../ui/pages/edit';
import  List  from '../../ui/pages/list';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />
        <Route name="contact" path="/contacts" component={ Contacts } onEnter={ requireAuth }>
            <Route name="create" path="/contacts/ContactCreate" component={ Create } />
            <Route name="edit" path="/contacts/contactEdit/:id" component={ Edit } />
            <Route name="list" path="/contacts/ContactList" component={ List } />
        </Route>
        <Route name="login" path="/login" component={ Login } />
        <Route name="signup" path="/signup" component={ Signup } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
