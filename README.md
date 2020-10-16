# WebAppTest
  
Setup
-------------------------------------------------------------------------
npm install  
npm install -g @angular/cli  
ng add @angular/material --> to get access to Angular Material  
npm install crypto-js  
add this to tsconfig.json:  
"paths": {  
      "crypto": [  
        "./node_modules/crypto-js"  
      ]  
    },  



Get Bootstrap 4 (only if 'NgbModal' gives an error)
-------------------------------------------------------------------------
ng add @ng-bootstrap/ng-bootstrap  
(npm install --save bootstrap)  
(npm install --save jquery)  
  
  
Commands Angular
-------------------------------------------------------------------------
Create component: ng g c compname --module=app  
Create service: ng g s servicename  
Create model: ng g cl modelname --type=model  
Create auth-guard: ng g guard auth   (-> option: CanActivate)  
  
Check Build errors: ng build --prod  


Use Swagger
-------------------------------------------------------------------------
<url>/swagger  
example: localhost:43555/swagger  
  
