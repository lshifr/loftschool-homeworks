// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.

import React from 'react';
import style from './Mail.module.css';

const Mail = ({ from, body, clazz }) => (
  <div className={style.container}>
    <p className={clazz}>
      From: <b>{from}</b>
    </p>
    <p className="t-mail-body">{body}</p>
  </div>
);

export default Mail;
