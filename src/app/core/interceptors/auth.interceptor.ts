import { HttpInterceptorFn } from '@angular/common/http';
import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
const tokenstorage =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
'eyJwb3NpdGlvbklkIjoiOTEwYmQwNmQtNGUzMS00NmJhLWFmYjUtY' +
'jJmNWY0YjY4OTQzIiwicHJvamVjdElkIjoiNTI1ODhkZmQtZjJj' +
'Yy00MDA5LTgxYmEtNGQxMjlhYTU3NmFmIiwiZnVsbE5hbWUiOiJMd' +
'WlzIEFuZ2VsIEluZ2EgSGFuYW1wYSIsImVtYWlsIjoiaWhsdWlz' +
'YW5nZWxAZ21haWwuY29tIiwiaWF0IjoxNzI3Mjc5MzI0fQ.' +
'GwZFn8bxgQSADPvKKdAKxPV1oQH1kkvcDXKl6GgAzks';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem('access_token');
  const token = tokenstorage;
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }
  return next(req);
};

export const authLink: ApolloLink = setContext((_, { headers }) => {
  const token = tokenstorage;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
});
