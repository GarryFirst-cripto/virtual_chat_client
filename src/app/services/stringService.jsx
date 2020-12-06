import React from 'react';

export const lF = String.fromCharCode(10);

export const formatString = text => {
  const result = [];
  text.split(lF).forEach((item, index, array) => {
    result.push(item);
    if (index < array.length - 1) result.push(<br />);
  });
  return result;
};

const itemName = 'userName';
const itemCurrent = 'currentUser';

export const loadUserName = () => {
  try {
    return sessionStorage.getItem(itemName);
  } catch (err) {
    return '';
  }
};

export const saveUserName = value => {
  try {
    sessionStorage.setItem(itemName, value);
  } catch {
    // ignore write errors
  }
};

export const loadCurrentUser = () => {
  try {
    const data = sessionStorage.getItem(itemCurrent);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

export const saveCurrentUser = user => {
  try {
    const usData = JSON.stringify(user);
    sessionStorage.setItem(itemCurrent, usData);
  } catch {
    // ignore write errors
  }
};
