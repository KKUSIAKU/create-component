
* Receive input 
 - extract reserved input field as type, id,
 - extract aria input field 
 - same thing for attribute field
return a function that might be use to build other component if necessary 


# Objectives 

Implement only view logic in mvc context 
- support controller inject as bootstap lib 
- allow controller inject as handler as mandler 
- thinks of strategy here ( stop event propagation if use you set  middleware )
- in the lib style, need to proxy event.stopropgation to alert development of mixing strategy 

# MVC 
MVC is not the issue of create component 
that must be the role of UI library actually to follow a specific update strategy or control 

# As form is the component that need ussually controller 
possible to pass controller as contraintedValidation 
analog to constrainted validation api, consider state as the source of value and props as default => for instance if a component have to display the value of text field, hence it will look for it on state, and finaly on props 

// such function could be use as middleware or plugins, that when present modifiy the children to display 

such functions or methods could be filtred by url 
this will depend on the history API => input dom history api 

// app structure in layer interesting 

https://www.w3.org/TR/2019/WD-mini-app-white-paper-20190912/


Credentials layer in app

# controller points
https://www.w3.org/TR/2018/WD-html53-20181018/sec-forms.html#constraints

so code every controle in this form

# connections between view and controller 
To customise a page easily, inject the customisation selection (class or id ) at the top, and the customisation style is simple injected as last style in your document allowing to override the default style 

The selection class or id value is set depending on same context or input operation. For perfomance though, not all customisation style should be loaded at once and expecting one to match, but could load the specific target element on demand => we could process this an old static html page, when the file page allow to determine everything and the second render now a proper single page application having every infortmation 

This means having an sass application or framework that allow you to compute same style interface systeme base on input configuration 

# usefull link on tree order 
https://dom.spec.whatwg.org/#concept-tree
what is the tree parsing in react ?


# Details specifications

A first main function that allow to defines differents interfaces component classes (UI). A UI component has a single type and doesn't have any sub-component classe. A UI class has a factory method that will (see runChildBuilder and render props in previous version ) to instantiate any subsequent child node. 
** Note the factory method props should know what to instantiate so if a content should be presentational, statefull or should be a provider ? 

A second second main function that allow to defines a view. A view (VUI) holds instances of 

Also plugins could be use on direct childen node props as shallow of enzyme allow testing only the current node

* A component as header or footer could be just presentational or an interactive element on which a user could click, hovered: A header function or constructor object should be able then to instantiate a corressponding element depending what is input is **so Header or Footer class component is a factory that instantiate Presentional or Interactive content instance**

* A component as fragment, section node or non semantic meaningful could have a content on it own or just serve as context value provider for it tree node (children)
**so Section or any class component is a factory that instantiate a context provider or any other class Component (presentional, interactive,...) content instance**


## Presentional 
-  inspect incommming props and conctext  and rejected construction or update 
which interaction props (onclick ) or find any context object to be set (check this in that react doesn't search any missing prop directly in context if so this rule is not valid )

## Interactive element 
Require at least one mouse event type 

## Provider
Implement two strategy : static or dynamic 
Static : it provides a fixed object as context for its tree node 
Dynamic : it use publisher/subsriber scheme to retreive data from it clients 

**Template method**
This is a just note about template method. Logic or explanation in gof suggest it is good approach ind developping the framework. See also some note in ressources project in pattern folder template.md

