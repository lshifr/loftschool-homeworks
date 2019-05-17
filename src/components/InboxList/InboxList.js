// Реализуйте компонент InboxList
// Он должен показывать список входящих писем.
// Используйте HOC withData из `/context/Data` чтобы получить данные.

// Этот компонент должен использовать MailList для отображения данных.

import React from 'react';
import { withRouter } from 'react-router-dom';
import MailList from '../MailList';
import { withData } from '../../context/Data';

const InboxList = ({ match, data }) => (
  <MailList messages={data.inbox} currentPath={match.path} />
);

export default withData(withRouter(InboxList));
