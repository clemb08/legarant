# Application mobile Legarant

## Description

Application pour le projet final du parcours développeur d'application (Salesforce) d'Openclassrooms. l'objectif de cette application est de permettre au client d'afficher des données présentes dans son organisation Salesforce à ses clients représentés en tant que Contact dans l'organisation.

## L'application

L'application est développée en deux parties. Un Back-end NodeJs dont l'objet est double :
- Servir le buil de la partie front-end ;
- Contient des endpoints API permettant de transmettre les requêtes du client à la base de donnée ;

## Tester l'application en local

### Pre-requisite

1 - Créer une organisation Salesforce (Developer Edition) : https://developer.salesforce.com/signup ;

  1a - Créer trois champs custom sur l'objet Contact :
    - Active__c : Checkbox ;
    - Username__c : Text(255) + ExternalID ;
    - Password__c : Text(255) ;

  1b - Créer deux champs custom sur l'objet OrderItem :
    - Contract__c : Lookup (Contract) ;
    - Product_Name__c : Formula (Product2.Name) ;

2 - Créer un compte Heroku gratuitement : https://signup.heroku.com ;
3 - Créer une application Heroku ;
4 - Ajouter les add-ons :
    - Heroku Postgres ;
    - Heroku Connect :
      - Connecter l'add-on à l'organisation Salesforce créée à l'étape 1 ;
      - Connecter l'add-on à la database Postgres créée précédemment ;
      - Création de 3 Mappings :
        
        Contact : Active__c, CreatedDate, Email, HomePhone, Id, LastName, MobilePhone, Name, Password__c, Phone, Title, Username__c ; (Indiquer Username__c comme unique identifier)

        Contract : ContractNumber, CreatedDate, CustomerSignedId, EndeDate, Id, StartDate, Status ;

        OrderItem : Contract__c, CreatedDate, EndDate, Id, Product2Id, Product_Name__c, Quantity, TotalPrice ;

### Télécharger et démarrer l'application en local

1 - Cloner l'application dans un dossier en local ;

2 - Crer un fichier .env au root du projet et y ajouter : `DATABASE_URL=<YOUR POSTGRES DATABASE URI`;

2 - Se positionner dans le dossier `/client` - `cd client/` ;

3 - Build de l'application : `ng build` ;

4 - Se positionner au root du projet, démarrer l'application : `npm start` ;