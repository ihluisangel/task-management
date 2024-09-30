import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../../environments/environment';
import {
  TaskImplementationService
} from '../../data/repositories/task/task-implementation.service';
import {
  UserImplentationService
} from '../../data/repositories/user/user-implentation.service';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { UserRepository } from '../../domain/repositories/user.respository';
import { authLink } from '../interceptors/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const link = ApolloLink.from([
        authLink,
        httpLink.create({ uri: environment.api_url })
      ]);

      return {
        link,
        cache: new InMemoryCache(),
      };
    }),

    // Inject dependencies
    { provide: TaskRepository, useClass: TaskImplementationService },
    { provide: UserRepository, useClass: UserImplentationService },
  ],
};
