// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.

import React from 'react';
import style from './MailList.module.css';
import { NavLink } from 'react-router-dom';

const MAX_SHOWN_LENGTH = 50;

const shorten = text =>
  text.length <= MAX_SHOWN_LENGTH
    ? text
    : `${text.substring(0, MAX_SHOWN_LENGTH)}...`;

const MailBrief = ({ mail, currentPath }) => (
  <NavLink className={style.link} to={`${currentPath}/${mail.id}`}>
    {shorten(mail.body)}
  </NavLink>
);

const MailList = ({ messages, currentPath, clazz }) => (
  <div className={`${style.container} ${clazz}`}>
    {messages.map(msg => (
      <MailBrief mail={msg} currentPath={currentPath} key={msg.id} />
    ))}
  </div>
);

export default MailList;
