// Реализуйте компонент OutboxList
// Он должен показывать список писем на отправку.
// Используйте HOC withData из `/context/Data` чтобы получить данные.

// Этот компонент должен использовать MailList для отображения данных.

import React from 'react';
import { withRouter } from 'react-router-dom';
import MailList from '../MailList';
import { withData } from '../../context/Data';

const OutboxList = ({ match, data }) => (
  <MailList messages={data.outbox} currentPath={match.path} />
);

export default withData(withRouter(OutboxList));
