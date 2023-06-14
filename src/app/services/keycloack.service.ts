import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

/*
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:80/auth',
        realm: 'your-realm',
        clientId: 'your-client-id'
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25


      }
    });
}

*/