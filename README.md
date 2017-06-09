# appointment-scheduler

A simple demo application written in VueJS Edit

## USAGE

```
git clone git@github.com:herrevilkitten/appointment-scheduler.git

npm install
# Or use yarn

npm run build

npm run serve
```

## NOTES

This is a basic VueJS applcation, written as a single component.  It makes use of a few View components and libraries.

* vue-material: An implementation of the Material Design concept
* awesome-mask: A directive that adds support for input field masking
* vuex: A state management system, similar to Flux and Redux

## POTENTIAL IMPROVEMENTS

### Testing and Linting

There's no testing or linting here.  Mostly this is because I really have no idea how to do it in VueJS with TypeScript.  Something to learn!

### Component Design

The simplest way to improve the application is to split the App Component up into further components.  For example, the hour list could be split up further:

* A component for the entire list
* A component for each item in the list

This would minimize the amount of "global" properties that would be used.  Instead, properties would be passed down to each component, so each component only has access to the properties it needs.  Components would then pass data back by using events that parent components could listen to.  Alternatively, the global store can be used for data storage and anything that needed to could listen to it.

The dialog is another place.  It's strongly tied to the App component in the current implementation and would work better as its own component.