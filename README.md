# Final Project lR

## Goal

The goal is to apply some of the concepts outlined in [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to the frontend.

## Outcomes

- Decouple business logic from React/view layer
- Increase testability (Test business logic independent of the framework. Reduce need for things like React testling libary)

## Cornerstone Architecture

![Clean architecture!](./CleanArchitecture.jpeg "Clean architeture")

### Presenters

The presenter is responsible for creating the **view model**. This could invole transforming the data returned from the repository into something that makes sense for the view. This helps to simplify component markup as we can remove formatting and transformation logic. As well as simplifying conditional logic.

### Page Presenters

Page presenters consolidate several presenters in order to fulfil the functionality of a particular view (useually one that represents several independent entities).
It can also provide additional API's as a facade to manage interactions between multiple presenters.

### Repositories

The Repository is responsible for managing and interacting with application state. It also has a responsibility to construct a **programmers' model**. Either based on **DTO** objects returned from any API calls(both internal or 3rd party).

### Gateways

The main purpose of a gateway is to abstract I/O processes, such as API calls. Interactions with broswer apis like local storage. It can also be used to encapsulate third party dependencies.

## Flow Diagram

`Gateway <---DTO---> Repository <---PM---> Presenter <---VM---> Component`

## Additional tools

- Mobx/react-mobx (Aides communication between our app and the react libary)
- Inversify IOC container
