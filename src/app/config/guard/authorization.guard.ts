import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authorizationGuard: CanMatchFn = (route, segments) => {

  var router = inject(Router)

  if (!localStorage.getItem("tokenJWT")) {
    router.navigate(['../login'])
    return false;
  }

  return true;
};
