# thesis
To start the project in client view run *npm run dev* from thesis folder
To start the project in admin view run *npm run admin* from thesis folder

Backend is build with node.js on express.js framework and mongoDB database.
Structure:
1) Config: there is a db.js file which stores database config and connection function.
2) Middleware: there is a verifyToken.js file which stores 3 verification types checked through JSON web token: first type lets any signed in user see the public part of the content on the application, second lets the user see his private information, third one is basically admin rights so it gives the user rights to create, see, modify or delete any data.
3) Models: here I store my data models like User, Product (which can refer to a dish), category (which is food category) and Order (this is needed to create a query to stripe API to order food or book a seat).
4) Routes: here is stored the end-points of the actions that can be performed through a request or a query like registration, any action with products or categories and payment processing with stripe.
5) Index.js: driver code of the application which has the precaution and security settings with cors (later I can add helmet), settings of all routes, database connections and driver code to start up the server.

Frontend and Admin Panel is build with react.js and redux as state manager.

//TODO